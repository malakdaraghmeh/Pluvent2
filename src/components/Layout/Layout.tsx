import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { ChatDecorationIcon, ChatIcon } from '@/assets';
import AskAi from '@/Pages/askAi/AskAi';
import Sidebar from './sidebar/Sidebar';
import TopBar from './topBar/TopBar';
const Layout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isAskAiOpen, setIsAskAiOpen] = useState(false);
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation('supportTickets');
    const isArabic = i18n.language.startsWith('ar');
    const pathWithoutLocale = pathname.replace(/^\/[^/]+/, '');
    const isSupportPlansPage = pathWithoutLocale === '/support-plans';
    useEffect(() => {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = isArabic ? 'ar' : 'en';
    }, [isArabic]);
    return (
        <div className={`flex min-h-screen w-full min-w-0 overflow-x-clip bg-[#F4F6FA] ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isSupportPlansPage && <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />}
            <div className={isSupportPlansPage ? 'flex min-w-0 flex-1 flex-col gap-4 px-4 py-4 sm:px-6 lg:gap-5 lg:px-8' : `flex min-w-0 flex-1 flex-col gap-4 p-3 sm:gap-5 sm:p-4 lg:gap-6 ${isArabic ? 'lg:pl-8 lg:pr-4' : 'lg:pl-4 lg:pr-8'}`}>
                <div className="sticky top-0 z-40 bg-[#F4F6FA]">
                    <TopBar onMobileMenu={() => setIsMobileSidebarOpen(true)} />
                </div>
                <main className="w-full min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
            {(
                <button type="button" onClick={() => setIsAskAiOpen(true)} aria-label={t('chat')} className={`fixed bottom-6 z-40 h-[65px] w-[77px] cursor-pointer border-0 bg-transparent p-0 max-sm:bottom-3 ${isArabic ? 'left-6 right-auto max-sm:left-3 max-sm:right-auto' : 'right-6 max-sm:right-3'}`}>
                    <ChatDecorationIcon className="pointer-events-none absolute right-[-2px] top-0 z-0 h-8 w-8" />
                    <span className="absolute bottom-0 right-0 z-10 flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full bg-[#12115C] shadow-[0_4px_12px_rgba(18,17,92,0.25)]">
                        <ChatIcon className="h-8 w-8 shrink-0 fill-white text-white" />
                        <span className="-mt-1 text-[10px] font-semibold leading-none text-white">{t('chat')}</span>
                    </span>
                </button>
            )}
            <AskAi isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} />
        </div>
    );
};
export default Layout;