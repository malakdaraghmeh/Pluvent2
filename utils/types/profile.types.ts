import type { ComponentType, ReactNode, SVGProps } from 'react';

export type ProfileData = {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    lastUpdated: string;
};

export type ProfileInformationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    profile: ProfileData;
    onSave?: (profile: ProfileData) => void;
};

export type ProfileModalHeaderProps = {
    onClose: () => void;
};

export type ProfilePreviewProps = {
    fullName: string;
    role: string;
};

export type ProfileFieldProps = {
    label: string;
    value: string;
    isEditing?: boolean;
    type?: 'text' | 'email' | 'tel';
    onChange?: (value: string) => void;
};

export type ProfileInfoSectionProps = {
    title: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    isEditing: boolean;
    onEdit: () => void;
    children: ReactNode;
};

export type ProfileModalFooterProps = {
    lastUpdated: string;
    onCancel: () => void;
    onSave: () => void;
};
