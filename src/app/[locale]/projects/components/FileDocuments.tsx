"use client";

import { LogoPulvent, File, Upload } from "@/assets";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { fileDocumentsData } from "../data/fileDocuments";

const FileDocuments = () => {
  const t = useTranslations("fileDocuments");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      className="
        flex
        w-full
        max-w-[690px]
        flex-col
        gap-3
        rounded-[24px]
        border
        border-[#ECEFF4]
        bg-white
        p-4
        sm:p-5
        md:p-6
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <h2
          className="
          
            font-semibold
            text-[#12115C]
            text-[22px]
          "
        >
          {t("title")}
        </h2>

        <button
          type="button"
          className="
            self-start
           
            text-[#3634C7]
            transition-opacity
            hover:opacity-70
            sm:self-auto
            text-[16px]
          "
        >
          {t("viewAll")}
        </button>
      </div>

      {/* Files */}
      <div className="flex flex-col gap-3">
        {fileDocumentsData.map((file) => (
          <div
            key={file.id}
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-3
              rounded-[16px]
              border
              border-[#F3F4F6]
              bg-white
              p-3
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-4
              sm:p-4
            "
          >
            {/* File Info */}
            <div
              className="
                flex
                min-w-0
                w-full
                items-center
                gap-3
              "
            >
              {/* File Icon */}
              <div
                className={`
                  flex
                  h-[44px]
                  w-[44px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[8px]
                  ${
                    file.type === "pulvent"
                      ? "bg-[#00E5C810]"
                      : "bg-[#2F1ABD10]"
                  }
                `}
              >
                {file.type === "pulvent" ? (
                  <LogoPulvent className="h-5 w-5" />
                ) : (
                  <File className="h-5 w-5" />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    
                    font-semibold
                    text-[#12115C]
                    text-[15px]
                  "
                >
                  {file.fileName}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                   
                    text-[#6B7280]
                    text-[12px]
                  "
                >
                  Upload By : {file.uploadedBy} | {file.size} · {file.date}
                </p>
              </div>
            </div>

            {/* Download */}
            <button
              type="button"
              className="
                shrink-0
                self-end
             
                font-semibold
                text-[#3634C7]
                transition-opacity
                hover:opacity-70
                sm:self-auto
                text-[16px]
              "
            >
              {t("download")}
            </button>
          </div>
        ))}
      </div>

      {/* Upload */}
      <button
        type="button"
        onClick={handleUploadClick}
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          gap-3
          rounded-[20px]
          border-[1.5px]
          border-dashed
          border-[#E2E8F0]
          bg-white
          p-4
          text-center
          transition-colors
          hover:bg-[#F8FAFC]
          sm:flex-row
          sm:gap-4
          sm:p-5
          md:p-6
        "
      >
        {/* Upload Icon */}
        <div className="flex shrink-0 items-center justify-center">
          <Upload />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p
            className="
             
              font-semibold
              leading-snug
              text-[#12115C]
              text-[16px]
            "
          >
            {t("dropFiles")}
          </p>

          <p
            className="
              mt-1
            
              leading-relaxed
              text-[#6B7280]
              text-[13px]
            "
          >
            {t("fileTypes")}
          </p>
        </div>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.zip"
        multiple
      />
    </section>
  );
};

export default FileDocuments;