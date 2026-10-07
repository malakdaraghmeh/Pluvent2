import { useTranslation } from 'react-i18next';

import {
    Arrow,
    PaymentDetailsAmountIcon,
    PaymentDetailsDescriptionIcon,
    PaymentDetailsDueDateIcon,
    PaymentDetailsIssuedDateIcon,
    PaymentDetailsPaymentTypeIcon,
    PaymentDetailsProjectIcon,
    PaymentDetailsReferenceIcon,
} from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';

import type { PaymentDetailsModalProps } from '../../../../utils/types/payment-details-modal.types';

export default function PaymentDetailsModal({
    isOpen,
    onClose,
    onBack,
    onContinue,
}: PaymentDetailsModalProps) {
    const { t, i18n } = useTranslation('paymentDetails');
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const paymentDetails = [
        {
            id: 'project',
            label: t('projectLabel'),
            value: t('projectName'),
            Icon: PaymentDetailsProjectIcon,
            isAmount: false,
        },
        {
            id: 'issued-date',
            label: t('issuedDateLabel'),
            value: t('issuedDateValue'),
            Icon: PaymentDetailsIssuedDateIcon,
            isAmount: false,
        },
        {
            id: 'payment-type',
            label: t('paymentTypeLabel'),
            value: t('paymentTypeValue'),
            Icon: PaymentDetailsPaymentTypeIcon,
            isAmount: false,
        },
        {
            id: 'due-date',
            label: t('dueDateLabel'),
            value: t('dueDateValue'),
            Icon: PaymentDetailsDueDateIcon,
            isAmount: false,
        },
        {
            id: 'amount-due',
            label: t('amountDueLabel'),
            value: t('amountDueValue'),
            Icon: PaymentDetailsAmountIcon,
            isAmount: true,
        },
        {
            id: 'reference',
            label: t('referenceLabel'),
            value: t('referenceValue'),
            Icon: PaymentDetailsReferenceIcon,
            isAmount: false,
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('title')}
            overlayClassName="p-3 sm:p-4 lg:pl-[280px]"
            className="max-h-[calc(100vh-24px)] w-[calc(100%-24px)] max-w-[700px] overflow-y-auto rounded-[20px] bg-white sm:w-[calc(100%-32px)] sm:rounded-[24px] md:h-[519px] md:w-[700px] md:overflow-hidden 3xl:h-[563px] 3xl:w-[760px] 3xl:max-w-[760px] 4xl:h-[608px] 4xl:w-[820px] 4xl:max-w-[820px]"
        >
            <div className="flex h-full w-full flex-col gap-5 p-5 sm:gap-6 sm:p-6 md:gap-7 md:p-8 3xl:gap-[30px] 3xl:p-9 4xl:gap-[33px] 4xl:p-[38px]">
                <div className="flex w-full shrink-0 items-start justify-between gap-4 md:h-[54px] 3xl:h-[59px] 4xl:h-[63px]">
                    <div className={`min-w-0 flex-1 ${textAlignment}`}>
                        <h2 className="text-[20px] font-semibold leading-[25px] text-[#12115C] sm:text-[22px] sm:leading-[27px] md:text-[24px] md:leading-[30px] 3xl:text-[26px] 3xl:leading-[33px] 4xl:text-[28px] 4xl:leading-[35px]">
                            {t('title')}
                        </h2>

                        <p className="mt-[6px] text-[13px] font-normal leading-[17px] text-[#5C5B94] md:text-[14px] md:leading-[18px] 3xl:mt-[7px] 3xl:text-[15px] 3xl:leading-[20px] 4xl:text-[16px] 4xl:leading-[21px]">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className={isArabic ? 'order-first' : 'order-last'}>
                        <ModalCloseButton
                        ariaLabel={t('close', { defaultValue: 'Close' })}
                        onClick={onClose}
                    />
                    </div>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 md:h-[181px] 3xl:h-[197px] 3xl:gap-x-[35px] 3xl:gap-y-[26px] 4xl:h-[212px] 4xl:gap-x-[37px] 4xl:gap-y-7">
                    {paymentDetails.map(item => {
                        const DetailIcon = item.Icon;

                        return (
                            <div
                                key={item.id}
                                className="flex h-11 min-w-0 items-center gap-3 3xl:h-12 3xl:gap-[13px] 4xl:h-[52px] 4xl:gap-[14px]"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(18,17,92,0.051)] 3xl:h-12 3xl:w-12 3xl:rounded-[11px] 4xl:h-[52px] 4xl:w-[52px] 4xl:rounded-[12px]">
                                    <DetailIcon
                                        aria-hidden="true"
                                        className="h-5 w-5 3xl:h-[22px] 3xl:w-[22px] 4xl:h-[23px] 4xl:w-[23px]"
                                    />
                                </div>

                                <div
                                    className={`flex min-w-0 flex-1 flex-col gap-0.5 3xl:gap-[3px] ${textAlignment}`}
                                >
                                    <p className="text-[12px] font-semibold leading-[15px] text-[#5C5B94] 3xl:text-[13px] 3xl:leading-4 4xl:text-[14px] 4xl:leading-[18px]">
                                        {item.label}
                                    </p>

                                    <p
                                        className={
                                            item.isAmount
                                                ? 'text-[22px] font-semibold leading-7 text-[#2E2AF3] 3xl:text-[24px] 3xl:leading-[30px] 4xl:text-[26px] 4xl:leading-[33px]'
                                                : 'truncate text-[15px] font-normal leading-[19px] text-[#12115C] 3xl:text-[16px] 3xl:leading-5 4xl:text-[17px] 4xl:leading-[22px]'
                                        }
                                    >
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex min-h-[92px] w-full shrink-0 items-start gap-[14px] rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 md:h-[92px] 3xl:h-[100px] 3xl:gap-[15px] 3xl:rounded-[15px] 3xl:p-[17px] 4xl:h-[108px] 4xl:gap-4 4xl:rounded-2xl 4xl:p-[19px]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF7FF] 3xl:h-[39px] 3xl:w-[39px] 3xl:rounded-[11px] 4xl:h-[42px] 4xl:w-[42px] 4xl:rounded-[12px]">
                        <PaymentDetailsDescriptionIcon
                            aria-hidden="true"
                            className="h-5 w-5 3xl:h-[22px] 3xl:w-[22px] 4xl:h-[23px] 4xl:w-[23px]"
                        />
                    </div>

                    <div
                        className={`flex min-w-0 flex-1 flex-col gap-1 3xl:gap-[5px] ${textAlignment}`}
                    >
                        <p className="text-[13px] font-semibold leading-4 text-[#12115C] 3xl:text-[14px] 3xl:leading-[17px] 4xl:text-[15px] 4xl:leading-[19px]">
                            {t('descriptionTitle')}
                        </p>

                        <p className="text-[13px] font-normal leading-5 text-[#4B5563] 3xl:text-[14px] 3xl:leading-[22px] 4xl:text-[15px] 4xl:leading-[23px]">
                            {t('descriptionText')}
                        </p>
                    </div>
                </div>

                <div className="flex h-11 w-full shrink-0 flex-row gap-2 3xl:h-12 3xl:gap-[9px] 4xl:h-[52px] 4xl:gap-[10px]">
                    <ActionButton
                        type="button"
                        onClick={onBack}
                        className="!h-11 !min-h-0 !w-[84px] !min-w-[84px] !flex-none !rounded-[16px] !border !border-[#12115C] !bg-white !px-2 !text-[14px] !font-normal !leading-7 !text-[#12115C] hover:!bg-[#F8F8FC] hover:!opacity-100 sm:!px-5 sm:!text-[18px] 3xl:!h-12 3xl:!w-[91px] 3xl:!min-w-[91px] 3xl:!rounded-[17px] 3xl:!text-[20px] 4xl:!h-[52px] 4xl:!w-[98px] 4xl:!min-w-[98px] 4xl:!rounded-[19px] 4xl:!text-[21px]"
                    >
                        {t('backButton')}
                    </ActionButton>

                    <ActionButton
                        type="button"
                        onClick={onContinue}
                        trailingIcon={
                            <Arrow
                                aria-hidden="true"
                                className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 3xl:h-[22px] 3xl:w-[22px] 4xl:h-[23px] 4xl:w-[23px] ${
                                    isArabic ? 'rotate-180' : ''
                                }`}
                            />
                        }
                        className={`!h-11 !min-h-0 !min-w-0 !flex-1 !rounded-[16px] !px-2 !text-[14px] !font-normal !leading-7 sm:!px-5 sm:!text-[18px] 3xl:!h-12 3xl:!rounded-[17px] 3xl:!px-[22px] 3xl:!text-[20px] 4xl:!h-[52px] 4xl:!rounded-[19px] 4xl:!px-6 4xl:!text-[21px] ${
                            isArabic ? '!flex-row-reverse' : ''
                        }`}
                    >
                        {t('continueButton')}
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
}
