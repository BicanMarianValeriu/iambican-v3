import React from 'react';
import ContentLoader from 'react-content-loader';

const PageLoading = () => {
    return (
        <div className="page-loading">
            {/* Header skeleton */}
            <div className="page-intro bg-primary py-16 text-white">
                <div className="container">
                    <ContentLoader
                        speed={2}
                        width="100%"
                        height={40}
                        viewBox="0 0 100% 40"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="4" ry="4" width="30%" height="40" />
                    </ContentLoader>
                </div>
            </div>

            {/* Main content skeleton */}
            <main className="main main--single container py-5 lg:py-10">
                <article className="entry entry--page entry--single">
                    <div className="entry__content">
                        <ContentLoader
                            speed={2}
                            width="100%"
                            height={600}
                            viewBox="0 0 100% 600"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            {/* Title */}
                            <rect x="0" y="0" rx="4" ry="4" width="20%" height="30" />

                            {/* Paragraphs */}
                            <rect x="0" y="50" rx="4" ry="4" width="100%" height="16" />
                            <rect x="0" y="80" rx="4" ry="4" width="100%" height="16" />
                            <rect x="0" y="110" rx="4" ry="4" width="40%" height="16" />

                            <rect x="0" y="150" rx="4" ry="4" width="100%" height="16" />
                            <rect x="0" y="180" rx="4" ry="4" width="80%" height="16" />
                            <rect x="0" y="210" rx="4" ry="4" width="60%" height="16" />

                            <rect x="0" y="250" rx="4" ry="4" width="100%" height="16" />
                            <rect x="0" y="280" rx="4" ry="4" width="70%" height="16" />
                            <rect x="0" y="310" rx="4" ry="4" width="50%" height="16" />

                            {/* Subheading */}
                            <rect x="0" y="360" rx="4" ry="4" width="50%" height="25" />

                            <rect x="0" y="410" rx="4" ry="4" width="80%" height="16" />
                            <rect x="0" y="440" rx="4" ry="4" width="70%" height="16" />
                            <rect x="0" y="470" rx="4" ry="4" width="40%" height="16" />

                            <rect x="0" y="510" rx="4" ry="4" width="100%" height="16" />
                            <rect x="0" y="540" rx="4" ry="4" width="80%" height="16" />
                            <rect x="0" y="570" rx="4" ry="4" width="70%" height="16" />
                        </ContentLoader>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default PageLoading;
