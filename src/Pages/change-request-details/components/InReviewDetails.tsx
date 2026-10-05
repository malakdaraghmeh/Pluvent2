import DownloadIcon from '@icons/download(5).svg?react';
import { useTranslation } from 'react-i18next';
import { AttachmentImageIcon, AttachmentPdfIcon, ChangeRequestSubmitterAvatar } from '@/assets';
import type { ChangeRequestAttachment } from '../../../../utils/types/change-request-details.types';

const attachments: ChangeRequestAttachment[] = [
    {
        id: 1,
        name: 'Blog_Listing_Wireframe.pdf',
        size: '1.2 MB',
        type: 'pdf',
    },
    {
        id: 2,
        name: 'Blog_Page_Reference.png',
        size: '1.8 MB',
        type: 'image',
    },
];

export default function InReviewDetails() {
    const { t, i18n } = useTranslation('changeRequestDetails');

    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    return (
        <section
            className={`flex min-w-0 flex-col gap-5 rounded-[16px] border border-[#E2E8F0] bg-white p-4 sm:p-5 xl:min-h-[439px] xl:justify-between xl:gap-0 xl:p-6 ${textAlignment}`}
        >
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-none text-[#1E293B] xl:text-[18px]">
                {t('sectionTitle')}
            </h2>

            <div
                className={`flex flex-col gap-4 rounded-[24px] border border-[#F1F5F9] p-4 sm:p-5 xl:min-h-[105px] xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:p-6`}
            >
                <div
                    className={`flex min-w-0 items-center gap-3 ${
                        isArabic ? 'flex-row-reverse' : 'flex-row'
                    }`}
                >
                    <img
                        src={ChangeRequestSubmitterAvatar}
                        alt={t('requesterName')}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className={`min-w-0 ${textAlignment}`}>
                        <span className="block font-['Sora'] text-[12px] font-normal leading-none text-[#94A3B8]">
                            {t('requestedBy')}
                        </span>

                        <strong className="mt-1 block break-words font-['Sora'] text-[13px] font-semibold leading-none text-[#1E293B]">
                            {t('requesterName')}
                        </strong>

                        <p className="mt-1 break-words font-['Sora'] text-[12px] font-normal leading-none text-[#64748B]">
                            {t('requesterRole')}
                        </p>
                    </div>
                </div>

                <div
                    className={`flex items-center justify-between gap-4 border-t border-[#E8EAEF] pt-3 xl:block xl:border-0 xl:pt-0 ${
                        isArabic ? 'flex-row-reverse xl:text-right' : 'flex-row xl:text-right'
                    }`}
                >
                    <span className="block font-['Sora'] text-[12px] font-normal leading-none text-[#94A3B8]">
                        {t('requestedOn')}
                    </span>

                    <div className={isArabic ? 'text-left xl:text-right' : 'text-right'}>
                        <strong className="block whitespace-nowrap font-['Sora'] text-[13px] font-semibold leading-none text-[#1E293B]">
                            {t('requestDate')}
                        </strong>

                        <span className="mt-1 block whitespace-nowrap font-['Sora'] text-[12px] font-normal leading-none text-[#94A3B8]">
                            {t('requestTime')}
                        </span>
                    </div>
                </div>
            </div>

            <div className={`xl:min-h-[90px] ${textAlignment}`}>
                <h3 className="mb-2 font-['Sora'] text-[12px] font-semibold leading-none text-[#64748B]">
                    {t('descriptionLabel')}
                </h3>

                <p className="break-words font-['Sora'] text-[14px] font-normal leading-[160%] text-[#334155]">
                    {t('descriptionText')}
                </p>
            </div>

            <div className={`xl:min-h-[84px] ${textAlignment}`}>
                <h3 className="mb-3 font-['Sora'] text-[12px] font-semibold leading-none text-[#64748B]">
                    {t('attachmentsLabel', {
                        count: attachments.length,
                    })}
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {attachments.map(attachment => {
                        const isPdf = attachment.type === 'pdf';

                        return (
                            <div
                                key={attachment.id}
                                className="relative h-[55px] min-w-0 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-[52px] py-[9px]"
                            >
                                <div
                                    className={`absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg ${
                                        attachment.type === 'pdf'
                                            ? 'bg-[#EF444415]'
                                            : 'bg-[#3B82F615]'
                                    }`}
                                >
                                    {isPdf ? (
                                        <AttachmentPdfIcon className="h-[18px] w-[18px]" />
                                    ) : (
                                        <img
                                            src={AttachmentImageIcon}
                                            alt=""
                                            className="h-[18px] w-[18px] object-contain"
                                        />
                                    )}
                                </div>

                                <div className="min-w-0 text-left">
                                    <p className="truncate font-['Sora'] text-[12px] font-semibold leading-[140%] text-[#1E293B]">
                                        {attachment.name}
                                    </p>

                                    <span className="block font-['Sora'] text-[11px] font-normal leading-[140%] text-[#94A3B8]">
                                        {attachment.size}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    aria-label={attachment.name}
                                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#3634C7]"
                                >
                                    <DownloadIcon size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}