export interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownloadPdf?: () => void;
}

export interface InvoiceTotalSummaryProps {
    onDownloadPdf?: () => void;
}

export interface InvoiceItem {
    description: string;
    total: string;
}