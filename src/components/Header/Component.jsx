import React from 'react';
import className from 'classnames';
import { useLocation, NavLink } from 'react-router';
import { Navigation, Login } from '../General';

const Header = () => {
    const { pathname } = useLocation();

    const routes = ['/'];

    const classNames = className('header', { 'header--home': routes.includes(pathname) }, 'sticky', 'top-0', 'z-30');

    const SiteTag = `${routes.includes(pathname) ? 'h1' : 'span'}`;

    return (
        <header className={classNames} id="header" itemScope="itemscope" itemType="http://schema.org/WPHeader">
            <div className="header__bar bg-accent py-3">
                <div className={className('container flex', {
                    'max-w-full': pathname.includes('/dashboard/')
                })}>
                    <div className="absolute inset-y-0 left-0 flex items-center ps-3 sm:static sm:inset-auto sm:ps-0">
                        <div className="flex flex-shrink-0 items-center">
                            <NavLink to="../">
                                <SiteTag className="inline-flex font-bold font-cursive text-primary leading-none">MVBican</SiteTag>
                                <p className="hidden md:block font-medium text-[10px] text-slate-500">Full-stack developer</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:justify-end">
                        <Navigation menuID={2} classes={{
                            list: 'flex',
                            link: 'rounded-md px-3 py-2 text-sm font-bold'
                        }} />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pe-3 sm:static sm:inset-auto sm:pe-0">
                        <Login />
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;
