import { useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ModalCloseIcon,
    SupportTicketFilterArrowIcon,
    SupportTicketViewArrowIcon,
    Upload,
} from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import type { CreateSupportInquiryFormProps } from '../../../../../utils/types/create-support-inquiry.types';

export default function CreateSupportInquiryForm({
    projectId,
    requestType,
    showWarrantyNotice = false,
    onSubmitted,
}: CreateSupportInquiryFormProps) {
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const [subject, setSubject] = useState('');
    const [ticketCategory, setTicketCategory] = useState('technical');
    const [issueType, setIssueType] = useState('bug');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const addFiles = (selectedFiles: FileList | File[]) => {
        setFiles(currentFiles => [
            ...currentFiles,
            ...Array.from(selectedFiles),
        ]);
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files?.length) return;

        addFiles(event.target.files);
        event.target.value = '';
    };

    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.files.length) {
            addFiles(event.dataTransfer.files);
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(currentFiles =>
            currentFiles.filter(
                (_, index) => index !== indexToRemove,
            ),
        );
    };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        console.log({
            projectId,
            requestType,
            subject,
            ticketCategory,
            issueType,
            description,
            files,
        });

        alert(t('createModal.successAlert'));
        onSubmitted?.();
    };

    return (
        <>
            {showWarrantyNotice && (
                <div
                    className={`rounded-[16px] border border-[#39E1D7] bg-[#39E1D71A] p-4 sm:p-5 3xl:p-6 ${textAlignment}`}
                >
                    <p className="text-[14px] font-semibold leading-5 text-[#12115C] 3xl:text-[15px] 4xl:text-[16px]">
                        {t('createModal.warrantyNotice')}
                    </p>

                    <p className="mt-1 text-[12px] font-normal leading-[18px] text-[#5C5B94] 3xl:text-[13px] 3xl:leading-5 4xl:text-[14px]">
                        {t('createModal.warrantyDetails')}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-6 3xl:gap-7 4xl:gap-8"
            >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 3xl:gap-5 4xl:gap-6">
                    <div className={`flex min-w-0 flex-col gap-2 ${textAlignment}`}>
                        <label
                            htmlFor="support-subject"
                            className="text-[14px] font-semibold leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]"
                        >
                            {t('createModal.fields.subject.label')}{' '}
                            <span className="text-[#FF3B30]">*</span>
                        </label>

                        <input
                            id="support-subject"
                            type="text"
                            required
                            value={subject}
                            onChange={event =>
                                setSubject(event.target.value)
                            }
                            placeholder={t(
                                'createModal.fields.subject.placeholder',
                            )}
                            className={`h-[48px] w-full rounded-[12px] border border-transparent bg-[#F3F4F8] px-4 text-[14px] font-normal text-[#2E2C34] outline-none transition-colors placeholder:text-[#A0A3AD] focus:border-[#39E1D7] focus:bg-white 3xl:h-[52px] 3xl:text-[15px] 4xl:h-[56px] 4xl:text-[16px] ${textAlignment}`}
                        />
                    </div>

                    <div className={`flex min-w-0 flex-col gap-2 ${textAlignment}`}>
                        <label
                            htmlFor="support-category"
                            className="text-[14px] font-semibold leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]"
                        >
                            {t('createModal.fields.category.label')}{' '}
                            <span className="text-[#FF3B30]">*</span>
                        </label>

                        <div className="relative">
                            <select
                                id="support-category"
                                value={ticketCategory}
                                onChange={event =>
                                    setTicketCategory(event.target.value)
                                }
                                className={`h-[48px] w-full cursor-pointer appearance-none rounded-[12px] border border-transparent bg-[#F3F4F8] text-[14px] font-normal text-[#2E2C34] outline-none transition-colors focus:border-[#39E1D7] focus:bg-white 3xl:h-[52px] 3xl:text-[15px] 4xl:h-[56px] 4xl:text-[16px] ${
                                    isArabic
                                        ? 'pl-11 pr-4 text-right'
                                        : 'pl-4 pr-11 text-left'
                                }`}
                            >
                                <option value="technical">
                                    {t('createModal.categories.technical')}
                                </option>

                                <option value="design">
                                    {t('createModal.categories.design')}
                                </option>

                                <option value="billing">
                                    {t('createModal.categories.billing')}
                                </option>
                            </select>

                            <SupportTicketFilterArrowIcon
                                className={`pointer-events-none absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 -rotate-90 ${
                                    isArabic ? 'left-4' : 'right-4'
                                }`}
                            />
                        </div>
                    </div>

                    <div className={`flex min-w-0 flex-col gap-2 ${textAlignment}`}>
                        <label
                            htmlFor="support-issue-type"
                            className="text-[14px] font-semibold leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]"
                        >
                            {t('createModal.fields.issueType.label')}
                        </label>

                        <div className="relative">
                            <select
                                id="support-issue-type"
                                value={issueType}
                                onChange={event =>
                                    setIssueType(event.target.value)
                                }
                                className={`h-[48px] w-full cursor-pointer appearance-none rounded-[12px] border border-transparent bg-[#F3F4F8] text-[14px] font-normal text-[#2E2C34] outline-none transition-colors focus:border-[#39E1D7] focus:bg-white 3xl:h-[52px] 3xl:text-[15px] 4xl:h-[56px] 4xl:text-[16px] ${
                                    isArabic
                                        ? 'pl-11 pr-4 text-right'
                                        : 'pl-4 pr-11 text-left'
                                }`}
                            >
                                <option value="bug">
                                    {t('createModal.issueTypes.bug')}
                                </option>

                                <option value="feature">
                                    {t('createModal.issueTypes.feature')}
                                </option>

                                <option value="question">
                                    {t('createModal.issueTypes.question')}
                                </option>
                            </select>

                            <SupportTicketFilterArrowIcon
                                className={`pointer-events-none absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 -rotate-90 ${
                                    isArabic ? 'left-4' : 'right-4'
                                }`}
                            />
                        </div>
                    </div>
                </div>

                <div className={`flex w-full flex-col gap-2 ${textAlignment}`}>
                    <label
                        htmlFor="support-description"
                        className="text-[14px] font-semibold leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]"
                    >
                        {t('createModal.fields.description.label')}{' '}
                        <span className="text-[#FF3B30]">*</span>
                    </label>

                    <textarea
                        id="support-description"
                        required
                        rows={5}
                        value={description}
                        onChange={event =>
                            setDescription(event.target.value)
                        }
                        placeholder={t(
                            'createModal.fields.description.placeholder',
                        )}
                        className={`min-h-[130px] w-full resize-none rounded-[12px] border border-transparent bg-[#F3F4F8] p-4 text-[14px] font-normal leading-6 text-[#2E2C34] outline-none transition-colors placeholder:text-[#A0A3AD] focus:border-[#39E1D7] focus:bg-white 3xl:min-h-[150px] 3xl:text-[15px] 4xl:min-h-[170px] 4xl:text-[16px] ${textAlignment}`}
                    />
                </div>

                <div className={`flex w-full flex-col gap-2 ${textAlignment}`}>
                    <label className="text-[14px] font-semibold leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]">
                        {t('createModal.fields.upload.label')}{' '}
                        <span className="font-normal text-[#8C8C9A]">
                            ({t('createModal.fields.upload.optional')})
                        </span>
                    </label>

                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex min-h-[150px] w-full items-center justify-center rounded-[16px] border-2 border-dashed px-4 py-6 transition-colors 3xl:min-h-[170px] 4xl:min-h-[190px] ${
                            isDragging
                                ? 'border-[#39E1D7] bg-[#39E1D70D]'
                                : 'border-[#DDE0E8] bg-white'
                        }`}
                    >
                        <input
                            id="support-file-input"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <label
                            htmlFor="support-file-input"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 text-center"
                        >
                            <Upload className="h-8 w-8 shrink-0 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10" />

                            <span className="text-[14px] font-semibold leading-5 text-[#12115C] 3xl:text-[15px] 4xl:text-[16px]">
                                {t('createModal.dropzone.title')}
                            </span>

                            <span className="text-[12px] font-normal leading-[18px] text-[#8C8C9A] 3xl:text-[13px] 4xl:text-[14px]">
                                {t('createModal.dropzone.hint')}
                            </span>
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-2 flex w-full flex-col gap-2">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${file.lastModified}-${index}`}
                                    className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[12px] bg-[#F3F4F8] px-4 py-2 3xl:min-h-[48px]"
                                >
                                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#2E2C34] 3xl:text-[14px] 4xl:text-[15px]">
                                        {file.name}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFile(index)
                                        }
                                        aria-label={t(
                                            'createModal.removeAttachment',
                                        )}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#E7E8EE]"
                                    >
                                        <ModalCloseIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex w-full justify-end">
                    <ActionButton
                        type="submit"
                        trailingIcon={
                            <SupportTicketViewArrowIcon
                                className={`h-4 w-4 shrink-0 ${
                                    isArabic ? 'rotate-180' : ''
                                }`}
                            />
                        }
                        className="!h-[44px] !w-full !rounded-[16px] !px-6 !text-[16px] !font-normal sm:!w-auto sm:!min-w-[190px] 3xl:!h-[48px] 3xl:!min-w-[210px] 3xl:!text-[17px] 4xl:!h-[52px] 4xl:!min-w-[230px] 4xl:!text-[18px]"
                    >
                        {t('createModal.submitBtn')}
                    </ActionButton>
                </div>
            </form>
        </>
    );
}