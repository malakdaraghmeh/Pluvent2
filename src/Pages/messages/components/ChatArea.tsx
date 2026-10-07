import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MessagesBackIcon,
    MessagesCurrentUserAvatar,
    MessagesPlusIcon,
    MessagesPulventLogo,
    MessagesSendIcon,
} from '@/assets';
import type { ChatAreaProps } from '../../../../utils/types/chat.types';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isArabic = i18n.language.startsWith('ar');
    const isPrivateChat = activeChat?.id === 'pinned-1';

    const PrivateChatAvatar = ({ className = '' }: { className?: string }) => (
        <div
            className={`flex items-center justify-center rounded-full bg-[#12115C] p-2 ${className}`}
        >
            <img src={MessagesPulventLogo} alt="Pulvent" className="h-full w-full object-contain" />
        </div>
    );

    return (
        <div
            className={`min-w-0 flex-1 flex-col overflow-hidden bg-white shadow-sm max-md:h-screen max-md:w-full max-md:p-4 md:h-[761px] md:rounded-[24px] md:border md:border-[#EEF0F5] md:p-5 3xl:h-[900px] 3xl:p-6 4xl:h-[1080px] 4xl:p-8 ${className}`}
        >
            <div className="mb-4 flex items-center gap-3 border-b border-[#F2F3F7] pb-3 md:hidden">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label={t('back')}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F6FA]"
                >
                    <MessagesBackIcon className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
                </button>

                {activeChat && (
                    <div className="flex min-w-0 items-center gap-3">
                        {isPrivateChat ? (
                            <PrivateChatAvatar className="h-9 w-9 shrink-0" />
                        ) : (
                            <img
                                src={activeChat.avatar || MessagesPulventLogo}
                                alt={activeChat.name}
                                className="h-9 w-9 shrink-0 rounded-full object-cover"
                            />
                        )}

                        <span className="truncate text-[14px] font-semibold text-[#12115C]">
                            {activeChat.name}
                        </span>
                    </div>
                )}
            </div>

            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pe-1 [scrollbar-color:#D9DCEF_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D9DCEF]">
                <div className="flex w-full flex-col gap-5 pb-4 3xl:gap-6">
                    {messages.map(message => {
                        const avatar =
                            message.senderAvatar ||
                            (message.isMe ? MessagesCurrentUserAvatar : MessagesPulventLogo);

                        return (
                            <div
                                key={message.id}
                                className={`flex w-full items-end gap-2.5 ${
                                    message.isMe ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {!message.isMe &&
                                    (isPrivateChat ? (
                                        <PrivateChatAvatar className="h-[40px] w-[40px] shrink-0 3xl:h-[46px] 3xl:w-[46px]" />
                                    ) : (
                                        <img
                                            src={avatar}
                                            alt={message.senderName}
                                            className="h-[42px] w-[42px] shrink-0 rounded-full object-cover 3xl:h-[46px] 3xl:w-[46px]"
                                        />
                                    ))}

                                <div
                                    className={`flex min-w-0 max-w-[82%] flex-col ${
                                        message.isMe ? 'items-end' : 'items-start'
                                    }`}
                                >
                                    <div
                                        className={`mb-[6px] flex items-center gap-2 ${
                                            message.isMe ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <span className="text-[14px] font-semibold text-[#12115C] 3xl:text-[15px]">
                                            {message.senderName}
                                        </span>

                                        <span className="text-[13px] font-normal text-[#8990A3] 3xl:text-[14px]">
                                            {message.time}
                                        </span>
                                    </div>

                                    <div
                                        className={`relative max-w-full rounded-[20px] px-5 py-[13px] text-[14px] leading-[20px] 3xl:px-6 3xl:py-[15px] 3xl:text-[15px] ${
                                            message.isMe
                                                ? 'bg-[#12115C] text-white'
                                                : 'bg-[#F2F0FC] text-[#25263A]'
                                        } ${isArabic ? 'text-right' : 'text-left'}`}
                                    >
                                        <p className="max-w-full overflow-hidden text-ellipsis whitespace-normal md:whitespace-nowrap">
                                            {message.text === 'sampleMessage'
                                                ? t('sampleMessage')
                                                : message.text}
                                        </p>

                                        {message.isMe ? (
                                            <span className="pointer-events-none absolute bottom-[-6px] right-[14px] h-[8px] w-[22px] bg-[#12115C] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                                        ) : (
                                            <span className="pointer-events-none absolute bottom-[-6px] left-[14px] h-[8px] w-[22px] bg-[#F2F0FC] [clip-path:polygon(0_0,100%_0,0_100%)]" />
                                        )}
                                    </div>
                                </div>

                                {message.isMe && (
                                    <img
                                        src={avatar}
                                        alt={message.senderName}
                                        className="h-[42px] w-[42px] shrink-0 rounded-full object-cover 3xl:h-[46px] 3xl:w-[46px]"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <form
                onSubmit={onSendMessage}
                className="mt-4 flex w-full shrink-0 items-center gap-3 3xl:mt-5 3xl:gap-4"
            >
                <button
                    type="button"
                    aria-label={t('addAttachment')}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#12115C] 3xl:h-[56px] 3xl:w-[56px]"
                >
                    <MessagesPlusIcon className="block h-6 w-6 3xl:h-7 3xl:w-7" />
                </button>

                <input ref={fileInputRef} type="file" multiple className="hidden" />

                <div className="flex h-[50px] min-w-0 flex-1 items-center rounded-full bg-[#F0FFFC] px-4 3xl:h-[56px] 3xl:px-5">
                    <input
                        type="text"
                        value={inputText}
                        onChange={event => onInputChange(event.target.value)}
                        placeholder={t('typeMessagePlaceholder')}
                        className={`min-w-0 flex-1 bg-transparent text-[14px] text-[#25263A] outline-none placeholder:text-[#A3A8B7] 3xl:text-[15px] ${
                            isArabic ? 'text-right' : 'text-left'
                        }`}
                    />

                    <button
                        type="submit"
                        aria-label={t('sendMessage')}
                        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#3634C7] 3xl:h-[40px] 3xl:w-[40px]"
                    >
                        <MessagesSendIcon
                            className={`block h-[20px] w-[19px] ${isArabic ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};
