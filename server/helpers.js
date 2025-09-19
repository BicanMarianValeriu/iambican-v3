import axios from 'axios';

/**
 * Create fetch Request
 * @param {object} req Express Req
 */
const createAxiosRequest = (req) => {
	const origin = `${req.protocol}://${req.get('host')}`;
	const url = new URL(req.originalUrl || req.url, origin);

	const headers = {};

	for (const [key, values] of Object.entries(req.headers)) {
		if (values) {
			if (Array.isArray(values)) {
				headers[key] = values;
			} else {
				headers[key] = values.split(', ');
			}
		}
	}

	// Manually create an AbortController
	const abortController = new AbortController();
	const signal = abortController.signal;

	const config = {
		method: req.method,
		url: url.href,
		headers,
		maxRedirects: 0,
		validateStatus: (status) => status >= 200 && status < 300,
	};

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		config.data = req.body;
	}

	// Provide the signal to Axios
	config.signal = signal;

	// Listen for abort events on the AbortController and cancel the Axios request accordingly
	signal.addEventListener('abort', () => axios.CancelToken.source().cancel('Request was aborted'));

	return config;
};

export { createAxiosRequest };