import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PaymentDescriptionBox() {
  const { t } = useTranslation('paymentDetails');

  return (
    <div className="p-4 sm:p-5 bg-[#F6F8FC] rounded-2xl border border-slate-100/80 mb-8 flex items-start gap-3.5">
      <div className="w-9 h-9 rounded-xl bg-[#E0E9FE] flex items-center justify-center shrink-0 mt-0.5">
        <FileText className="w-4 h-4 text-[#2B63E1]" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-[#100C52]">
          {t('descriptionTitle')}
        </h4>
        <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
          {t('descriptionText')}
        </p>
      </div>
    </div>
  );
}