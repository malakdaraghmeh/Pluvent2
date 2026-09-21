'use client';

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import FilterDropdown from './components/FilterDropdown';
import TicketCard from './components/TicketCard';
import { TABS, TICKETS_DATA } from './ticketsData';

export default function SupportTicketsPage() {
    const [activeTab, setActiveTab] = useState('All Tickets');
    const [filterType, setFilterType] = useState('all');

    const filteredTickets = useMemo(() => {
        return TICKETS_DATA.filter(ticket => {
            const matchesTab = activeTab === 'All Tickets' || ticket.status === activeTab;
            const matchesType =
                filterType === 'all' ||
                (filterType === 'project' && ticket.type === 'Project Ticket') ||
                (filterType === 'general' && ticket.type === 'General Ticket');

            return matchesTab && matchesType;
        });
    }, [activeTab, filterType]);

    const handleNewTicket = () => {
        alert('New Ticket Modal / Navigation');
    };

    return (
        <div className="min-h-screen bg-[#F4F6FB] px-3 py-4 sm:p-8 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto">
                <Header onNewTicket={handleNewTicket} />

                {/* Tabs Wrapper */}
                <div className="relative">
                    <TabNavigation tabs={TABS} activeTab={activeTab} onSelectTab={setActiveTab} />
                    {/* Border line running beneath tabs */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#39E1D7] z-0" />
                </div>

                {/* Content Container */}
                <div className="bg-white rounded-b-2xl rounded-tr-2xl sm:rounded-tr-2xl border-2 border-[#39E1D7] p-3.5 sm:p-6 shadow-sm relative z-0">
                    <FilterDropdown value={filterType} onChange={setFilterType} />

                    <div className="space-y-4 sm:space-y-5">
                        {filteredTickets.map((ticket, index) => (
                            <TicketCard key={`${ticket.id}-${index}`} ticket={ticket} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
