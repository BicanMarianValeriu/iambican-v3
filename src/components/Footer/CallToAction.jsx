import React from 'react';
import { Link } from 'react-router';

const CallToAction = () => {
    return (
        <div className="footer__cta bg-primary text-white">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center gap-y-5 px-3 py-10 sm:px-0">
                    <div className="w-full lg:w-2/3 col-lg text-center lg:text-start">
                        <h3 className="text-2xl sm:text-3xl tracking-tight">
                            Ai un design și vrei <strong className="font-cursive">să-i dai viață</strong>?
                        </h3>
                        <p className="fw-light mb-3 lg:mb-0">Este simplu, trimite-mi un mesaj și hai să organizăm o întâlnire.</p>
                    </div>
                    <div className="w-full lg:w-1/3 text-center lg:text-end">
                        <Link to="/contact/" className="rounded-full shadow px-10 py-4 font-semibold leading-6 text-sm text-zinc-900 bg-white hover:bg-blue-500 hover:text-white hover:ring hover:ring-offset-2 hover:ring-offset-white">
                            Dă-mi un mesaj
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction; 
