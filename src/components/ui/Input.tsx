import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: any;
    error?: { message?: string };
    inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            type,
            icon: Icon,
            placeholder,
            error,
            className = '',
            inputClassName = '',
            ...props
        },
        ref
    ) => {
        const lang = localStorage.getItem('i18nextLng') || 'ar';
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        return (
            <div className={`flex flex-col gap-1.5 relative ${className}`} dir={dir}>
                {label && (
                    <label
                        htmlFor={props.name}
                        className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                        {Icon && <Icon size={16} className="text-gray-500" />}
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        dir={dir}
                        type={inputType}
                        placeholder={placeholder}
                        className={`w-full px-4 py-2.5 min-h-[46px] bg-gray-50 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${error
                            ? 'border-red-300 focus:ring-red-100'
                            : 'border-gray-200 focus:ring-main/20 focus:border-main'
                            } ${isPassword ? (dir === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4') : ''} ${inputClassName}`}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 ${dir === 'rtl' ? 'left-3' : 'right-3'
                                }`}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

                {error && <span className="text-xs text-red-500 mt-0.5">{error.message || (typeof error === 'string' ? error : null)}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
