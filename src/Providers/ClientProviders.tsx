'use client';

import React from 'react';

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import Navbar from '@/components/navbar/Navbar';
import store from '@/store/store';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import GlobalPixelsTracker from '@/components/helper/GlobalPixelsTracker';
import GoogleAnalyticsTracker from '@/components/helper/GoogleAnalyticsTracker';
import Sidebar from '@/components/sidebar/Sidebar';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <React.Suspense fallback={null}>
                <GlobalPixelsTracker />
            </React.Suspense>
            <React.Suspense fallback={null}>
                <GoogleAnalyticsTracker />
            </React.Suspense>
            <ScrollToTop />
            <Sidebar/>
            {/* <Navbar /> */}
            {children}
            <Toaster richColors position="top-right" />
            <Footer />
        </Provider>
    );
}