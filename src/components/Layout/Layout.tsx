import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import TopBar from './topBar/TopBar';

const Layout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full min-w-0 overflow-x-clip bg-[#F4F6FA]">
            <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:gap-5 sm:p-4 lg:gap-6">
                <div className="sticky top-0 z-40 bg-[#F4F6FA]">
                    <TopBar onMobileMenu={() => setIsMobileSidebarOpen(true)} />
                </div>

                <main className="w-full min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
