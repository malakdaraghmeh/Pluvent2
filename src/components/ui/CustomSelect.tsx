import React from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label?: string;
    options: SelectOption[];
    error?: any;
    placeholder?: string;
    containerClassName?: string;
    value?: SelectOption | SelectOption[] | null;
    onChange?: any;
    name?: string;
    isDisabled?: boolean;
    isMulti?: boolean;
    [key: string]: any;
}

export const CustomSelect: React.FC<SelectProps> = ({
    label,
    options,
    placeholder,
    error,
    containerClassName = '',
    value,
    onChange,
    name,
    isDisabled,
    isMulti,
    ...props
}) => {
    // Determine language securely for both SSR and client-side
    const lang = typeof window !== 'undefined' ? (localStorage.getItem('i18nextLng') || 'ar') : 'ar';
    const isRtl = lang === 'ar';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!onChange) return;

        if (isMulti) {
            const selectedOptions = Array.from(e.target.selectedOptions, option => {
                return options.find(o => o.value.toString() === option.value);
            }).filter(Boolean);
            onChange(selectedOptions);
        } else {
            const selectedOption = options.find(o => o.value.toString() === e.target.value) || null;
            onChange(selectedOption);
        }
    };

    let selectValue: string | string[] | undefined = '';
    if (value) {
        if (Array.isArray(value)) {
            selectValue = value.map(v => v.value.toString());
        } else {
            selectValue = value.value.toString();
        }
    }

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {label && (
                <label className="text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    name={name}
                    disabled={isDisabled}
                    multiple={isMulti}
                    value={selectValue}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#4361ee] focus:ring-[#4361ee]/20'
                        } rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:ring-[3px] disabled:opacity-60 disabled:cursor-not-allowed appearance-none ${isMulti ? 'min-h-[80px]' : 'min-h-[46px]'}`}
                    {...props}
                >
                    {placeholder && !isMulti && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {!isMulti && (
                    <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${isRtl ? 'left-3' : 'right-3'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                )}
            </div>

            {error && <span className="text-xs text-red-500 mt-0.5">{error?.message || (typeof error === 'string' ? error : null)}</span>}
        </div>
    );
};
