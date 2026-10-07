import { useTranslation } from 'react-i18next';
import { SupportTicketViewArrowIcon } from '@/assets';
import { SupportConfirmLogo as pulventLogo } from '@/assets';

interface SupportTicketConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SupportTicketConfirmModal({
    open,
    onClose,
    onConfirm,
}: SupportTicketConfirmModalProps) {
    const { t, i18n } = useTranslation('tickets');

    const isArabic = i18n.language.startsWith('ar');

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-[470px] rounded-[16px] bg-white px-6 py-9 shadow-xl sm:px-8 sm:py-10">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={pulventLogo}
                        alt="Pulvent"
                        className="h-[64px] w-auto object-contain"
                    />

                    <h2 className="mt-5 max-w-[340px] text-[20px] font-semibold leading-8 text-[#08040B]">
                        {isArabic
                            ? 'هل أنت متأكد أنك تريد فتح تذكرة دعم جديدة؟'
                            : 'Are you sure you want to open a new support ticket?'}
                    </h2>
                </div>

                <div className={`mt-7 flex w-full gap-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-[44px] flex-1 items-center justify-center rounded-[8px] border border-[#FF3B30] bg-white text-[15px] font-medium text-[#FF3B30] transition-opacity hover:opacity-80"
                    >
                        {isArabic ? 'إلغاء' : 'Cancel'}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#12115C] px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 min-[1920px]:h-[56px] min-[1920px]:gap-3 min-[1920px]:text-[17px] min-[2500px]:h-[62px] min-[2500px]:text-[19px]"
                    >
                        {isArabic && (
                            <SupportTicketViewArrowIcon
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 rotate-180 min-[1920px]:h-[18px] min-[1920px]:w-[18px] min-[2500px]:h-5 min-[2500px]:w-5"
                            />
                        )}

                        <span>
                            {t('createModal.confirm.submit')}
                        </span>

                        {!isArabic && (
                            <SupportTicketViewArrowIcon
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 min-[1920px]:h-[18px] min-[1920px]:w-[18px] min-[2500px]:h-5 min-[2500px]:w-5"
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
