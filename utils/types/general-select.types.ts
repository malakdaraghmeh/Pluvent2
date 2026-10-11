export interface GeneralSelectOption {
    label: string;
    value: string;
}

export interface GeneralSelectProps {
    id?: string;
    value: string;
    placeholder: string;
    options: GeneralSelectOption[];
    isArabic?: boolean;
    onChange: (value: string) => void;
    className?: string;
}
