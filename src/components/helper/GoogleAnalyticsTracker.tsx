'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GoogleAnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // Mock Data
    const analyticsData = {
        data: {
            enabled: true, // or false if you want it disabled by default
            measurement_id: 'G-XXXXXXXXXX', // Fake measurement ID
        }
    };

    // Extract GA settings
    const isEnabled = analyticsData?.data?.enabled;
    const gaMeasurementId = analyticsData?.data?.measurement_id;

    // Track page views on route changes
    useEffect(() => {
        if (isEnabled && gaMeasurementId && typeof window !== 'undefined') {
            const win = window as any;
            if (typeof win.gtag === 'function') {
                const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
                win.gtag('config', gaMeasurementId, {
                    page_path: url,
                });
            }
        }
    }, [pathname, searchParams, gaMeasurementId, isEnabled]);

    if (!isEnabled || !gaMeasurementId) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gaMeasurementId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
