'use client';

import React, { useState } from 'react';
import { Info, CheckCircle2, ChevronDown, X, ChevronRight } from 'lucide-react';
import FolderUpload from '@icons/folder-upload.svg';

export default function CreateSupportInquiry() {
    const [subject, setSubject] = useState('Logo file not displaying correctly in print');
    const [ticketCategory, setTicketCategory] = useState('Technical Issue');
    const [issueType, setIssueType] = useState('Bug Report');
    const [description, setDescription] = useState(
        'The logo file is not displaying correctly in print. Please check the attached file and let me know how we can fix this.'
    );

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    };

    const removeFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            subject,
            ticketCategory,
            issueType,
            description,
            files,
        });
        alert('Ticket submitted successfully!');
    };

    return (
        <div className="min-h-screen bg-[#F4F6FB]  sm:p-6 md:p-10 font-sans text-gray-800">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Page Title & Subtitle */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#100D40]">
                        Create Support Inquiry
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Submit a ticket and our team will get back to you as soon as possible.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                    {/* Warranty Banner */}
                    <div className="border border-emerald-400 bg-[#E8F8F3] rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                <Info className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-emerald-950">
                                    You are creating a ticket for a project under warranty.
                                </p>
                                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                                    Brand Identity & Visual Design • Warranty Active • 315 Days Left
                                </p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 hidden sm:block" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form Fields Header Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full bg-[#F3F4F8] border border-transparent rounded-xl px-4 py-3 text-sm text-gray-800 focus:bg-white focus:border-gray-200 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Ticket Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ticket Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={ticketCategory}
                                        onChange={e => setTicketCategory(e.target.value)}
                                        className="w-full bg-[#F3F4F8] border border-transparent rounded-xl px-4 py-3 text-sm text-gray-800 appearance-none focus:bg-white focus:border-gray-200 focus:outline-none transition-all pr-10 cursor-pointer"
                                    >
                                        <option value="Technical Issue">Technical Issue</option>
                                        <option value="Design Request">Design Request</option>
                                        <option value="Account & Billing">Account & Billing</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            {/* Issue Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Issue Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={issueType}
                                        onChange={e => setIssueType(e.target.value)}
                                        className="w-full bg-[#F3F4F8] border border-transparent rounded-xl px-4 py-3 text-sm text-gray-800 appearance-none focus:bg-white focus:border-gray-200 focus:outline-none transition-all pr-10 cursor-pointer"
                                    >
                                        <option value="Bug Report">Bug Report</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Question">Question</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={5}
                                required
                                placeholder={description}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full bg-[#F3F4F8] border border-transparent rounded-xl p-4 text-sm text-gray-800 focus:bg-white focus:border-gray-200 focus:outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Drag & Drop File Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Upload any Attachments{' '}
                                <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                                    isDragging
                                        ? 'border-cyan-400 bg-sky-50/50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <input
                                    type="file"
                                    id="file-input"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="file-input"
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                        <FolderUpload  />
                                  
                                    <p className="text-base font-bold text-[#100D40]">
                                        Drop files here or click to upload
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PDF, DOCX, XLSX, PNG, JPG, ZIP — up to 50 MB each
                                    </p>
                                </label>
                            </div>

                            {/* Uploaded Files Preview */}
                            {files.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {files.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 bg-[#F3F4F8] rounded-xl text-xs"
                                        >
                                            <span className="font-medium text-gray-700 truncate max-w-sm">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(idx)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#100D40] hover:bg-[#1a1758] text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm"
                            >
                                <span>Submit Ticket</span>
                                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
