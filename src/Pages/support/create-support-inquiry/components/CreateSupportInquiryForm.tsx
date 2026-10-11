import { useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalCloseIcon, SupportTicketViewArrowIcon, Upload } from '@/assets';
import { SupportInquiryCheckCircleIcon as checkCircleIcon } from '@/assets';
import { SupportInquiryInfoIcon as infoIcon } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import GeneralSelect from '@/components/ui/GeneralSelect';
import type { CreateSupportInquiryFormProps } from '../../../../../utils/types/create-support-inquiry.types';

export default function CreateSupportInquiryForm({
    requestType,
    showWarrantyNotice = false,
    onSubmitted,
}: CreateSupportInquiryFormProps) {
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const [subject, setSubject] = useState(() => t('createModal.fields.subject.placeholder'));

    const [ticketCategory, setTicketCategory] = useState('technical');

    const [description, setDescription] = useState(() =>
        t('createModal.fields.description.placeholder')
    );

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const addFiles = (selectedFiles: FileList | File[]) => {
        setFiles(currentFiles => [...currentFiles, ...Array.from(selectedFiles)]);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }

        addFiles(event.target.files);
        event.target.value = '';
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.files.length) {
            addFiles(event.dataTransfer.files);
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (requestType === 'general') {
            onSubmitted?.();
            return;
        }

        onSubmitted?.();
    };

    return (
        <>
            {showWarrantyNotice && (
                <div
                    className={`flex w-full items-center justify-between gap-4 rounded-[12px] border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 3xl:px-5 3xl:py-4 4xl:px-6 ${
                        isArabic ? 'flex-row-reverse' : ''
                    }`}
                >
                    <div
                        className={`flex min-w-0 flex-1 items-center gap-3 ${
                            isArabic ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <img src={infoIcon} alt="" className="h-5 w-5 shrink-0 3xl:h-6 3xl:w-6" />

                        <div className={`min-w-0 ${textAlignment}`}>
                            <p className="text-[14px] font-bold leading-[18px] text-[#065F46] 3xl:text-[15px] 4xl:text-[17px]">
                                {t('createModal.warrantyNotice')}
                            </p>

                            <p className="mt-1 text-[12px] font-normal leading-[16px] text-[#047857] 3xl:text-[13px] 4xl:text-[15px]">
                                {t('createModal.warrantyDetails')}
                            </p>
                        </div>
                    </div>

                    <img
                        src={checkCircleIcon}
                        alt=""
                        className="h-5 w-5 shrink-0 3xl:h-6 3xl:w-6"
                    />
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-5 3xl:gap-6 4xl:gap-8"
            >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 3xl:gap-5 4xl:gap-6">
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
                            onChange={event => setSubject(event.target.value)}
                            placeholder={t('createModal.fields.subject.placeholder')}
                            className={`h-[48px] w-full rounded-[12px] border border-transparent bg-[#F3F4F8] px-4 text-[14px] font-normal text-[#2E2C34] outline-none transition-colors placeholder:text-[#A0A3AD] focus:border-[#39E1D7] focus:bg-white 3xl:h-[54px] 3xl:px-5 3xl:text-[15px] 4xl:h-[60px] 4xl:text-[16px] ${textAlignment}`}
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

                        <GeneralSelect
                            id="support-category"
                            value={ticketCategory}
                            placeholder={t('createModal.categories.technical')}
                            options={[
                                {
                                    label: t('createModal.categories.technical'),
                                    value: 'technical',
                                },
                                {
                                    label: t('createModal.categories.design'),
                                    value: 'design',
                                },
                                {
                                    label: t('createModal.categories.billing'),
                                    value: 'billing',
                                },
                            ]}
                            isArabic={isArabic}
                            onChange={setTicketCategory}
                        />
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
                        onChange={event => setDescription(event.target.value)}
                        placeholder={t('createModal.fields.description.placeholder')}
                        className={`min-h-[130px] w-full resize-none rounded-[12px] border border-transparent bg-[#F3F4F8] p-4 text-[14px] font-normal leading-6 text-[#2E2C34] outline-none transition-colors placeholder:text-[#A0A3AD] focus:border-[#39E1D7] focus:bg-white 3xl:min-h-[160px] 3xl:p-5 3xl:text-[15px] 4xl:min-h-[190px] 4xl:text-[16px] ${textAlignment}`}
                    />
                </div>

                <div className={`flex w-full flex-col gap-2 ${textAlignment}`}>
                    <label className="text-[14px] font-normal leading-5 text-[#2E2C34] 3xl:text-[15px] 4xl:text-[16px]">
                        {t('createModal.fields.upload.label')}{' '}
                        <span className="font-normal text-[#8C8C9A]">
                            ({t('createModal.fields.upload.optional')})
                        </span>
                    </label>

                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex min-h-[150px] w-full items-center justify-center rounded-[16px] border-2 border-dashed px-4 py-6 transition-colors 3xl:min-h-[190px] 4xl:min-h-[220px] ${
                            isDragging
                                ? 'border-[#39E1D7] bg-[#39E1D70D]'
                                : 'border-[#DDE0E8] bg-white'
                        }`}
                    >
                        <input
                            id="support-file-input"
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <label
                            htmlFor="support-file-input"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 text-center"
                        >
                            <Upload className="h-8 w-8 shrink-0 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12" />

                            <span className="text-[14px] font-semibold leading-5 text-[#12115C] 3xl:text-[15px] 4xl:text-[17px]">
                                {t('createModal.dropzone.title')}
                            </span>

                            <span className="text-[12px] font-normal leading-[18px] text-[#8C8C9A] 3xl:text-[13px] 4xl:text-[15px]">
                                {t('createModal.dropzone.hint')}
                            </span>
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-2 flex w-full flex-col gap-2">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${file.lastModified}-${index}`}
                                    className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[12px] bg-[#F3F4F8] px-4 py-2 ${
                                        isArabic ? 'flex-row-reverse' : ''
                                    }`}
                                >
                                    <span
                                        className={`min-w-0 flex-1 truncate text-[13px] font-medium text-[#2E2C34] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {file.name}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        aria-label={t('createModal.removeAttachment')}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#E7E8EE]"
                                    >
                                        <ModalCloseIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`flex w-full ${isArabic ? 'justify-start' : 'justify-end'}`}>
                    <ActionButton
                        type="submit"
                        trailingIcon={
                            <SupportTicketViewArrowIcon
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 3xl:h-[18px] 3xl:w-[18px]"
                            />
                        }
                        className="!h-[44px] !w-full !rounded-[16px] !px-5 !text-[16px] !font-normal sm:!w-auto sm:!min-w-[150px] 3xl:!h-[50px] 3xl:!min-w-[190px] 3xl:!px-7 3xl:!text-[17px] 4xl:!h-[56px] 4xl:!min-w-[220px] 4xl:!text-[18px]"
                    >
                        {t('createModal.submitBtn')}
                    </ActionButton>
                </div>
            </form>
        </>
    );
}
