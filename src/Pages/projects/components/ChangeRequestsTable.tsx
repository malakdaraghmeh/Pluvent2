import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Add, Arrow } from '@/assets';
import AddChangeRequestModal from './AddChangeRequestModal';
import { changeRequestsData } from '../data/changeRequests';
import type { ChangeRequestStatus } from '../../../../utils/types/project-details.types';

const statusTranslationKeys: Record<ChangeRequestStatus, string> = {
    InReview: 'statuses.inReview',
    'Waiting User Input': 'statuses.waitingUserInput',
    'Pending Payment': 'statuses.pendingPayment',
    Inprogress: 'statuses.inProgress',
    Completed: 'statuses.completed',
};

const getStatusColor = (status: ChangeRequestStatus) => {
    switch (status) {
        case 'InReview':
            return 'text-[#12115C]';
        case 'Waiting User Input':
            return 'text-[#F38020]';
        case 'Pending Payment':
            return 'text-[#EF4444]';
        case 'Inprogress':
            return 'text-[#3634C7]';
        case 'Completed':
            return 'text-[#34C759]';
        default:
            return 'text-[#303542]';
    }
};

const ChangeRequestsTable = () => {
    const { t, i18n } = useTranslation('changeRequests');
    const { locale = 'en', id: projectId = '1' } = useParams();

    const [isAddChangeRequestOpen, setIsAddChangeRequestOpen] = useState(false);

    const isArabic = i18n.language.startsWith('ar');
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

    const getDetailsPath = (status: ChangeRequestStatus, requestId: string) => {
        switch (status) {
            case 'InReview':
                return `/${locale}/change-request-details?projectId=${projectId}`;

            case 'Waiting User Input':
                return `/${locale}/projects/${projectId}/change-requests/${requestId}/waiting`;

            case 'Pending Payment':
                return `/${locale}/projects/${projectId}/change-requests/${requestId}/payment`;

            case 'Inprogress':
                return `/${locale}/projects/${projectId}/change-requests/${requestId}/in-progress`;

            case 'Completed':
                return `/${locale}/projects/${projectId}/change-requests/${requestId}/completed`;

            default:
                return `/${locale}/projects/${projectId}/change-requests/${requestId}`;
        }
    };

    const tableGridClass =
        'grid grid-cols-[80px_220px_150px_160px_120px_120px_80px] items-center gap-4';

    return (
        <section className="w-full rounded-[24px] bg-white p-4 sm:p-5 md:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-start text-[22px] font-semibold text-[#12115C]">
                    {t('title')}
                </h2>

                <button
                    type="button"
                    onClick={() => setIsAddChangeRequestOpen(true)}
                    className={`flex h-[44px] w-full items-center justify-between rounded-[16px] bg-[#12115C] px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 sm:w-[283px] ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                    <span className="flex shrink-0 items-center">
                        <Add />
                    </span>

                    <span className="whitespace-nowrap">{t('addChangeRequest')}</span>

                    <span
                        className={`flex shrink-0 items-center transition-transform ${isArabic ? 'rotate-180' : ''}`}
                    >
                        <Arrow />
                    </span>
                </button>
            </div>

            <div className="w-full overflow-x-auto pb-2 [scrollbar-color:#C9CED6_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C9CED6] hover:[&::-webkit-scrollbar-thumb]:bg-[#AEB4BE]">
                {' '}
                <div className="min-w-[1060px] overflow-hidden rounded-[8px] border border-[#00E5C810] bg-white">
                    <div className={`${tableGridClass} h-16 px-5 font-semibold`}>
                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('id')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('requestTitle')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('addBy')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('status')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('startDate')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('dueDate')}
                        </p>

                        <p className="justify-self-start whitespace-nowrap text-[14px] text-[#12115C]">
                            {t('details')}
                        </p>
                    </div>

                    {changeRequestsData.map((request, index) => (
                        <div
                            key={`${request.id}-${index}`}
                            className={`${tableGridClass} min-h-16 border-t px-5 py-3 ${
                                index % 2 === 0
                                    ? 'border-[#00E5C810] bg-[#00E5C805]'
                                    : 'border-[#2F1ABD10] bg-white'
                            }`}
                        >
                            <p className="justify-self-start whitespace-nowrap text-[14px] font-semibold text-[#12115C]">
                                {request.id}
                            </p>

                            <p className="min-w-0 justify-self-start truncate pe-3 text-[14px] font-semibold text-[#1F2937]">
                                {request.title}
                            </p>

                            <p className="min-w-0 justify-self-start truncate pe-3 text-[14px] font-semibold text-[#12115C]">
                                {request.addBy}
                            </p>

                            <p
                                className={`min-w-0 justify-self-start truncate pe-3 text-[14px] font-normal ${getStatusColor(request.status)}`}
                            >
                                {t(statusTranslationKeys[request.status])}
                            </p>

                            <p className="justify-self-start whitespace-nowrap text-[14px] font-normal text-[#596173]">
                                {formatDate(request.startDate)}
                            </p>

                            <p className="justify-self-start whitespace-nowrap text-[14px] font-normal text-[#5F6573]">
                                {formatDate(request.dueDate)}
                            </p>

                            <Link
                                to={getDetailsPath(request.status, request.id)}
                                className="justify-self-start whitespace-nowrap text-[14px] font-semibold text-[#3634C7] transition-opacity hover:opacity-70"
                            >
                                {t('details')}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <AddChangeRequestModal
                isOpen={isAddChangeRequestOpen}
                onClose={() => setIsAddChangeRequestOpen(false)}
            />
        </section>
    );
};

export default ChangeRequestsTable;
