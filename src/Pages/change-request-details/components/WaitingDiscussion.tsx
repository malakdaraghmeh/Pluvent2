import { useState, type FormEvent } from 'react';
import {
    ChangeRequestChatAvatar,
    ChangeRequestChatIcon,
    ChangeRequestPulventLogo,
    ChangeRequestSendIcon,
} from '@/assets';
import type { WaitingDiscussionProps } from '../../../../utils/types/change-request-details.types';

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
    const [message, setMessage] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!message.trim()) return;
        setMessage('');
    };

    return (
        <div className="flex min-w-0 flex-col gap-2 xl:h-[487px] 3xl:h-[560px] 3xl:gap-3 4xl:h-[620px] 4xl:gap-4">
            <div className="flex min-h-[64px] items-center gap-5 rounded-2xl border border-[#E8EAEF] bg-[#EBFDFB] px-4 py-2 3xl:min-h-[72px] 3xl:px-5 4xl:min-h-[80px] 4xl:gap-6 4xl:px-6">
                <ChangeRequestChatIcon className="h-6 w-6 shrink-0 text-[#12115C] 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" />

                <div className="min-w-0">
                    <h2 className="font-['Sora'] text-[13px] font-semibold leading-none text-[#12115C] 3xl:text-[14px] 4xl:text-[16px]">
                        {discussTitle}
                    </h2>

                    <p className="mt-0.5 break-words font-['Sora'] text-[12px] font-normal leading-[140%] text-[#4F5E7B] 3xl:mt-1 3xl:text-[13px] 4xl:text-[14px]">
                        {discussDescription}
                    </p>
                </div>
            </div>

            <section className="flex min-h-[415px] flex-1 flex-col rounded-2xl border border-[#E8EAEF] bg-white p-4 3xl:p-5 4xl:p-6">
                <div className="relative min-h-0 flex-1 overflow-y-auto pe-2">
                    <div className="flex items-start gap-3 3xl:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12115C] p-2 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12">
                            <ChangeRequestPulventLogo className="h-full w-full" />
                        </div>

                        <div className="min-w-0">
                            <div className="flex h-5 items-center gap-2 3xl:h-6">
                                <span className="font-['Sora'] text-[13px] font-semibold leading-[140%] text-[#12115C] 3xl:text-[14px] 4xl:text-[15px]">
                                    {pulventName}
                                </span>

                                <span className="font-['Sora'] text-[12px] font-normal leading-[140%] text-[#6B7280] 3xl:text-[13px] 4xl:text-[14px]">
                                    {pulventTime}
                                </span>
                            </div>

                            <div className="relative mt-1 w-[483px] max-w-full 3xl:w-[560px] 4xl:w-[660px]">
                                <div className="flex min-h-[48px] items-center rounded-[100px] bg-[rgba(47,26,189,0.0627)] px-[13px] py-[15px] 3xl:min-h-[54px] 3xl:px-4 4xl:min-h-[60px] 4xl:px-5">
                                    <p className="break-words font-['Sora'] text-[13px] font-normal leading-[140%] text-[#1E293B] 3xl:text-[14px] 4xl:text-[16px]">
                                        {pulventMessage}
                                    </p>
                                </div>

                                <span className="pointer-events-none absolute bottom-[-8px] start-[15.5px] h-[8px] w-[29.76px] bg-[rgba(47,26,189,0.0627)] [clip-path:polygon(0_0,100%_0,0_100%)] rtl:[clip-path:polygon(0_0,100%_0,100%_100%)]" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex items-start justify-end gap-3 3xl:mt-6 3xl:gap-4 4xl:mt-7">
                        <div className="min-w-0">
                            <div className="flex h-5 items-center justify-end gap-2 3xl:h-6">
                                <span className="font-['Sora'] text-[13px] font-semibold leading-[140%] text-[#12115C] 3xl:text-[14px] 4xl:text-[15px]">
                                    {userName}
                                </span>

                                <span className="font-['Sora'] text-[12px] font-normal leading-[140%] text-[#6B7280] 3xl:text-[13px] 4xl:text-[14px]">
                                    {userTime}
                                </span>
                            </div>

                            <div className="relative mt-1 w-[508px] max-w-full 3xl:w-[600px] 4xl:w-[700px]">
                                <div className="flex min-h-[48px] items-center rounded-[100px] bg-[#12115C] px-4 py-[14.5px] 3xl:min-h-[54px] 3xl:px-5 4xl:min-h-[60px] 4xl:px-6">
                                    <p className="break-words font-['Sora'] text-[13px] font-normal leading-[140%] text-[#F7F6F7] 3xl:text-[14px] 4xl:text-[16px]">
                                        {userMessage}
                                    </p>
                                </div>

                                <span className="pointer-events-none absolute bottom-[-8px] end-[16.77px] h-[8px] w-[27.69px] bg-[#12115C] [clip-path:polygon(0_0,100%_0,100%_100%)] rtl:[clip-path:polygon(0_0,100%_0,0_100%)]" />
                            </div>
                        </div>

                        <img
                            src={ChangeRequestChatAvatar}
                            alt={userName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12"
                        />
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex h-16 w-full shrink-0 items-center rounded-[100px] bg-[#EBFDFB] ps-4 pe-2 3xl:mt-5 3xl:h-[72px] 3xl:ps-5 4xl:h-20 4xl:ps-6"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        placeholder={placeholder}
                        className="min-w-0 flex-1 bg-transparent font-['Sora'] text-[12px] font-normal leading-none tracking-[0.2px] text-[#0F1113] outline-none placeholder:text-[#0F1113] 3xl:text-[13px] 4xl:text-[14px]"
                    />

                    <button
                        type="submit"
                        aria-label="Send message"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3634C7] shadow-[0_1.23px_9.24px_rgba(0,0,0,0.05)] 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12"
                    >
                        <ChangeRequestSendIcon className="h-[19.37px] w-[18.52px] rtl:rotate-180 3xl:h-5 3xl:w-5 4xl:h-[22px] 4xl:w-[22px]" />
                    </button>
                </form>
            </section>
        </div>
    );
}

