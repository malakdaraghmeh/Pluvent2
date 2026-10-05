import type { ComponentType, SVGProps } from 'react';

export type PaymentMethodId =
    | 'creditDebitCard'
    | 'paypal'
    | 'stripe'
    | 'applePay'
    | 'fawry'
    | 'instapay'
    | 'wallet';

export type PaymentFlowStage = 'details' | 'method' | 'creditCard';

export interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onContinue: (method: PaymentMethodId) => void;
}

export interface PaymentMethodOptionProps {
    value: PaymentMethodId;
    selected: boolean;
    description: string;
    Logo: ComponentType<SVGProps<SVGSVGElement>>;
    logoClassName: string;
    textAlignment: string;
    onSelect: (value: PaymentMethodId) => void;
}

export interface PaymentFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onAlternativeMethod?: (method: Exclude<PaymentMethodId, 'creditDebitCard'>) => void;
}

export interface CardExpirySelectProps {
    id: string;
    value: string;
    placeholder: string;
    options: string[];
    isArabic: boolean;
    onChange: (value: string) => void;
}
