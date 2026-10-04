import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { ModalProps } from '../../../utils/types/modal.types';

export default function Modal({
    isOpen,
    onClose,
    children,
    className = '',
    overlayClassName = '',
    ariaLabel,
    closeOnOverlayClick = true,
    closeOnEscape = true,
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (closeOnEscape && event.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.paddingRight = previousBodyPaddingRight;

            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeOnEscape, isOpen, onClose]);

    if (!isOpen || typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/30 p-3 sm:p-4 md:p-5 lg:p-6 3xl:p-8 4xl:p-10 ${overlayClassName}`}
            onMouseDown={event => {
                if (closeOnOverlayClick && event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                className={`relative w-full bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] ${className}`}
                onMouseDown={event => event.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
