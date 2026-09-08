import StatsSection from "./components/StatsSection";
import ProjectProgress from "./components/ProjectProgress";
import UpcomingPayments from "./components/UpcomingPayments";
import SupportTickets from "./components/SupportTickets";

const DashboardPage = () => {
  return (
    <main
      className="
        min-h-screen
        bg-[#F8F9FB]
        p-4

        sm:p-5

        lg:p-6
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Page Title */}
        <h1
          className="
            mb-4
            font-[Sora]
            text-[20px]
            font-bold
            text-gray-900

            sm:mb-5
            sm:text-[22px]

            lg:mb-6
            lg:text-2xl
          "
        >
          Dashboard
        </h1>

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
          <div className="flex w-full flex-col gap-4">
            <UpcomingPayments />
            <SupportTickets />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;