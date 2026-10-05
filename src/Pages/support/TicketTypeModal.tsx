import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Folder, MessageSquare, ChevronRight, X } from 'lucide-react';
import TicketIllustration from '@icons/general-ticket.svg?react';

interface TicketTypeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue?: (selectedType: 'project' | 'general') => void;
}

export default function TicketTypeModal({ open, onOpenChange, onContinue }: TicketTypeModalProps) {
    const { t, i18n } = useTranslation('ticketTypeModal');
    const isArabic = i18n.language.startsWith('ar');
    const textAlign = isArabic ? 'text-right' : 'text-center';

    const [selectedType, setSelectedType] = useState<'project' | 'general'>('general');

    if (!open) return null;

    const handleContinue = () => {
        if (onContinue) {
            onContinue(selectedType);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 font-sans ${
                isArabic ? 'rtl' : 'ltr'
            }`}
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* Modal Container */}
            <div className="relative w-full max-w-lg sm:max-w-xl rounded-[32px] bg-white p-8 shadow-2xl transition-all">
                {/* Custom Close Button in top right/left depending on direction */}
                <button
                    onClick={() => onOpenChange(false)}
                    className={`absolute top-4 ${
                        isArabic ? 'left-4' : 'right-4'
                    } w-10 h-10 rounded-xl bg-[#100D40] text-white flex items-center justify-center hover:bg-[#1a1758] transition-colors`}
                    aria-label={t('close', 'Close')}
                >
                    <X className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Header Section */}
                <div className={`flex flex-col items-center ${textAlign} space-y-2 mt-2`}>
                    {/* Top Illustration graphic */}
                    <div className="w-full flex justify-center mb-2">
                        <TicketIllustration />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#100D40] tracking-tight">
                        {t('title', 'What type of ticket do you need?')}
                    </h2>

                    <p className="text-gray-400 text-sm font-normal">
                        {t(
                            'description',
                            'Choose an option below to get started with your request.'
                        )}
                    </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {/* Card 1: Project completed */}
                    <button
                        type="button"
                        onClick={() => setSelectedType('project')}
                        className={`p-6 rounded-2xl text-center transition-all flex flex-col items-center justify-center border-2 ${
                            selectedType === 'project'
                                ? 'border-cyan-400 bg-sky-50/40 ring-1 ring-cyan-400'
                                : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-[#00E5C810] flex items-center justify-center text-[#4F46E5] mb-4">
                            <Folder className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h4 className="text-base font-bold text-[#100D40] mb-2">
                            {t('options.project.title', 'Project Ticket')}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {t(
                                'options.project.description',
                                'Get help regarding a specific completed project.'
                            )}
                        </p>
                    </button>

                    {/* Card 2: General Inquiry */}
                    <button
                        type="button"
                        onClick={() => setSelectedType('general')}
                        className={`p-6 rounded-2xl text-center transition-all flex flex-col items-center justify-center border-2 ${
                            selectedType === 'general'
                                ? 'border-cyan-400 bg-sky-50/40 ring-1 ring-cyan-400'
                                : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-[#00E5C810] flex items-center justify-center text-[#4F46E5] mb-4">
                            <MessageSquare className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h4 className="text-base font-bold text-[#100D40] mb-2">
                            {t('options.general.title', 'General Inquiry')}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {t(
                                'options.general.description',
                                'Ask general questions or request assistance.'
                            )}
                        </p>
                    </button>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className={`w-full py-4 px-6 rounded-2xl bg-[#100D40] hover:bg-[#1a1758] text-white font-medium text-base flex items-center justify-center gap-2 transition-all shadow-md ${
                        isArabic ? 'flex-row-reverse' : ''
                    }`}
                >
                    <span>{t('continue', 'Continue')}</span>
                    <ChevronRight
                        className={`w-5 h-5 stroke-[2.5] ${isArabic ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>
        </div>
    );
}
