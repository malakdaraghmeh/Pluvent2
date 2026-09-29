import React from 'react';

export default function PaymentDetailItem({ icon: Icon, label, value, dir }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="w-11 h-11 rounded-2xl bg-[#F6F8FC] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#100C52]" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500">
          {label}
        </p>
        <p className={`text-base font-bold text-[#100C52] mt-0.5`} dir={dir}>
          {value}
        </p>
      </div>
    </div>
  );
}