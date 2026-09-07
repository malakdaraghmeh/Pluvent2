'use client';

import React, { useEffect, useMemo } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GlobalPixelsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pixelIds = useMemo(() => ({
        facebook: '1234567890',
        instagram: '1234567890',
        tiktok: '1234567890',
        x: '1234567890',
    }), []);

    useEffect(() => {
        if (!pixelIds) return;
        const timer = setTimeout(() => {
            const win = window as any;

            if ((pixelIds.facebook || pixelIds.instagram) && typeof win.fbq === 'function') {
                win.fbq('track', 'PageView');
            }

            if (pixelIds.tiktok && typeof win.ttq === 'object' && typeof win.ttq.page === 'function') {
                win.ttq.page();
            }

            if (pixelIds.x && typeof win.twq === 'function') {
                win.twq('track', 'PageView');
            }

        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams, pixelIds]);

    if (!pixelIds) return null;

    return (
        <>
            {/* Facebook / Instagram Pixel (Meta) */}
            {(pixelIds.facebook || pixelIds.instagram) && (
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        
                        ${pixelIds.facebook ? `fbq('init', '${pixelIds.facebook}');` : ''}
                        ${pixelIds.instagram && pixelIds.instagram !== pixelIds.facebook ? `fbq('init', '${pixelIds.instagram}');` : ''}
                    `}
                </Script>
            )}

            {/* TikTok Pixel */}
            {pixelIds.tiktok && (
                <Script id="tiktok-pixel" strategy="afterInteractive">
                    {`
                        !function (w, d, t) {
                          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                          ttq.load('${pixelIds.tiktok}');
                        }(window, document, 'ttq');
                    `}
                </Script>
            )}

            {/* Twitter / X Pixel */}
            {pixelIds.x && (
                <Script id="twitter-pixel" strategy="afterInteractive">
                    {`
                        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                        twq('config','${pixelIds.x}');
                    `}
                </Script>
            )}
        </>
    );
}
