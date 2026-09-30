import React from 'react';
import { useTranslation } from 'react-i18next';

import PaymentHeader from './Components/PaymentHeader';
import PaymentGrid from './Components/PaymentGrid';
import PaymentDescriptionBox from './Components/PaymentDescriptionBox';
import PaymentActions from './Components/PaymentActions';

export default function PaymentDetailsModal({ isOpen = true, onClose, onContinue, onBack }) {
  const { i18n } = useTranslation('paymentDetails');

  if (!isOpen) return null;

  const currentLang = i18n?.language || 'en';
  const isRtl = i18n?.dir ? i18n.dir() === 'rtl' : currentLang === 'ar';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[620px] bg-white rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl transition-all"
      >
        <PaymentHeader onClose={onClose} isRtl={isRtl} />
        <PaymentGrid />
        <PaymentDescriptionBox />
        <PaymentActions 
          onBack={onBack} 
          onClose={onClose} 
          onContinue={onContinue} 
          isRtl={isRtl} 
        />
      </div>
    </div>
  );
}