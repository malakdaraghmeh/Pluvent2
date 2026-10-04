/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import  Send  from '@icons/send.svg?react';
import LogoIcon from '@icons/logo png 2.svg?react';
import Attachment from '@icons/attachment.svg?react';

export default function AskAi({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'Pulvent',
            time: '01:08 am',
            text: "Hi! We've reviewed your latest request and shared the updates with our team.",
            isUser: false,
        },
        {
            id: 2,
            sender: 'You',
            time: '02:08 am',
            text: "Hi! We've reviewed your latest request and shared the updates with our team.",
            isUser: true,
        },
        {
            id: 3,
            sender: 'Pulvent',
            time: '01:08 am',
            text: "Hi! We've reviewed your latest request and shared the updates with our team.",
            isUser: false,
        },
        {
            id: 4,
            sender: 'You',
            time: '02:08 am',
            text: "Hi! We've reviewed your latest request and shared the updates with our team.",
            isUser: true,
        },
    ]);

    const [inputValue, setInputValue] = useState('');

    const handleSend = e => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setMessages([
            ...messages,
            {
                id: Date.now(),
                sender: 'You',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: inputValue,
                isUser: true,
            },
        ]);
        setInputValue('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end bg-black/20  p-0 sm:p-6">
            <div className="relative flex h-[85vh] sm:h-[680px] w-full sm:max-w-md flex-col overflow-hidden rounded-t-[32px] sm:rounded-[32px] border border-gray-100 bg-white shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
                {/* Header / Close Button */}
                <div className="flex items-center justify-between  px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer border-none bg-transparent text-xl font-bold text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>

                {/* Messages Body Container */}
                <div className="flex-1 space-y-6 overflow-y-auto p-6">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex flex-col">
                            {msg.isUser ? (
                                /* User Message Right-aligned */
                                <div className="flex flex-col items-end">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="text-[11px] text-gray-400">
                                            {msg.time}
                                        </span>
                                        <span className="text-xs font-bold text-[#102A63]">
                                            {msg.sender}
                                        </span>
                                    </div>
                                    <div className="max-w-[85%] rounded-2xl rounded-br-xs bg-[#12115C] px-5 py-3.5 text-sm leading-relaxed text-white shadow-sm">
                                        {msg.text}
                                    </div>
                                </div>
                            ) : (
                                /* Receiver Message Left-aligned */
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#12115C] text-white shadow-xs">
                                        <LogoIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="text-xs font-bold text-[#102A63]">
                                                {msg.sender}
                                            </span>
                                            <span className="text-[11px] text-gray-400">
                                                {msg.time}
                                            </span>
                                        </div>
                                        <div className="max-w-[85%] rounded-2xl rounded-bl-xs bg-[#F1F3F9] px-5 py-3.5 text-sm leading-relaxed text-[#1A1A1A]">
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat Input Bar Footer */}
                <div className="border-t border-gray-50 bg-white p-4">
                    <form
                        onSubmit={handleSend}
                        className="flex items-center gap-2 rounded-full border border-gray-100 p-2 shadow-inner"
                    >
                        <button
                            type="button"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF2FF] text-[#12115C] transition-colors hover:bg-[#dce6f8]"
                        >
                            <Attachment className="h-5 w-5 " />
                        </button>
                        <div className="flex h-12 min-w-0 flex-1 items-center rounded-[100px] bg-[#F0FEFC] py-2 ps-4 pe-2 shadow-[0_2px_15px_rgba(0,0,0,0.05)] 3xl:h-[52px] 4xl:h-14">
                            <input
                                type="text"
                                placeholder="Ask Ai Assissant..."
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="flex-1 border-none bg-transparent px-2 text-sm text-[#1A1A1A] outline-none placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12115C] text-white shadow-sm transition-colors hover:bg-[#0d0c42]"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
