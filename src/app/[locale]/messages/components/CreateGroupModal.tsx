'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { INITIAL_MEMBERS } from '../mockData';

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGroup: (name: string, memberIds: string[]) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
    const t = useTranslations('chat.createGroupModal');
    const [groupName, setGroupName] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['1', '2', '3']);

    if (!isOpen) return null;

    const toggleMember = (id: string) => {
        if (selectedMemberIds.includes(id)) {
            setSelectedMemberIds(selectedMemberIds.filter(mId => mId !== id));
        } else {
            setSelectedMemberIds([...selectedMemberIds, id]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupName.trim()) return;
        onCreateGroup(groupName, selectedMemberIds);
        setGroupName('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#0F172A]">{t('title')}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {t('subtitle')}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-[#1A1A40] p-1.5 text-white hover:bg-opacity-90 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[#0F172A]">
                            {t('groupNameLabel')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder={t('groupNamePlaceholder')}
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            className="mt-2 w-full rounded-xl bg-[#F4F6FA] px-4 py-4 text-sm text-[#615E8B] placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-bold text-[#0F172A]">
                                {t('chooseMembersLabel')} <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs font-semibold text-gray-500">
                                {t('membersCount', { count: selectedMemberIds.length })}
                            </span>
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                            {INITIAL_MEMBERS.map(member => {
                                const isSelected = selectedMemberIds.includes(member.id);
                                return (
                                    <div
                                        key={member.id}
                                        onClick={() => toggleMember(member.id)}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                                            isSelected
                                                ? 'border-emerald-200 bg-emerald-50/40'
                                                : 'border-slate-100 bg-white hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="text-sm font-semibold text-[#0F172A]">
                                                    {member.name}
                                                </h4>
                                                <span
                                                    className={`text-xs font-medium ${
                                                        member.isPinned
                                                            ? 'text-teal-600'
                                                            : 'text-indigo-600'
                                                    }`}
                                                >
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
                                                isSelected
                                                    ? 'border-indigo-600 bg-indigo-600'
                                                    : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B0C39] py-3.5 text-sm font-semibold text-white transition hover:bg-opacity-95 shadow-md"
                    >
                        <Plus className="h-4 w-4" />
                        <span>{t('submitButton')}</span>
                        <span className="text-xs ml-0.5 rtl:mr-0.5 rtl:ml-0 rtl:rotate-180">›</span>
                    </button>
                </form>
            </div>
        </div>
    );
};