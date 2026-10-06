export type CreateSupportInquiryFormProps = {
    projectId?: string | null;
    requestType?: string | null;
    showWarrantyNotice?: boolean;
    onSubmitted?: () => void;
};

export type CreateSupportInquiryModalProps = {
    isOpen: boolean;
    onClose: () => void;
};