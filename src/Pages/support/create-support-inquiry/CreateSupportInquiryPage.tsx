import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateSupportInquiryForm from './components/CreateSupportInquiryForm';

export default function CreateSupportInquiryPage() {
    const { t, i18n } = useTranslation('tickets');
    const [searchParams] = useSearchParams();

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const projectId = searchParams.get('projectId');
    const requestType = searchParams.get('type');
    const isWarrantyRequest = requestType === 'warranty';

    return (
        <section className="mx-auto w-full max-w-[1200px] rounded-[24px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-6 md:p-8 3xl:max-w-[1400px] 3xl:p-10 4xl:max-w-[1600px]">
            <div
                className={`mb-6 border-b border-[#ECEFF4] pb-5 ${textAlignment}`}
            >
                <h1 className="text-[24px] font-semibold leading-[30px] text-[#12115C] 3xl:text-[26px] 4xl:text-[28px]">
                    {t('createModal.title')}
                </h1>

                <p className="mt-2 text-[13px] leading-5 text-[#7E8492] sm:text-[14px] 3xl:text-[15px] 4xl:text-[16px]">
                    {t('createModal.subtitle')}
                </p>
            </div>

            <CreateSupportInquiryForm
                projectId={projectId}
                requestType={requestType}
                showWarrantyNotice={isWarrantyRequest}
            />
        </section>
    );
}