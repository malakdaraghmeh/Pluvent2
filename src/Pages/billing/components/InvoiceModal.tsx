import { useEffect, useState } from 'react';

import Modal from '@/components/ui/modal';
import type { InvoiceModalProps } from '../../../../utils/types/invoice.types';

import InvoiceBanner from './invoice/InvoiceBanner';
import InvoiceFooter from './invoice/InvoiceFooter';
import InvoiceHeaderLogo from './invoice/InvoiceHeaderLogo';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceMetadata from './invoice/InvoiceMetadata';
import InvoiceTotalSummary from './invoice/InvoiceTotalSummary';

const INVOICE_WIDTH = 595;
const INVOICE_HEIGHT = 748;

const getScale = () => {
    if (typeof window === 'undefined') return 1;

    const widthScale = (window.innerWidth - 32) / INVOICE_WIDTH;
    const heightScale = (window.innerHeight - 32) / INVOICE_HEIGHT;

    if (window.innerWidth >= 2500) {
        return Math.min(1.28, widthScale);
    }

    if (window.innerWidth >= 1920) {
        return Math.min(1.16, widthScale);
    }

    if (window.innerWidth >= 1440) {
        return Math.min(1.08, widthScale);
    }

    return Math.min(1, widthScale, heightScale);
};

export default function InvoiceModal({ isOpen, onClose, onDownloadPdf }: InvoiceModalProps) {
    const [scale, setScale] = useState(getScale);

    useEffect(() => {
        const handleResize = () => {
            setScale(getScale());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setScale(getScale());
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel="Invoice"
            className="!w-auto max-w-none bg-transparent shadow-none"
            overlayClassName="min-[1440px]:!items-start lg:ml-[280px]"
        >
            <div
                className="relative shrink-0 min-[1440px]:my-auto"
                style={{
                    width: INVOICE_WIDTH * scale,
                    height: INVOICE_HEIGHT * scale,
                }}
            >
                <div
                    className="absolute left-0 top-0 h-[748px] w-[595px] overflow-hidden rounded-[24px] bg-white shadow-[0_10px_20px_rgba(37,49,76,0.15)]"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
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
