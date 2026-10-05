import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import type { CreateSupportInquiryModalProps } from '../../../../../utils/types/create-support-inquiry.types';
import CreateSupportInquiryForm from './CreateSupportInquiryForm';

export default function CreateSupportInquiryModal({
    isOpen,
    onClose,
}: CreateSupportInquiryModalProps) {
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('createModal.title')}
            overlayClassName="lg:ml-[280px]"
            className="max-h-[calc(100vh-32px)] w-[calc(100%-24px)] max-w-[900px] overflow-y-auto rounded-[24px] bg-white sm:w-[calc(100%-40px)] 3xl:max-w-[1100px] 4xl:max-w-[1280px]"
        >
            <div className="flex w-full flex-col gap-6 p-5 sm:p-6 md:p-8 3xl:gap-8 3xl:p-10 4xl:gap-10 4xl:p-12">
                <div
                    className={`flex w-full items-start justify-between gap-4 border-b border-[#ECEFF4] pb-5 ${textAlignment}`}
                >
                    <div className="min-w-0 flex-1">
                        <h2 className="text-[24px] font-semibold leading-[30px] text-[#12115C] 3xl:text-[26px] 4xl:text-[28px]">
                            {t('createModal.title')}
                        </h2>

                        <p className="mt-2 text-[13px] leading-5 text-[#7E8492] sm:text-[14px]">
                            {t('createModal.subtitle')}
                        </p>
                    </div>

                    <ModalCloseButton
                        onClick={onClose}
                        ariaLabel={t('createModal.close')}
                    />
                </div>

                <CreateSupportInquiryForm
                    showWarrantyNotice
                    onSubmitted={onClose}
                />
            </div>
        </Modal>
    );
}