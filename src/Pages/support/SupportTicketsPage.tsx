import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterDropdown from './components/FilterDropdown';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TicketCard from './components/TicketCard';
import TicketTypeModal from './TicketTypeModal';
import SelectProjectModal from './selectProject/SelectProject';
import { TABS, TICKETS_DATA } from './ticketsData';
import type {
    SupportTabKey,
    SupportTicketFilter,
    TicketType,
} from '../../../utils/types/support-tickets.types';

const SupportTicketsPage = () => {
    const navigate = useNavigate();
    const { locale } = useParams();

    const currentLocale = locale || 'en';

    const [activeTab, setActiveTab] = useState<SupportTabKey>('all');

    const [filterType, setFilterType] = useState<SupportTicketFilter>('all');

    const [isTicketTypeModalOpen, setIsTicketTypeModalOpen] = useState(false);

    const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);

    const filteredTickets = useMemo(() => {
        return TICKETS_DATA.filter(ticket => {
            const matchesTab = activeTab === 'all' || ticket.status === activeTab;

            const matchesType = filterType === 'all' || ticket.type === filterType;

            return matchesTab && matchesType;
        });
    }, [activeTab, filterType]);

    const handleTicketTypeContinue = (selectedType: TicketType) => {
        setIsTicketTypeModalOpen(false);

        if (selectedType === 'project') {
            setIsSelectProjectModalOpen(true);
            return;
        }

        navigate(`/${currentLocale}/support/create?type=general`);
    };

    const handleSelectProjectBack = () => {
        setIsSelectProjectModalOpen(false);

        setIsTicketTypeModalOpen(true);
    };

    const handleProjectSelected = () => {
        setIsSelectProjectModalOpen(false);

        navigate(`/${currentLocale}/support/create?type=project&projectId=brand&warranty=active`);
    };

    const handleGeneralInquiry = () => {
        setIsSelectProjectModalOpen(false);

        navigate(`/${currentLocale}/support/create?type=general`);
    };

    return (
        <>
            <main className="min-h-screen w-full bg-[#F4F6FB] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 min-[1920px]:px-10 min-[2500px]:px-12">
                <div className="mx-auto flex w-full max-w-[1086px] flex-col gap-8 min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
                    <Header onNewTicket={() => setIsTicketTypeModalOpen(true)} />

                    <section className="w-full">
                        <TabNavigation
                            tabs={TABS}
                            activeTab={activeTab}
                            onSelectTab={setActiveTab}
                        />

                        <div className="flex w-full flex-col gap-8 rounded-b-[24px] border-x border-b border-[#39E1D7] bg-white p-4 sm:p-6 lg:p-8 min-[1920px]:p-10 min-[2500px]:p-12">
                            <FilterDropdown value={filterType} onChange={setFilterType} />

                            <div className="flex w-full flex-col gap-6">
                                {filteredTickets.map((ticket, index) => (
                                    <TicketCard
                                        key={`${ticket.id}-${ticket.status}-${index}`}
                                        ticket={ticket}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <TicketTypeModal
                open={isTicketTypeModalOpen}
                onOpenChange={setIsTicketTypeModalOpen}
                onContinue={handleTicketTypeContinue}
            />

            <SelectProjectModal
                open={isSelectProjectModalOpen}
                onOpenChange={setIsSelectProjectModalOpen}
                onBack={handleSelectProjectBack}
                onSelectProject={handleProjectSelected}
                onGeneralInquiry={handleGeneralInquiry}
            />
        </>
    );
};

export default SupportTicketsPage;
