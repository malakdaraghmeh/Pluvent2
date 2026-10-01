/* eslint-disable react/prop-types */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { getSupportPlansData } from './supportPlansData';

export default function SupportPlans() {
    const { t, i18n } = useTranslation('supportPlans');

    const currentLang = i18n.language || 'en';
    const isRtl = i18n.dir ? i18n.dir() === 'rtl' : currentLang === 'ar';

    const plansData = getSupportPlansData(t, currentLang);

    return (
        <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="min-h-screen bg-[#f3f6fb] p-4 sm:p-6 lg:p-10 font-sans text-slate-800"
        >
            <div className="w-full max-w-7xl mx-auto space-y-6">
                {/* Page Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1e1b4b] mb-6">
                    {plansData.pageTitle}
                </h1>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch rounded-lg">
                    {plansData.plans.map(plan => {
                        return plan.popular ? (
                            /* Selected Card with Pure Tailwind Border Image & Box Shadow Utilities */
                            <div
                                key={plan.key}
                                className="bg-white p-6 sm:p-7 flex flex-col justify-between h-full relative transition-all border-[12px] border-t-[12px] border-x-[2px] border-b-[2px] border-solid border-transparent [border-image:linear-gradient(90deg,#3634C7,#39E1D7)_1] shadow-lg rounded-3xl"
                            >
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-[#1e1b4b] mb-6">
                                        {plan.title}
                                    </h2>

                                    {/* Primary Button */}
                                    <button className="w-full py-3 px-4 mb-8 rounded-full bg-[#5245E5] hover:bg-[#4338ca] text-white font-medium text-sm transition-colors shadow-sm text-center">
                                        {plan.buttonText}
                                    </button>

                                    {/* Features List */}
                                    <ul className="space-y-4 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                                            >
                                                <Check className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
                                                <span className="leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            /* Standard Card */
                            <div
                                key={plan.key}
                                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 flex flex-col justify-between transition-all"
                            >
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-[#1e1b4b] mb-6">
                                        {plan.title}
                                    </h2>

                                    {/* Outline Button */}
                                    <button className="w-full py-3 px-4 mb-8 rounded-full border border-slate-300 hover:border-slate-400 text-slate-800 font-medium text-sm transition-colors text-center bg-white">
                                        {plan.buttonText}
                                    </button>

                                    {/* Features List */}
                                    <ul className="space-y-4 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                                            >
                                                <Check className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
                                                <span className="leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
