import ProjectProgress from './components/ProjectProgress';
import StatsSection from './components/StatsSection';
import SupportTickets from './components/SupportTickets';
import UpcomingPayments from './components/UpcomingPayments';

const DashboardPage = () => {
    return (
        <main className="mx-auto w-full min-w-0 max-w-[1086px] pb-6 min-[1920px]:max-w-[1400px] min-[2500px]:max-w-[1780px]">
            <StatsSection />

            <div className="mt-5 grid w-full min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_320px] min-[1400px]:grid-cols-[minmax(0,1fr)_385px] min-[1920px]:mt-6 min-[1920px]:grid-cols-[minmax(0,1fr)_430px] min-[1920px]:gap-6 min-[2500px]:mt-8 min-[2500px]:grid-cols-[minmax(0,1fr)_480px] min-[2500px]:gap-8">
                <ProjectProgress />

                <div className="grid h-full min-w-0 grid-rows-[1fr_210px] gap-5 min-[1920px]:grid-rows-[1fr_234px] min-[1920px]:gap-6 min-[2500px]:grid-rows-[1fr_260px] min-[2500px]:gap-8">
                    <UpcomingPayments />
                    <SupportTickets />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
