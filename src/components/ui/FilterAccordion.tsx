import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterAccordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="border-none h-fit rounded-lg mb-2">
            <button
                className="w-full h-fit flex justify-between items-center p-3 rounded-md bg-white hover:bg-gray-50 transition"
                onClick={toggle}
            >
                <span className={`font-medium text-lg text-blackq`}>{title}</span>
                {isOpen ? (
                    <ChevronUp size={20} className="text-blackq" />
                ) : (
                    <ChevronDown size={20} className={`text-blackq`} />
                )}
            </button>

            {isOpen && (
                <div className="p-3 text-blueDark bg-white rounded-md transition-all">
                    {children}
                </div>
            )}
        </div>
    );
}
