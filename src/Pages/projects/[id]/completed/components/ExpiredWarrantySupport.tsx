import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PulvetPro from '@icons/rafiki.svg?react';
import CheckCircle from '@icons/checkmark-container.svg?react';
import UnderWarranty from '@icons/underWarranty.svg?react';

export default function ExpiredWarrantySupport() {
    const { t } = useTranslation('projectDetailsTranslations');
    const { locale = 'en' } = useParams();

    const supportOptions = t('supportOptions', {
        returnObjects: true,
        defaultValue: [
            'Warranty or implementation requests',
            'Technical issues',
            'Feature enhancements',
            'Any other project-related inquiries',
        ],
    }) as string[];

    return (
        <section className="w-full rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <h2 className="mb-6 text-[20px] font-bold text-[#1E1B4B]">
                {t('supportTicketTitle', 'Support Ticket')}
            </h2>

            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
                <div className="flex w-full items-center justify-center overflow-hidden rounded-xl lg:col-span-4">
                    <PulvetPro className="h-auto w-full max-w-full" />
                </div>

                <div className="flex flex-col justify-center px-1 py-2 sm:px-2 lg:col-span-4">
                    <h3 className="mb-1 text-[16px] font-bold text-[#1E1B4B]">
                        {t('notSureTitle', 'Not sure what your issue is?')}
                    </h3>

                    <p className="mb-4 text-[12px] text-slate-400">
                        {t('notSureSubtitle', 'You can create a support ticket for:')}
                    </p>

                    <ul className="space-y-3">
                        {supportOptions.map(item => (
                            <li
                                key={item}
                                className="flex items-center gap-2.5 text-[14px] font-medium text-slate-700"
                            >
                                <CheckCircle className="h-5 w-5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link
                    to={`/${locale}/support-plans`}
                    className="flex w-full items-center justify-center overflow-hidden rounded-2xl transition-opacity hover:opacity-90 lg:col-span-4"
                >
                    <UnderWarranty className="h-auto w-full max-w-full" />
                </Link>
            </div>
        </section>
    );
}