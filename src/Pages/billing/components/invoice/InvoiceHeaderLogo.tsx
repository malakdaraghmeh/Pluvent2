import { useTranslation } from 'react-i18next';
import { ChangeRequestPulventLogo } from '@/assets';

export default function InvoiceHeaderLogo() {
    const { t } = useTranslation('invoiceModal');

    return (
        <div className="absolute left-[52px] top-[40px] flex h-[167px] w-[491px] items-start justify-center rounded-[4px] bg-[#F6F8FC]">
            <div className="mt-[17px] flex items-center gap-[6px]">
                <ChangeRequestPulventLogo className="h-[54.02px] w-[43.41px] shrink-0" />

                <div className="flex flex-col justify-center">
                    <span className="text-[20px] font-bold leading-[22px] text-[#12115C]">
                        {t('companyName')}
                    </span>

                    <span className="whitespace-nowrap text-[5px] font-medium leading-[7px] text-[#12115C]">
                        {t('companySubtitle')}
                    </span>
                </div>
            </div>
        </div>
    );
}
