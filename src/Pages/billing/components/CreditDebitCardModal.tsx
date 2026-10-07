import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Arrow, CloseIcons, FilesIcons } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import CardExpirySelect from '@/components/ui/CardExpirySelect';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import InvoiceModal from '@/Pages/billing/components/InvoiceModal';
import type { CreditDebitCardModalProps } from '../../../../utils/types/billing.types';
import PaymentSuccessModal from './PaymentSuccessModal';

const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));

const years = ['2026', '2027', '2028', '2029', '2030', '2031', '2032'];

const CreditDebitCardModal = ({ isOpen, onClose, onBack }: CreditDebitCardModalProps) => {
    const { t, i18n } = useTranslation('creditDebitCardModal');

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);

    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }

        onClose();
    };

    const handleSuccessClose = () => {
        setIsPaymentSuccessOpen(false);
        onClose();
    };

    const handleViewReceipt = () => {
        setIsPaymentSuccessOpen(false);
        setIsInvoiceOpen(true);
    };

    const handleInvoiceClose = () => {
        setIsInvoiceOpen(false);
        onClose();
    };

    const handleDownloadPdf = () => {
        window.print();
    };

    return (
        <>
            <Modal
                isOpen={isOpen && !isPaymentSuccessOpen && !isInvoiceOpen}
                onClose={onClose}
                ariaLabel={t('title')}
                overlayClassName="!overflow-hidden p-3 sm:p-4 lg:pl-[280px]"
                className="!h-[calc(100vh-24px)] !max-h-[786px] !w-[calc(100vw-24px)] !max-w-[700px] overflow-hidden rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white shadow-none sm:!h-[calc(100vh-32px)] sm:!w-[calc(100vw-32px)] md:!w-[700px]"
            >
                <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
                    <div className={`flex w-full shrink-0 items-start justify-between gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={`min-w-0 flex-1 ${textAlignment}`}>
                            <h2 className="text-[20px] font-semibold leading-7 text-[#12115C] sm:text-[22px]">
                                {t('title')}
                            </h2>

                            <p className="mt-2 text-[14px] font-normal leading-[18px] text-[#615E8B]">
                                {t('description')}
                            </p>
                        </div>

                        <div className={isArabic ? 'order-first' : 'order-last'}>
                            <div className={isArabic ? 'absolute left-6 top-6' : 'absolute right-6 top-6'}><ModalCloseButton ariaLabel={t('close')} onClick={onClose} /></div>
                        </div>
                    </div>

                    <div className="mt-5 min-h-0 flex-1 overflow-x-hidden overflow-y-auto [scrollbar-width:none] sm:mt-6 [&::-webkit-scrollbar]:hidden">
                        <div className="flex w-full flex-col gap-6">
                            <div className="flex w-full flex-col gap-2">
                                <label
                                    htmlFor="card-number"
                                    className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                >
                                    {t('cardNumber')}
                                </label>

                                <input
                                    id="card-number"
                                    type="text"
                                    inputMode="numeric"
                                    value={cardNumber}
                                    onChange={event => setCardNumber(event.target.value)}
                                    placeholder={t('cardNumberPlaceholder')}
                                    maxLength={19}
                                    className={`h-[54px] w-full rounded-[8px] bg-[#F4F6FA] px-[14px] py-[13px] text-[14px] font-normal text-[#888282] outline-none placeholder:text-[#A0A5AF] ${textAlignment}`}
                                />
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <label
                                    htmlFor="cardholder-name"
                                    className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                >
                                    {t('cardholderName')}
                                </label>

                                <input
                                    id="cardholder-name"
                                    type="text"
                                    value={cardholderName}
                                    onChange={event => setCardholderName(event.target.value)}
                                    placeholder={t('cardholderNamePlaceholder')}
                                    className={`h-[54px] w-full rounded-[8px] bg-[#F4F6FA] px-[14px] py-[13px] text-[14px] font-normal text-[#888282] outline-none placeholder:text-[#A0A5AF] ${textAlignment}`}
                                />
                            </div>

                            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                                <div className="flex min-w-0 flex-col gap-2">
                                    <label
                                        htmlFor="expiry-month"
                                        className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                    >
                                        {t('expiryMonth')}
                                    </label>

                                    <CardExpirySelect
                                        id="expiry-month"
                                        value={expiryMonth}
                                        placeholder={t('monthPlaceholder')}
                                        options={months}
                                        isArabic={isArabic}
                                        onChange={setExpiryMonth}
                                    />
                                </div>

                                <div className="flex min-w-0 flex-col gap-2">
                                    <label
                                        htmlFor="expiry-year"
                                        className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                    >
                                        {t('expiryYear')}
                                    </label>

                                    <CardExpirySelect
                                        id="expiry-year"
                                        value={expiryYear}
                                        placeholder={t('yearPlaceholder')}
                                        options={years}
                                        isArabic={isArabic}
                                        onChange={setExpiryYear}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <label
                                    htmlFor="cvv"
                                    className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                >
                                    {t('cvv')}
                                </label>

                                <input
                                    id="cvv"
                                    type="password"
                                    inputMode="numeric"
                                    value={cvv}
                                    onChange={event => setCvv(event.target.value)}
                                    placeholder={t('cvvPlaceholder')}
                                    maxLength={3}
                                    className={`h-[54px] w-full rounded-[8px] bg-[#F4F6FA] px-[14px] py-0 text-[14px] font-normal leading-[54px] text-[#888282] outline-none placeholder:text-[#A0A5AF] ${textAlignment}`}
                                />
                            </div>

                            <div className="flex min-h-[100px] w-full flex-col gap-4 rounded-[12px] border border-[#E6EBF5] bg-[#F4F6FA] p-[18px] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                <div className="flex min-w-0 items-center gap-2 sm:w-[200px] sm:gap-3">
                                    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#EBF3FC] p-[10px]">
                                        <FilesIcons />
                                    </div>

                                    <div className={`min-w-0 ${textAlignment}`}>
                                        <p className="text-[12px] font-semibold leading-[15px] text-[#656582]">
                                            {t('totalAmount')}
                                        </p>

                                        <p className="whitespace-nowrap text-[20px] font-semibold leading-[26px] text-[#2E27CD]">
                                            EGP 15,000
                                        </p>

                                        <p className="text-[11px] font-semibold leading-[14px] text-[#656582]">
                                            {t('project')}{' '}
                                            <span className="text-[#0F0C50]">
                                                {t('projectName')}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex min-h-[64px] w-full items-center gap-2 rounded-[8px] bg-white p-4 sm:h-[64px] sm:w-[250px] sm:shrink-0">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#34C7590D] p-2">
                                        <CloseIcons />
                                    </div>

                                    <p
                                        className={`text-[11px] font-normal leading-4 text-[#34C759] ${textAlignment}`}
                                    >
                                        {t('securityMessageLine1')}
                                        <br />
                                        {t('securityMessageLine2')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 w-full shrink-0 bg-white sm:mt-6">
                        <div className="flex w-full flex-col-reverse gap-2 sm:h-[44px] sm:flex-row sm:items-center">
                            <ActionButton
                                type="button"
                                onClick={handleBack}
                                className="!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !shrink-0 !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !text-[18px] !font-normal !leading-7 !text-[#12115C] hover:!bg-[#F4F3FA] hover:!opacity-100 sm:!w-[84px] sm:!min-w-[84px] sm:!flex-none"
                            >
                                {t('back')}
                            </ActionButton>

                            <ActionButton
                                type="button"
                                onClick={() => setIsPaymentSuccessOpen(true)}
                                trailingIcon={
                                    <Arrow
                                        aria-hidden="true"
                                        className={`h-5 w-5 shrink-0 ${
                                            isArabic ? 'rotate-180' : ''
                                        }`}
                                    />
                                }
                                className={`!h-[44px] !min-h-[44px] !max-h-[44px] !w-full !min-w-0 !shrink-0 !justify-center !rounded-[16px] !px-5 !text-[18px] !font-normal !leading-7 sm:!flex-1 ${
                                    isArabic ? '!flex-row-reverse' : ''
                                }`}
                            >
                                {t('continueToPayment')}
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <PaymentSuccessModal
                isOpen={isPaymentSuccessOpen}
                onClose={handleSuccessClose}
                onBack={() => setIsPaymentSuccessOpen(false)}
                onViewReceipt={handleViewReceipt}
            />

            <InvoiceModal
                isOpen={isInvoiceOpen}
                onClose={handleInvoiceClose}
                onDownloadPdf={handleDownloadPdf}
            />
        </>
    );
};

export default CreditDebitCardModal;
