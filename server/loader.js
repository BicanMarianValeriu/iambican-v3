// Express requirements
import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { LRUCache } from 'lru-cache';

// React requirements
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { renderToPipeableStream } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';

// Our store, entrypoint, and manifest
import routes, { queryClient } from './../src/routes';
import { createAxiosRequest } from './helpers';
import { AuthProvider } from '../src/auth';

const handler = createStaticHandler(routes);

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
	ttl: 1000 * 60 * 60 * 24 * 7,
	maxSize: 5000,
	sizeCalculation: () => 1,
});

const isDev = process.env.NODE_ENV === 'development';

/**
 * React / Expres Routing function
 * @description {
 * - matches a frontend request to a route
 * - parses index template and injects server data
 * - sends html string to frontend request
 * }
 */
const loader = async (req, res) => {
	const { path: reqPath } = req;

	// Handle common browser requests that don't need React routing
	if (reqPath === '/favicon.ico') {
		res.status(204).end(); // No content
		return;
	}
	
	if (reqPath.startsWith('/.well-known/')) {
		res.status(404).end(); // Not found
		return;
	}
	
	if (reqPath === '/robots.txt') {
		res.setHeader('Content-Type', 'text/plain');
		res.send('User-agent: *\nAllow: /');
		return;
	}

	// If we have a page in the cache, let's serve it
	if (ssrCache.has(reqPath)) {
		res.setHeader('X-Cache', 'HIT');
		res.send(ssrCache.get(reqPath));
		return;
	}

	try {
		const fetchRequest = createAxiosRequest(req);
		const context = await handler.query(fetchRequest);

		if (context instanceof Response && context.status >= 300 && context.status < 400) {
			return res.redirect(context.status, context.headers.get('Location'));
		}

		const router = createStaticRouter(handler.dataRoutes, context);
		const helmetContext = {};

		const App = (
			<HelmetProvider context={helmetContext}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<StaticRouterProvider router={router} context={context} />
					</AuthProvider>
				</QueryClientProvider>
			</HelmetProvider>
		);

		let indexFile = path.resolve(__dirname, './../build/index.html');
		if (!fs.existsSync(indexFile) && isDev) {
			indexFile = path.resolve(__dirname, './../index.html');
		}

		const dataHTML = await fs.promises.readFile(indexFile, 'utf8');
		const splitMarker = '<div id="wecodeartReact"></div>';
		const parts = dataHTML.split(splitMarker);
		
		if (parts.length !== 2) {
			return res.status(500).send('<h1>Server configuration error</h1>');
		}
		
		const [header, footer] = parts;

		let didError = false;
		const { pipe, abort } = renderToPipeableStream(App, {
			onShellReady() {
				if (didError) return;

				const { helmet } = helmetContext;
				const headerWithHelmet = header.replace('</head>', `
					${helmet.title.toString()}
					${helmet.meta.toString()}
					${helmet.link.toString()}
					${helmet.style.toString()}
				</head>`);

				res.setHeader('Content-type', 'text/html');
				res.setHeader('X-Cache', 'MISS');
				res.status(200);
				const transformStream = new PassThrough();
				const cacheChunks = [];
				
				// Write header and opening div
				res.write(headerWithHelmet + '<div id="wecodeartReact">');
				
				transformStream.on('data', (chunk) => {
					cacheChunks.push(chunk);
					res.write(chunk);
				});
				
				transformStream.on('end', () => {
					if (!didError) {
						const finalHtml = Buffer.concat(cacheChunks).toString('utf-8');
						const fullHtml = `${headerWithHelmet}<div id="wecodeartReact">${finalHtml}</div>${footer}`;
						ssrCache.set(reqPath, fullHtml);
					}
					// Close the wecodeartReact div and add footer
					res.write('</div>' + footer);
					res.end();
				});

				pipe(transformStream);
			},
			onShellError(error) {
				console.error('Shell Error:', error);
				didError = true;
				res.status(500).send('<h1>Something went wrong</h1>');
			},
			onError(error) {
				didError = true;
				console.error('Stream Error:', error);
			},
		});

		setTimeout(abort, 10000);

	} catch (error) {
		console.error('Loader Error:', error);
		res.status(500).send('<h1>An unexpected error occurred</h1>');
	}
};

export default loader;