import { type FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatIcon from '@icons/bubble-chat.svg?react';
import SendIcon from '@icons/send.svg?react';
import PulventLogo from '@/assets/images/messages-pulvent-logo.png';
import UserAvatar from '@/assets/images/change-request-chat-avatar.png';
import type { WaitingDiscussionProps } from '../../../../utils/types/change-request-details.types';
import './WaitingDiscussion.css';

type LocalMessage = {
    id: number;
    text: string;
    time: string;
};

export default function WaitingDiscussion({
    discussTitle,
    discussDescription,
    pulventName,
    pulventTime,
    pulventMessage,
    userName,
    userTime,
    userMessage,
    placeholder,
}: WaitingDiscussionProps) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState<LocalMessage[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollRef.current;

        if (!element) return;

        if (sentMessages.length === 0) {
            element.scrollTop = 0;
            return;
        }

        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth',
        });
    }, [sentMessages]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        const now = new Date();

        const time = new Intl.DateTimeFormat(
            isArabic ? 'ar-EG' : 'en-US',
            {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            },
        ).format(now);

        setSentMessages(current => [
            ...current,
            {
                id: Date.now(),
                text: trimmedMessage,
                time,
            },
        ]);

        setMessage('');
    };

    return (
        <section className="flex min-w-0 flex-col gap-3">
            <div className={`flex min-h-[58px] w-full items-center gap-3 rounded-[16px] border border-[#D7EEEC] bg-[#EBFCFB] px-4 py-3 ${isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <ChatIcon className="h-6 w-6 shrink-0 text-[#12115C]" />

                <div className="min-w-0">
                    <h2 className="font-['Sora'] text-[13px] font-semibold leading-[130%] text-[#12115C] sm:text-[14px]">
                        {discussTitle}
                    </h2>

                    <p className="mt-0.5 break-words font-['Sora'] text-[11px] font-normal leading-[140%] text-[#64748B] sm:text-[12px]">
                        {discussDescription}
                    </p>
                </div>
            </div>

            <div className="flex min-h-[374px] min-w-0 flex-col rounded-[16px] border border-[#E2E8F0] bg-white p-4">
                <div
                    ref={scrollRef}
                    className="waiting-chat-scroll h-[232px] min-h-[232px] overflow-y-auto pr-3"
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex min-w-0 items-start gap-3">
                            <img
                                src={PulventLogo}
                                alt=""
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />

                            <div className="min-w-0 max-w-[82%]">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="font-['Sora'] text-[12px] font-semibold leading-none text-[#12115C]">
                                        {pulventName}
                                    </span>

                                    <span className="font-['Sora'] text-[11px] font-normal leading-none text-[#7E7C9C]">
                                        {pulventTime}
                                    </span>
                                </div>

                                <div className={`relative rounded-[28px] bg-[#F1F0FF] px-4 py-3 font-['Sora'] text-[12px] font-normal leading-[150%] text-[#1E293B] sm:text-[13px] ${isArabic ? 'text-right' : 'text-left'}`}>
                                    {pulventMessage}

                                    <span className="absolute -bottom-2 left-4 h-4 w-5 bg-[#F1F0FF] [clip-path:polygon(0_0,100%_0,0_100%)]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex min-w-0 items-start justify-end gap-3">
                            <div className="min-w-0 max-w-[82%]">
                                <div className="mb-2 flex items-center justify-end gap-2">
                                    <span className="font-['Sora'] text-[12px] font-semibold leading-none text-[#12115C]">
                                        {userName}
                                    </span>

                                    <span className="font-['Sora'] text-[11px] font-normal leading-none text-[#7E7C9C]">
                                        {userTime}
                                    </span>
                                </div>

                                <div className={`relative rounded-[28px] bg-[#17166B] px-4 py-3 font-['Sora'] text-[12px] font-normal leading-[150%] text-white sm:text-[13px] ${isArabic ? 'text-right' : 'text-left'}`}>
                                    {userMessage}

                                    <span className="absolute -bottom-2 right-4 h-4 w-5 bg-[#17166B] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                                </div>
                            </div>

                            <img
                                src={UserAvatar}
                                alt=""
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                        </div>

                        {sentMessages.map(item => (
                            <div
                                key={item.id}
                                className="flex min-w-0 items-start justify-end gap-3"
                            >
                                <div className="min-w-0 max-w-[82%]">
                                    <div className="mb-2 flex items-center justify-end gap-2">
                                        <span className="font-['Sora'] text-[12px] font-semibold leading-none text-[#12115C]">
                                            {userName}
                                        </span>

                                        <span className="font-['Sora'] text-[11px] font-normal leading-none text-[#7E7C9C]">
                                            {item.time}
                                        </span>
                                    </div>

                                    <div className={`relative break-words rounded-[28px] bg-[#17166B] px-4 py-3 font-['Sora'] text-[12px] font-normal leading-[150%] text-white sm:text-[13px] ${isArabic ? 'text-right' : 'text-left'}`}>
                                        {item.text}

                                        <span className="absolute -bottom-2 right-4 h-4 w-5 bg-[#17166B] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                                    </div>
                                </div>

                                <img
                                    src={UserAvatar}
                                    alt=""
                                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={`mt-auto flex h-[52px] w-full items-center gap-3 rounded-[28px] bg-[#E9FBFA] p-1.5 pl-4 ${isArabic ? 'flex-row-reverse pl-1.5 pr-4' : 'flex-row'}`}
                >
                    <input
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        placeholder={placeholder}
                        className={`min-w-0 flex-1 bg-transparent font-['Sora'] text-[12px] font-normal text-[#1E293B] outline-none placeholder:text-[#334155] sm:text-[13px] ${isArabic ? 'text-right' : 'text-left'}`}
                    />

                    <button
                        type="submit"
                        aria-label="Send message"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                        <SendIcon className={`h-5 w-5 text-white ${isArabic ? 'rotate-180' : ''}`} />
                    </button>
                </form>
            </div>
        </section>
    );
}