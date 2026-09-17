'use client';

import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import store from '@/store/store';
import ScrollToTop from '@/components/ui/ScrollToTop';
import GlobalPixelsTracker from '@/components/helper/GlobalPixelsTracker';
import GoogleAnalyticsTracker from '@/components/helper/GoogleAnalyticsTracker';
import Tobar from '@/components/tobar/Tobar';
import Sidebar from '@/components/sidebar/Sidebar';

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <Provider store={store}>
            <React.Suspense fallback={null}>
                <GlobalPixelsTracker />
            </React.Suspense>

            <React.Suspense fallback={null}>
                <GoogleAnalyticsTracker />
            </React.Suspense>

            <ScrollToTop />

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
                    <Tobar
                        onMobileMenu={() =>
                            setIsMobileSidebarOpen(true)
                        }
                    />

                    <main className="min-w-0 flex-1">
                        {children}
                    </main>
                </div>
            </div>

            <Toaster
                richColors
                position="top-right"
            />
        </Provider>
    );
}