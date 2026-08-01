import { requestApi } from '../../../utils/wordpress';
import { QueryClient } from 'react-query';
import { WP_POST } from '@/utils/types';

// ⬇️ define your query
export const portfolioSingleQuery = (slug: string) => ({
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
export const loader = (queryClient: QueryClient) => async ({ params: { slug } }: { params: WP_POST }) => {
    const query = portfolioSingleQuery(slug);

    return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}