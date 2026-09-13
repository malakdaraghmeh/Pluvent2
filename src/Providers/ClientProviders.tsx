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

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Provider store={store}>
            <React.Suspense fallback={null}>
                <GlobalPixelsTracker />
            </React.Suspense>
            <React.Suspense fallback={null}>
                <GoogleAnalyticsTracker />
            </React.Suspense>
            <ScrollToTop />

            {/* Main Flex Wrapper - Places Sidebar on Left, Content on Right */}
            <div className="flex min-h-screen w-full bg-[#f4f6fa]">
                {/* 1. Left Column: Sidebar */}
                <Sidebar onCollapseChange={setIsCollapsed} />

                {/* 2. Right Column: Topbar + Page Content + Footer */}
                <div
                    className={`
                        flex flex-1 flex-col min-w-0 p-4 gap-6 transition-all duration-300 ease-in-out
                        ${isCollapsed ? 'ml-[104px]' : 'ml-[280px]'}
                    `}
                >
                    <Tobar />

                    <main className="flex-1">
                        {children}
                    </main>

                </div>
            </div>

            <Toaster richColors position="top-right" />
        </Provider>
    );
}