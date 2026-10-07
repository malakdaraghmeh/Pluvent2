import { useTranslation } from 'react-i18next';
import { Arrow, PaymentSuccess } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import type { PaymentSuccessModalProps } from '../../../../utils/types/billing.types';

const PaymentSuccessModal = ({
    isOpen,
    onClose,
    onBack,
    onViewReceipt,
}: PaymentSuccessModalProps) => {
    const { t, i18n } = useTranslation('paymentSuccessModal');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('title')}
            overlayClassName="lg:ml-[280px]"
            className="w-[calc(100%-24px)] max-w-[700px] rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white sm:w-[calc(100%-32px)] md:h-[504px] md:w-[700px]"
        >
            <div className="flex h-full w-full flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-6 md:py-10">
                <div className="relative flex w-full shrink-0 items-center justify-center">
                    <h2 className="w-full px-12 text-center text-[22px] font-semibold leading-7 text-[#12115C]">
                        {t('title')}
                    </h2>

                    <ModalCloseButton
                        ariaLabel={t('close')}
                        onClick={onClose}
                        className={`absolute top-0 ${
                            isArabic ? '!left-0 !right-auto' : '!right-0 !left-auto'
                        }`}
                    />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center">
                    <PaymentSuccess
                        aria-hidden="true"
                        className="h-auto w-[220px] sm:w-[240px] md:w-[262px]"
                    />

                    <p className="mt-5 w-full text-center text-[20px] font-normal leading-8 text-[#08040B] sm:text-[22px] md:text-[24px]">
                        {t('message')}
                    </p>
                </div>

                <div className="flex w-full shrink-0 flex-col-reverse gap-2 sm:flex-row">
                    <ActionButton
                        type="button"
                        onClick={onBack}
                        className="!h-11 !min-h-0 !w-full !min-w-0 !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !text-[18px] !font-normal !leading-7 !text-[#12115C] hover:!bg-[#F4F3FA] hover:!opacity-100 sm:!w-[84px] sm:!min-w-[84px] sm:!flex-none"
                    >
                        {t('back')}
                    </ActionButton>

                    <ActionButton
                        type="button"
                        onClick={onViewReceipt}
                        trailingIcon={
                            <Arrow
                                aria-hidden="true"
                                className={`h-5 w-5 shrink-0 ${isArabic ? 'rotate-180' : ''}`}
                            />
                        }
                        className={`!h-11 !min-h-0 !min-w-0 !flex-1 !justify-center !rounded-[16px] !px-5 !text-[18px] !font-normal !leading-7 ${
                            isArabic ? '!flex-row-reverse' : ''
                        }`}
                    >
                        {t('viewReceipt')}
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentSuccessModal;
