import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import routes, { queryClient } from './routes';
import { AuthProvider } from './auth';

import './static/scss/style.scss';

const router = createBrowserRouter(routes);

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

// Wait for DOM to be ready
const initializeApp = () => {
    const container = document.getElementById('wecodeartReact');

    if (!container) {
        console.error('React mounting point not found: #wecodeartReact');
        return;
    }

    // Always use hydration for SSR compatibility
    if (container.hasChildNodes()) {
        hydrateRoot(container, <Application />);
    } else {
        // Fallback for client-only rendering
        const root = createRoot(container);
        root.render(<Application />);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}