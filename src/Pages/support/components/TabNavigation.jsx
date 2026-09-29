import React from 'react';

export default function TabNavigation({ tabs, activeTab, onSelectTab }) {
    return (
        <div className="flex items-end overflow-x-auto no-scrollbar gap-1 relative z-10 w-full -mb-[2px]">
            {tabs.map(tab => {
                const isActive = activeTab === tab.name;
                return (
                    <button
                        key={tab.name}
                        onClick={() => onSelectTab(tab.name)}
                        style={
                            isActive
                                ? {
                                      background:
                                          'linear-gradient(180deg, rgba(20, 225, 235, 0.20) 0%, rgba(255, 255, 255, 1) 100%)',
                                  }
                                : undefined
                        }
                        className={`px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap rounded-t-2xl shrink-0 ${
                            isActive
                                ? 'text-[#0C1236] border-t-2 border-x-2 border-[#39E1D7] border-b-0 relative z-20 bg-white'
                                : 'text-[#6B7280] hover:text-slate-800 bg-transparent border-b-0'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <span>{tab.name}</span>
                            {tab.count !== undefined && (
                                <span className="text-[10px] sm:text-[11px] bg-[#D1F2F0] text-[#0C1236] px-2 py-0.5 rounded-full font-extrabold">
                                    {tab.count}
                                </span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
