import Sidebar from './sidebar/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TobBar from './topBar/TopBar';

const Layout = () => {
    const [, setIsCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (

        <div className="flex min-h-screen w-full bg-[#F4F6FA]">

            {/* SIDEBAR */}
            <Sidebar
                onCollapseChange={setIsCollapsed}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* MAIN AREA */}
            <div
                className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                        gap-4
                        p-3
                        transition-all
                        duration-300
                        sm:gap-5
                        sm:p-4
                        lg:gap-6
                    "
            >
                <TobBar
                    onMobileMenu={() =>
                        setIsMobileSidebarOpen(true)
                    }
                />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
