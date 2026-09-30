/* eslint-disable react/prop-types */

import React from 'react';
import { useTranslation } from 'react-i18next';

import InvoiceTopBar from './Components/InvoiceTopBar';
import InvoiceHeaderLogo from './Components/InvoiceHeaderLogo';
import InvoiceBanner from './Components/InvoiceBanner';
import InvoiceMetadata from './Components/InvoiceMetadata';
import InvoiceItemsTable from './Components/InvoiceItemsTable';
import InvoiceTotalSummary from './Components/InvoiceTotalSummary';
import InvoiceFooter from './Components/InvoiceFooter';

export default function InvoiceModal({ isOpen = true, onClose }) {
    const { t, i18n } = useTranslation('invoice');

    if (!isOpen) return null;

    const currentLang = i18n.language || 'en';
    const isRtl = i18n.dir ? i18n.dir() === 'rtl' : currentLang === 'ar';

    const handleDownloadPdf = () => {
        alert(`${t('downloading')} PDF...`);
    };

    return (
        <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/40 backdrop-blur-sm transition-all"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={e => e.stopPropagation()}
                className="relative my-auto w-full max-w-[620px] max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-2xl sm:rounded-[32px] p-4 sm:p-8 sm:p-10 shadow-2xl flex flex-col justify-between font-sans text-slate-800 transition-all"
            >
                <InvoiceTopBar onClose={onClose} isRtl={isRtl} />
                <InvoiceHeaderLogo />
                <InvoiceBanner isRtl={isRtl} />
                <InvoiceMetadata />
                <InvoiceItemsTable />
                <InvoiceTotalSummary onDownloadPdf={handleDownloadPdf} isRtl={isRtl} />
                <InvoiceFooter isRtl={isRtl} />
            </div>
        </div>
    );
}