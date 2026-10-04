import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Arrow,
    PaymentApplePayLogo,
    PaymentFawryLogo,
    PaymentInstapayLogo,
    PaymentPaypalLogo,
    PaymentStripeLogo,
    PaymentVisaLogo,
    PaymentWalletLogo,
} from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import type {
    PaymentMethodId,
    PaymentMethodModalProps,
} from '../../../../utils/types/payment-method-modal.types';
import PaymentMethodOption from './PaymentMethodOption';

const DEFAULT_PAYMENT_METHOD: PaymentMethodId = 'creditDebitCard';

const PaymentMethodModal = ({ isOpen, onClose, onBack, onContinue }: PaymentMethodModalProps) => {
    const { t, i18n } = useTranslation('paymentMethodModal');
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(DEFAULT_PAYMENT_METHOD);

    useEffect(() => {
        if (!isOpen) return;
        setSelectedMethod(DEFAULT_PAYMENT_METHOD);
        const bodyOverflow = document.body.style.overflow;
        const htmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = bodyOverflow;
            document.documentElement.style.overflow = htmlOverflow;
        };
    }, [isOpen]);

    const paymentMethods = [
        {
            value: 'creditDebitCard' as const,
            description: t('methods.creditDebitCard'),
            Logo: PaymentVisaLogo,
            logoClassName: 'h-[21.18px] w-[65px]',
        },
        {
            value: 'paypal' as const,
            description: t('methods.paypal'),
            Logo: PaymentPaypalLogo,
            logoClassName: 'h-[17.43px] w-[65px]',
        },
        {
            value: 'stripe' as const,
            description: t('methods.stripe'),
            Logo: PaymentStripeLogo,
            logoClassName: 'h-[27.54px] w-[65px]',
        },
        {
            value: 'applePay' as const,
            description: t('methods.applePay'),
            Logo: PaymentApplePayLogo,
            logoClassName: 'h-[27.58px] w-[65px]',
        },
        {
            value: 'fawry' as const,
            description: t('methods.fawry'),
            Logo: PaymentFawryLogo,
            logoClassName: 'h-[22px] w-[65px]',
        },
        {
            value: 'instapay' as const,
            description: t('methods.instapay'),
            Logo: PaymentInstapayLogo,
            logoClassName: 'h-[25px] w-[65px]',
        },
        {
            value: 'wallet' as const,
            description: t('methods.wallet'),
            Logo: PaymentWalletLogo,
            logoClassName: 'h-[62px] w-[65px]',
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('title')}
            overlayClassName={
                isArabic
                    ? '!overflow-hidden p-3 sm:p-4 lg:pr-[280px]'
                    : '!overflow-hidden p-3 sm:p-4 lg:pl-[280px]'
            }
            className="!h-[calc(100vh-24px)] !max-h-[786px] !w-[calc(100vw-24px)] !max-w-[700px] overflow-hidden rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white shadow-none sm:!h-[calc(100vh-32px)] sm:!w-[calc(100vw-32px)] md:!w-[700px]"
        >
            <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:px-6 md:py-10">
                <div className="flex w-full shrink-0 items-start justify-between gap-4">
                    <div className={`min-w-0 flex-1 ${textAlignment}`}>
                        <h2 className="text-[20px] font-semibold leading-[28px] text-[#12115C] sm:text-[22px]">
                            {t('title')}
                        </h2>
                        <p className="mt-2 text-[13px] font-normal leading-[18px] text-[#615E8B] sm:text-[14px]">
                            {t('subtitle')}
                        </p>
                    </div>
                    <ModalCloseButton ariaLabel={t('close')} onClick={onClose} />
                </div>

                <div
                    role="radiogroup"
                    aria-label={t('title')}
                    className="mt-5 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pr-1 [direction:ltr] [scrollbar-color:#C7CBD4_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] sm:mt-6 md:mt-8 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C7CBD4] hover:[&::-webkit-scrollbar-thumb]:bg-[#AEB4C0]"
                >
                    <div
                        className={`flex w-full flex-col gap-3 pb-1 md:gap-4 ${isArabic ? '[direction:rtl]' : '[direction:ltr]'}`}
                    >
                        {paymentMethods.map(method => (
                            <PaymentMethodOption
                                key={method.value}
                                value={method.value}
                                selected={selectedMethod === method.value}
                                description={method.description}
                                Logo={method.Logo}
                                logoClassName={method.logoClassName}
                                textAlignment={textAlignment}
                                onSelect={setSelectedMethod}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-5 w-full shrink-0 bg-white sm:mt-6 md:mt-8">
                    <div className="flex w-full flex-col-reverse gap-2 sm:h-[44px] sm:flex-row sm:items-center">
                        <ActionButton
                            type="button"
                            onClick={onBack}
                            className="!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !shrink-0 !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !text-[18px] !font-normal !leading-[28px] !text-[#12115C] hover:!bg-[#F4F3FA] hover:!opacity-100 sm:!w-[84px] sm:!min-w-[84px] sm:!flex-none"
                        >
                            {t('back')}
                        </ActionButton>
                        <ActionButton
                            type="button"
                            onClick={() => onContinue(selectedMethod)}
                            trailingIcon={
                                <Arrow
                                    aria-hidden="true"
                                    className={`h-5 w-5 shrink-0 ${isArabic ? 'rotate-180' : ''}`}
                                />
                            }
                            className="!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !min-w-0 !shrink-0 !rounded-[16px] !px-5 !text-[18px] !font-normal !leading-[28px] sm:!flex-1"
                        >
                            {t('continueToPayment')}
                        </ActionButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentMethodModal;
