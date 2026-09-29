import { Add, AddUser, Arrow, Close, Upload } from "@/assets";
import React, { useRef } from "react";

type AddChangeRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddChangeRequestModal = ({
  isOpen,
  onClose,
}: AddChangeRequestModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#12115C]/20
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          h-[608px]
          w-full
          max-w-[700px]
          flex-col
          gap-6
          rounded-[24px]
          bg-white
          p-8
          shadow-[0px_12px_32px_0px_#12115C12]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div
              className="
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                rounded-[8px]
                bg-[#00E5C810]
              "
            >
              <AddUser />
            </div>

            {/* Title */}
            <h2
              className="
                text-[22px]
                font-semibold
                text-[#12115C]
              "
            >
              Add New Change Request
            </h2>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-[5px]
              bg-[#12115C]
              text-[14px]
              font-semibold
              text-white
              transition-opacity
              hover:opacity-80
            "
          >
            <Close />
          </button>
        </div>

        {/* Description */}
        <p className="text-[14px] text-[#615E8B]">
          Fill in the details below to add a new change request.
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#12115C]">
              Title <span className="text-[#E02B2B]">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter change request title"
              className="
                h-[54px]
                w-full
                rounded-[12px]
                bg-[#F4F6FA]
                px-[14px]
                text-[14px]
                text-[#615E8B]
                outline-none
              "
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#12115C]">
              Description <span className="text-[#E02B2B]">*</span>
            </label>

            <textarea
              placeholder="Enter change request Description"
              className="
                h-[120px]
                min-h-[120px]
                w-full
                resize-none
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-[#F4F6FA]
                px-[14px]
                py-[14px]
                text-[14px]
                text-[#615E8B]
                outline-none
              "
            />
          </div>

         {/* Upload */}
         <div className="flex w-full flex-col gap-2">
  <button
    type="button"
    onClick={handleUploadClick}
    className="
      flex
      h-[96px]
      w-full
      cursor-pointer
      items-center
      justify-center
      gap-4
      rounded-[20px]
      border-[1.5px]
      border-dashed
      border-[#E2E8F0]
      bg-[#FDFDFE]
      p-6
      transition-colors
      hover:bg-[#F8FAFC]
    "
  >
    {/* Upload Icon */}
    <div className="flex shrink-0 items-center justify-center">
      <Upload />
    </div>

    {/* Text */}
    <div className="flex flex-col items-center">
      <p
        className="
          text-[16px]
          font-semibold
          text-[#12115C]
        "
      >
        Drop files here or click to upload
      </p>

      <p
        className="
          mt-1
          text-[13px]
          text-[#6B7280]
        "
      >
        PDF, DOCX, XLSX, PNG, JPG, ZIP — up to 50 MB each
      </p>
    </div>
  </button>

  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    className="hidden"
    accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.zip"
    multiple
  />
</div>
        </div>

        {/* Submit */}
        <button
  type="button"
  className="
    mt-auto
    flex
    h-[44px]
    w-full
    items-center
    justify-center
    gap-2
    rounded-[16px]
    bg-[#12115C]
    px-5
    py-4
    text-[18px]
    text-white
    transition-opacity
    hover:opacity-90
  "
>
  <span>
  <Add />
  </span>
  <span>Add Change Request</span>
  <span>
  <Arrow />
  </span>
</button>
      </div>
    </div>
  );
};

export default AddChangeRequestModal;