import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SupportTicketViewArrowIcon } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import { TicketTypeGeneralIcon as GeneralTicketIcon } from '@/assets';
import { TicketTypeProjectIcon as ProjectTicketIcon } from '@/assets';
import { TicketTypeIllustration as TicketIllustration } from '@/assets';

import type {
    TicketType,
    TicketTypeModalProps,
} from '../../../utils/types/support-tickets.types';

export default function TicketTypeModal({
    open,
    onOpenChange,
    onContinue,
}: TicketTypeModalProps) {
    const { t, i18n } = useTranslation('tickets');
    const isArabic = i18n.language.startsWith('ar');

    const [selectedType, setSelectedType] =
        useState<TicketType | null>(null);

    const projectDescriptionLines = t(
        'ticketTypeModal.options.project.descriptionLines',
        { returnObjects: true },
    ) as string[];

    const generalDescriptionLines = t(
        'ticketTypeModal.options.general.descriptionLines',
        { returnObjects: true },
    ) as string[];

    const handleClose = () => {
        setSelectedType(null);
        onOpenChange(false);
    };

    const handleContinue = () => {
        if (!selectedType) return;

        onContinue?.(selectedType);
        setSelectedType(null);
    };

    return (
        <Modal
            isOpen={open}
            onClose={handleClose}
            ariaLabel={t('ticketTypeModal.title')}
            overlayClassName="lg:pl-[280px]"
            className="max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[620px] overflow-y-auto rounded-[20px] bg-white sm:w-[calc(100vw-32px)] sm:rounded-[24px] min-[1440px]:w-[620px] min-[1440px]:max-w-[620px] min-[1920px]:w-[760px] min-[1920px]:max-w-[760px] min-[2500px]:w-[920px] min-[2500px]:max-w-[920px]"
        >
            <div className="relative flex w-full flex-col p-5 sm:p-6 md:p-8 min-[1920px]:p-10 min-[2500px]:p-12">
                <ModalCloseButton
                    ariaLabel={t('ticketTypeModal.close')}
                    onClick={handleClose}
                    className={`absolute top-5 ${
                        isArabic
                            ? '!left-5 !right-auto'
                            : '!right-5 !left-auto'
                    }`}
                />

                <div className="flex flex-col items-center text-center">
                    <TicketIllustration className="h-auto w-[170px] sm:w-[190px] min-[1440px]:w-[200px] min-[1920px]:w-[240px] min-[2500px]:w-[290px]" />

                    <h2 className="mt-4 text-[22px] font-semibold leading-[28px] text-[#12115C] sm:text-[24px] min-[1920px]:text-[28px] min-[1920px]:leading-[34px] min-[2500px]:text-[32px] min-[2500px]:leading-[40px]">
                        {t('ticketTypeModal.title')}
                    </h2>

                    <p className="mt-2 text-[13px] font-normal leading-5 text-[#84818A] sm:text-[14px] min-[1920px]:text-[16px] min-[2500px]:text-[18px]">
                        {t('ticketTypeModal.description')}
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 min-[1920px]:mt-8 min-[1920px]:gap-5 min-[2500px]:mt-10 min-[2500px]:gap-6">
                    <button
                        type="button"
                        onClick={() =>
                            setSelectedType('project')
                        }
                        className={`flex min-h-[190px] flex-col items-center justify-center rounded-[16px] border px-4 py-5 text-center transition-colors min-[1920px]:min-h-[220px] min-[1920px]:px-6 min-[1920px]:py-7 min-[2500px]:min-h-[260px] min-[2500px]:px-8 min-[2500px]:py-8 ${
                            selectedType === 'project'
                                ? 'border-[#39E1D7] bg-[#F6FEFD]'
                                : 'border-[#ECEFF4] bg-white'
                        }`}
                    >
                        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#39E1D71A] min-[1920px]:h-[50px] min-[1920px]:w-[50px] min-[2500px]:h-[56px] min-[2500px]:w-[56px]">
                            <ProjectTicketIcon className="h-5 w-5 min-[1920px]:h-6 min-[1920px]:w-6 min-[2500px]:h-7 min-[2500px]:w-7" />
                        </div>

                        <h3 className="mt-4 text-[16px] font-semibold leading-6 text-[#12115C] min-[1920px]:text-[18px] min-[2500px]:text-[20px]">
                            {t(
                                'ticketTypeModal.options.project.title',
                            )}
                        </h3>

                        <p className="mt-2 text-center text-[12px] font-normal leading-[18px] text-[#84818A] min-[1920px]:text-[14px] min-[1920px]:leading-[21px] min-[2500px]:text-[16px] min-[2500px]:leading-6">
                            {projectDescriptionLines.map(
                                (line, index) => (
                                    <span
                                        key={index}
                                        className="block sm:whitespace-nowrap"
                                    >
                                        {line}
                                    </span>
                                ),
                            )}
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setSelectedType('general')
                        }
                        className={`flex min-h-[190px] flex-col items-center justify-center rounded-[16px] border px-4 py-5 text-center transition-colors min-[1920px]:min-h-[220px] min-[1920px]:px-6 min-[1920px]:py-7 min-[2500px]:min-h-[260px] min-[2500px]:px-8 min-[2500px]:py-8 ${
                            selectedType === 'general'
                                ? 'border-[#39E1D7] bg-[#F6FEFD]'
                                : 'border-[#ECEFF4] bg-white'
                        }`}
                    >
                        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#39E1D71A] min-[1920px]:h-[50px] min-[1920px]:w-[50px] min-[2500px]:h-[56px] min-[2500px]:w-[56px]">
                            <GeneralTicketIcon className="h-5 w-5 min-[1920px]:h-6 min-[1920px]:w-6 min-[2500px]:h-7 min-[2500px]:w-7" />
                        </div>

                        <h3 className="mt-4 text-[16px] font-semibold leading-6 text-[#12115C] min-[1920px]:text-[18px] min-[2500px]:text-[20px]">
                            {t(
                                'ticketTypeModal.options.general.title',
                            )}
                        </h3>

                        <p className="mt-2 text-center text-[12px] font-normal leading-[18px] text-[#84818A] min-[1920px]:text-[14px] min-[1920px]:leading-[21px] min-[2500px]:text-[16px] min-[2500px]:leading-6">
                            {generalDescriptionLines.map(
                                (line, index) => (
                                    <span
                                        key={index}
                                        className="block sm:whitespace-nowrap"
                                    >
                                        {line}
                                    </span>
                                ),
                            )}
                        </p>
                    </button>
                </div>

                <ActionButton
                    type="button"
                    onClick={handleContinue}
                    trailingIcon={
                        <SupportTicketViewArrowIcon
                            aria-hidden="true"
                            className={`h-4 w-4 shrink-0 min-[1920px]:h-5 min-[1920px]:w-5 min-[2500px]:h-6 min-[2500px]:w-6 ${
                                isArabic
                                    ? 'rotate-180'
                                    : ''
                            }`}
                        />
                    }
                    className={`mt-6 !h-[44px] !w-full !justify-center !gap-2 !rounded-[16px] !px-5 !text-[16px] !font-normal min-[1920px]:mt-8 min-[1920px]:!h-[52px] min-[1920px]:!text-[18px] min-[2500px]:mt-10 min-[2500px]:!h-[58px] min-[2500px]:!text-[20px] ${
                        isArabic
                            ? '!flex-row-reverse'
                            : ''
                    }`}
                >
                    {t('ticketTypeModal.continue')}
                </ActionButton>
            </div>
        </Modal>
    );
}
