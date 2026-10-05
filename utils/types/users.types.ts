import type { ComponentType, SVGProps } from 'react';

export type UserRole = 'Admin' | 'Employee';

export type UserStatus = 'Active' | 'Disable';

export type UserMetricId = 'outstanding' | 'active' | 'pending' | 'rejected';

export type MetricItem = {
    id: UserMetricId;
    label: string;
    value: number;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type UserTableItem = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
};

export type UserManagementHeaderProps = {
    onAddUser: () => void;
};

export type UserMetricsGridProps = {
    metrics: MetricItem[];
};

export type UsersTableProps = {
    users: UserTableItem[];
};

export type AddUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type AddUserFormData = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: UserRole | '';
};
