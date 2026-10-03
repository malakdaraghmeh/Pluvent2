import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Arrow, CloseIcons, FilesIcons } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import CardExpirySelect from '@/components/ui/CardExpirySelect';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import InvoiceModal from '@/Pages/InvoiceModal/invoiceModalPage';
import type { CreditDebitCardModalProps } from '../../../../utils/types/billing.types';
import PaymentSuccessModal from './PaymentSuccessModal';
const MODAL_WIDTH = 700;
const MODAL_HEIGHT = 774;
const VIEWPORT_GAP = 48;
const SIDEBAR_WIDTH = 280;
const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
const years = ['2026', '2027', '2028', '2029', '2030', '2031', '2032'];
const getTargetScale = (viewportWidth: number) => {
    if (viewportWidth >= 2500) return 1.28;
    if (viewportWidth >= 1920) return 1.16;
    if (viewportWidth >= 1440) return 1.08;
    return 1;
};
const getModalScale = (viewportWidth: number, viewportHeight: number) => {
    if (viewportWidth < 768) return 1;
    const sidebarWidth = viewportWidth >= 1024 ? SIDEBAR_WIDTH : 0;
    const availableWidth = viewportWidth - sidebarWidth - VIEWPORT_GAP;
    const availableHeight = viewportHeight - VIEWPORT_GAP;
    const fitScale = Math.min(availableWidth / MODAL_WIDTH, availableHeight / MODAL_HEIGHT);
    return Math.max(1, Math.min(getTargetScale(viewportWidth), fitScale));
};
const CreditDebitCardModal = ({ isOpen, onClose, onBack }: CreditDebitCardModalProps) => {
    const { t, i18n } = useTranslation('creditDebitCardModal');
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [viewport, setViewport] = useState(() => ({
        width: typeof window === 'undefined' ? MODAL_WIDTH : window.innerWidth,
        height: typeof window === 'undefined' ? MODAL_HEIGHT : window.innerHeight,
    }));
    const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    useEffect(() => {
        const updateViewport = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => {
            window.removeEventListener('resize', updateViewport);
        };
    }, []);
    useEffect(() => {
        if (!isOpen) return;
        setViewport({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [isOpen]);
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
    const isDesktop = viewport.width >= 768;
    const scale = getModalScale(viewport.width, viewport.height);
    const scaledWidth = MODAL_WIDTH * scale;
    const scaledHeight = MODAL_HEIGHT * scale;
    const desktopAvailableHeight = Math.max(320, viewport.height - VIEWPORT_GAP);
    const desktopScrollHeight = desktopAvailableHeight / scale;
    const desktopWrapperHeight = Math.min(scaledHeight, desktopAvailableHeight);
    return (
        <>
            <Modal
                isOpen={isOpen && !isPaymentSuccessOpen && !isInvoiceOpen}
                onClose={onClose}
                ariaLabel={t('title')}
                overlayClassName={`!overflow-hidden ${isArabic ? 'lg:pr-[280px]' : 'lg:pl-[280px]'}`}
                className="!w-auto !max-w-none bg-transparent shadow-none"
            >
                <div
                    className="relative w-[calc(100vw-24px)] max-w-[700px] sm:w-[calc(100vw-32px)] md:max-w-none"
                    style={
                        isDesktop ? { width: scaledWidth, height: desktopWrapperHeight } : undefined
                    }
                >
                    <div
                        className="w-full scroll-smooth overflow-x-hidden overflow-y-auto overscroll-contain rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white [direction:ltr] [scrollbar-color:#C8CDD8_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] max-md:max-h-[calc(100vh-24px)] sm:max-md:max-h-[calc(100vh-32px)] md:absolute md:left-0 md:top-0 md:h-[774px] md:w-[700px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C8CDD8] hover:[&::-webkit-scrollbar-thumb]:bg-[#AEB5C2]"
                        style={
                            isDesktop
                                ? {
                                      maxHeight: desktopScrollHeight,
                                      transform: `scale(${scale})`,
                                      transformOrigin: 'top left',
                                  }
                                : undefined
                        }
                    >
                        <div
                            className={`flex w-full flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 md:min-h-[774px] md:gap-8 md:px-6 md:py-10 ${isArabic ? '[direction:rtl]' : '[direction:ltr]'}`}
                        >
                            <div className="flex w-full shrink-0 items-start justify-between gap-4 md:h-[54px]">
                                <div className={`min-w-0 flex-1 ${textAlignment}`}>
                                    <h2 className="text-[20px] font-semibold leading-7 text-[#12115C] sm:text-[22px]">
                                        {t('title')}
                                    </h2>
                                    <p className="mt-2 text-[14px] font-normal leading-[18px] text-[#615E8B]">
                                        {t('description')}
                                    </p>
                                </div>
                                <ModalCloseButton ariaLabel={t('close')} onClick={onClose} />
                            </div>
                            <div className="flex w-full shrink-0 flex-col gap-6 md:h-[400px]">
                                <div className="flex h-[82px] w-full flex-col gap-2">
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
                                <div className="flex h-[82px] w-full flex-col gap-2">
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
                                <div className="grid w-full grid-cols-1 gap-6 sm:h-[82px] sm:grid-cols-2">
                                    <div className="flex h-[82px] min-w-0 flex-col gap-2">
                                        <label
                                            htmlFor="expiry-month"
                                            className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                        >
                                            {t('expiryMonth')}
                                        </label>
                                        <CardExpirySelect id="expiry-month" value={expiryMonth} placeholder={t('monthPlaceholder')} options={months} isArabic={isArabic} onChange={setExpiryMonth}/>
                                    </div>
                                    <div className="flex h-[82px] min-w-0 flex-col gap-2">
                                        <label
                                            htmlFor="expiry-year"
                                            className={`text-[16px] font-normal leading-5 text-[#08040B] ${textAlignment}`}
                                        >
                                            {t('expiryYear')}
                                        </label>
                                        <CardExpirySelect id="expiry-year" value={expiryYear} placeholder={t('yearPlaceholder')} options={years} isArabic={isArabic} onChange={setExpiryYear}/>
                                    </div>
                                </div>
                                <div className="flex h-[82px] w-full flex-col gap-2">
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
                                        className={`h-[54px] w-full rounded-[8px] bg-[#F4F6FA] px-[14px] py-[13px] text-[14px] font-normal text-[#888282] outline-none placeholder:text-[#A0A5AF] ${textAlignment}`}
                                    />
                                </div>
                            </div>
                            <div className="flex min-h-[100px] w-full shrink-0 flex-col gap-4 rounded-[12px] border border-[#E6EBF5] bg-[#F4F6FA] p-[18px] sm:h-[100px] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                <div className="flex min-w-0 items-center gap-2 sm:h-[58px] sm:w-[200px] sm:gap-3">
                                    {' '}
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
                            <div className="flex h-11 w-full shrink-0 flex-row gap-2">
                                <ActionButton
                                    type="button"
                                    onClick={handleBack}
                                    className="!h-11 !min-h-0 !w-[84px] !min-w-[84px] !flex-none !rounded-[16px] !border !border-[#12115C] !bg-white !px-5 !text-[18px] !font-normal !leading-7 !text-[#12115C] hover:!bg-[#F4F3FA] hover:!opacity-100"
                                >
                                    {t('back')}
                                </ActionButton>
                                <ActionButton
                                    type="button"
                                    onClick={() => setIsPaymentSuccessOpen(true)}
                                    trailingIcon={
                                        <Arrow
                                            aria-hidden="true"
                                            className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`}
                                        />
                                    }
                                    className="!h-11 !min-h-0 !min-w-0 !flex-1 !rounded-[16px] !px-5 !text-[18px] !font-normal !leading-7"
                                >
                                    {t('continueToPayment')}
                                </ActionButton>
                            </div>
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
