import { Checkbox } from '@/components/ui/checkbox';

export default function CustomCheckbox({ id, checked, onChange, label }: { id: string, checked: boolean, onChange: any, label: string }) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                className="custom-checkbox"
            />
            <label htmlFor={id} className="text-sm border-none shadow-none text-gray-600 cursor-pointer select-none">
                {label}
            </label>
        </div>
    );
}
