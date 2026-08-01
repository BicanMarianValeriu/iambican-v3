import { requestApi } from '../../utils/wordpress';
import { QueryClient } from 'react-query';
import { WP_POST } from '@/utils/types';

// ⬇️ define your query
export const pageQuery = (slug: string) => ({
    queryKey: ['page', slug],
    queryFn: async () => {
        const { data } = await requestApi.get(`wp/v2/pages?slug=${slug}`);

        if (data.length) {
            return data[0];
        }

        throw new Response('This page does not exists.', {
            status: 404,
            statusText: 'Not Found',
        });
    },
}); 

// ⬇️ define your loader
export const loader = (queryClient: QueryClient) => async ({ params: { slug } }: { params: WP_POST }) => {
    const query = pageQuery(slug);

    return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}
