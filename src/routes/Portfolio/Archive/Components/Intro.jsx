import React from 'react';

const PortfolioStats = () => {
    return (
        <div className="border-b border-zinc-200">
            <div className="container">
                <div className="flex flex-wrap lg:flex-nowrap py-5 lg:py-10">
                    <div className="w-full lg:w-1/2 mb-3 lg:mb-0 text-center lg:text-end">
                        <span className="block text-xl uppercase font-light">Portfoliu</span>
                        <h1 className="relative text-5xl lg:text-[5rem] tracking-[-5px] font-bold mb-2">
                            SHOW
                            <span className="absolute -z-10 top-1/2 -translate-y-1/2 mt-[1px] ms-[-20px] lg:ms-[-35px] text-primary text-[150%] font-[monospace] font-bold drop-shadow-[5px_0]">/</span>
                            CASE
                        </h1>
                        <p className="max-w-sm ms-auto mt-3 mb-2 text-zinc-500">
                            Aceste proiecte sunt doar o fracțiune din munca mea. Simțiți-vă liber să le răsfoiți.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 text-center lg:text-start self-end lg:ps-14">
                        <h2 className="text-xl font-medium inline-block pb-3 mb-3 border-b border-slate-500">Vezi proiectele mele</h2>
                        <ul className="flex justify-center lg:justify-start gap-5 mb-0 uppercase">
                            <li className="nav-item"><a className="nav-link text-primary" href="#all">VEZI TOT</a></li>
                            <li className="nav-item"><a className="nav-link text-slate-500" href="#websites">Websites</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioStats;