
"use client";

import React, { useState } from "react";
import { AddUser, Arrow, Close } from "@/assets";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);
    onClose();
  };

  const inputClassName = `
    h-[54px]
    w-full
    rounded-[8px]
    bg-[#F4F6FA]
    px-[14px]
    py-[13px]
    text-[13px]
    text-[#0F172A]
    outline-none
    transition-colors
    placeholder:text-[#94A3B8]
    focus:bg-white
    focus:ring-2
    focus:ring-[#12115C]/20
  `;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-start sm:items-center justify-center
        overflow-y-auto
       
        p-4
        backdrop-blur-sm
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-user-title"
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          my-auto
          flex
          w-full
          max-w-[560px]
          max-h-[calc(100dvh-32px)]
          flex-col
          overflow-y-auto
          rounded-[8px]
          border-[0.5px]
          border-[#D9D9D9]
          bg-white
          px-5
          py-8
          sm:px-6
          sm:py-10
          shadow-[0px_2px_15px_0px_#0000000D]
          transition-all
        "
      >
        {/* Header */}
        <div className="mb-6 flex shrink-0 items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#00E5C815] text-[#12115C]">
              <AddUser  />
            </div>

            <div className="min-w-0">
              <h3
                id="add-user-title"
                className="text-[20px] font-semibold text-[#12115C]"
              >
                Add User
              </h3>

              <p className="text-[14px]  text-[#615E8B]">
                Add New User Into Pulvent Website
              </p>
            </div>
          </div>

          {/* Close Button */}
            <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#12115C]
                text-white
                opacity-100
                transition-opacity
                hover:opacity-80
            "
            >
            <Close />
            </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className=" text-[18px]  text-[#000000]">
              Full Name
            </label>

            <input
            type="text"
            name="fullName"
            placeholder="Title here..."
            value={formData.fullName}
            onChange={handleChange}
            className="
                h-[54px]
                w-full
                text-[16px]
                text-[#868B89]
                max-w-[464px]
                rounded-lg
                bg-[#F4F6FA]
                px-[14px]
                py-[13px]
                opacity-100
                outline-none
            "
            required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className=" text-[18px]  text-[#000000]">
              Email
            </label>

            <input
            type="email"
            name="email"
            placeholder="Title here..."
            value={formData.email}
            onChange={handleChange}
            className="
                h-[54px]
                w-full
                text-[16px]
                text-[#868B89]
                max-w-[464px]
                rounded-lg
                bg-[#F4F6FA]
                px-[14px]
                py-[13px]
                opacity-100
                outline-none
            "
            required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px]  text-[#000000]">
              Phone Number
            </label>

            <input
        type="tel"
        name="phone"
        placeholder="Title here..."
        value={formData.phone}
        onChange={handleChange}
        className="
            h-[54px]
            w-full
            max-w-[464px]
            text-[16px]
             text-[#868B89]
            rounded-lg
            bg-[#F4F6FA]
            px-[14px]
            py-[13px]
            opacity-100
            outline-none
        "
        />
                </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px]  text-[#000000]">
              Password
            </label>

            <input
            type="password"
            name="password"
            placeholder="Title here..."
            value={formData.password}
            onChange={handleChange}
            className="
                h-[54px]
                w-full
                max-w-[464px]
                text-[16px]
                text-[#868B89]
                rounded-lg
                bg-[#F4F6FA]
                px-[14px]
                py-[13px]
                opacity-100
                outline-none
            "
            required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px]  text-[#000000]">
              Confirm Password
            </label>

            <input
            type="password"
            name="confirmPassword"
            placeholder="Title here..."
            value={formData.confirmPassword}
            onChange={handleChange}
            className="
                h-[54px]
                w-full
                max-w-[464px]
                rounded-lg
                bg-[#F4F6FA]
                text-[16px]
                text-[#868B89]
                px-[14px]
                py-[13px]
                opacity-100
                outline-none
            "
            required
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px]  text-[#000000]">
              Role
            </label>

            <input
            type="text"
            name="role"
            placeholder="Title here..."
            value={formData.role}
            onChange={handleChange}
            className="
                h-[54px]
                w-full
                max-w-[464px]
                rounded-lg
                bg-[#F4F6FA]
                px-[14px]
                py-[13px]
                opacity-100
                outline-none
            "
            required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
  <button
    type="submit"
    className="
      flex
      h-[48px]
      w-full
      max-w-[464px]
      items-center
      justify-center
      rounded-[8px]
      bg-[#12115C]
      px-[20px]
      text-[20px]
      text-white
      transition-opacity
      hover:opacity-95
      active:scale-[0.99]
    "
  >
    <div className="flex items-center gap-2">
      <span className="leading-none">Add User</span>

      <span className="flex items-center justify-center w-3 h-4 shrink-0 brightness-0 invert scale-125 translate-y-[1px] rtl:rotate-180">
        <Arrow />
      </span>
    </div>
  </button>
</div>
</form>
      </div>
    </div>
  );
}