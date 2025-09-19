"use client";

import React from 'react';
import classNames from 'clsx';
import { NavLink } from 'react-router'; 
import { LogOut, Settings, HandIcon, UserCircle } from 'lucide-react'; 
import { useAuth } from '../../auth';
import { Button } from './../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './../ui/dropdown-menu';

const Login = () => {
    const { actions: { logout }, user, loading } = useAuth();

    const UserLoginSVG = () => {
        const { name = 'Default user', avatar_urls = {} } = user || {};

        const avatarSrc = avatar_urls[48] ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

        return (
            <>
                {loading && <div className="user-login__mask"><div className="size-[var(--wp--size)] rounded-full"></div></div>}
                <img className="user-login__avatar" alt={`${name}'s avatar`} src={avatarSrc} />
                {!user && <UserCircle className="user-login__svg size-[var(--wp--size)] z-10" />}
            </>
        );
    }

    const classes = classNames('user-login', {
        'user-login--loading': loading,
        'user-login--is-auth': user
    });

    return (
        <div className={classes}>
            {user ?
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button className="user-login__button relative flex rounded-full size-[var(--wp--size)] p-0">
                            <span className="sr-only">Deschide meniu user</span>
                            <UserLoginSVG />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="user-login__menu relative min-w-36" align="end" >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <NavLink to="/dashboard/" className="w-full"><HandIcon /> Panou</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <NavLink to="/dashboard/settings/" className="w-full"><Settings />Setări</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}><LogOut />Deloghează-mă</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <NavLink className="user-login__button relative flex rounded-full size-[var(--wp--size)] focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-accent" to="/login/">
                    <span className="sr-only">Mergi la panoul de control</span>
                    <UserLoginSVG />
                </NavLink>
            }
        </div>
    )
};

export default Login;
