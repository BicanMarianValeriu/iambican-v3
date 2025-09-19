import { requestApi } from '../../../utils/wordpress';

// ⬇️ define your query
export const portfolioSingleQuery = (slug) => ({
    queryKey: ['portfolio', slug],
    queryFn: async () => {
        const { data } = await requestApi.get(`wp/v2/portfolios?slug=${slug}`);

        if (data.length) {
            return data[0];
        }

        throw new Response('This project does not exists - or I\'ve made your site but is not listed?', {
            status: 404,
            statusText: 'Not Found',
        });
    },
});

// ⬇️ define your loader
export const loader = (queryClient) => async ({ params: { slug } }) => {
    const query = portfolioSingleQuery(slug);

    return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}