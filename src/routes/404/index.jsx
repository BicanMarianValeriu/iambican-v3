import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router';

const FourOFour = () => {
    const { status, statusText, data = 'Sorry, we couldn\'t find the page you\'re looking for.' } = useRouteError();

    useEffect(() => {
        const documentHTML = document.documentElement;
        documentHTML.classList.remove('loading');
    }, []);

    return (
        <>
            <Helmet title={`${status} - ${statusText}`} />
            <main className="grid min-h-[100vh] place-items-center bg-white px-3 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base text-blue-500 font-semibold">{status}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl [text-shadow:_0_5px_10px_rgb(0_0_0_/_30%)]">{statusText}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{data}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link {...{
                            className: 'rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                            to: '/'
                        }}>Acasa</Link>
                        <Link {...{
                            className: 'text-sm font-semibold text-gray-900',
                            to: '/contact/'
                        }}>Contact <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </main>
        </>
    )
};

export default FourOFour;