import React, { useState } from 'react';
import { Info, CheckCircle2, ChevronDown, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FolderUpload from '@icons/folder-upload.svg?react';
import SupportTicketConfirmModal from '../components/SupportTicketConfirmModal';

export default function CreateSupportInquiry({ isOpen, onClose }) {
    const { t, i18n } = useTranslation('tickets');
    const isRtl = i18n.language === 'ar';

    const [subject, setSubject] = useState('');
    const [ticketCategory, setTicketCategory] = useState('technical');
    const [issueType, setIssueType] = useState('bug');
    const [description, setDescription] = useState('');

    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleFileChange = e => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };

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

  /*   const handleSubmit = e => {
        e.preventDefault();
        console.log({
            subject,
            ticketCategory,
            issueType,
            description,
            files,
        });
        alert(t('createModal.successAlert'));
        onClose();
    }; */
    const handleSubmit = () => {
    console.log({
        subject,
        ticketCategory,
        issueType,
        description,
        files,
    });

    alert(t('createModal.successAlert'));

    onClose();
};

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm transition-all"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={e => e.stopPropagation()}
                className="relative my-auto w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 font-sans text-gray-800"
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b pb-4 border-gray-100">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#100D40]">
                            {t('createModal.title')}
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">{t('createModal.subtitle')}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 shrink-0 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Warranty Banner */}
                    <div className="border border-emerald-400 bg-[#E8F8F3] rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                <Info className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-emerald-950">
                                    {t('createModal.warrantyNotice')}
                                </p>
                                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                                    {t('createModal.warrantyDetails')}
                                </p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 hidden sm:block" />
                    </div>

                    <form    onSubmit={(e) => {
                            e.preventDefault();
                            setIsConfirmModalOpen(true);
                        }} className="space-y-6">
                        {/* Header Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('createModal.fields.subject.label')}{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={subject}
                                    placeholder={t('createModal.fields.subject.placeholder')}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full bg-[#F3F4F8] border border-transparent rounded-xl px-4 py-3 text-sm text-gray-800 focus:bg-white focus:border-gray-200 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Ticket Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('createModal.fields.category.label')}{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={ticketCategory}
                                        onChange={e => setTicketCategory(e.target.value)}
                                        className={`w-full bg-[#F3F4F8] border border-transparent rounded-xl py-3 text-sm text-gray-800 appearance-none focus:bg-white focus:border-gray-200 focus:outline-none transition-all cursor-pointer ${
                                            isRtl ? 'pr-4 pl-10' : 'pl-4 pr-10'
                                        }`}
                                    >
                                        <option value="technical">
                                            {t('createModal.categories.technical')}
                                        </option>
                                        <option value="design">
                                            {t('createModal.categories.design')}
                                        </option>
                                        <option value="billing">
                                            {t('createModal.categories.billing')}
                                        </option>
                                    </select>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                                            isRtl ? 'left-3.5' : 'right-3.5'
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Issue Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('createModal.fields.issueType.label')}
                                </label>
                                <div className="relative">
                                    <select
                                        value={issueType}
                                        onChange={e => setIssueType(e.target.value)}
                                        className={`w-full bg-[#F3F4F8] border border-transparent rounded-xl py-3 text-sm text-gray-800 appearance-none focus:bg-white focus:border-gray-200 focus:outline-none transition-all cursor-pointer ${
                                            isRtl ? 'pr-4 pl-10' : 'pl-4 pr-10'
                                        }`}
                                    >
                                        <option value="bug">
                                            {t('createModal.issueTypes.bug')}
                                        </option>
                                        <option value="feature">
                                            {t('createModal.issueTypes.feature')}
                                        </option>
                                        <option value="question">
                                            {t('createModal.issueTypes.question')}
                                        </option>
                                    </select>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                                            isRtl ? 'left-3.5' : 'right-3.5'
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('createModal.fields.description.label')}{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={5}
                                required
                                value={description}
                                placeholder={t('createModal.fields.description.placeholder')}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full bg-[#F3F4F8] border border-transparent rounded-xl p-4 text-sm text-gray-800 focus:bg-white focus:border-gray-200 focus:outline-none transition-all resize-none"
                            />
                        </div>

                        {/* File Upload Dropzone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('createModal.fields.upload.label')}{' '}
                                <span className="text-gray-400 font-normal">
                                    ({t('createModal.fields.upload.optional')})
                                </span>
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
                                    <FolderUpload />
                                    <p className="text-base font-bold text-[#100D40]">
                                        {t('createModal.dropzone.title')}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {t('createModal.dropzone.hint')}
                                    </p>
                                </label>
                            </div>

                            {/* Files List */}
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
                                <span>{t('createModal.submitBtn')}</span>
                                {isRtl ? (
                                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                                )}
                            </button>
                        </div>
                    </form>
                    <SupportTicketConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={() => {
                    setIsConfirmModalOpen(false);

                    handleSubmit();
                }}
  isRtl={isRtl}
/>
                </div>
            </div>
        </div>
    );
}
