import React from 'react';
import Social from './Social';
import Copyright from './Copyright';
// import Newsletter from './Newsletter';
import CallToAction from './CallToAction';
import Navigation from '../General/Navigation';
import { useLocation } from 'react-router';

const Footer = () => {
    const { pathname } = useLocation();

    return (
        <footer className="footer" id="footer" itemScope="itemscope" itemType="http://schema.org/WPFooter">
            {!pathname.includes('/dashboard/') && <>
                <CallToAction />
            </>}
            <div className="footer__bottom bg-[#f1f7ff] text-zinc-500">
                <div className="container flex flex-wrap flex-col-reverse md:flex-row py-5 gap-y-5">
                    <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row justify-center md:justify-start items-center gap-3">
                        <Copyright />
                        <Social />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Navigation menuID={7} className="footer__menu" classes={{
                            list: 'flex gap-3 justify-center md:justify-end',
                            link: 'text-sm font-bold'
                        }} />
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
