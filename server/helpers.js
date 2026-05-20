/**
 * Create fetch Request for React Router
 * @param {object} req Express Req
 * @returns {Request} Native Fetch API Request object
 */
const createFetchRequest = (req) => {
	const origin = `${req.protocol}://${req.get('host')}`;
	const url = new URL(req.originalUrl || req.url, origin);

	// Build headers object
	const headers = new Headers();

	for (const [key, values] of Object.entries(req.headers)) {
		if (values) {
			if (Array.isArray(values)) {
				values.forEach(value => headers.append(key, value));
			} else {
				headers.set(key, values);
			}
		}
	}

	// Create Request options
	const init = {
		method: req.method,
		headers,
		signal: req.signal || undefined, // Support abort signals if provided
	};

	// Add body for non-GET/HEAD requests
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		if (req.body) {
			// If body is already a string or Buffer, use it directly
			if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
				init.body = req.body;
			} else {
				// Otherwise, stringify JSON
				init.body = JSON.stringify(req.body);
				if (!headers.has('Content-Type')) {
					headers.set('Content-Type', 'application/json');
				}
			}
		}
	}

	return new Request(url.href, init);
};

export { createFetchRequest };