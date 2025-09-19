import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useLoaderData } from 'react-router';
import Main from '../../../components/General/Main';
import Intro from './Components/Intro';
import loadingEl from './Components/Loader';
import { requestApi } from '../../../utils/wordpress';

// ⬇️ define your query
const portfolioQuery = () => ({
	queryKey: ['portfolios'],
	queryFn: async () => {
		const { data = [] } = await requestApi.get(`wp/v2/portfolios?per_page=100`);

		return data;
	},
});

// ⬇️ define your loader
export const loader = (queryClient) => async () => {
	const query = portfolioQuery();

	return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}

// ⬇️ define your Component
export function Component() {
	useEffect(() => window.scrollTo(0, 0));

	const meta = {
		title: 'View My Portfolio',
		description: 'View my best work and see what resources I`ve used to create this amazing websites.',
		canonical: 'https://www.mvbican.com/portfolio/'
	};

	const options = {
		loading: {
			elements: 6,
		}
	};

	const initialData = useLoaderData();
	const { data: posts } = useQuery({
		...portfolioQuery(),
		initialData
	});

	return (
		<>
			<Helmet
				title={meta.title}
				meta={[
					meta.description ? { name: 'description', content: meta.description } : {}
				]}
				link={[
					meta.canonical ? { rel: 'canonical', href: meta.canonical } : {}
				]}
			/>
			<div id="content" className="content content--projects content--archive">
				<Intro />
				<div className="container">
					<Main className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 py-10 lg:py-14" {
						...{ posts, options, loader: loadingEl }
					} />
				</div>
			</div>
		</>
	);
}

export default Component;
