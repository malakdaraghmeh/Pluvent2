'use client';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorComp({ message = 'Something went wrong', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
            <div className="bg-red-100 rounded-full p-6 mb-4 animate-pulse">
                <AlertTriangle className="text-red-600 w-14 h-14" />
            </div>

            <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops!</h2>

            <p className="text-gray-600 max-w-md mb-6">{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                    <RefreshCw className="w-5 h-5" />
                    Retry
                </button>
            )}
        </div>
    );
}
