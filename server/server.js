// Express requirements 
import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// Our loader - this basically acts as the entry point for each page load
import loader from './loader';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Determine build directory (Vite vs react-scripts)
let buildDir;
if (isDev) {
	// In development, proxy to Vite dev server
	buildDir = null;
} else {
	buildDir = fs.existsSync(path.resolve(__dirname, './../build')) 
		? path.resolve(__dirname, './../build')
		: path.resolve(__dirname, './../dist');
}

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));

// Serve static assets only in production
if (buildDir) {
	app.use(express.static(buildDir));
}

app.use(loader);

const server = app.listen(PORT, () => {
	console.log(`App started on http://localhost:${PORT} !`);
});

// Handle the bugs somehow
server.on('error', error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	
	const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});

// Graceful Shutdown Logic
const gracefulShutdown = (signal) => {
	console.log(`\n${signal} signal received. Shutting down gracefully...`);
	server.close(() => {
		console.log('Server has been closed. Exiting process.');
		process.exit(0);
	});

	// If server hasn't finished in 10 seconds, force shutdown
	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
