import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: any;
    label?: string;
    description?: string;
    disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ 
    checked, 
    onChange, 
    label, 
    description,
    disabled = false 
}) => {
    const lang = localStorage.getItem('i18nextLng') || 'ar';
    const isRtl = lang === 'ar';

    return (
        <label className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="relative inline-flex items-center flex-shrink-0 mt-0.5">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e.target.checked)}
                    disabled={disabled}
                />
                <div className={`
                    w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-main/30 
                    peer-checked:bg-main transition-colors duration-300 ease-in-out
                `}></div>
                <div className={`
                    absolute top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 ease-in-out
                    ${isRtl 
                        ? 'right-[2px] peer-checked:-translate-x-5 peer-checked:border-white' 
                        : 'left-[2px] peer-checked:translate-x-5 peer-checked:border-white'
                    }
                `}></div>
            </div>
            {(label || description) && (
                <div className="flex flex-col">
                    {label && <span className="text-sm font-semibold text-gray-800">{label}</span>}
                    {description && <span className="text-xs text-gray-500 mt-0.5">{description}</span>}
                </div>
            )}
        </label>
    );
};
