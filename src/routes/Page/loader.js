import { requestApi } from '../../utils/wordpress';

// ⬇️ define your query
export const pageQuery = (slug) => ({
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
export const loader = (queryClient) => async ({ params: { slug } }) => {
    const query = pageQuery(slug);

    return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}
