import type { ComponentType, SVGProps } from 'react';
import type { TFunction } from 'i18next';
import { z } from 'zod';

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
    onEdit: (user: UserTableItem) => void;
    onDelete: (userId: string) => void;
};

export type AddUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AddUserFormData) => void;
    userToEdit?: UserTableItem | null;
};

export type AddUserFormData = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: UserRole | '';
};

export const createAddUserSchema = (t: TFunction, isEditMode = false) =>
    z
        .object({
            fullName: z
                .string()
                .trim()
                .min(
                    1,
                    t('addUserModal.validation.fullNameRequired', {
                        defaultValue: 'Full name is required',
                    })
                ),

            email: z
                .string()
                .trim()
                .min(
                    1,
                    t('addUserModal.validation.emailRequired', {
                        defaultValue: 'Email is required',
                    })
                )
                .email(
                    t('addUserModal.validation.emailInvalid', {
                        defaultValue: 'Enter a valid email address',
                    })
                ),

            phone: isEditMode
                ? z.string()
                : z
                      .string()
                      .trim()
                      .min(
                          1,
                          t('addUserModal.validation.phoneRequired', {
                              defaultValue: 'Phone number is required',
                          })
                      ),

            password: isEditMode
                ? z.string()
                : z.string().min(
                      6,
                      t('addUserModal.validation.passwordMin', {
                          defaultValue: 'Password must be at least 6 characters',
                      })
                  ),

            confirmPassword: isEditMode
                ? z.string()
                : z.string().min(
                      1,
                      t('addUserModal.validation.confirmPasswordRequired', {
                          defaultValue: 'Please confirm your password',
                      })
                  ),

            role: z
                .union([z.literal('Admin'), z.literal('Employee'), z.literal('')])
                .refine(value => value !== '', {
                    message: t('addUserModal.validation.roleRequired', {
                        defaultValue: 'Please select a role',
                    }),
                }),
        })
        .refine(data => isEditMode || data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: t('addUserModal.validation.passwordMismatch', {
                defaultValue: 'Passwords do not match',
            }),
        }) as z.ZodType<AddUserFormData>;
