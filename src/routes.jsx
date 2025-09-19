import React, { lazy, Suspense } from 'react';
import App from './App';
import Home from './routes/Home';
import FourOFour from './routes/404';
import Dashboard from './routes/Dashboard';
import Welcome, { loader as dashboardLoader } from './routes/Dashboard/Welcome';
import Settings from './routes/Dashboard/Settings';
import Protected from './routes/Dashboard/Protected';
import Login from './routes/Login';
import PortfolioArchive, { loader as portfolioLoaderArchive } from './routes/Portfolio/Archive'; 
import { requestApi } from './utils/wordpress';
import { QueryClient } from 'react-query';
import { Loading as PageLoading } from './routes/Page/Components';
import ContactLoading from './routes/Contact/Loading';

// Lazy load components
const Page = lazy(() => import('./routes/Page'));
const Contact = lazy(() => import('./routes/Contact'));
const PortfolioSingular = lazy(() => import('./routes/Portfolio/Single'));

// Import the loader separately since we need it for the route
import { loader as pageLoader } from './routes/Page/loader';
import { loader as portfolioLoaderSingle } from './routes/Portfolio/Single/loader';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export function HydrateFallback() {
	return <PageLoading />;
}

const routes = [
	{
		path: '/',
		loader: async () => {
			const { data: dataHeader } = await requestApi.get('wp/v2/menus/2');
			const { data: dataFooter } = await requestApi.get('wp/v2/menus/7');

			return {
				menus: [dataHeader, dataFooter]
			};
		},
		element: <App />,
		errorElement: <FourOFour />,
		HydrateFallback,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'dashboard',
				element: <Protected><Dashboard /></Protected>,
				children: [
					{
						path: '',
						id: 'welcome',
						loader: dashboardLoader(queryClient),
						element: <Welcome />,
					},
					{
						id: 'settings',
						path: 'settings',
						element: <Settings />,
					},
				]
			},
			{
				path: 'p/:slug',
				loader: pageLoader(queryClient),
				element: (
					<Suspense fallback={<PageLoading />}>
						<Page />
					</Suspense>
				)
			},
			{
				path: 'portfolio',
				index: true,
				loader: portfolioLoaderArchive(queryClient),
				element: <PortfolioArchive />,
			},
			{
				path: 'portfolio/:slug',
				loader: portfolioLoaderSingle(queryClient),
				element: (
					<Suspense fallback={<PortfolioSingular />}>
						<PortfolioSingular />
					</Suspense>
				)
			},
			{
				path: 'contact',
				element: (
					<Suspense fallback={<ContactLoading />}>
						<Contact />
					</Suspense>
				)
			}
		]
	}
];

export default routes;
