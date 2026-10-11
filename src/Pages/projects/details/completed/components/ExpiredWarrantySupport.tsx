import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExpiredWarrantyIllustration as PulventPro } from '@/assets';
import { ExpiredWarrantyCheckIcon as CheckCircle } from '@/assets';
import { ExpiredWarrantyIcon as UnderWarranty } from '@/assets';
import ProjectSupportSection from './ProjectSupportSection';

export default function ExpiredWarrantySupport() {
    const { t, i18n } = useTranslation('projectDetailsTranslations');
    const { locale = 'en', id } = useParams();

    const isArabic = i18n.language.startsWith('ar');

    const supportOptions = t('supportOptions', {
        returnObjects: true,
        defaultValue: [
            'Warranty or implementation requests',
            'Technical issues',
            'Feature enhancements',
            'Any other project-related inquiries',
        ],
    }) as string[];

    const supportPlansUrl = id
        ? `/${locale}/support-plans?projectId=${id}`
        : `/${locale}/support-plans`;

    return (
        <ProjectSupportSection
            title={t('supportTicketTitle', 'Support Ticket')}
            className="flex flex-col gap-6 border border-slate-100 p-5 shadow-sm sm:p-6 lg:p-8"
        >
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
                <div className="flex w-full items-center justify-center overflow-hidden rounded-xl lg:col-span-4">
                    <PulventPro className="h-auto w-full max-w-full" />{' '}
                </div>

                <div
                    className={`flex flex-col justify-center px-1 py-2 sm:px-2 lg:col-span-4 ${
                        isArabic ? 'items-end text-right' : 'items-start text-left'
                    }`}
                >
                    <h3 className="mb-1 text-[16px] font-bold text-[#1E1B4B]">
                        {t('notSureTitle', 'Not sure what your issue is?')}
                    </h3>

                    <p className="mb-4 text-[12px] text-slate-400">
                        {t('notSureSubtitle', 'You can create a support ticket for:')}
                    </p>

                    <ul className="w-full space-y-3">
                        {supportOptions.map(item => (
                            <li
                                key={item}
                                className={
                                    isArabic
                                        ? 'relative min-h-5 w-full pr-8 text-right text-[14px] font-medium text-slate-700'
                                        : 'flex items-center gap-2.5 text-[14px] font-medium text-slate-700'
                                }
                            >
                                {isArabic ? (
                                    <>
                                        <CheckCircle className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2" />

                                        <span>{item}</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-5 w-5 shrink-0" />

                                        <span>{item}</span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link
                    to={supportPlansUrl}
                    className="flex w-full items-center justify-center overflow-hidden rounded-2xl transition-opacity hover:opacity-90 lg:col-span-4"
                >
                    {isArabic ? (
                        <div className="flex min-h-[218px] w-full flex-col rounded-2xl border border-[#39E1D7] bg-[#F2FEFD] p-5 text-right">
                            <div className="flex w-full items-center justify-end gap-2">
                                <h3 className="text-[18px] font-bold text-[#12115C]">
                                    الضمان ما زال ساريًا
                                </h3>

                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5FAF8] text-[#39E1D7]">
                                    ✓
                                </span>
                            </div>

                            <p className="mt-5 text-[14px] leading-6 text-[#12115C]">
                                يمكنك تقديم تذكرة للحصول على دعم الضمان أو المساعدة المتعلقة
                                بالمشروع.
                            </p>

                            <div className="mt-auto flex min-h-[40px] w-full items-center justify-center rounded-[10px] bg-[#12115C] px-3 py-2 text-[14px] text-white">
                                <span className="whitespace-nowrap">طلب خطط الضمان المدفوعة</span>
                            </div>
                        </div>
                    ) : (
                        <UnderWarranty className="h-auto w-full max-w-full" />
                    )}
                </Link>
            </div>
        </ProjectSupportSection>
    );
}
