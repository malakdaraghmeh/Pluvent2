import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { File, LogoPulvent, Upload } from '@/assets';

import type { FileDocumentsProps } from '../../../../utils/types/project-details.types';

import { fileDocumentsData } from '../data/fileDocuments';

const FileDocuments = ({ showViewAll = true, showUpload = true }: FileDocumentsProps) => {
    const { t, i18n } = useTranslation('fileDocuments');
    const { locale = 'en' } = useParams();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const dateLocale = i18n.language.startsWith('ar') ? 'ar-EG' : 'en-US';

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

    return (
        <section className="flex h-full w-full max-w-none flex-col gap-3 rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 md:p-6">
            {' '}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[22px] font-semibold text-[#12115C]">{t('title')}</h2>

                {showViewAll && (
                    <Link
                        to={`/${locale}/file-and-document`}
                        className="self-start text-[16px] font-medium text-[#3634C7] transition-opacity hover:opacity-70 sm:self-auto"
                    >
                        {t('viewAll')}
                    </Link>
                )}
            </div>
            <div className="flex flex-col gap-3">
                {fileDocumentsData.map(file => (
                    <div
                        key={file.id}
                        className="flex w-full min-w-0 flex-col gap-3 rounded-[16px] border border-[#F3F4F6] bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4"
                    >
                        <div className="flex w-full min-w-0 items-center gap-3">
                            <div
                                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] ${
                                    file.type === 'pulvent' ? 'bg-[#00E5C810]' : 'bg-[#2F1ABD10]'
                                }`}
                            >
                                {file.type === 'pulvent' ? (
                                    <LogoPulvent className="h-5 w-5" />
                                ) : (
                                    <File className="h-5 w-5" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="break-words text-[15px] font-semibold text-[#12115C]">
                                    {file.fileName}
                                </p>

                                <p className="mt-1 break-words text-[12px] leading-[18px] text-[#6B7280]">
                                    {t('uploadedBy')} : {file.uploadedBy} | {file.size} ·{' '}
                                    {formatDate(file.date)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="shrink-0 self-end text-[16px] font-semibold text-[#3634C7] transition-opacity hover:opacity-70 sm:self-auto"
                        >
                            {t('download')}
                        </button>
                    </div>
                ))}
            </div>
            {showUpload && (
                <>
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="flex w-full flex-col items-center justify-center gap-3 rounded-[20px] border-[1.5px] border-dashed border-[#E2E8F0] bg-white p-4 text-center transition-colors hover:bg-[#F8FAFC] sm:flex-row sm:gap-4 sm:p-5 md:p-6"
                    >
                        <div className="flex shrink-0 items-center justify-center">
                            <Upload />
                        </div>

                        <div className="min-w-0">
                            <p className="break-words text-[16px] font-semibold leading-snug text-[#12115C]">
                                {t('dropFiles')}
                            </p>

                            <p className="mt-1 break-words text-[13px] leading-relaxed text-[#6B7280]">
                                {t('fileTypes')}
                            </p>
                        </div>
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.zip"
                        multiple
                    />
                </>
            )}
        </section>
    );
};

export default FileDocuments;
