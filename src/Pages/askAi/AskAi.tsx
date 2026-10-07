import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { AskAiSendIcon as Send } from '@/assets';
import { AskAiLogoIcon as LogoIcon } from '@/assets';
import { AskAiAttachmentIcon as Attachment } from '@/assets';

interface AskAiProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: number;
    sender: 'pulvent' | 'user';
    time: string;
    isUser: boolean;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        sender: 'pulvent',
        time: '01:08 am',
        isUser: false,
    },
    {
        id: 2,
        sender: 'user',
        time: '02:08 am',
        isUser: true,
    },
    {
        id: 3,
        sender: 'pulvent',
        time: '01:08 am',
        isUser: false,
    },
    {
        id: 4,
        sender: 'user',
        time: '02:08 am',
        isUser: true,
    },
];

export default function AskAi({
    isOpen,
    onClose,
}: AskAiProps) {
    const { t, i18n } = useTranslation('chat');
    const isArabic = i18n.language.startsWith('ar');
    const panelRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: PointerEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('pointerdown', handleClickOutside, true);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside, true);
        };
    }, [isOpen, onClose]);

    const handleSend = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const text = inputValue.trim();

        if (!text) return;

        setMessages(current => [
            ...current,
            {
                id: Date.now(),
                sender: 'user',
                time: new Date().toLocaleTimeString(isArabic ? 'ar-EG' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                isUser: true,
            },
        ]);

        setInputValue('');
    };

    if (!isOpen) return null;

    return (
        <div
            ref={panelRef}
            className="
                fixed
                bottom-6
                right-6
                z-50
                flex
                h-[640px]
                max-h-[calc(100vh-48px)]
                w-[440px]
                max-w-[calc(100vw-48px)]
                flex-col
                overflow-hidden
                rounded-[28px]
                border
                border-[#EEF0F5]
                bg-white
                shadow-[0_12px_40px_rgba(18,17,92,0.12)]
                max-sm:bottom-3
                max-sm:right-3
                max-sm:h-[calc(100vh-24px)]
                max-sm:w-[calc(100vw-24px)]
                max-sm:max-w-none
            "
        >
            <div
                className="
                    min-h-0
                    flex-1
                    space-y-6
                    overflow-y-auto
                    px-6
                    pb-6
                    pt-12
                    [scrollbar-color:#B1B4B6_#FCFCFC]
                    [scrollbar-width:thin]
                    [&::-webkit-scrollbar]:w-[6px]
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-[#FCFCFC]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#B1B4B6]
                "
            >
                {messages.map(message => (
                    <div key={message.id}>
                        {message.isUser ? (
                            <div className="flex flex-col items-end">
                                <div
                                    className={`mb-2 flex items-center gap-2 ${
                                        isArabic ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                                >
                                    <span className="text-[12px] font-normal text-[#8990A3]">
                                        {message.time}
                                    </span>

                                    <span className="text-[13px] font-semibold text-[#12115C]">
                                        {t('askAi.you')}
                                    </span>
                                </div>

                                <div
                                    className={`relative max-w-[85%] rounded-[20px] bg-[#12115C] px-5 py-3 text-[14px] leading-[21px] text-white ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    {message.id <= 4 ? t('askAi.userMessage') : inputValue}

                                    <span className="pointer-events-none absolute bottom-[-6px] right-[14px] h-[8px] w-[22px] bg-[#12115C] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`flex items-start gap-3 ${
                                    isArabic ? 'flex-row-reverse' : 'flex-row'
                                }`}
                            >
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12115C]">
                                    <LogoIcon className="h-6 w-6" />
                                </div>

                                <div
                                    className={`min-w-0 flex-1 ${
                                        isArabic ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    <div
                                        className={`mb-2 flex items-center gap-2 ${
                                            isArabic ? 'flex-row-reverse justify-end' : 'flex-row'
                                        }`}
                                    >
                                        <span className="text-[13px] font-semibold text-[#12115C]">
                                            Pulvent
                                        </span>

                                        <span className="text-[12px] font-normal text-[#8990A3]">
                                            {message.time}
                                        </span>
                                    </div>

                                    <div className="relative max-w-[88%] rounded-[20px] bg-[#F2F0FC] px-5 py-3 text-[14px] leading-[21px] text-[#25263A]">
                                        {t('askAi.pulventMessage')}

                                        <span
                                            className={`pointer-events-none absolute bottom-[-6px] h-[8px] w-[22px] bg-[#F2F0FC] ${
                                                isArabic
                                                    ? 'right-[14px] [clip-path:polygon(0_0,100%_0,100%_100%)]'
                                                    : 'left-[14px] [clip-path:polygon(0_0,100%_0,0_100%)]'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="shrink-0 bg-white px-5 pb-5 pt-3">
                <form
                    onSubmit={handleSend}
                    className={`flex h-[58px] items-center gap-2 rounded-full border border-[#EEF0F5] bg-white p-1.5 shadow-[0_3px_16px_rgba(18,17,92,0.08)] ${
                        isArabic ? 'flex-row-reverse' : 'flex-row'
                    }`}
                >
                    <button
                        type="button"
                        aria-label={t('askAi.attachment')}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]"
                    >
                        <Attachment className="h-5 w-5" />
                    </button>

                    <div
                        className={`flex h-full min-w-0 flex-1 items-center rounded-full bg-[#F0FFFC] px-2 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={event => setInputValue(event.target.value)}
                            placeholder={t('askAi.placeholder')}
                            className={`min-w-0 flex-1 bg-transparent px-2 text-[14px] text-[#25263A] outline-none placeholder:text-[#A3A8B7] ${
                                isArabic ? 'text-right' : 'text-left'
                            }`}
                        />

                        <button
                            type="submit"
                            aria-label={t('askAi.send')}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3634C7]"
                        >
                            <Send className={`h-[18px] w-[18px] ${isArabic ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
