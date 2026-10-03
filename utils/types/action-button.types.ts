import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
}
