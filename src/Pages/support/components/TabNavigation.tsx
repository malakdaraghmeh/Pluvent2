import { useTranslation } from 'react-i18next';
import type { TabNavigationProps } from '../../../../utils/types/support-tickets.types';

const TabNavigation = ({ tabs, activeTab, onSelectTab }: TabNavigationProps) => {
    const { t } = useTranslation('tickets');

    return (
        <div role="tablist" className="flex h-[48px] w-full items-end overflow-x-auto no-scrollbar">
            {tabs.map(tab => {
                const isActive = activeTab === tab.key;

                return (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelectTab(tab.key)}
                        className={`flex h-[48px] min-w-[170px] flex-1 shrink-0 items-center justify-center gap-[6px] whitespace-nowrap px-3 py-2 font-['Poppins',sans-serif] text-[14px] font-semibold leading-[20px] lg:min-w-0 ${
                            isActive
                                ? 'relative z-10 rounded-t-[20px] border-x border-t border-[#39E1D7] bg-[linear-gradient(180deg,rgba(57,225,215,0.20)_0%,#FFFFFF_100%)] text-[#12115C]'
                                : 'rounded-t-[24px] border-b border-[#39E1D7] text-[#7E8492]'
                        }`}
                    >
                        <span>{t(`tabs.${tab.key}`)}</span>

                        {tab.count !== undefined && (
                            <span className="flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#D1F2F0] px-[6px] text-[11px] font-semibold leading-[16px] text-[#12115C]">
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default TabNavigation;
