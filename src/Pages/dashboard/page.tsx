import ProjectProgress from './components/ProjectProgress';
import StatsSection from './components/StatsSection';
import SupportTickets from './components/SupportTickets';
import UpcomingPayments from './components/UpcomingPayments';

const DashboardPage = () => {
    return (
        <main className="custom-container w-full min-w-0 pb-6">
            <StatsSection />

            <div className="mt-4 grid w-full min-w-0 grid-cols-1 gap-4 sm:mt-5 sm:gap-5 xl:mt-6 xl:grid-cols-[minmax(0,1fr)_385px] xl:items-stretch xl:gap-5 3xl:grid-cols-[minmax(0,1fr)_430px] 3xl:gap-6 4xl:grid-cols-[minmax(0,1fr)_480px] 4xl:gap-8">
                <div className="h-full min-w-0">
                    <ProjectProgress />
                </div>

                <div className="flex h-full min-w-0 flex-col gap-4 3xl:gap-6 4xl:gap-8">
                    <UpcomingPayments />
                    <SupportTickets />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
