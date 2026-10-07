import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
    type FormEvent,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    SupportTicketFolderUploadIcon,
    SupportTicketReplyLogo,
    SupportTicketViewArrowIcon,
} from '@/assets';
import ActionButton from '@/components/ui/ActionButton';

import type {
    SupportTicket,
    SupportTicketStatus,
    TicketDetailsLocationState,
} from '../../../../utils/types/support-tickets.types';

import ClosedTicketDetails from './components/ClosedTicketDetails';
import PendingReplyTicketDetails from './components/PendingReplyTicketDetails';

export default function TicketDetails() {
    const { id } = useParams();
    const location = useLocation();
    const { t, i18n } = useTranslation('tickets');

    const state = location.state as TicketDetailsLocationState | null;
    const ticket = state?.ticket;

    const isArabic = i18n.language.startsWith('ar');

    const [ticketStatus, setTicketStatus] = useState<SupportTicketStatus>(ticket?.status ?? 'open');

    const [description, setDescription] = useState(t('details.form.defaultDescription'));

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const ticketId = ticket?.id || id || '2023-CS123';
    const uploadedBy = ticket?.uploadedBy || 'Maryam Hosam';
    const ticketDate = ticket?.date || '2025 - 12:45 AM';

    const ticketType =
        ticketStatus === 'pendingReply' || ticketStatus === 'closed'
            ? 'general'
            : ticket?.type || 'project';

    const resolvedTicket: SupportTicket = {
        id: ticketId,
        status: ticketStatus,
        type: ticketType,
        uploadedBy,
        date: ticketDate,
        contentKey: ticket?.contentKey || 'card.description',
        replyStatus: ticket?.replyStatus || {
            type: 'repliedPreview',
            textKey: 'reply.previewDescription',
        },
    };

    useEffect(() => {
        setTicketStatus(ticket?.status ?? 'open');
    }, [ticket?.status]);

    useEffect(() => {
        setDescription(t('details.form.defaultDescription'));
    }, [i18n.language, t]);

    const addFiles = (selectedFiles: FileList | null) => {
        if (!selectedFiles?.length) return;

        setFiles(current => [...current, ...Array.from(selectedFiles)]);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        addFiles(event.dataTransfer.files);
    };

    const removeFile = (indexToRemove: number) => {
        setFiles(current => current.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        window.alert(t('details.form.successAlert'));
    };

    const handleCloseTicket = () => {
        setTicketStatus('closed');
    };

    const handleReopenTicket = () => {
        setTicketStatus('open');
    };

    const handleRemind = () => {
        // API integration will be connected here.
    };

    return (
        <main className="min-h-screen w-full bg-[#F4F6FB] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1086px] min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
                {ticketStatus === 'pendingReply' ? (
                    <PendingReplyTicketDetails
                        ticket={resolvedTicket}
                        onCloseTicket={handleCloseTicket}
                        onRemind={handleRemind}
                    />
                ) : ticketStatus === 'closed' ? (
                    <ClosedTicketDetails
                        ticket={resolvedTicket}
                        onReopenTicket={handleReopenTicket}
                    />
                ) : (
                    <div className="flex w-full flex-col gap-6">
                        <h1
                            className={`font-['Sora',sans-serif] text-[28px] font-semibold leading-[28px] tracking-normal text-[#12115C] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        >
                            {t('details.title')}
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full flex-col gap-4 rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 lg:min-h-[857px] lg:p-6"
                        >
                            <section className="flex w-full flex-col gap-4">
                                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-[20px] font-semibold leading-[32px] tracking-normal text-[#2E2C34]">
                                                {t('details.ticketNumber', {
                                                    id: ticketId,
                                                })}
                                            </h2>

                                            <span className="flex h-[30px] w-[64px] shrink-0 items-center justify-center rounded-[4px] bg-[#2F1ABD10] px-3 text-[14px] font-semibold leading-[16px] text-[#2F1ABD]">
                                                {t('status.open')}
                                            </span>
                                        </div>

                                        <p className="text-[18px] font-normal leading-[32px] tracking-normal text-[#6B7280]">
                                            {t('details.uploadBy', {
                                                name: uploadedBy,
                                            })}
                                        </p>
                                    </div>

                                    <div
                                        className={`flex shrink-0 flex-col gap-4 ${
                                            isArabic
                                                ? 'items-start text-left'
                                                : 'items-end text-right'
                                        }`}
                                    >
                                        <p className="text-[18px] font-bold leading-[20px] tracking-normal text-[#12115C]">
                                            {t(`type.${ticketType}`)}
                                        </p>

                                        <p className="text-[14px] font-normal leading-[20px] tracking-normal text-[#84818A]">
                                            {t('details.postedAt', {
                                                time: ticketDate,
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full flex-col gap-4">
                                    <h3
                                        className={`text-[18px] font-semibold leading-[14px] tracking-normal text-[#2E2C34] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {t('details.questionTitle')}
                                    </h3>

                                    <div
                                        className={`flex w-full flex-col gap-4 text-[14px] font-normal leading-[20px] tracking-normal text-[#84818A] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        <p>{t('details.questionParagraphOne')}</p>

                                        <p>{t('details.questionParagraphTwo')}</p>

                                        <p>{t('details.questionParagraphOne')}</p>
                                    </div>
                                </div>

                                <div
                                    className={`flex min-h-[82px] w-full items-end ${
                                        isArabic ? 'justify-start' : 'justify-end'
                                    }`}
                                >
                                    <div
                                        className={`flex max-w-full items-end gap-2 ${
                                            isArabic ? 'flex-row-reverse' : 'flex-row'
                                        }`}
                                    >
                                        <div
                                            className={`flex min-w-0 flex-col ${
                                                isArabic ? 'items-start' : 'items-end'
                                            }`}
                                        >
                                            <div
                                                className={`mb-1 flex h-[20px] items-center gap-4 px-1 ${
                                                    isArabic ? 'flex-row-reverse' : 'flex-row'
                                                }`}
                                            >
                                                <span className="text-[14px] font-semibold leading-[19.6px] text-[#12115C]">
                                                    {t('details.responseAuthor')}
                                                </span>

                                                <span className="text-[12px] font-normal leading-[16.8px] text-[#6B7280]">
                                                    {t('details.responseTime')}
                                                </span>
                                            </div>

                                            <div className="relative flex min-h-[48px] w-full max-w-[532px] items-center rounded-[100px] bg-[#12115C] px-4 py-[14px]">
                                                <p
                                                    className={`w-full font-['Sora',sans-serif] text-[13px] font-normal leading-[18.2px] tracking-normal text-[#F7F6F7] ${
                                                        isArabic ? 'text-right' : 'text-left'
                                                    }`}
                                                >
                                                    {t('details.responseMessage')}
                                                </p>

                                                <span
                                                    className={`absolute bottom-[-7px] h-[8px] w-[30px] bg-[#12115C] [clip-path:polygon(0_0,100%_0,100%_100%)] ${
                                                        isArabic ? 'left-3 scale-x-[-1]' : 'right-3'
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[32px] bg-[#12115C] p-2">
                                            <img
                                                src={SupportTicketReplyLogo}
                                                alt=""
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="flex w-full flex-col gap-10">
                                <div className="flex w-full flex-col gap-1">
                                    <label
                                        htmlFor="ticket-description"
                                        className={`text-[14px] font-normal leading-[18px] tracking-normal text-[#2E2C34] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {t('details.form.descriptionLabel')}{' '}
                                        <span className="text-[#F23333]">*</span>
                                    </label>

                                    <textarea
                                        id="ticket-description"
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                        required
                                        className={`min-h-[120px] w-full resize-none rounded-[12px] border border-[#E2E8F0] bg-[#F4F6FA] p-[14px] text-[14px] font-normal leading-[21px] tracking-normal text-[#0F172A] outline-none transition-colors focus:border-[#12115C] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-[10px]">
                                    <p
                                        className={`text-[14px] font-normal leading-[14px] tracking-normal text-[#2E2C34] ${
                                            isArabic ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {t('details.form.attachmentsLabel')}{' '}
                                        <span className="text-[#84818A]">
                                            {t('details.form.optional')}
                                        </span>
                                    </p>

                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => fileInputRef.current?.click()}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                fileInputRef.current?.click();
                                            }
                                        }}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`flex min-h-[96px] w-full cursor-pointer items-center justify-center gap-4 rounded-[20px] border-[1.5px] border-dashed p-6 transition-colors ${
                                            isDragging
                                                ? 'border-[#39E1D7] bg-[#F4FFFE]'
                                                : 'border-[#E2E8F0] bg-[#FDFDFE]'
                                        }`}
                                    >
                                        <SupportTicketFolderUploadIcon className="h-10 w-10 shrink-0" />

                                        <div className="min-w-0 text-center">
                                            <p className="font-['Sora',sans-serif] text-[16px] font-semibold leading-[16px] tracking-normal text-[#12115C]">
                                                {t('details.form.dropzoneTitle')}
                                            </p>

                                            <p className="mt-2 font-['Sora',sans-serif] text-[13px] font-normal leading-[13px] tracking-normal text-[#6B7280]">
                                                {t('details.form.dropzoneHint')}
                                            </p>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {files.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {files.map((file, index) => (
                                                <button
                                                    key={`${file.name}-${index}`}
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="rounded-[8px] border border-[#E2E8F0] bg-white px-3 py-2 text-[12px] text-[#6B7280]"
                                                >
                                                    {file.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`flex w-full flex-col gap-3 sm:flex-row sm:items-center ${
                                        isArabic ? 'sm:justify-start' : 'sm:justify-end'
                                    } sm:gap-4`}
                                >
                                    <ActionButton
                                        type="button"
                                        onClick={handleCloseTicket}
                                        className="!h-[44px] !w-full !rounded-[16px] !border !border-[#F23333] !bg-white !px-4 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] !text-[#F23333] sm:!w-[240px] 3xl:!h-[44px] 3xl:!w-[240px] 3xl:!rounded-[16px] 3xl:!px-4 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[240px] 4xl:!rounded-[16px] 4xl:!px-4 4xl:!text-[18px]"
                                    >
                                        {t('details.form.closeTicket')}
                                    </ActionButton>

                                    <ActionButton
                                        type="submit"
                                        trailingIcon={
                                            <SupportTicketViewArrowIcon
                                                className={`h-4 w-4 shrink-0 ${
                                                    isArabic ? 'rotate-180' : ''
                                                }`}
                                            />
                                        }
                                        className={`!h-[44px] !w-full !gap-2 !rounded-[16px] !bg-[#12115C] !px-5 !font-['Sora',sans-serif] !text-[18px] !font-normal !leading-[28px] !text-white sm:!w-[240px] 3xl:!h-[44px] 3xl:!w-[240px] 3xl:!rounded-[16px] 3xl:!px-5 3xl:!text-[18px] 4xl:!h-[44px] 4xl:!w-[240px] 4xl:!rounded-[16px] 4xl:!px-5 4xl:!text-[18px] ${isArabic ? '!flex-row-reverse' : ''}`}
                                    >
                                        {t('details.form.submitTicket')}
                                    </ActionButton>
                                </div>
                            </section>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}


