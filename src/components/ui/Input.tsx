import { forwardRef, useState } from 'react';
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
            <div className={`flex flex-col gap-1 mb-4 relative ${className}`} dir={dir}>
                {label && (
                    <label
                        htmlFor={props.name}
                        className="text-[#0B0D17] font-medium text-[18px] mb-2 flex items-center gap-2"
                    >
                        {Icon && <Icon className="text-[#0B0D17]" />}
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
                        className={`w-full bg-white border rounded-[12px] h-[50px] px-4 focus:ring-2 focus:ring-main/20 outline-none transition-all shadow-sm ${
                            error ? 'border-red-500' : 'border-main/10'
                        } pr-10 transition-all ${inputClassName}`}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 ${
                                dir === 'rtl' ? 'left-3' : 'right-3'
                            }`}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

                {error && <span className="text-red-500 text-xs">{error.message}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
