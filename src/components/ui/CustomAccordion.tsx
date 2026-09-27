/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CustomLoading from './CustomLoading';

export default function CustomAccordion({ faq, faqLoading }) {
    const [openIndex, setOpenIndex] = useState(null);
    const lang = localStorage.getItem('i18nextLng') || 'ar';

    const toggleTab = index => {
        setOpenIndex(openIndex === index ? null : index);
    };
    if (faqLoading) {
        return <CustomLoading />;
    }

    return (
        <div className="container mx-auto px-4 lg:px-20 mt-8">
            {faq?.map((tab, index) => (
                <div
                    key={index}
                    className={`border border-[#2B7B4C] rounded-[24px] bg-white w-[80%] mx-auto my-6 transition-all duration-300 ${
                        openIndex === index ? 'shadow-md' : ''
                    }`}
                >
                    <button
                        onClick={() => toggleTab(index)}
                        className="flex justify-between items-center w-full text-right p-4 text-[#2B7B4C] text-lg font-medium"
                    >
                        <span>{lang === 'en' ? tab?.question_en : tab?.question_ar}</span>
                        <ChevronDown
                            className={`w-6 h-6 text-[#2B7B4C] transition-transform duration-300 ${
                                openIndex === index ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openIndex === index && (
                        <div className="p-4 text-[#333] border-t border-[#2B7B4C] bg-[#fff] rounded-b-[24px]">
                            <p>{lang === 'en' ? tab?.answer_en : tab?.answer_ar}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
