import PageHeader from '@/components/ui/PageHeader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SupportInquiryInfoSvgIcon as InfoIcon } from '@/assets';
import CreateSupportInquiryForm from './components/CreateSupportInquiryForm';
import SupportTicketConfirmModal from '../components/SupportTicketConfirmModal';

export default function CreateSupportInquiryPage() {
    const { t, i18n } = useTranslation('tickets');

    const navigate = useNavigate();
    const { locale } = useParams();
    const [searchParams] = useSearchParams();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const currentLocale = locale || 'en';

    const isArabic = i18n.language.startsWith('ar');

    const requestType = searchParams.get('type') === 'general' ? 'general' : 'project';

    const isGeneral = requestType === 'general';

    const projectId = searchParams.get('projectId') || undefined;

    const showWarrantyNotice =
        requestType === 'project' && searchParams.get('warranty') === 'active';

    const handleSubmitRequest = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSubmit = () => {
        setIsConfirmModalOpen(false);

        navigate(`/${currentLocale}/support`);
    };

    return (
        <>
            <main className="custom-container flex min-h-screen w-full min-w-0 flex-col gap-5 pb-8">
                <PageHeader
                    title={
                        isGeneral
                            ? t('createModal.generalTitle')
                            : t('createModal.title')
                    }
                    description={
                        isGeneral
                            ? t('createModal.generalSubtitle')
                            : t('createModal.subtitle')
                    }
                    titleClassName="3xl:!text-[28px] 3xl:!leading-[34px] 4xl:!text-[32px] 4xl:!leading-[38px]"
                    descriptionClassName="3xl:!text-[14px] 3xl:!leading-5 4xl:!text-[16px]"
                />

                <section className="flex w-full min-w-0 flex-col gap-5 rounded-[24px] bg-white p-4 sm:p-5 lg:p-8 3xl:gap-6 3xl:p-10 4xl:gap-8 4xl:p-12">
                    {isGeneral && (
                        <div className="flex w-full items-center justify-between gap-4 rounded-[12px] bg-[#EEF2FF] px-4 py-3 3xl:px-5 3xl:py-4 4xl:px-6">
                            <div
                                className={`min-w-0 flex-1 ${
                                    isArabic ? 'text-right' : 'text-left'
                                }`}
                            >
                                <p className="text-[13px] font-bold leading-5 text-[#12115C] 3xl:text-[14px] 4xl:text-[16px]">
                                    {t('createModal.generalNotice')}
                                </p>
                            </div>

                            <div className="flex h-5 w-5 shrink-0 items-center justify-center 3xl:h-6 3xl:w-6">
                                <InfoIcon className="h-full w-full" />
                            </div>
                        </div>
                    )}

                    <CreateSupportInquiryForm
                        projectId={projectId}
                        requestType={requestType}
                        showWarrantyNotice={showWarrantyNotice}
                        onSubmitted={handleSubmitRequest}
                    />
                </section>
            </main>

            <SupportTicketConfirmModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmSubmit}
            />
        </>
    );
}
