import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Arrow, SearchBilling } from '@/assets';
import { upcomingPaymentsList } from '../data/upcomingPayments';
import PaymentFlow from './PaymentFlow';
import ProjectFilterDropdown from './ProjectFilterDropdown';

const UpcomingPaymentsTable = () => {
    const { t, i18n } = useTranslation('upcomingPayments');
    const isArabic = i18n.language.startsWith('ar');

    const getProjectName = (project: string) => {
        if (project === 'Company Website Redesign') {
            return t('projectNames.companyWebsiteRedesign');
        }

        return project;
    };

    const getInstallment = (installment: string) => {
        const match = installment.match(/Installment\s+(\d+)\s+of\s+(\d+)/i);

        if (!match) return installment;

        return t('installmentValue', {
            current: match[1],
            total: match[2],
        });
    };

    const getAmount = (amount: string) => {
        const numericAmount = amount.replace(/^EGP\s*/i, '');

        return t('amountValue', {
            amount: numericAmount,
        });
    };

    const getDate = (date: string) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return new Intl.DateTimeFormat(isArabic ? 'ar-EG-u-nu-latn' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(parsedDate);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState('all');
    const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false);

    const projects = [...new Set(upcomingPaymentsList.map(item => getProjectName(item.project)))];

    const filteredData = upcomingPaymentsList.filter(item => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const localizedProject = getProjectName(item.project);
        const localizedInstallment = getInstallment(item.installment);

        const matchesSearch =
            localizedProject.toLowerCase().includes(normalizedSearch) ||
            localizedInstallment.toLowerCase().includes(normalizedSearch);

        const matchesProject = selectedProject === 'all' || localizedProject === selectedProject;

        return matchesSearch && matchesProject;
    });

    const handleOpenPaymentFlow = () => {
        setIsPaymentFlowOpen(true);
    };

    const handleClosePaymentFlow = () => {
        setIsPaymentFlowOpen(false);
    };

    return (
        <>
            <section className="flex w-full flex-col gap-6 rounded-[16px] bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <h2 className="text-[22px] font-semibold leading-[28px] text-[#12115C]">
                        {t('title')}
                    </h2>

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                        <div className="relative w-full sm:w-[280px]">
                            <SearchBilling
                                className={`absolute top-1/2 -translate-y-1/2 ${
                                    isArabic ? 'right-3' : 'left-3'
                                }`}
                            />

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className={`h-[38px] w-full rounded-[12px] border border-[#ECEFF4] bg-white text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF] ${
                                    isArabic ? 'pl-4 pr-9 text-right' : 'pl-9 pr-4 text-left'
                                }`}
                            />
                        </div>

                        <ProjectFilterDropdown
                            value={selectedProject}
                            projects={projects}
                            allProjectsLabel={t('allProjects')}
                            onChange={setSelectedProject}
                        />
                    </div>
                </div>

                <div className="w-full overflow-x-auto rounded-[8px] border border-[#00E5C820] bg-white [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1]">
                    <table className="w-full min-w-[760px] border-collapse sm:min-w-[900px]">
                        <thead>
                            <tr className="h-[48px] border-b border-[#00E5C820] bg-white text-[14px] font-semibold text-[#12115C]">
                                <th
                                    className={`px-6 py-3 ${isArabic ? 'text-right' : 'text-left'}`}
                                >
                                    {t('project')}
                                </th>

                                <th
                                    className={`whitespace-nowrap px-4 py-3 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('installment')}
                                </th>

                                <th
                                    className={`whitespace-nowrap px-4 py-3 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('amount')}
                                </th>

                                <th
                                    className={`whitespace-nowrap px-4 py-3 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('dueDate')}
                                </th>

                                <th
                                    className={`whitespace-nowrap px-4 py-3 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('daysLeftLabel')}
                                </th>

                                <th
                                    className={`whitespace-nowrap px-6 py-3 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {t('pay')}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-[14px]">
                            {filteredData.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b border-[#00E5C815] last:border-none ${
                                        index % 2 === 0 ? 'bg-[#00E5C805]' : 'bg-white'
                                    }`}
                                >
                                    <td className="px-6 py-4 font-semibold text-[#1F2937]">
                                        {getProjectName(row.project)}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-[#8C94A3]">
                                        {getInstallment(row.installment)}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 font-bold text-[#12115C]">
                                        {getAmount(row.amount)}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-[#8C94A3]">
                                        {getDate(row.dueDate)}
                                    </td>

                                    <td className="px-4 py-4 font-semibold">
                                        <span
                                            className={
                                                row.daysLeft <= 3
                                                    ? 'text-[#FF3B30]'
                                                    : 'text-[#1AB24D]'
                                            }
                                        >
                                            {t('dueIn', {
                                                days: row.daysLeft,
                                            })}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={handleOpenPaymentFlow}
                                            className={`inline-flex h-[40px] items-center justify-center gap-2 rounded-full bg-[#0F0C41] px-5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#1A165C] ${
                                                isArabic ? 'flex-row-reverse' : 'flex-row'
                                            }`}
                                        >
                                            <span>{t('payNow')}</span>

                                            <span
                                                className={`flex shrink-0 items-center ${
                                                    isArabic ? 'rotate-180' : ''
                                                }`}
                                            >
                                                <Arrow />
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-[14px] text-[#8C94A3]"
                                    >
                                        {t('noResults')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <PaymentFlow isOpen={isPaymentFlowOpen} onClose={handleClosePaymentFlow} />
        </>
    );
};

export default UpcomingPaymentsTable;
