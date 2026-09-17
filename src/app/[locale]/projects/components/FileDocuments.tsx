"use client";
import {LogoPulvent,File,Upload } from "@/assets";
  
import { useRef } from "react";
import { fileDocumentsData } from "../data/fileDocuments";

const FileDocuments = () => {
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
        p-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="
            text-[22px]
            font-semibold
            text-[#12115C]
          "
        >
          File & Document
        </h2>

        <button
          type="button"
          className="
            text-[16px]
            text-[#3634C7]
            transition-opacity
            hover:opacity-70
          "
        >
          View All
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
              items-center
              justify-between
              gap-4
              rounded-[16px]
              border
              border-[#F3F4F6]
              bg-white
              p-4
            "
          >
            {/* File Info */}
            <div className="flex min-w-0 items-center gap-3">
              {/* File Icon */}
              <div
  className={`
    flex
  
    w-[44px]
    shrink-0
    items-center
    justify-center
    rounded-[8px]
    ${
      file.type === "pulvent"
        ? "bg-[#00E5C810] p-[12px]"
        : "bg-[#2F1ABD10]"
    }
  `}
>
  {file.type === "pulvent" ? (
    <LogoPulvent />
  ) : (
    <File />
  )}
</div>

              {/* Text */}
              <div className="min-w-0">
                <p
                  className="
                  text-left
                    truncate
                    text-[15px]
                    font-semibold
                    text-[#12115C]
                  "
                >
                  {file.fileName}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-[12px]
                    text-[#6B7280]
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
                text-[16px]
                font-semibold
                text-[#3634C7]
                transition-opacity
                hover:opacity-70
              "
            >
              Download
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
    items-center
    justify-center
    gap-4
    rounded-[20px]
    border-[1.5px]
    border-dashed
    border-[#E2E8F0]
    bg-white
    p-6
    text-left
    transition-colors
    hover:bg-[#F8FAFC]
  "
>
  {/* Upload Icon */}
  <div className="flex shrink-0 items-center justify-center">
    <Upload />
  </div>

  {/* Text */}
  <div>
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