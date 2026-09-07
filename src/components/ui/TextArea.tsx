import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  error?: { message?: string } | boolean;
  hint?: string;
  labelClassName?: string;
  starClassName?: string;
  star?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    id,
    label,
    placeholder,
    rows = 3,
    starClassName = "",
    labelClassName = "",
    required,
    star,
    className = "",
    disabled = false,
    error = false,
    hint = "",
    ...props
  }, ref) => {
    const lang = localStorage.getItem('i18nextLng') || 'ar';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const textareaClasses = `w-full h-[225px] bg-white border rounded-[12px] p-4 focus:ring-2 focus:ring-main/20 outline-none transition-all shadow-sm ${error ? 'border-red-500' : 'border-main/10'
      } transition-all ${className} ${disabled ? 'bg-gray-100 opacity-50 cursor-not-allowed' : ''}`;

    return (
      <div className={`flex flex-col gap-1 mb-4 relative ${className}`} dir={dir}>
        {label && (
          <label
            htmlFor={id || props.name}
            className={`text-[#0B0D17] font-medium text-[18px] mb-2 flex items-center gap-2 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            {star && <span className={`text-red-500 ml-1 ${starClassName}`}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id || props.name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          className={textareaClasses}
          {...props}
        />
        {hint && (
          <p className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
            {hint}
          </p>
        )}
        {typeof error === 'object' && error?.message && (
          <p className="mt-2 text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
