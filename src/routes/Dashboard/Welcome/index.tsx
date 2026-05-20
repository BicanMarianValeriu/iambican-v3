import React from 'react';
import { useQuery } from 'react-query';
import { useLoaderData } from 'react-router';
import { useAuth } from '../../../auth';
import { Content as ContentLoader } from '../Loaders';
import { requestApi } from '../../../utils/wordpress';

// ⬇️ define your query
const pageQuery = () => ({
    queryKey: ['dashboard', 'welcome'],
    queryFn: async () => {
        const { data } = await requestApi.get(`wp/v2/pages?slug=dashboard`);

        return data.length ? data[0] : false;
    },
});

// ⬇️ define your loader
export const loader = (queryClient) => async ({ params: { slug } }) => {
    const query = pageQuery(slug);

    return (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)));
}

// ⬇️ define your Component
const Component = () => {
    const { user, loading } = useAuth();
    const { name = 'User' } = user ?? {};

    const initialData = useLoaderData();
    const { data: page } = useQuery({
        ...pageQuery(),
        initialData
    });

    return (
        <>
            {loading ? <ContentLoader /> : <div className="is-layout-flow" dangerouslySetInnerHTML={{ __html: page.content.rendered.replace('{{ name }}', name) }} />}
        </>
    );
}

export default Component;
