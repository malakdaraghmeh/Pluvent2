import StatsSection from "./components/StatsSection";
import ProjectProgress from "./components/ProjectProgress";
import UpcomingPayments from "./components/UpcomingPayments";
import SupportTickets from "./components/SupportTickets";

const DashboardPage = () => {
  return (
    <main
      className="
        min-h-screen
       
        p-4
        sm:p-5
        lg:p-6
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
     

        {/* Stats */}
        <StatsSection />

        {/* Main Content */}
        <div
          className="
            mt-4
            grid
            w-full
            grid-cols-1
            gap-4

            sm:mt-5
            sm:gap-5

            lg:mt-6
            lg:grid-cols-[2fr_1fr]
            lg:items-stretch
            lg:gap-4
          "
        >
          {/* Left */}
          <ProjectProgress />

          {/* Right */}
          <div className="flex w-full flex-col gap-6">
            <UpcomingPayments />
            <SupportTickets />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;