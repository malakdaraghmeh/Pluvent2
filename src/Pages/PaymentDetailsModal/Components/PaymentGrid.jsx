
import React from 'react';
import { Briefcase, Calendar, Wallet, CreditCard, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PaymentDetailItem from './PaymentDetailItem';

export default function PaymentGrid() {
  const { t } = useTranslation('paymentDetails');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-6">
      <PaymentDetailItem 
        icon={Briefcase} 
        label={t('projectLabel')} 
        value={t('projectName')} 
      />

      <PaymentDetailItem 
        icon={Calendar} 
        label={t('issuedDateLabel')} 
        value={t('issuedDateValue')} 
        dir="ltr"
      />

      <PaymentDetailItem 
        icon={Wallet} 
        label={t('paymentTypeLabel')} 
        value={t('paymentTypeValue')} 
      />

      <PaymentDetailItem 
        icon={Calendar} 
        label={t('dueDateLabel')} 
        value={t('dueDateValue')} 
        dir="ltr"
      />

      {/* Amount Due (Styled with bold highlight color) */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-[#F6F8FC] flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5 text-[#100C52]" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">
            {t('amountDueLabel')}
          </p>
          <p className="text-lg font-black text-[#4B32EB] mt-0.5" dir="ltr">
            {t('amountDueValue')}
          </p>
        </div>
      </div>

      <PaymentDetailItem 
        icon={Tag} 
        label={t('referenceLabel')} 
        value={t('referenceValue')} 
        dir="ltr"
      />
    </div>
  );
}