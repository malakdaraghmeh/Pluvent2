import GeneralSelect from './GeneralSelect';
import type { CardExpirySelectProps } from '../../../utils/types/payment-method-modal.types';

const CardExpirySelect = ({
    id,
    value,
    placeholder,
    options,
    isArabic,
    onChange,
}: CardExpirySelectProps) => {
    return (
        <GeneralSelect
            id={id}
            value={value}
            placeholder={placeholder}
            options={options.map(option => ({
                label: option,
                value: option,
            }))}
            isArabic={isArabic}
            onChange={onChange}
        />
    );
};

export default CardExpirySelect;
