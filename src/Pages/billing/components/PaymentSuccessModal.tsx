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
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('title')}
            overlayClassName={isArabic ? 'lg:pr-[280px]' : 'lg:pl-[280px]'}
            className="w-[calc(100%-24px)] max-w-[700px] rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white sm:w-[calc(100%-32px)] md:h-[504px] md:w-[700px] md:max-w-none"
        >
            <div className="relative flex w-full flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 md:h-full md:gap-8 md:px-6 md:py-10">
                <div
                    className={`absolute top-6 sm:top-8 md:top-10 ${isArabic ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}
                >
                    <ModalCloseButton ariaLabel={t('close')} onClick={onClose} />
                </div>
                <div className="flex w-full shrink-0 items-center md:h-[18px]">
                    <h2
                        className={`w-full text-[20px] font-semibold leading-7 text-[#12115C] sm:text-[22px] ${textAlignment}`}
                    >
                        {t('title')}
                    </h2>
                </div>
                <div className="flex w-full flex-col items-center gap-8 sm:gap-10 md:h-[298px] md:gap-10">
                    <PaymentSuccess className="h-auto w-[190px] shrink-0 sm:w-[220px] md:h-[240px] md:w-[262px]" />
                    <div className="flex w-full items-center justify-center md:h-[18px]">
                        <p className="text-center text-[18px] font-normal leading-7 text-[#090909] sm:text-[20px] sm:leading-8 md:text-[24px] md:leading-[32px]">
                            {t('message')}
                        </p>
                    </div>
                </div>
                <div className="flex w-full shrink-0 flex-col-reverse gap-2 sm:flex-row sm:items-center">
                    <ActionButton
                        type="button"
                        onClick={onBack}
                        className="!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !shrink-0 !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !text-[18px] !font-normal !leading-7 !text-[#12115C] hover:!bg-[#F4F3FA] hover:!opacity-100 sm:!w-[84px] sm:!min-w-[84px] sm:!flex-none"
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
                        className="!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !shrink-0 !rounded-[16px] !px-5 !text-[18px] !font-normal !leading-7 sm:!min-w-0 sm:!flex-1"
                    >
                        {t('viewReceipt')}
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentSuccessModal;
