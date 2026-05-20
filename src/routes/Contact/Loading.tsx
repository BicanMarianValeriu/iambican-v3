import React from 'react';
import ContentLoader from 'react-content-loader';

const ContactLoading = () => {
    return (
        <div className="contact-loading">
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
                        <rect x="40%" y="0" rx="4" ry="4" width="20%" height="40" />
                    </ContentLoader>
                </div>
            </div>

            {/* Main content skeleton */}
            <main className="main main--single container my-10 md:py-10">
                <div className="space-y-6 sm:mx-auto sm:w-full sm:max-w-xl">
                    {/* Form fields skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name field */}
                        <div className="space-y-2">
                            <ContentLoader
                                speed={2}
                                width="100%"
                                height={60}
                                viewBox="0 0 100% 60"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="0" y="0" rx="4" ry="4" width="30%" height="16" />
                                <rect x="0" y="25" rx="4" ry="4" width="100%" height="35" />
                            </ContentLoader>
                        </div>
                        
                        {/* Email field */}
                        <div className="space-y-2">
                            <ContentLoader
                                speed={2}
                                width="100%"
                                height={60}
                                viewBox="0 0 100% 60"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="0" y="0" rx="4" ry="4" width="40%" height="16" />
                                <rect x="0" y="25" rx="4" ry="4" width="100%" height="35" />
                            </ContentLoader>
                        </div>
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                        <ContentLoader
                            speed={2}
                            width="100%"
                            height={120}
                            viewBox="0 0 100% 120"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="4" ry="4" width="25%" height="16" />
                            <rect x="0" y="25" rx="4" ry="4" width="60%" height="14" />
                            <rect x="0" y="50" rx="4" ry="4" width="100%" height="70" />
                        </ContentLoader>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center">
                        <ContentLoader
                            speed={2}
                            width={120}
                            height={40}
                            viewBox="0 0 120 40"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="4" ry="4" width="120" height="40" />
                        </ContentLoader>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactLoading;
