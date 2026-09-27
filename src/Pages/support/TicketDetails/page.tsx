import React, { useState } from 'react';
import { Upload, X, ArrowRight } from 'lucide-react';
import FolderUpload from '@icons/folder-upload.svg?react';

export default function TicketDetails() {
    const [ticketStatus, setTicketStatus] = useState('Open');
    const [description, setDescription] = useState(
        'The logo file is not displaying correctly in print. Please check the attached file and let me know how we can fix this.'
    );
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    // Handle file selection
    const handleFileChange = e => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };

    // Drag & Drop Handlers
    const handleDragOver = e => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = e => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    };

    const removeFile = indexToRemove => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert('Ticket response submitted successfully!');
    };

    const handleCloseTicket = () => {
        setTicketStatus(ticketStatus === 'Open' ? 'Closed' : 'Open');
    };

    return (
        <div className="min-h-screen bg-[#F3F4F8] p-4 sm:p-6 md:p-10 font-sans text-gray-700">
            <div className="max-w-5xl mx-auto">
                {/* Page Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-[#100D40] mb-6">
                    Ticket Details
                </h1>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#100D40]">
                                    Ticket# 2023-CS123
                                </h2>
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-md ${ticketStatus === 'Open'
                                            ? 'bg-[#EEEFFB] text-[#5252A3]'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {ticketStatus}
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium text-sm mt-1">
                                Upload By : <span className="text-gray-600">Maryam Hosam</span>
                            </p>
                        </div>

                        <div className="md:text-right">
                            <h3 className="text-lg font-bold text-[#100D40]">Project Ticket</h3>
                            <p className="text-xs text-gray-400 mt-1">Posted at 2025 - 12:45 AM</p>
                        </div>
                    </div>

                    {/* Ticket Query Content */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#100D40]">
                            How to deposit money to my portal?
                        </h3>
                        <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
                                amet, consectetur
                            </p>
                        </div>
                    </div>

                    {/* Response Bubble */}
                    <div className="flex flex-col items-end pt-2">
                        <div className="flex items-center gap-2 mb-1 pr-1 text-xs text-gray-500">
                            <span className="font-bold text-[#100D40]">Pulvent</span>
                            <span className="text-gray-400">01:08 am</span>
                        </div>
                        <div className="flex items-end gap-2 max-w-xl">
                            <div className="relative bg-[#100D40] text-white text-xs sm:text-sm py-3 px-5 rounded-2xl rounded-tr-none shadow-sm">
                                Hi! We&apos;ve reviewed your latest request and shared the updates
                                with our team.
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#100D40] flex items-center justify-center text-cyan-400 font-extrabold text-sm flex-shrink-0 shadow">
                                P
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        {/* Description Textarea */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ticket Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                                className="w-full bg-[#F3F4F8] border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#100D40] focus:bg-white transition-all resize-none"
                            />
                        </div>

                        {/* Dropzone Attachment Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload any Attachments{' '}
                                <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-4 cursor-pointer ${isDragging
                                        ? 'border-[#38bdf8] bg-sky-50'
                                        : 'border-cyan-100 bg-white hover:bg-slate-50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col sm:flex-row items-center gap-4 cursor-pointer w-full justify-center"
                                >

                                    <FolderUpload />
                                    <div className="text-center sm:text-left">
                                        <p className="text-base font-bold text-[#100D40]">
                                            Drop files here or click to upload
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            PDF, DOCX, XLSX, PNG, JPG, ZIP — up to 50 MB each
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Uploaded Files List */}
                            {files.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {files.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-xs border border-gray-200"
                                        >
                                            <span className="truncate max-w-xs font-medium text-gray-700">
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

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCloseTicket}
                                className="w-full sm:w-auto px-8 py-3 rounded-full border border-red-400 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors"
                            >
                                {ticketStatus === 'Open' ? 'Close Ticket' : 'Reopen Ticket'}
                            </button>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#100D40] hover:bg-[#1a1758] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                Submit Ticket
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
