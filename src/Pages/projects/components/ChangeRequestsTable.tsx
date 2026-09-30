import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { ChangeRequestStatus } from '../../../../utils/types/project-details.types';

import { changeRequestsData } from '../data/changeRequests';

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

    return (
        <div className="w-full rounded-[12px] bg-white p-4 sm:p-5 md:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[22px] font-semibold text-[#12115C]">{t('title')}</h2>

                <button
                    type="button"
                    className="flex min-h-[48px] w-full items-center justify-center rounded-[16px] bg-[#12115C] px-6 text-[14px] font-medium text-white sm:w-auto"
                >
                    {t('addChangeRequest')}
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <div className="min-w-[900px]">
                    <div className="grid grid-cols-[70px_183px_130px_130px_110px_110px_70px] items-center gap-4 rounded-t-[16px] bg-white px-4 font-semibold">
                        <p className="justify-self-start text-[14px] text-[#12115C]">{t('id')}</p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('requestTitle')}
                        </p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('addBy')}
                        </p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('status')}
                        </p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('startDate')}
                        </p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('dueDate')}
                        </p>

                        <p className="justify-self-start text-[14px] text-[#12115C]">
                            {t('details')}
                        </p>
                    </div>

                    {changeRequestsData.map((request, index) => (
                        <div
                            key={`${request.id}-${index}`}
                            className={`grid min-h-16 grid-cols-[70px_183px_130px_130px_110px_110px_70px] items-center gap-4 border px-4 py-3 ${
                                index % 2 === 0
                                    ? 'border-[#00E5C810] bg-[#00E5C805]'
                                    : 'border-[#2F1ABD10] bg-white'
                            }`}
                        >
                            <p className="justify-self-start text-[14px] font-semibold text-[#12125C]">
                                {request.id}
                            </p>

                            <p className="min-w-0 justify-self-start break-words text-[14px] font-semibold text-[#1F2937]">
                                {request.title}
                            </p>

                            <p className="min-w-0 justify-self-start break-words text-[14px] font-semibold text-[#12115C]">
                                {request.addBy}
                            </p>

                            <p
                                className={`min-w-0 justify-self-start break-words text-[14px] ${getStatusColor(
                                    request.status
                                )}`}
                            >
                                {t(statusTranslationKeys[request.status])}
                            </p>

                            <p className="justify-self-start whitespace-nowrap text-[14px] text-[#596173]">
                                {formatDate(request.startDate)}
                            </p>

                            <p className="justify-self-start whitespace-nowrap text-[14px] text-[#5F6573]">
                                {formatDate(request.dueDate)}
                            </p>

                            <Link
                                to={
                                    request.status === 'InReview'
                                        ? `/${locale}/change-request-details`
                                        : request.status === 'Waiting User Input'
                                          ? `/${locale}/projects/${projectId}/change-requests/${request.id}/waiting`
                                          : request.status === 'Pending Payment'
                                            ? `/${locale}/projects/${projectId}/change-requests/${request.id}/payment`
                                            : request.status === 'Inprogress'
                                              ? `/${locale}/projects/${projectId}/change-requests/${request.id}/in-progress`
                                              : request.status === 'Completed'
                                                ? `/${locale}/projects/${projectId}/change-requests/${request.id}/completed`
                                                : `/${locale}/projects/${projectId}/change-requests/${request.id}`
                                }
                                className="justify-self-start text-[16px] font-semibold text-[#3634C7] transition-opacity hover:opacity-70"
                            >
                                {t('details')}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChangeRequestsTable;
