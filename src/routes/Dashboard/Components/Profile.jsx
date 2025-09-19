'use client';

import React from 'react';
import { useImage } from 'react-image';
import { NavLink } from 'react-router';
import { useAuth } from './../../../auth';
import { Rect } from './../../../components/General';
import {
    LogOut,
    Sparkles,
    Settings,
    CreditCard,
    ChevronsUpDown,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './../../../components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './../../../components/ui/sidebar';

const Avatar = (props) => {
    const { user, className } = props;
    const { name = 'User', avatar_urls = [] } = user ?? {};

    const { src, isLoading } = useImage({
        srcList: [avatar_urls[96], 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='],
        useSuspense: false
    });

    return (
        <img className={className} src={src} alt={`${name}'s avatar`} style={{ filter: isLoading && 'blur(15px)' }} />
    );
}

const Profile = (props) => {
    const { isMobile } = useSidebar();
    const { actions: { logout }, user = {}, loading } = useAuth();
    const { name = 'User', email = '' } = user ?? {};

    const imageClass = 'size-8 rounded';

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu modal={isMobile}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {loading ? <Rect className={imageClass} /> : <Avatar className={imageClass} {...props} />}
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <h3 className="text-sm: lg:text-md font-bold">{loading ? <Rect height="10" width="130" /> : name}</h3>
                                <p className="text-xs lg:text-sm text-zinc-400"><em>{loading ? <Rect className="mt-2 rounded-sm" width="60" /> : email}</em></p>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className={imageClass} {...props} />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{name}</span>
                                    <span className="truncate text-xs">{email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <NavLink to="/dashboard/" className="w-full"><Sparkles /> Acasă</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem><CreditCard /> Billing</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <NavLink to="/dashboard/settings/" className="w-full"><Settings /> Setări</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}><LogOut /> Deloghează-mă</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export default Profile;
