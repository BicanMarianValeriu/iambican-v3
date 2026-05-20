import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import routes, { queryClient } from './routes';
import { AuthProvider } from './auth';

import './static/styles/index.css';

const router = createBrowserRouter(routes);
const container = document.getElementById("wecodeartReact")!;

const Application = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </HelmetProvider>
        </QueryClientProvider>
    )
};

const app = (<Application />);

if (container.hasChildNodes() && process?.env?.NODE_ENV === 'production') {
    try {
        const root = hydrateRoot(container, app);
        (container as any).__reactRoot = root;
    } catch (error) {
        // Fallback to client-side render if hydration fails
        let root = (container as any).__reactRoot;
        if (!root) {
            root = createRoot(container);
            (container as any).__reactRoot = root;
        }
        root.render(app);
    }
} else {
    let root = (container as any).__reactRoot;
    if (!root) {
        root = createRoot(container);
        (container as any).__reactRoot = root;
    }
    root.render(app);
}
