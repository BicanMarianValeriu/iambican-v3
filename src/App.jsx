// The basics
import React, { useEffect } from 'react';
import { Outlet, useNavigation } from "react-router";
import { Helmet } from 'react-helmet-async';

import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './static/scss/style.scss';

const App = () => {
	const { state: loading } = useNavigation();

	useEffect(() => {
		const documentHTML = document.documentElement;

		if (loading === 'loading') {
			documentHTML.classList.add('loading');
			return;
		}

		documentHTML.classList.remove('loading');
	}, [loading]);

	return (
		<>
			<Helmet
				titleTemplate="%s - I Am Bican"
				title="React/WordPress Developer"
				meta={[
					{
						name: 'google-site-verification',
						content: 'ABcP12UVXu0_D0oNpeKnkLyJOO3JyGKQeQ3YgiYdRcY'
					},
					{
						name: 'theme-color',
						content: '#2388ed'
					},
					{
						name: 'description',
						content: 'WordPress/React Developer at myZone/AM2Studio. You can now hire me for your website/projects.'
					}
				]}
			/>
			<Header />
			<Outlet />
			<Footer />
			<ToastContainer toastClassName="text-xs" position="bottom-right" draggable={true} />
		</>
	);
}

export default App;