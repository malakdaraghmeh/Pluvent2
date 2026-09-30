
import React from 'react';
import { useTranslation } from 'react-i18next';
import LogoIcon from '@icons/logo png 2.svg?react';

export default function InvoiceFooter({ isRtl }) {
    const { t } = useTranslation('invoice');

    return (
        <div className="flex items-end justify-between pt-4">
            <div className="space-y-4">
                <div className="text-[10px] text-slate-400 leading-normal">
                    <p className="font-semibold text-slate-500">
                        {t('agencyName')}
                    </p>
                    <p>{t('agencyWebsite')}</p>
                    <p dir="ltr" className={isRtl ? 'text-right' : 'text-left'}>
                        {t('agencyContact')}
                    </p>
                </div>
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                <LogoIcon className="w-full h-full" />
            </div>
        </div>
    );
}