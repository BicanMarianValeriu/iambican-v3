import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useLoaderData, useParams } from 'react-router';
import { Intro } from './Components';
import Main from '../../components/General/Main';
import { getMetaTags } from '../../utils/wordpress';
import { pageQuery } from './loader';

// ⬇️ define your Component
export function Component() {
    useEffect(() => window.scrollTo(0, 0));

    const initialData = useLoaderData();
    const { slug } = useParams();
    const { data: page } = useQuery({
        ...pageQuery(slug),
        initialData
    });

    const { title: { rendered: title } = {} } = page;

    return (
        <>
            <Helmet {...getMetaTags(page)} />
            <div className="content content--page content--single" id="content">
                <Intro title={title} />
                <Main posts={[page]} className="container py-5 lg:py-10" />
            </div>
        </>
    );
}

export default Component;