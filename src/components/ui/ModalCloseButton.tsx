import { MessagesCreateGroupCloseIcon as ModalCloseIcon } from '@/assets';

import type { ModalCloseButtonProps } from '../../../utils/types/modal-close-button.types';

export default function ModalCloseButton({
    ariaLabel,
    onClick,
    className = '',
}: ModalCloseButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#12115C] transition-opacity duration-200 hover:opacity-90 active:opacity-80 ${className}`}
        >
            <ModalCloseIcon aria-hidden="true" className="h-[18px] w-[18.75px]" />
        </button>
    );
}
