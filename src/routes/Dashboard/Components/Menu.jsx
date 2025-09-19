import React, { useEffect, useState } from 'react';
import classNames from 'clsx';
import { HiHandRaised, HiCog8Tooth } from 'react-icons/hi2';
import { Rect } from '../../../components/General';
import { NavLink } from 'react-router';
import { useWindowSize } from 'react-use';

const Menu = (props) => {
    const { loading } = props;
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        if (width <= 768) {
            return setIsMobile(true);
        }

        return setIsMobile(false);
    }, [width]);

    const solutions = [
        { name: 'Bun venit', description: 'O zi frumoasă', href: '../dashboard/', icon: HiHandRaised },
        { name: 'Setări', description: 'Profil si cont', href: '../dashboard/settings/', icon: HiCog8Tooth },
    ];

    return (
        <div className="flex gap-2 md:block lg:space-y-1 p-2 lg:p-4 bg-white text-sm leading-6 rounded-lg shadow ring-1 ring-slate-100">
            {solutions.map((item) => (
                <NavLink key={item.name} to={item.href} end className={({ isActive }) => classNames(
                    'relative group flex items-center md:gap-x-4 lg:gap-x-6 rounded-lg md:p-2 lg:p-3 hover:bg-gray-50', {
                    'bg-gray-50': isActive
                })}>
                    {({ isActive }) => (
                        <>
                            <div className={
                                classNames('flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-blue-500 md:group-hover:bg-white', {
                                    'bg-gray-50': !isActive,
                                    'bg-blue-500': isMobile && isActive,
                                    'md:bg-white': isActive,
                                })
                            }>
                                <item.icon className={classNames('h-6 w-6', item.icon, {
                                    'text-gray-600': !isActive,
                                    'text-white': isMobile && isActive,
                                    'md:text-blue-500': isActive
                                })} />
                            </div>
                            <div className="hidden md:block">
                                <span className="absolute inset-0" />
                                <span className="font-semibold text-gray-900">{loading ? <Rect width="80%" /> : item.name}</span>
                                <p className="text-gray-600">{loading ? <Rect className="rounded mt-3" /> : item.description}</p>
                            </div>
                        </>
                    )}
                </NavLink>
            ))}
        </div >
    );
}

export default Menu;
