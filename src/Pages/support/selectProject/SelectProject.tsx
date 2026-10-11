import type { MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    ModalCloseIcon,
    SelectProjectBackIcon,
    SelectProjectChevronIcon,
    SelectProjectBrandIcon,
    SelectProjectInfoIcon,
    SelectProjectShieldIcon,
    SelectProjectSmartphoneIcon,
} from '@/assets';

interface SelectProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack: () => void;
    onSelectProject: () => void;
    onGeneralInquiry: () => void;
}

export default function SelectProjectModal({
    open,
    onOpenChange,
    onBack,
    onSelectProject,
    onGeneralInquiry,
}: SelectProjectModalProps) {
    const { t, i18n } = useTranslation('SelectProject');

    const navigate = useNavigate();
    const { locale } = useParams();

    const currentLocale = locale || 'en';
    const isArabic = i18n.language.startsWith('ar');
    const textAlign = isArabic ? 'text-right' : 'text-left';

    const handleSupportPlans = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        onOpenChange(false);
        navigate(`/${currentLocale}/support-plans`);
    };

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="select-project-title"
                className="relative w-full max-w-[620px] rounded-[28px] bg-white p-6 shadow-xl sm:p-8"
            >
                <div
                    className={`flex items-center justify-between ${
                        isArabic ? 'flex-row-reverse' : ''
                    }`}
                >
                    <button
                        type="button"
                        onClick={onBack}
                        className={`flex items-center gap-2 text-[15px] font-semibold text-[#12115C] transition-opacity hover:opacity-80 ${
                            isArabic ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <SelectProjectBackIcon
                            className={`h-4 w-4 shrink-0 stroke-[2.5] ${
                                isArabic ? 'rotate-180' : ''
                            }`}
                        />

                        <span>{t('back', 'Back')}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#12115C] text-white transition-opacity hover:opacity-90"
                        aria-label={t('close', 'Close')}
                    >
                        <ModalCloseIcon className="h-4 w-4" />
                    </button>
                </div>

                <div className={`mb-6 mt-6 ${textAlign}`}>
                    <h2
                        id="select-project-title"
                        className="text-[24px] font-bold leading-[30px] text-[#12115C]"
                    >
                        {t('whichProjectDoYouNeedHelpWith', 'Which project do you need help with?')}
                    </h2>

                    <p className="mt-1 text-[14px] font-normal leading-5 text-[#7E8492]">
                        {t(
                            'selectAProjectToContinue',
                            'Select a project to continue with your request.'
                        )}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={onSelectProject}
                        className={`flex w-full items-start justify-between gap-4 rounded-[16px] border border-[#E8E8EE] bg-white p-4 transition hover:border-[#39E1D7] ${
                            isArabic ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <div
                            className={`flex min-w-0 items-center gap-3 ${
                                isArabic ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[9px] bg-[#39E1D7] text-white">
                                <SelectProjectBrandIcon className="h-6 w-6" />
                            </div>

                            <div className={`min-w-0 ${textAlign}`}>
                                <h3 className="text-[15px] font-bold leading-5 text-[#12115C]">
                                    {t(
                                        'brandIdentityVisualDesign',
                                        'Brand Identity & Visual Design'
                                    )}
                                </h3>

                                <p className="mt-[2px] text-[12px] font-normal leading-[18px] text-[#A0A3AD]">
                                    {t('designDigitalExperience', 'Design & Digital Experience')}
                                </p>

                                <div
                                    className={`mt-1 flex items-center gap-1 text-[12px] font-medium text-[#10B981] ${
                                        isArabic ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <SelectProjectShieldIcon className="h-[14px] w-[14px] shrink-0" />

                                    <span>
                                        {t('warrantyActive', 'Warranty Active')}
                                        <span className="mx-1">•</span>
                                        315 {t('daysLeft', 'Days Left')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <span className="shrink-0 rounded-[5px] bg-[#34C7590D] px-3 py-[5px] text-[12px] font-medium text-[#34C759]">
                            {t('completed', 'Completed')}
                        </span>
                    </button>

                    <div
                        className={`flex w-full flex-col justify-between gap-4 rounded-[16px] border border-[#E8E8EE] bg-white p-4 sm:flex-row sm:items-center ${
                            isArabic ? 'sm:flex-row-reverse' : ''
                        }`}
                    >
                        <div
                            className={`flex min-w-0 items-center gap-3 ${
                                isArabic ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[9px] bg-[#13192B] text-white">
                                <SelectProjectSmartphoneIcon className="h-5 w-5" />
                            </div>

                            <div className={`min-w-0 ${textAlign}`}>
                                <h3 className="text-[15px] font-bold leading-5 text-[#12115C]">
                                    {t('mobileApplication', 'Mobile Application')}
                                </h3>

                                <p className="mt-[2px] text-[12px] font-normal leading-[18px] text-[#A0A3AD]">
                                    {t('development', 'Development')}
                                </p>

                                <p className="mt-1 text-[12px] font-medium leading-[18px] text-[#FF3B30]">
                                    {t('warrantyExpired', 'Warranty Expired')}

                                    <span className="mx-1 text-[#A0A3AD]">•</span>

                                    {t('supportUnavailable', 'Support Unavailable')}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`flex shrink-0 flex-col gap-3 ${
                                isArabic ? 'items-start' : 'items-end'
                            }`}
                        >
                            <span className="rounded-[5px] bg-[#F7F6F7] px-3 py-[5px] text-[12px] font-medium text-[#7E8492]">
                                {t('completed', 'Completed')}
                            </span>

                            <button
                                type="button"
                                onClick={handleSupportPlans}
                                className={`flex items-center gap-1 text-[13px] font-bold text-[#FF3B30] hover:underline ${
                                    isArabic ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <span>
                                    {t('explorePaidWarrantyPlans', 'Explore Paid Warranty Plans')}
                                </span>

                                <SelectProjectChevronIcon
                                    className={`h-4 w-4 shrink-0 stroke-[3] ${
                                        isArabic ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`mt-5 flex items-center gap-2 rounded-[12px] bg-[#00E5C810] px-4 py-3 ${
                        isArabic ? 'flex-row-reverse' : ''
                    }`}
                >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <SelectProjectInfoIcon />
                    </div>

                    <p className={`text-[12px] font-medium leading-5 text-[#12115C] ${textAlign}`}>
                        {t('cantFindYourProject', "Can't find your project?")}{' '}
                        <button
                            type="button"
                            onClick={onGeneralInquiry}
                            className="font-bold text-[#3634C7] hover:underline"
                        >
                            {t('createAGeneralInquiryTicket', 'Create a General Inquiry ticket.')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
