import React from 'react';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utils location

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export default function EmptyState({
    title = "لا توجد بيانات",
    description = "لم نتمكن من العثور على أي بيانات لعرضها في الوقت الحالي.",
    icon,
    className,
    action,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 duration-500", className)}>
            <div className="flex bg-gray-50/50 border border-dashed border-gray-200 p-4 rounded-full items-center justify-center text-gray-400 mb-4 h-24 w-24">
                {icon ? icon : <PackageOpen className="w-10 h-10 text-gray-300" strokeWidth={1.5} />}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">{description}</p>
            {action && (
                <div className="mt-2">{action}</div>
            )}
        </div>
    );
}
