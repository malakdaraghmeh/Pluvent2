
import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Chat, Message } from '../chat';
import Send from "@icons/send.svg?react";

interface ChatAreaProps {
    activeChat?: Chat;
    messages: Message[];
    inputText: string;
    onInputChange: (text: string) => void;
    onSendMessage: (e: React.FormEvent) => void;
    onBack: () => void;
    className?: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
    activeChat,
    messages,
    inputText,
    onInputChange,
    onSendMessage,
    onBack,
    className = '',
}) => {
    const { t } = useTranslation("chat");

    return (
        <div className={`flex-1 flex-col rounded-none md:rounded-3xl bg-white p-3 md:p-6 shadow-sm border-0 md:border border-slate-100 justify-between ${className}`}>
            {/* Mobile Header with Back Button */}
            <div className="flex items-center gap-3 pb-3 mb-2 border-b border-slate-100 md:hidden">
                <button
                    onClick={onBack}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition rtl:rotate-180"
                    aria-label="Back"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                {activeChat && (
                    <div className="flex items-center gap-3">
                        <img
                            src={activeChat.avatar}
                            alt={activeChat.name}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-sm font-bold text-[#0F172A]">{activeChat.name}</h2>
                            <p className="text-xs text-gray-400">{activeChat.subtitle || t('online')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto space-y-6 md:space-y-8 pr-1 md:pr-2 custom-scrollbar">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 md:gap-4 items-start ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        {/* Avatar */}
                        <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover shrink-0"
                        />

                        {/* Content Container */}
                        <div
                            className={`flex flex-col max-w-[78%] md:max-w-xl ${msg.isMe ? 'items-end' : 'items-start'}`}
                        >
                            {/* Header: Name and Time */}
                            <div className="flex items-center gap-2 mb-2">
                                {msg.isMe ? (
                                    <>
                                        <span className="text-xs text-slate-400 font-normal">{msg.time}</span>
                                        <span className="text-sm font-bold text-[#06043A]">{msg.senderName}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm font-bold text-[#06043A]">{msg.senderName}</span>
                                        <span className="text-xs text-slate-400 font-normal">{msg.time}</span>
                                    </>
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`relative px-5 py-3.5 text-xs md:text-sm leading-relaxed rounded-[26px] ${msg.isMe
                                    ? 'bg-[#0B0A42] text-white rounded-br-[4px] rtl:rounded-br-[26px] rtl:rounded-bl-[4px]'
                                    : 'bg-[#F3F2FA] text-[#06043A] rounded-bl-[4px] rtl:rounded-bl-[26px] rtl:rounded-br-[4px]'
                                    }`}
                            >
                                {msg.text}

                                {/* Tail SVG shape mirroring the exact curve */}
                                {msg.isMe ? (
                                    <svg
                                        className="absolute bottom-0 -right-2 rtl:right-auto rtl:-left-2 rtl:scale-x-[-1] h-4 w-3 text-[#0B0A42] fill-current"
                                        viewBox="0 0 12 16"
                                    >
                                        <path d="M0 0C0 8 4 16 12 16H0V0Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="absolute bottom-0 -left-2 rtl:left-auto rtl:-right-2 rtl:scale-x-[-1] h-4 w-3 text-[#F3F2FA] fill-current"
                                        viewBox="0 0 12 16"
                                    >
                                        <path d="M12 0C12 8 8 16 0 16H12V0Z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={onSendMessage} className="mt-3 md:mt-4 shadow-[0px_2px_15px_0px_#0000000D] p-1.5 md:p-2 rounded-full">
                <div className="flex items-center gap-2 md:gap-3 w-full">
                    <button
                        type="button"
                        className="flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-[#EBF2FF] text-[#3B38D8] hover:bg-indigo-100 transition shadow-sm"
                    >
                        <Plus className="h-4 w-4 md:h-5 md:w-5" />
                    </button>

                    <div className="flex flex-1 items-center justify-between rounded-full bg-[#EBFDFB] px-3 md:px-4 py-1 md:py-1.5 shadow-sm border border-emerald-50/50">
                        <input
                            type="text"
                            placeholder={t('typeMessagePlaceholder')}
                            value={inputText}
                            onChange={e => onInputChange(e.target.value)}
                            className="w-full bg-transparent text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none pl-1 md:pl-2 pr-2 md:pr-3"
                        />

                        <button
                            type="submit"
                            className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-[#3B38D8] text-white hover:bg-indigo-700 transition shadow-md rtl:rotate-180"
                        >
                            <Send className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};