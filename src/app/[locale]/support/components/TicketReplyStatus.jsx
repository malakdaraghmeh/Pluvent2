import React from 'react';

export default function TicketReplyStatus({ replyStatus }) {
    if (replyStatus.type === 'replied_preview') {
        return (
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-[#F0FDF4] border border-slate-100 rounded-xl px-3 py-2 text-xs sm:text-sm max-w-full sm:max-w-md min-w-0">
                    <div className="w-5 h-5 rounded-full bg-[#00D1FF] flex items-center justify-center shrink-0 text-white font-bold text-[10px]">
                        p
                    </div>
                    <div className="truncate min-w-0">
                        <span className="block text-[10px] font-bold text-slate-800 leading-tight">
                            Support Team Replied
                        </span>
                        <span className="text-xs text-slate-600 truncate block">
                            {replyStatus.text}
                        </span>
                    </div>
                </div>
                {replyStatus.badge && (
                    <span className="bg-[#10B981] text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {replyStatus.badge}
                    </span>
                )}
            </div>
        );
    }

    const label = replyStatus.type === 'waiting' ? 'Waiting' : 'Support Team Replied';

    return (
        <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] font-bold text-xs shrink-0">
                p
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-700">{label}</span>
        </div>
    );
}