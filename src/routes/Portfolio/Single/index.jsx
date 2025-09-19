import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useLoaderData, useParams } from 'react-router';
import Main from '../../../components/General/Main';
import Navigation from './Components/Navigation';
import { getMetaTags } from '../../../utils/wordpress'; 
import { portfolioSingleQuery } from './loader';

// ⬇️ define your Component
export function Component() {
    useEffect(() => window.scrollTo(0, 0));

    const initialData = useLoaderData();
    const { slug } = useParams();
    const { data: project } = useQuery({
        ...portfolioSingleQuery(slug),
        initialData
    });

    return (
        <>
            <Helmet {...getMetaTags(project)} />
            <div id="content" className="content content--portfolio content--single">
                <Navigation {...project} />
                <Main posts={[project]} />
            </div>
        </>
    );
}

export default Component;
