import type { ProfileFieldProps } from '../../../../../utils/types/profile.types';

export default function ProfileField({
    label,
    value,
    isEditing = false,
    type = 'text',
    onChange,
}: ProfileFieldProps) {
    return (
        <div className="flex w-full flex-col gap-1.5">
            <label className="text-[12px] font-normal leading-[16px] text-[#12115C]">{label}</label>

            <input
                type={type}
                value={value}
                readOnly={!isEditing}
                onChange={event => onChange?.(event.target.value)}
                className={`
                    h-9
                    w-full
                    min-w-0
                    rounded-lg
                    border
                    px-3
                    text-[12px]
                    font-normal
                    text-[#3D3D3D]
                    outline-none
                    transition

                    ${
                        isEditing
                            ? 'border-[#C9C8F7] bg-white focus:border-[#3634C7]'
                            : 'border-transparent bg-[#F9FBFF]'
                    }
                `}
            />
        </div>
    );
}
