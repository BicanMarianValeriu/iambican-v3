import { requestApi } from '../../../utils/wordpress';
import { QueryClient } from '@tanstack/react-query';

// ⬇️ define your query
export const portfolioQuery = () => ({
	queryKey: ['portfolios'],
	queryFn: async () => {
		const { data = [] } = await requestApi.get(`wp/v2/portfolios?per_page=100`);

		return data;
	},
});

// ⬇️ define your loader
export const loader = (queryClient: QueryClient) => async () => {
	const query = portfolioQuery();

	return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}