
import React from 'react';
import { X } from 'lucide-react';

export default function InvoiceTopBar({ onClose, isRtl }) {
    if (!onClose) return null;

    return (
        <div className="absolute top-5 right-5 left-5 flex justify-between items-center z-10 pointer-events-auto">
            <button
                type="button"
                onClick={onClose}
                className={`p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors ${
                    isRtl ? 'mr-auto' : 'ml-auto'
                }`}
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}