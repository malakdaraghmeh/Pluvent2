import { useRef, useState, type DragEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { File, LogoPulvent, Upload } from '@/assets';
import type { FileDocumentsProps } from '../../../../utils/types/file-and-document.types';
import { fileDocumentsData } from '../data/fileDocuments';

const FileDocuments = ({
    files = fileDocumentsData,
    variant = 'project',
    showTitle = true,
    showViewAll = true,
    showUpload = true,
}: FileDocumentsProps) => {
    const { t, i18n } = useTranslation('fileDocuments');
    const { t: filesT } = useTranslation('files');
    const { locale = 'en', id, projectId } = useParams();

    const currentProjectId = id ?? projectId;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';
    const dateLocale = isArabic ? 'ar-EG' : 'en-US';

    const formatDate = (value: string) => {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat(dateLocale, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const uploadArea = (
        <>
            <button
                type="button"
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex w-full items-center justify-center border-dashed transition-colors ${
                    variant === 'all'
                        ? `min-h-[190px] flex-col gap-3 rounded-[16px] border-[1.5px] px-4 py-6 ${
                              isDragOver
                                  ? 'border-[#39E1D7] bg-[#F3FFFD]'
                                  : 'border-[#D9D9D9] bg-white hover:border-[#39E1D7]'
                          }`
                        : `flex-col gap-4 rounded-[20px] border-[1.5px] px-6 py-4 sm:flex-row xl:h-[96px] ${
                              isDragOver
                                  ? 'border-[#39E1D7] bg-[#F3FFFD]'
                                  : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                          }`
                }`}
            >
                <Upload
                    className={
                        variant === 'all'
                            ? 'h-10 w-10 shrink-0'
                            : 'h-10 w-10 shrink-0'
                    }
                />

                <div className={`min-w-0 ${textAlignment}`}>
                    <p
                        className={`${
                            variant === 'all'
                                ? 'text-[14px]'
                                : 'text-[16px]'
                        } font-semibold leading-5 text-[#12115C]`}
                    >
                        {variant === 'all'
                            ? filesT('dropzoneTitle')
                            : t('dropFiles')}
                    </p>

                    <p
                        className={`mt-1 ${
                            variant === 'all'
                                ? 'text-[12px]'
                                : 'text-[13px]'
                        } font-normal leading-[18px] text-[#7E8492]`}
                    >
                        {variant === 'all'
                            ? filesT('dropzoneHint')
                            : t('fileTypes')}
                    </p>
                </div>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                multiple
            />
        </>
    );

    const filesList = (
        <div
            className={`flex flex-col ${
                variant === 'all'
                    ? 'max-h-[370px] gap-3 overflow-y-auto pe-2 min-[1920px]:max-h-[460px] min-[2500px]:max-h-[540px]'
                    : 'gap-4'
            }`}
        >
            {files.map(file => (
                <div
                    key={file.id}
                    className={`flex w-full min-w-0 flex-col rounded-[16px] border border-[#F3F4F6] bg-white sm:flex-row sm:items-center sm:justify-between ${
                        variant === 'all'
                            ? 'gap-3 p-3 sm:gap-4 sm:p-4'
                            : 'min-h-[76px] gap-4 p-4 xl:h-[76px]'
                    }`}
                >
                    <div className="flex w-full min-w-0 items-center gap-3">
                        <div
                            className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] ${
                                file.type === 'pulvent'
                                    ? 'bg-[#00E5C810]'
                                    : 'bg-[#2F1ABD10]'
                            }`}
                        >
                            {file.type === 'pulvent' ? (
                                <LogoPulvent className="h-5 w-5" />
                            ) : (
                                <File className="h-5 w-5" />
                            )}
                        </div>

                        <div className={`min-w-0 flex-1 ${textAlignment}`}>
                            <p className="truncate text-[14px] font-semibold leading-5 text-[#12115C] sm:text-[15px]">
                                {file.fileName}
                            </p>

                            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-normal leading-[18px] text-[#7E8492] sm:text-[12px]">
                                <span>
                                    {t('uploadedBy')} : {file.uploadedBy}
                                </span>

                                <span>&bull;</span>

                                <span>{file.size}</span>

                                <span>&bull;</span>

                                <span>{formatDate(file.date)}</span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="shrink-0 self-end text-[14px] font-semibold text-[#12115C] transition-opacity hover:opacity-70 sm:self-auto sm:text-[16px]"
                    >
                        {t('download')}
                    </button>
                </div>
            ))}
        </div>
    );

    if (variant === 'all') {
        return (
            <div className="flex w-full flex-col gap-5">
                {showUpload && uploadArea}
                {filesList}
            </div>
        );
    }

    return (
        <section className="flex w-full min-w-0 flex-col gap-4 rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 xl:p-6">
            {showTitle && (
                <div
                    className={`flex min-h-[28px] flex-col gap-2 sm:items-center sm:justify-between ${
                        isArabic
                            ? 'sm:flex-row-reverse'
                            : 'sm:flex-row'
                    }`}
                >
                    <h2
                        className={`text-[22px] font-semibold leading-[28px] text-[#12115C] ${textAlignment}`}
                    >
                        {t('title')}
                    </h2>

                    {showViewAll && (
                        <Link
                            to={`/${locale}/projects/${currentProjectId}/files`}
                            className="self-start text-[16px] font-medium text-[#3634C7] transition-opacity hover:opacity-70 sm:self-auto"
                        >
                            {t('viewAll')}
                        </Link>
                    )}
                </div>
            )}

            {filesList}

            {showUpload && uploadArea}
        </section>
    );
};

export default FileDocuments;