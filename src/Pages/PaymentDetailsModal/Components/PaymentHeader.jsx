import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PaymentHeader({ onClose, isRtl }) {
  const { t } = useTranslation('paymentDetails');

  return (
    <>
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className={`absolute top-6 sm:top-8 w-9 h-9 flex items-center justify-center bg-[#100C52] text-white rounded-xl hover:bg-[#100C52]/90 transition-colors ${
          isRtl ? 'left-6 sm:left-8' : 'right-6 sm:right-8'
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Title & Subtitle */}
      <div className={`mb-6 sm:mb-8 ${isRtl ? 'pl-10' : 'pr-10'}`}>
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#100C52] tracking-tight">
          {t('title')}
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          {t('subtitle')}
        </p>
      </div>
    </>
  );
}