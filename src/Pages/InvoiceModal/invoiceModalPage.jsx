/* eslint-disable react/prop-types */

import React from 'react';
import { Download, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LogoIcon from '@icons/logo png 2.svg?react';
import Pulvetlogo from '@icons/pulvetlogo.svg?react';

export default function InvoiceModal({ isOpen = true, onClose }) {
    const { t, i18n } = useTranslation('invoice');

    if (!isOpen) return null;

    const currentLang = i18n.language || 'ar';
    const isRtl = i18n.dir ? i18n.dir() === 'rtl' : currentLang === 'ar';

    const toggleLanguage = () => {
        const nextLang = currentLang === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(nextLang);
    };

    const handleDownloadPdf = () => {
        alert(`${t('downloading')} PDF...`);
    };

    // Safely retrieve items array from i18n
    const items = t('items', { returnObjects: true }) || [];

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
                {/* Language Switcher & Close Controls (Top Bar) */}
                <div className="absolute top-5 right-5 left-5 flex justify-between items-center z-10 pointer-events-auto">
                   

                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Header Logo (Pulvent Branding) */}
                <div className="flex flex-col items-center justify-center mt-2 p-4 sm:p-6 bg-[#F6F8FC]">
                  <div className="flex items-center gap-2.5">
                    {/* Set height directly on the SVG or its container so width scales proportionally */}
                    <Pulvetlogo className="h-7 sm:h-9 w-auto" />
                  </div>
                </div>

                {/* Dark Banner Box */}
                <div className="bg-[#12115C] text-white rounded-lg p-4 sm:p-6 mb-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Invoice To */}
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-bold">
                            {t('invoiceTo', 'INVOICE TO:')}
                        </p>
                        <h3 className="text-base font-bold text-white tracking-wide">
                            {t('client.name', 'Ahmed Hassan')}
                        </h3>
                        <p className="text-[11px] font-light" dir="ltr">
                            {t('client.phone', '(612) 856 - 0989')}
                        </p>
                        <p className="text-[11px] font-light leading-snug">
                            {t('client.address', 'Egypt - Cairo 72Stret\nNasir City')}
                        </p>
                    </div>

                    {/* Amount Due White Card */}
                    <div className={`bg-white rounded-lg p-4 shadow-sm w-full sm:w-auto sm:min-w-[210px] ${isRtl ? 'text-left' : 'text-right'}`}>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t('amountDue', 'AMOUNT DUE')}
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-[#00C4A0] my-0.5" dir="ltr">
                            {t('amountDueValue', 'EGP 19,570.00')}
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1">
                            <span>{t('vatNumber', 'VAT:1000')}</span>
                            <span>{t('dateDueHeader', 'July 26, 2026')}</span>
                        </div>
                    </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 py-3 px-2 border-b border-slate-100 text-center mb-5 bg-[#F6F8FC]">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t('invoiceIdLabel', 'INVOICE ID')}
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-1">
                            {t('invoiceIdValue', 'Nº: 000027')}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t('issuedDateLabel', 'ISSUED:')}
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-1">
                            {t('issuedDateValue', 'June 26, 2024')}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t('dueDateLabel', 'DUE DATE:')}
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-1">
                            {t('dueDateValue', 'July 26, 2024')}
                        </p>
                    </div>
                </div>

                {/* Line Items Table */}
                <div className="flex-1 mb-6 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-4 pb-1">
                        <span>{t('description', 'DESCRIPTION')}</span>
                        <span>{t('total', 'TOTAL')}</span>
                    </div>

                    <div className="space-y-2">
                        {Array.isArray(items) && items.length > 0 ? (
                            items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-3.5 px-4 bg-slate-50/70 rounded-xl hover:bg-slate-100/70 transition-colors"
                                >
                                    <span className="text-xs font-semibold text-slate-700">
                                        {item.description}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900" dir="ltr">
                                        {item.total}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="flex justify-between items-center py-3.5 px-4 bg-[#F6F8FC] rounded-lg">
                                    <span className="text-xs font-semibold text-slate-700">
                                        Ui Ux deigne
                                    </span>
                                    <span className="text-xs font-bold text-slate-900" dir="ltr">
                                        $ 5,250.00
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3.5 px-4  rounded-lg">
                                    <span className="text-xs font-semibold text-slate-700">
                                        Web design
                                    </span>
                                    <span className="text-xs font-bold text-slate-900" dir="ltr">
                                        $ 5,250.00
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3.5 px-4 bg-[#F6F8FC] rounded-lg">
                                    <span className="text-xs font-semibold text-slate-700">
                                        Testing
                                    </span>
                                    <span className="text-xs font-bold text-slate-900" dir="ltr">
                                        $ 5,250.00
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Total Summary Row */}

          <div className='flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4'>
              <button
                            type="button"
                            onClick={handleDownloadPdf}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700  "
                        >
                            <Download className="w-4 h-4" />
                            <span>{t('downloadPdf', 'PDF')}</span>
                        </button>
        
                <div className={`mb-4 sm:mb-8 w-full sm:w-auto ${isRtl ? 'text-left' : 'text-right'}`}>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {t('totalAmountLabel', 'TOTAL AMOUNT:')}
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-[#00C4A0] my-0.5" dir="ltr">
                        {t('totalAmountValue', '$19,570.00')}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        {t('totalVat', 'TOTAL VAT:1000')}
                    </p>
                </div>  </div>

                {/* Footer Section */}
                <div className="flex items-end justify-between pt-4 ">
                    <div className="space-y-4">
                      

                        <div className="text-[10px] text-slate-400 leading-normal">
                            <p className="font-semibold text-slate-500">
                                {t('agencyName', 'Pulvent Agency')}
                            </p>
                            <p>{t('agencyWebsite', 'www.Pulvent.com')}</p>
                            <p dir="ltr" className={isRtl ? 'text-right' : 'text-left'}>
                                {t('agencyContact', 'contact@Pulvent.com / (884) 879 - 0102')}
                            </p>
                        </div>
                    </div>

                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                        <LogoIcon className="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}