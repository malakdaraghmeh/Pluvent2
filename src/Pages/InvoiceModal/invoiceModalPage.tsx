import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/ui/modal';
import type { InvoiceModalProps } from '@/utils/types/invoice.types';

import InvoiceBanner from './components/InvoiceBanner';
import InvoiceFooter from './components/InvoiceFooter';
import InvoiceHeaderLogo from './components/InvoiceHeaderLogo';
import InvoiceItemsTable from './components/InvoiceItemsTable';
import InvoiceMetadata from './components/InvoiceMetadata';
import InvoiceTotalSummary from './components/InvoiceTotalSummary';

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
    if (typeof window === 'undefined') return 1;

    const availableWidth = window.innerWidth - VIEWPORT_GAP;
    const availableHeight = window.innerHeight - VIEWPORT_GAP;

    const fitScale = Math.min(
        availableWidth / INVOICE_WIDTH,
        availableHeight / INVOICE_HEIGHT
    );

    return Math.min(getTargetScale(window.innerWidth), fitScale);
};

export default function InvoiceModal({
    isOpen,
    onClose,
    onDownloadPdf,
}: InvoiceModalProps) {
    const { i18n } = useTranslation('invoiceModal');
    const [scale, setScale] = useState(getInvoiceScale);

    const isRtl = i18n.language.startsWith('ar');

    useEffect(() => {
        const updateScale = () => {
            setScale(getInvoiceScale());
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setScale(getInvoiceScale());
        }
    }, [isOpen]);

    const scaledWidth = INVOICE_WIDTH * scale;
    const scaledHeight = INVOICE_HEIGHT * scale;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-transparent shadow-none"
        >
            <div
                className="relative shrink-0"
                style={{
                    width: scaledWidth,
                    height: scaledHeight,
                }}
            >
                <div
                    className={`absolute left-0 top-0 h-[748px] w-[595px] overflow-hidden rounded-[24px] bg-white shadow-[0_10px_20px_rgba(37,49,76,0.15)] ${
                        isRtl ? 'text-right' : 'text-left'
                    }`}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <InvoiceHeaderLogo />

                    <div className="absolute left-[36px] top-[126px] z-10 flex h-[582.02px] w-[523px] flex-col gap-[26px]">
                        <div className="flex h-[502px] w-full shrink-0 flex-col gap-6">
                            <InvoiceBanner isRtl={isRtl} />

                            <div className="mx-auto flex h-[336px] w-[499px] shrink-0 flex-col">
                                <InvoiceMetadata />
                                <InvoiceItemsTable />
                                <InvoiceTotalSummary
                                    isRtl={isRtl}
                                    onDownloadPdf={onDownloadPdf}
                                />
                            </div>
                        </div>

                        <InvoiceFooter isRtl={isRtl} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
