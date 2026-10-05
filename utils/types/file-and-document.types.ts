export type FileDocumentType = 'pulvent' | 'document';

export interface FileItem {
    id: number;
    fileName: string;
    uploadedBy: string;
    size: string;
    date: string;
    type: FileDocumentType;
    downloadUrl?: string;
}

export interface FileDocumentsProps {
    files?: FileItem[];
    variant?: 'project' | 'all';
    showTitle?: boolean;
    showViewAll?: boolean;
    showUpload?: boolean;
}
