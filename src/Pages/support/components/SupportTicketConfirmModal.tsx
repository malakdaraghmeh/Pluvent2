import React from "react";
import PulventLogo from "@/assets/images/pulvent.png";
import { Arrow } from "@/assets";

interface SupportTicketConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isRtl: boolean;
}

const SupportTicketConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isRtl,
}: SupportTicketConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-2">
      {/* Modal */}
      <div className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-lg bg-white px-5 py-8 shadow-xl">

        {/* Logo */}
        <div className="flex shrink-0 items-center justify-center">
          <img
            src={PulventLogo}
            alt="Logo"
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
        </div>

        {/* Content */}
        <div className="flex w-full flex-col items-center gap-4">

          {/* Message */}
          <p className="m-0 max-w-full text-center text-xl font-semibold leading-7 text-black sm:text-2xl">
            Are you sure you want to open
            <br />
            a new support ticket?
          </p>

          {/* Buttons */}
          <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">

            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-[#FF4B4B] bg-white px-3 py-2 text-[20px] text-[#FF4B4B] transition hover:bg-[#FFF5F5]"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="button"
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#12115C] px-3 py-2 text-[20px] text-white transition hover:bg-[#1a185f]"
            >
              <span>Submit</span>
              <Arrow />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketConfirmModal;