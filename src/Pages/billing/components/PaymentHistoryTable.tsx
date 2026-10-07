import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Apple, DownloadBilling, Instapay, Paypal, SearchBilling, Visa } from '@/assets';
import InvoiceModal from '@/Pages/billing/components/InvoiceModal';
import type { PaymentHistoryItem } from '../../../../utils/types/billing.types';
import { paymentHistoryList } from '../data/paymentHistory';

const ALL_PROJECTS = 'all';
const WEBSITE_REDESIGN = 'Company Website Redesign';

const PaymentMethodBadge = ({ item }: { item: PaymentHistoryItem }) => {
    switch (item.methodType) {
        case 'visa':
            return (
                <div className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium text-[#12115C]">
                    <Visa className="h-auto shrink-0" />
                    <span className="[direction:ltr] [unicode-bidi:isolate]">
                        {item.methodText}
                    </span>
                </div>
            );

        case 'paypal':
            return (
                <div className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#0088FF]">
                    <Paypal className="h-auto shrink-0" />
                    <span className="[direction:ltr] [unicode-bidi:isolate]">
                        {item.methodText}
                    </span>
                </div>
            );

        case 'applepay':
            return (
                <div className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#111827]">
                    <Apple className="h-auto shrink-0" />
                    <span className="[direction:ltr] [unicode-bidi:isolate]">
                        {item.methodText}
                    </span>
                </div>
            );

        case 'instapay':
            return (
                <div className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium">
                    <Instapay className="h-auto shrink-0" />
                    <span className="[direction:ltr] [unicode-bidi:isolate] text-[#4B5563]">
                        {item.methodText}
                    </span>
                </div>
            );

        default:
            return (
                <span className="whitespace-nowrap text-[13px] text-[#4B5563]">
                    {item.methodText}
                </span>
            );
    }
};

export default function PaymentHistoryTable() {
    const { t, i18n } = useTranslation('paymentHistory');
    const { t: paymentsT } = useTranslation('upcomingPayments');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(ALL_PROJECTS);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    const isRtl = i18n.language.startsWith('ar');

    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    const getProjectName = (project: string) => {
        if (project === WEBSITE_REDESIGN) {
            return paymentsT('projectNames.companyWebsiteRedesign');
        }

        return project;
    };

    const getAmount = (amount: string) => {
        const numericAmount = amount.replace(/^EGP\s*/i, '');

        return paymentsT('amountValue', {
            amount: numericAmount,
        });
    };

    const getDate = (date: string) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return new Intl.DateTimeFormat(isRtl ? 'ar-EG-u-nu-latn' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(parsedDate);
    };

    const filteredData = paymentHistoryList.filter(item => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        const localizedProject = getProjectName(item.project);

        const matchesSearch =
            localizedProject.toLowerCase().includes(normalizedSearch) ||
            item.invoice.toLowerCase().includes(normalizedSearch);

        const matchesFilter = selectedProject === ALL_PROJECTS || item.project === selectedProject;

        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <div className="flex w-full min-w-0 flex-col gap-6 rounded-[16px] bg-white p-4 shadow-sm sm:p-6">
                <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h2 className={`text-[22px] font-semibold text-[#12115C] ${alignmentClass}`}>
                        {t('title')}
                    </h2>

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                        <div className="relative w-full sm:min-w-[280px] lg:w-[320px] 3xl:w-[360px] 4xl:w-[400px]">
                            <SearchBilling
                                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF] ${
                                    isRtl ? 'right-3' : 'left-3'
                                }`}
                            />

                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                className={`h-[38px] w-full rounded-[12px] border border-[#ECEFF4] bg-white text-[14px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none ${
                                    isRtl ? 'pl-4 pr-9 text-right' : 'pl-9 pr-4 text-left'
                                }`}
                            />
                        </div>

                        <div className="w-full shrink-0 sm:w-[170px] 3xl:w-[190px] 4xl:w-[210px]">
                            <select
                                value={selectedProject}
                                onChange={event => setSelectedProject(event.target.value)}
                                className={`h-[38px] w-full rounded-[12px] border border-[#ECEFF4] bg-white px-4 text-[14px] font-semibold text-[#12115C] focus:outline-none ${alignmentClass}`}
                            >
                                <option value={ALL_PROJECTS}>{t('allProjects')}</option>

                                <option value={WEBSITE_REDESIGN}>
                                    {paymentsT('projectNames.companyWebsiteRedesign')}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full min-w-0 overflow-x-auto rounded-[8px] border border-[#00E5C820] [scrollbar-color:#CBD5E1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1]">
                    <table style={isRtl ? { minWidth: '1180px', tableLayout: 'auto' } : undefined} className="w-full min-w-[820px] table-fixed lg:min-w-[900px] xl:min-w-full border-collapse xl:min-w-full">
                        <colgroup>
                            <col className="w-[18%]" />
                            <col className="w-[26%]" />
                            <col className="w-[18%]" />
                            <col className="w-[18%]" />
                            <col className="w-[14%]" />
                            <col className="w-[6%]" />
                        </colgroup>

                        <thead>
                            <tr className="h-[48px] border-b border-[#00E5C820] text-[14px] font-semibold text-[#12115C]">
                                <th className={`whitespace-nowrap px-3 sm:px-4 ${alignmentClass}`}>
                                    {t('invoice')}
                                </th>

                                <th className={`whitespace-nowrap px-3 sm:px-4 ${alignmentClass}`}>
                                    {t('project')}
                                </th>

                                <th className={`whitespace-nowrap px-3 sm:px-4 ${alignmentClass}`}>
                                    {t('amount')}
                                </th>

                                <th className={`whitespace-nowrap px-3 sm:px-4 ${alignmentClass}`}>
                                    {t('method')}
                                </th>

                                <th className={`whitespace-nowrap px-3 sm:px-4 ${alignmentClass}`}>
                                    {t('date')}
                                </th>

                                <th className="w-[60px] px-2 sm:w-[70px] sm:px-3" />
                            </tr>
                        </thead>

                        <tbody className="text-[14px]">
                            {filteredData.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`h-[62px] border-b border-[#00E5C815] last:border-none ${
                                        index % 2 === 0 ? 'bg-[#00E5C805]' : 'bg-white'
                                    }`}
                                >
                                    <td
                                        className={`whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 font-semibold text-[#12115C] ${alignmentClass}`}
                                    >
                                        {row.invoice}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 font-semibold text-[#1F2937] ${alignmentClass}`}
                                    >
                                        {getProjectName(row.project)}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 font-bold text-[#12115C] ${alignmentClass}`}
                                    >
                                        {getAmount(row.amount)}
                                    </td>

                                    <td className={`whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 ${alignmentClass}`}>
                                        <div
                                            className={`flex ${
                                                isRtl ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <PaymentMethodBadge item={row} />
                                        </div>
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 text-[#4B5563] ${alignmentClass}`}
                                    >
                                        {getDate(row.date)}
                                    </td>

                                    <td className="whitespace-nowrap px-3 sm:px-3 py-4 sm:px-4 text-center">
                                        <button
                                            type="button"
                                            title={t('downloadInvoice')}
                                            aria-label={t('downloadInvoice')}
                                            onClick={() => setIsInvoiceOpen(true)}
                                            className="inline-flex items-center justify-center rounded-lg p-1.5 text-[#12115C] transition-colors hover:text-[#00E5C8]"
                                        >
                                            <DownloadBilling className="h-5 w-5 shrink-0" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-[#8C94A3]">
                                        {t('noResults')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <InvoiceModal isOpen={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} />
        </>
    );
}
