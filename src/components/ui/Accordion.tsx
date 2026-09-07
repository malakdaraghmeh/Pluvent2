import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ title, children, titleClass, iconClass }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="border h-fit rounded-lg mb-2">
            <button
                className="w-full h-fit flex justify-between items-center p-4 rounded-md bg-white hover:bg-gray-50 transition"
                onClick={toggle}
            >
                <span className={`font-medium text-lg text-main ${titleClass}`}>{title}</span>
                {isOpen ? (
                    <Minus size={20} className="text-grayq" />
                ) : (
                    <Plus size={20} className={`text-main ${iconClass}`} />
                )}
            </button>

            {isOpen && (
                <div className="p-4 text-blueDark bg-white border-t border-gray-200 rounded-md transition-all">
                    {children}
                </div>
            )}
        </div>
    );
}
