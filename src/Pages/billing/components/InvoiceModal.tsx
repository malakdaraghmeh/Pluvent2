import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import InvoiceBanner from './invoice/InvoiceBanner';
import InvoiceFooter from './invoice/InvoiceFooter';
import InvoiceHeaderLogo from './invoice/InvoiceHeaderLogo';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceMetadata from './invoice/InvoiceMetadata';
import InvoiceTotalSummary from './invoice/InvoiceTotalSummary';

type InvoiceModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onDownloadPdf?: () => void;
};

const INVOICE_WIDTH = 595;
const INVOICE_HEIGHT = 748;
const VIEWPORT_GAP = 32;

const getTargetScale = (viewportWidth: number) => {
    if (viewportWidth >= 2500) return 1.28;
    if (viewportWidth >= 1920) return 1.16;
    if (viewportWidth >= 1440) return 1.08;

    return 1;
};

const getInvoiceScale = () => {
    if (typeof window === 'undefined') {
        return 1;
    }

    const availableWidth = window.innerWidth - VIEWPORT_GAP;
    const availableHeight = window.innerHeight - VIEWPORT_GAP;

    const fitScale = Math.min(availableWidth / INVOICE_WIDTH, availableHeight / INVOICE_HEIGHT);

    return Math.min(getTargetScale(window.innerWidth), fitScale);
};

export default function InvoiceModal({ isOpen, onClose, onDownloadPdf }: InvoiceModalProps) {
    const { i18n } = useTranslation();
    const isRtl = i18n.language.startsWith('ar');

    const [scale, setScale] = useState(getInvoiceScale);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const updateScale = () => {
            setScale(getInvoiceScale());
        };

        updateScale();

        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, [isOpen]);

    const scaledWidth = INVOICE_WIDTH * scale;
    const scaledHeight = INVOICE_HEIGHT * scale;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel="Invoice"
            overlayClassName={isRtl ? 'p-3 sm:p-4 lg:pr-[280px]' : 'p-3 sm:p-4 lg:pl-[280px]'}
            className="!w-auto !max-h-none !max-w-none overflow-visible bg-transparent p-0 shadow-none"
        >
            <div
                className="relative shrink-0"
                style={{
                    width: scaledWidth,
                    height: scaledHeight,
                }}
            >
                <div
                    className="absolute left-0 top-0 h-[748px] w-[595px] origin-top-left overflow-hidden rounded-[24px] bg-white"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <ModalCloseButton
                        ariaLabel="Close invoice"
                        onClick={onClose}
                        className="absolute left-4 top-4 z-50"
                    />

                    <InvoiceHeaderLogo />

                    <div className="absolute left-[36px] top-[126px] z-10 flex h-[582px] w-[523px] flex-col gap-[26px]">
                        <div className="flex h-[502px] w-full shrink-0 flex-col gap-6">
                            <InvoiceBanner />

                            <div className="mx-auto flex h-[336px] w-[499px] shrink-0 flex-col">
                                <InvoiceMetadata />

                                <InvoiceItemsTable />

                                <InvoiceTotalSummary onDownloadPdf={onDownloadPdf} />
                            </div>
                        </div>

                        <InvoiceFooter />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
