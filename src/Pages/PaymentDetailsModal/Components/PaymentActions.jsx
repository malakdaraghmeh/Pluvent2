import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PaymentActions({ onBack, onClose, onContinue, isRtl }) {
  const { t } = useTranslation('paymentDetails');

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack || onClose}
        className="px-7 py-3.5 rounded-full border border-[#100C52] text-[#100C52] font-semibold text-sm hover:bg-slate-50 transition-colors"
      >
        {t('backButton')}
      </button>

      <button
        type="button"
        onClick={onContinue}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#100C52] hover:bg-[#100C52]/90 text-white font-semibold text-sm transition-colors shadow-sm"
      >
        <span>{t('continueButton')}</span>
        {isRtl ? (
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        ) : (
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
}