/* eslint-disable react/prop-types */
import { Checkbox } from 'primereact/checkbox';

export default function CustomCheckbox({ id, checked, onChange, label }) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                inputId={id}
                checked={checked}
                onChange={onChange}
                className="custom-orange-checkbox"
            />
            <label htmlFor={id} className="cursor-pointer">
                {label}
            </label>
        </div>
    );
}
