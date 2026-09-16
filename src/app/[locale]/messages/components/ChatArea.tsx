'use client';

import React from 'react';
import { Plus, Send } from 'lucide-react';
import { Message } from '../chat';

interface ChatAreaProps {
    messages: Message[];
    inputText: string;
    onInputChange: (text: string) => void;
    onSendMessage: (e: React.FormEvent) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
    messages,
    inputText,
    onInputChange,
    onSendMessage,
}) => {
    return (
        <div className="flex-1 flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-100 justify-between">
            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="h-8 w-8 rounded-full object-cover mb-1"
                        />

                        <div
                            className={`flex flex-col max-w-lg ${msg.isMe ? 'items-end' : 'items-start'}`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-[#0F172A]">
                                    {msg.senderName}
                                </span>
                                <span className="text-[11px] text-gray-400">{msg.time}</span>
                            </div>

                            <div
                                className={`p-4 text-sm leading-relaxed ${
                                    msg.isMe
                                        ? 'bg-[#0B0C39] text-white rounded-2xl rounded-tr-none'
                                        : 'bg-[#F1F5F9] text-[#0F172A] rounded-2xl rounded-tl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={onSendMessage} className="mt-4">
                <div className="flex items-center gap-3 w-full">
                    <button
                        type="button"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EBF2FF] text-[#3B38D8] hover:bg-indigo-100 transition shadow-sm"
                    >
                        <Plus className="h-5 w-5" />
                    </button>

                    <div className="flex flex-1 items-center justify-between rounded-full bg-[#EBFDFB] px-4 py-1.5 shadow-sm border border-emerald-50/50">
                        <input
                            type="text"
                            placeholder="Type Message..."
                            value={inputText}
                            onChange={e => onInputChange(e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none pl-2 pr-3"
                        />

                        <button
                            type="submit"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B38D8] text-white hover:bg-indigo-700 transition shadow-md"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};