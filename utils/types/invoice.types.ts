export interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownloadPdf?: () => void;
}

export interface InvoiceBannerProps {
    isRtl: boolean;
}

export interface InvoiceFooterProps {
    isRtl: boolean;
}

export interface InvoiceTotalSummaryProps {
    isRtl: boolean;
    onDownloadPdf?: () => void;
}

export interface InvoiceItem {
    description: string;
    total: string;
}

export interface InvoiceMetadataItem {
    label: string;
    value: string;
}
