import React, { useState } from "react"; import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddChangeRequestModal from "./AddChangeRequestModal";

import type { ChangeRequestStatus } from '../../../../utils/types/project-details.types';

import { changeRequestsData } from '../data/changeRequests';
import { Add, Arrow } from "@/assets";

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

    const { locale = 'en', id: projectId = '1' } = useParams();

  const [isAddChangeRequestOpen, setIsAddChangeRequestOpen] =
    useState(false);

  return (
    <div className="w-full rounded-[12px] bg-white p-4 sm:p-5 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-semibold text-[#12115C]">{t('title')}</h2>

        {/* Add Change Request */}
        <button
          type="button"
          onClick={() => setIsAddChangeRequestOpen(true)}
          className="
            flex
            h-[44px]
            w-full
            items-center
            justify-between
            rounded-[16px]
            bg-[#12115C]
            px-4
            py-3
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
            sm:w-[283px]
            sm:px-5
            sm:py-4
            text-[14px]
          "
        >
          <span className="flex shrink-0 items-center">
            <Add />
          </span>

          <span className="flex items-center whitespace-nowrap">
            {t("addChangeRequest")}
          </span>

          <span className="flex shrink-0 items-center rtl:rotate-180">
            <Arrow />
          </span>
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto">
        {/* Table */}
        <div
          className="
            min-w-[900px]
            overflow-hidden
            rounded-[8px]
            border
            border-[#00E5C810]
            bg-white
          "
        >
          {/* Table Header */}
          <div
            className="
              grid
              h-16
              grid-cols-[70px_183px_130px_130px_110px_110px_70px]
              items-center
              gap-4
              rounded-t-[16px]
              bg-white
              px-4
              font-semibold
            "
          >
            <p
              className="
                justify-self-start
                text-[14px]
                text-[#12115C]
              "
            >
              {t("id")}
            </p>

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

            <p
              className="
                justify-self-start
                text-[14px]
                text-[#12115C]
              "
            >
              {t("dueDate")}
            </p>

            <p
              className="
                justify-self-start
                text-[14px]
                text-[#12115C]
              "
            >
              {t("details")}
            </p>
          </div>

          {/* Rows */}
          {changeRequestsData.map((request, index) => (
            <div
              key={`${request.id}-${index}`}
              className={`
                grid
                h-16
                grid-cols-[70px_183px_130px_130px_110px_110px_70px]
                items-center
                gap-4
                border
                px-4
                ${index % 2 === 0
                  ? "border-[#00E5C810] bg-[#00E5C805]"
                  : "border-[#2F1ABD10] bg-white"
                }
              `}
            >
              {/* ID */}
              <p
                className="
                  justify-self-start
                  text-[14px]
                  font-semibold
                  text-[#12125C]
                "
              >
                {request.id}
              </p>

              {/* Title */}
              <p
                className="
                  min-w-0
                  justify-self-start
                  truncate
                  text-[14px]
                  font-semibold
                  text-[#1F2937]
                "
              >
                {request.title}
              </p>

              {/* Add By */}
              <p
                className="
                  min-w-0
                  justify-self-start
                  truncate
                  text-[14px]
                  font-semibold
                  text-[#12115C]
                "
              >
                {request.addBy}
              </p>

              {/* Status */}
              <p
                className={`
                  min-w-0
                  justify-self-start
                  truncate
                  text-[14px]
                  ${getStatusColor(request.status)}
                `}
              >
                {t(statusTranslationKeys[request.status])}
              </p>

              {/* Start Date */}
              <p
                className="
                  justify-self-start
                  text-[14px]
                  text-[#596173]
                "
              >
                                {formatDate(request.startDate)}
              </p>

              {/* Due Date */}
              <p
                className="
                  justify-self-start
                  text-[14px]
                  text-[#5F6573]
                "
              >
                                {formatDate(request.dueDate)}
              </p>

              {/* Details */}
              <Link
                to={`/${locale}/projects/${projectId}/change-requests/${request.id}`}
                className="
                  justify-self-start
                  text-[16px]
                  font-semibold
                  text-[#3634C7]
                  transition-opacity
                  hover:opacity-70
                "
              >
                {t("details")}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Add Change Request Modal */}
      <AddChangeRequestModal
        isOpen={isAddChangeRequestOpen}
        onClose={() => setIsAddChangeRequestOpen(false)}
      />
    </div>
  );
};

export default ChangeRequestsTable;
