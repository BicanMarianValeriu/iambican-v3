import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router';
import { useCookie } from 'react-use';
import { useAuth } from '../../auth';
import {
    // Command,
    LucideUserCog,
    LucideUserRoundCheck
} from 'lucide-react';
import {
    // Menu,
    Profile,
    Switcher,
} from './Components';
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarFooter,
    SidebarInset,
    SidebarRail,
} from '../../components/ui/sidebar';

const Dashboard = () => {
    const { user = {}, loading } = useAuth();
    const [sidebarState] = useCookie('sidebar_state');

    return (
        <>
            <Helmet title="Panou de control" />
            <div id="content" className="content content--dashboard">
                <SidebarProvider defaultOpen={sidebarState === "true"} style={{
                    '--sidebar-width': '17.5rem',
                    '--sidebar-width-mobile': '20rem',
                }}>
                    <Sidebar collapsible="icon">
                        <SidebarHeader className="md:mt-[65px]">
                            <Switcher teams={[
                                {
                                    name: "Administrator",
                                    logo: LucideUserCog,
                                    plan: "Super-user",
                                },
                                {
                                    name: "Client",
                                    logo: LucideUserRoundCheck,
                                    plan: "Standard",
                                },
                            ]} />
                        </SidebarHeader>
                        <SidebarContent>
                            {/* <Menu {...{ loading }} /> */}
                            <SidebarGroup />
                            <SidebarGroup />
                        </SidebarContent>
                        <SidebarFooter className="py-2">
                            <Profile {...{ loading, user }} />
                        </SidebarFooter>
                        <SidebarRail />
                    </Sidebar>
                    <SidebarInset className="flex-1">
                        <header className="sticky top-[50px] sm:top-[59px] md:top-[66px] z-10 bg-white border-b px-4 py-4 transition-[padding] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:py-2"><SidebarTrigger /></header>
                        <div className="p-5">
                            <Outlet />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </>
    );
}

export default Dashboard;
