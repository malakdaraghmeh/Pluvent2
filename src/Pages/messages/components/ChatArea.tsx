import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { MessagesBackIcon, MessagesPlusIcon, MessagesSendIcon } from '@/assets';
import type { Chat, Message } from '@/utils/types/chat.types';

interface ChatAreaProps {
    activeChat?: Chat;
    messages: Message[];
    inputText: string;
    onInputChange: (text: string) => void;
    onSendMessage: (event: FormEvent) => void;
    onBack: () => void;
    className?: string;
}

export const ChatArea = ({
    activeChat,
    messages,
    inputText,
    onInputChange,
    onSendMessage,
    onBack,
    className = '',
}: ChatAreaProps) => {
    const { t, i18n } = useTranslation('chat');
    const isArabic = i18n.language.startsWith('ar');

    const getMessageText = (message: Message) => {
        if (message.text !== 'sampleMessage') return message.text;

        return t('sampleMessage', {
            defaultValue: isArabic
                ? 'مرحبًا! لقد راجعنا طلبك الأخير وشاركنا التحديثات مع فريقنا.'
                : "Hi! We've reviewed your latest request and shared the updates with our team.",
        });
    };

    return (
        <section
            className={`min-w-0 flex-1 overflow-hidden bg-white shadow-sm max-md:h-screen max-md:w-full max-md:p-4 md:h-[calc(100vh-32px)] md:rounded-[24px] md:border md:border-[#EEF0F5] md:p-5 3xl:p-6 4xl:p-8 ${className}`}
        >
            <div className="flex h-full min-h-0 flex-col">
                <div className="mb-3 flex shrink-0 items-center gap-3 border-b border-[#EEF0F5] pb-3 md:hidden">
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label={t('back')}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    >
                        <MessagesBackIcon className="h-5 w-5 rtl:rotate-180" />
                    </button>

                    {activeChat && (
                        <div className="flex min-w-0 items-center gap-3">
                            {activeChat.avatar && (
                                <img
                                    src={activeChat.avatar}
                                    alt={activeChat.name}
                                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                                />
                            )}
                            <div className="min-w-0">
                                <h2 className="truncate text-sm font-semibold text-[#101828]">
                                    {activeChat.name}
                                </h2>
                                <p className="truncate text-xs text-[#98A2B3]">
                                    {activeChat.isPinned
                                        ? t('pulventTeamMembers', { count: 2 })
                                        : t('membersCount', {
                                              count: activeChat.membersCount ?? 0,
                                          })}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pe-1 [scrollbar-width:thin] [scrollbar-color:#D9DCEF_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D9DCEF]">
                    <div className="space-y-5 3xl:space-y-6 4xl:space-y-7">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex w-full items-start gap-3 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <img
                                    src={message.senderAvatar}
                                    alt={message.senderName}
                                    className="h-10 w-10 shrink-0 rounded-full object-cover 3xl:h-[44px] 3xl:w-[44px] 4xl:h-[48px] 4xl:w-[48px]"
                                />

                                <div
                                    className={`flex min-w-0 flex-col ${message.isMe ? 'items-end' : 'items-start'}`}
                                >
                                    <div className="mb-[6px] flex items-center gap-2">
                                        <span className="text-[12px] font-semibold text-[#17164C] 3xl:text-[13px] 4xl:text-[14px]">
                                            {message.senderName}
                                        </span>
                                        <span className="text-[11px] font-normal text-[#98A2B3] 3xl:text-[12px]">
                                            {message.time}
                                        </span>
                                    </div>

                                    <div
                                        className={`w-fit rounded-[100px] px-4 py-[11px] text-[12px] leading-[18px] max-md:max-w-[85%] max-md:whitespace-normal md:max-w-none md:whitespace-nowrap 3xl:px-5 3xl:py-3 3xl:text-[13px] 4xl:px-6 4xl:py-[14px] 4xl:text-[14px] ${message.isMe ? 'bg-[#12115C] text-white' : 'bg-[#F2F1FA] text-[#27264D]'}`}
                                    >
                                        {getMessageText(message)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={onSendMessage} className="mt-4 w-full shrink-0">
                    <div className="mx-auto flex w-full max-w-[570px] items-center gap-2 3xl:max-w-[760px] 4xl:max-w-[980px]">
                        <button
                            type="button"
                            aria-label={t('addAttachment')}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF2FF] transition hover:bg-[#E2EAFF] 3xl:h-[52px] 3xl:w-[52px] 4xl:h-14 4xl:w-14"
                        >
                            <MessagesPlusIcon className="h-5 w-5 3xl:h-[22px] 3xl:w-[22px]" />
                        </button>

                        <div className="flex h-12 min-w-0 flex-1 items-center rounded-[100px] bg-[#F0FEFC] py-2 ps-4 pe-2 shadow-[0_2px_15px_rgba(0,0,0,0.05)] 3xl:h-[52px] 4xl:h-14">
                            <input
                                type="text"
                                value={inputText}
                                onChange={event => onInputChange(event.target.value)}
                                placeholder={t('typeMessagePlaceholder')}
                                className="min-w-0 flex-1 bg-transparent text-[12px] text-[#344054] outline-none placeholder:text-[#98A2B3] 3xl:text-[13px] 4xl:text-[14px]"
                            />

                            <button
                                type="submit"
                                aria-label={t('sendMessage')}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3634C7] transition hover:bg-[#2F2DB0] 3xl:h-10 3xl:w-10 4xl:h-[42px] 4xl:w-[42px]"
                            >
                                <MessagesSendIcon className="h-4 w-4 3xl:h-[18px] 3xl:w-[18px] rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};
