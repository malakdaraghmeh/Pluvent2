import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Arrow, SearchBilling } from '@/assets';
import { upcomingPaymentsList } from '../data/upcomingPayments';
import PaymentFlow from './PaymentFlow';
import ProjectFilterDropdown from './ProjectFilterDropdown';

const UpcomingPaymentsTable = () => {
    const { t, i18n } = useTranslation('upcomingPayments');
    const isArabic = i18n.language.startsWith('ar');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState('all');
    const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false);

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

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return new Intl.DateTimeFormat(isArabic ? 'ar-EG-u-nu-latn' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(parsedDate);
    };

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

    const alignmentClass = isArabic ? 'text-right' : 'text-left';

    return (
        <>
            <section className="flex w-full min-w-0 flex-col gap-6 rounded-[16px] bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <h2 className="text-[22px] font-semibold leading-[28px] text-[#12115C]">
                        {t('title')}
                    </h2>

                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                        <div
                            className={`flex h-[38px] w-full items-center gap-2 rounded-[12px] border border-[#ECEFF4] bg-white px-3 sm:w-[280px] ${
                                isArabic ? 'flex-row-reverse' : 'flex-row'
                            }`}
                        >
                            <SearchBilling className="h-4 w-4 shrink-0 text-[#9CA3AF]" />

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className={`min-w-0 flex-1 bg-transparent p-0 text-[14px] leading-none text-[#111827] outline-none placeholder:text-[#9CA3AF] ${
                                    isArabic ? 'text-right' : 'text-left'
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

                <div className="w-full min-w-0 overflow-x-auto rounded-[8px] border border-[#00E5C820] bg-white [scrollbar-color:#CBD5E1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1]">
                    <table className="w-full min-w-[1180px] table-fixed border-collapse">
                        <colgroup>
                            <col className="w-[19%]" />
                            <col className="w-[18%]" />
                            <col className="w-[17%]" />
                            <col className="w-[15%]" />
                            <col className="w-[17%]" />
                            <col className="w-[14%]" />
                        </colgroup>

                        <thead>
                            <tr className="h-[48px] border-b border-[#00E5C820] bg-white text-[14px] font-semibold text-[#12115C]">
                                <th className={`px-5 py-3 ${alignmentClass}`}>{t('project')}</th>

                                <th className={`whitespace-nowrap px-5 py-3 ${alignmentClass}`}>
                                    {t('installment')}
                                </th>

                                <th className={`whitespace-nowrap px-5 py-3 ${alignmentClass}`}>
                                    {t('amount')}
                                </th>

                                <th className={`whitespace-nowrap px-5 py-3 ${alignmentClass}`}>
                                    {t('dueDate')}
                                </th>

                                <th
                                    className={`whitespace-nowrap py-3 pl-4 pr-10 ${alignmentClass}`}
                                >
                                    {t('daysLeftLabel')}
                                </th>

                                <th className="whitespace-nowrap px-4 py-3 text-right">
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
                                    <td
                                        className={`px-5 py-4 text-[14px] font-semibold leading-[20px] text-[#1F2937] ${alignmentClass}`}
                                    >
                                        {getProjectName(row.project)}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-5 py-4 text-[#8C94A3] ${alignmentClass}`}
                                    >
                                        {getInstallment(row.installment)}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-5 py-4 font-bold text-[#12115C] ${alignmentClass}`}
                                    >
                                        {getAmount(row.amount)}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap px-5 py-4 text-[#8C94A3] ${alignmentClass}`}
                                    >
                                        {getDate(row.dueDate)}
                                    </td>

                                    <td
                                        className={`whitespace-nowrap py-4 pl-4 pr-10 font-semibold ${alignmentClass}`}
                                    >
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

                                    <td className="whitespace-nowrap px-4 py-4">
                                        <div className="flex w-full justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setIsPaymentFlowOpen(true)}
                                                className={`inline-flex h-[40px] items-center justify-center gap-2 rounded-full bg-[#0F0C41] px-4 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#1A165C] ${
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
                                        </div>
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

            <PaymentFlow isOpen={isPaymentFlowOpen} onClose={() => setIsPaymentFlowOpen(false)} />
        </>
    );
};

export default UpcomingPaymentsTable;
