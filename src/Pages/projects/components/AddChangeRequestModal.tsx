import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Add, AddUser, Arrow, Upload } from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import ModalCloseButton from '@/components/ui/ModalCloseButton';
import type { AddChangeRequestModalProps } from '../../../../utils/types/add-change-request-modal.types';

const AddChangeRequestModal = ({ isOpen, onClose }: AddChangeRequestModalProps) => {
    const { t, i18n } = useTranslation('changeRequests');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('modal.title')}
            overlayClassName="p-3 sm:p-4 lg:pl-[280px]"
            className="max-h-[calc(100vh-24px)] w-[calc(100%-24px)] max-w-[700px] overflow-y-auto rounded-[24px] bg-white shadow-[0px_12px_32px_0px_#12115C12] sm:w-[calc(100%-32px)] md:h-[608px] md:w-[700px] md:overflow-hidden 3xl:h-[660px] 3xl:w-[760px] 3xl:max-w-[760px] 4xl:h-[710px] 4xl:w-[820px] 4xl:max-w-[820px]"
        >
            <div className="flex h-full w-full flex-col gap-6 p-5 sm:p-6 md:p-8 3xl:gap-[26px] 3xl:p-9 4xl:gap-7 4xl:p-10">
                <div
                    className={`flex w-full shrink-0 items-start justify-between gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                    <div
                        className={`flex min-w-0 flex-1 items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#00E5C810] 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12">
                            <AddUser />
                        </div>
                        <h2
                            className={`min-w-0 text-[22px] font-semibold leading-[28px] text-[#12115C] 3xl:text-[24px] 3xl:leading-[30px] 4xl:text-[26px] 4xl:leading-8 ${textAlignment}`}
                        >
                            {t('modal.title')}
                        </h2>
                    </div>
                    <ModalCloseButton
                        ariaLabel={t('modal.close', { defaultValue: 'Close' })}
                        onClick={onClose}
                    />
                </div>

                <p
                    className={`w-full text-[14px] font-normal leading-[18px] text-[#615E8B] 3xl:text-[15px] 3xl:leading-5 4xl:text-[16px] 4xl:leading-[22px] ${textAlignment}`}
                >
                    {t('modal.description')}
                </p>

                <div className="flex min-h-0 flex-1 flex-col gap-4 3xl:gap-[18px] 4xl:gap-5">
                    <div className={`flex w-full flex-col gap-2 ${textAlignment}`}>
                        <label
                            htmlFor="change-request-title"
                            className="text-[14px] font-semibold leading-[18px] text-[#12115C] 3xl:text-[15px] 4xl:text-[16px]"
                        >
                            {t('modal.titleLabel')} <span className="text-[#E02B2B]">*</span>
                        </label>
                        <input
                            id="change-request-title"
                            type="text"
                            placeholder={t('modal.titlePlaceholder')}
                            className={`h-[54px] w-full rounded-[12px] border border-transparent bg-[#F4F6FA] px-[14px] text-[14px] font-normal text-[#615E8B] outline-none transition-colors placeholder:text-[#8A89A5] focus:border-[#39E1D7] focus:bg-white 3xl:h-[58px] 3xl:px-4 3xl:text-[15px] 4xl:h-[62px] 4xl:text-[16px] ${textAlignment}`}
                        />
                    </div>

                    <div className={`flex w-full flex-col gap-2 ${textAlignment}`}>
                        <label
                            htmlFor="change-request-description"
                            className="text-[14px] font-semibold leading-[18px] text-[#12115C] 3xl:text-[15px] 4xl:text-[16px]"
                        >
                            {t('modal.descriptionLabel')} <span className="text-[#E02B2B]">*</span>
                        </label>
                        <textarea
                            id="change-request-description"
                            placeholder={t('modal.descriptionPlaceholder')}
                            className={`h-[120px] min-h-[120px] w-full resize-none rounded-[12px] border border-[#E2E8F0] bg-[#F4F6FA] px-[14px] py-[14px] text-[14px] font-normal text-[#615E8B] outline-none transition-colors placeholder:text-[#8A89A5] focus:border-[#39E1D7] focus:bg-white 3xl:h-[132px] 3xl:min-h-[132px] 3xl:p-4 3xl:text-[15px] 4xl:h-[144px] 4xl:min-h-[144px] 4xl:text-[16px] ${textAlignment}`}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className={`flex h-[96px] w-full shrink-0 items-center justify-center gap-4 rounded-[20px] border-[1.5px] border-dashed border-[#E2E8F0] bg-[#FDFDFE] p-6 transition-colors hover:bg-[#F8FAFC] 3xl:h-[104px] 3xl:gap-[18px] 3xl:p-[26px] 4xl:h-[112px] 4xl:gap-5 4xl:p-7 ${isArabic ? 'flex-row-reverse' : ''}`}
                    >
                        <Upload className="shrink-0" />
                        <div className={`min-w-0 ${textAlignment}`}>
                            <p className="text-[16px] font-semibold leading-5 text-[#12115C] 3xl:text-[17px] 4xl:text-[18px]">
                                {t('modal.dropFiles')}
                            </p>
                            <p className="mt-1 text-[13px] font-normal leading-[18px] text-[#6B7280] 3xl:text-[14px] 4xl:text-[15px]">
                                {t('modal.fileTypes')}
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
                </div>

                <ActionButton
                    type="button"
                    leadingIcon={
                        <Add className="h-4 w-4 shrink-0 3xl:h-[18px] 3xl:w-[18px] 4xl:h-5 4xl:w-5" />
                    }
                    trailingIcon={
                        <Arrow
                            className={`h-4 w-4 shrink-0 3xl:h-[18px] 3xl:w-[18px] 4xl:h-5 4xl:w-5 ${isArabic ? 'rotate-180' : ''}`}
                        />
                    }
                    className="!h-[44px] !min-h-[44px] !w-full !rounded-[16px] !bg-[#12115C] !px-5 !text-[18px] !font-normal !leading-7 !text-white hover:!opacity-90 3xl:!h-12 3xl:!min-h-12 3xl:!rounded-[17px] 3xl:!text-[19px] 4xl:!h-[52px] 4xl:!min-h-[52px] 4xl:!rounded-[18px] 4xl:!text-[20px]"
                >
                    {t('modal.submit')}
                </ActionButton>
            </div>
        </Modal>
    );
};

export default AddChangeRequestModal;
