import type { ReactNode } from 'react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    overlayClassName?: string;
    ariaLabel?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}
