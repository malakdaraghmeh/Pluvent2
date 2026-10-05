import type { TFunction } from 'i18next';
import { z } from 'zod';

import type { AddUserFormData } from '../types/users.types';

export const createAddUserSchema = (t: TFunction): z.ZodType<AddUserFormData> =>
    z
        .object({
            fullName: z.string().trim().min(
                1,
                t('addUserModal.validation.fullNameRequired', {
                    defaultValue: 'Full name is required',
                }),
            ),
            email: z
                .string()
                .trim()
                .min(
                    1,
                    t('addUserModal.validation.emailRequired', {
                        defaultValue: 'Email is required',
                    }),
                )
                .email(
                    t('addUserModal.validation.emailInvalid', {
                        defaultValue: 'Enter a valid email address',
                    }),
                ),
            phone: z.string().trim().min(
                1,
                t('addUserModal.validation.phoneRequired', {
                    defaultValue: 'Phone number is required',
                }),
            ),
            password: z.string().min(
                6,
                t('addUserModal.validation.passwordMin', {
                    defaultValue: 'Password must be at least 6 characters',
                }),
            ),
            confirmPassword: z.string().min(
                1,
                t('addUserModal.validation.confirmPasswordRequired', {
                    defaultValue: 'Please confirm your password',
                }),
            ),
            role: z
                .union([
                    z.literal('Admin'),
                    z.literal('Employee'),
                    z.literal(''),
                ])
                .refine(value => value !== '', {
                    message: t('addUserModal.validation.roleRequired', {
                        defaultValue: 'Please select a role',
                    }),
                }),
        })
        .refine(data => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: t('addUserModal.validation.passwordMismatch', {
                defaultValue: 'Passwords do not match',
            }),
        });
