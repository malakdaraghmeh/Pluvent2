import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AddUser, Arrow, DropDown } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';

import type {
    AddUserFormData,
    AddUserModalProps,
    UserRole,
} from '../../../../utils/types/users.types';
import { createAddUserSchema } from '../../../utils/validation/users.validation';

const USER_ROLES: UserRole[] = ['Admin', 'Employee'];

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
    const { t, i18n } = useTranslation('usersPage');
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';
    const placeholderText = isArabic
        ? `${t('addUserModal.placeholder').replace(/[.…]+$/u, '')}...\u200F`
        : t('addUserModal.placeholder');

    const schema = useMemo(() => createAddUserSchema(t), [t]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddUserFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: '',
        },
        mode: 'onSubmit',
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: AddUserFormData) => {
        console.log('User Data Submitted:', data);
        reset();
        onClose();
    };

    const inputClassName =
        'h-[54px] w-full rounded-[8px] border-0 bg-[#F4F6FA] px-[14px] py-[13px] text-[14px] font-normal leading-7 text-[#12115C] outline-none transition-colors placeholder:text-[#868B89] focus:ring-1 focus:ring-[#12115C] min-[1920px]:h-[58px] min-[1920px]:px-4 min-[1920px]:py-[14px] min-[1920px]:text-[15px] min-[2500px]:h-[62px] min-[2500px]:px-[18px] min-[2500px]:py-[15px] min-[2500px]:text-[16px]';

    const labelClassName =
        'text-[16px] font-normal leading-5 text-[#08040B] min-[1920px]:text-[17px] min-[1920px]:leading-[22px] min-[2500px]:text-[18px] min-[2500px]:leading-6';

    const errorClassName =
        'mt-1 text-[11px] font-normal leading-4 text-[#FF3B30] min-[1920px]:text-[12px] min-[2500px]:text-[13px]';

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            ariaLabel={t('addUserModal.title')}
            overlayClassName="p-3 sm:p-4"
            className="w-[calc(100vw-24px)] max-w-[560px] overflow-hidden rounded-[8px] border-[0.5px] border-[#D9D9D9] bg-white shadow-[0px_2px_15px_0px_#0000000D] sm:w-[calc(100vw-32px)] min-[1440px]:w-[560px] min-[1440px]:max-w-none min-[1920px]:w-[620px] min-[2500px]:w-[680px]"
        >
            <div className="add-user-modal-scroll max-h-[calc(100dvh-24px)] w-full overflow-y-auto overscroll-contain px-5 py-8 sm:max-h-[calc(100dvh-32px)] sm:px-6 sm:py-10 min-[1920px]:px-7 min-[1920px]:py-11 min-[2500px]:px-8 min-[2500px]:py-12">
                <div className="flex w-full flex-col gap-8 min-[1920px]:gap-9 min-[2500px]:gap-10">
                    <div className="flex w-full items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3 min-[1920px]:gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#00E5C815] min-[1920px]:h-14 min-[1920px]:w-14 min-[1920px]:rounded-[16px] min-[2500px]:h-16 min-[2500px]:w-16 min-[2500px]:rounded-[18px]">
                                <AddUser className="h-6 w-6 min-[1920px]:h-7 min-[1920px]:w-7 min-[2500px]:h-8 min-[2500px]:w-8" />
                            </div>

                            <div className={`min-w-0 ${textAlignment}`}>
                                <h2 className="text-[20px] font-semibold leading-[25px] text-[#12115C] min-[1920px]:text-[22px] min-[1920px]:leading-7 min-[2500px]:text-[24px] min-[2500px]:leading-[30px]">
                                    {t('addUserModal.title')}
                                </h2>

                                <p className="mt-1 text-[14px] font-normal leading-[18px] text-[#615E8B] min-[1920px]:text-[15px] min-[1920px]:leading-5 min-[2500px]:text-[16px] min-[2500px]:leading-[22px]">
                                    {t('addUserModal.description')}
                                </p>
                            </div>
                        </div>

                        <ModalCloseButton
                            ariaLabel={t('addUserModal.close')}
                            onClick={handleClose}
                        />
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="flex w-full flex-col gap-4 min-[1920px]:gap-[18px] min-[2500px]:gap-5"
                    >
                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-full-name"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.fullName')}
                            </label>

                            <input
                                id="add-user-full-name"
                                type="text"
                                placeholder={placeholderText}
                                {...register('fullName')}
                                className={`${inputClassName} ${textAlignment}`}
                            />

                            {errors.fullName && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-email"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.email')}
                            </label>

                            <input
                                id="add-user-email"
                                type="email"
                                placeholder={placeholderText}
                                {...register('email')}
                                className={`${inputClassName} ${textAlignment}`}
                            />

                            {errors.email && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-phone"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.phone')}
                            </label>

                            <input
                                id="add-user-phone"
                                type="tel"
                                placeholder={placeholderText}
                                {...register('phone')}
                                className={`${inputClassName} ${textAlignment}`}
                            />

                            {errors.phone && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-password"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.password')}
                            </label>

                            <input
                                id="add-user-password"
                                type="password"
                                placeholder={placeholderText}
                                {...register('password')}
                                className={`${inputClassName} ${textAlignment}`}
                            />

                            {errors.password && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-confirm-password"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.confirmPassword')}
                            </label>

                            <input
                                id="add-user-confirm-password"
                                type="password"
                                placeholder={placeholderText}
                                {...register('confirmPassword')}
                                className={`${inputClassName} ${textAlignment}`}
                            />

                            {errors.confirmPassword && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label
                                htmlFor="add-user-role"
                                className={`${labelClassName} ${textAlignment}`}
                            >
                                {t('addUserModal.role')}
                            </label>

                            <div className="relative w-full">
                                <select
                                    id="add-user-role"
                                    {...register('role')}
                                    className={`${inputClassName} appearance-none ${textAlignment} ${
                                        isArabic
                                            ? 'pl-12 pr-[14px] min-[1920px]:pl-14 min-[1920px]:pr-4 min-[2500px]:pl-16 min-[2500px]:pr-[18px]'
                                            : 'pl-[14px] pr-12 min-[1920px]:pl-4 min-[1920px]:pr-14 min-[2500px]:pl-[18px] min-[2500px]:pr-16'
                                    }`}
                                >
                                    <option value="" disabled>
                                        {placeholderText}
                                    </option>

                                    {USER_ROLES.map(role => (
                                        <option key={role} value={role}>
                                            {t(`roles.${role}`)}
                                        </option>
                                    ))}
                                </select>

                                <DropDown
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#12115C] min-[1920px]:h-[18px] min-[1920px]:w-[18px] min-[2500px]:h-5 min-[2500px]:w-5 ${
                                        isArabic
                                            ? 'left-4 min-[1920px]:left-5'
                                            : 'right-4 min-[1920px]:right-5'
                                    }`}
                                />
                            </div>

                            {errors.role && (
                                <p className={`${errorClassName} ${textAlignment}`}>
                                    {errors.role.message}
                                </p>
                            )}
                        </div>

                        <ActionButton
                            type="submit"
                            disabled={isSubmitting}
                            className="!mt-[6px] !h-12 !w-full !rounded-[8px] !bg-[#12115C] !px-5 !py-4 !text-[16px] !font-normal !leading-4 !text-white min-[1920px]:!h-[52px] min-[1920px]:!px-[22px] min-[1920px]:!text-[17px] min-[2500px]:!h-14 min-[2500px]:!px-6 min-[2500px]:!text-[18px]"
                        >
                            <span className={`flex items-center justify-center gap-2 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                                <span>{t('addUserModal.submit')}</span>
                                <Arrow
                                    aria-hidden="true"
                                    className={`h-4 w-4 shrink-0 min-[1920px]:h-[18px] min-[1920px]:w-[18px] min-[2500px]:h-5 min-[2500px]:w-5 ${
                                        isArabic ? 'rotate-180' : ''
                                    }`}
                                />
                            </span>
                        </ActionButton>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
