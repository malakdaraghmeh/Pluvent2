import type { PaymentMethodOptionProps } from '../../../../utils/types/payment-method-modal.types';

const PaymentMethodOption = ({
    value,
    selected,
    description,
    Logo,
    logoClassName,
    textAlignment,
    onSelect,
}: PaymentMethodOptionProps) => {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(value)}
            className="flex h-[64px] min-h-[64px] max-h-[64px] w-full shrink-0 items-center gap-3 overflow-hidden rounded-[8px] border-[0.5px] border-[#DFE3E5] bg-white p-3 transition-colors duration-200 hover:bg-[#FAFAFF]"
        >
            <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    selected ? 'border-[#6461FC]' : 'border-[#172B85]'
                }`}
            >
                {selected && <span className="h-2 w-2 rounded-full bg-[#6461FC]" />}
            </span>

            <span className="flex h-[40px] w-[65px] shrink-0 items-center justify-center overflow-visible">
                <Logo aria-hidden="true" className={`shrink-0 ${logoClassName}`} />
            </span>

            <span
                className={`min-w-0 flex-1 text-[12px] font-normal leading-[12px] text-[#12115C] ${textAlignment}`}
            >
                {description}
            </span>
        </button>
    );
};

export default PaymentMethodOption;
