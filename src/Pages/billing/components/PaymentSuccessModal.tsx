import React from "react";
import { Arrow, Close, PaymentSuccess } from "@/assets";
import { useTranslation } from "react-i18next";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onViewReceipt: () => void;
}

const PaymentSuccessModal = ({
  isOpen,
  onClose,
  onBack,
  onViewReceipt,
}: PaymentSuccessModalProps) => {
  const { t } = useTranslation("paymentSuccessModal");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-[554px]
          rounded-[14px]
          bg-white
          px-[20px]
          pb-[32px]
          pt-[24px]
          shadow-[0px_8px_30px_rgba(0,0,0,0.12)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="
              text-[24px]
              font-bold
              text-[#12115C]
            "
          >
            {t("title")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
              rounded-[8px]
              bg-[#12115C]
              text-white
              transition
              hover:bg-[#1A165C]
            "
          >
            <Close />
          </button>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center py-[28px]">
          <PaymentSuccess />
        </div>

        {/* Message */}
        <p
          className="
            text-center
            text-[24px]
            text-[#090909]
          "
        >
          {t("message")}
        </p>

        {/* Buttons */}
        <div className="mt-[20px] flex items-center gap-[8px]">
          {/* Back */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-[44px]
              w-[84px]
              items-center
              justify-center
              gap-[8px]
              rounded-[16px]
              border
              border-[#12115C]
              px-[20px]
              py-[16px]
              text-[18px]
              text-[#12115C]
              transition-all
              duration-200
              hover:bg-[#F4F3FA]
            "
          >
            {t("back")}
          </button>

          {/* View Receipt */}
          <button
            type="button"
            onClick={onViewReceipt}
            className="
              flex
              h-[44px]
              w-full
              max-w-[560px]
              items-center
              justify-center
              gap-[8px]
              rounded-[16px]
              bg-[#12115C]
              px-[20px]
              py-[16px]
              text-[18px]
              text-white
              transition
              hover:bg-[#1A165C]
            "
          >
            <span>{t("viewReceipt")}</span>

            <span className="rtl:rotate-180">
              <Arrow />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;