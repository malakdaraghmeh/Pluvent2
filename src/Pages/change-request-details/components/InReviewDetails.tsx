import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChangeRequestSubmitterAvatar } from '@/assets';
import FileIcon from '@icons/file-text.svg?react';
import ImageIcon from '@icons/image.svg?react';
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
    const { t } = useTranslation('changeRequestDetails');

    return (
        <section className="flex min-w-0 flex-col gap-5 rounded-[20px] border border-[#E8EAEF] bg-white p-6">
            <h2 className="font-['Sora'] text-[16px] font-semibold leading-[120%] text-[#1E293B]">
                {t('sectionTitle')}
            </h2>

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E8EAEF] p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-3">
                    <img
                        src={ChangeRequestSubmitterAvatar}
                        alt={t('requesterName')}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
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

                <div className="flex items-center justify-between gap-4 border-t border-[#E8EAEF] pt-3 sm:block sm:border-0 sm:pt-0 sm:text-end">
                    <span className="block font-['Sora'] text-[12px] font-normal leading-none text-[#94A3B8]">
                        {t('requestedOn')}
                    </span>

                    <div>
                        <strong className="block font-['Sora'] text-[13px] font-semibold leading-none text-[#1E293B]">
                            {t('requestDate')}
                        </strong>

                        <span className="mt-1 block font-['Sora'] text-[12px] font-normal leading-none text-[#94A3B8]">
                            {t('requestTime')}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="mb-2 font-['Sora'] text-[12px] font-semibold leading-none text-[#64748B]">
                    {t('descriptionLabel')}
                </h3>

                <p className="break-words font-['Sora'] text-[13px] font-normal leading-[150%] text-[#334155]">
                    {t('descriptionText')}
                </p>
            </div>

            <div>
                <h3 className="mb-3 font-['Sora'] text-[12px] font-semibold leading-none text-[#64748B]">
                    {t('attachmentsLabel', { count: attachments.length })}
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {attachments.map(attachment => {
                        const AttachmentIcon = attachment.type === 'pdf' ? FileIcon : ImageIcon;

                        return (
                            <div
                                key={attachment.id}
                                className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                            attachment.type === 'pdf'
                                                ? 'bg-[#EF444415]'
                                                : 'bg-[#3B82F615]'
                                        }`}
                                    >
                                        <AttachmentIcon className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="break-words font-['Sora'] text-[12px] font-semibold leading-[140%] text-[#1E293B]">
                                            {attachment.name}
                                        </p>

                                        <span className="font-['Sora'] text-[11px] font-normal text-[#94A3B8]">
                                            {attachment.size}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    aria-label={attachment.name}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#3634C7]"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
