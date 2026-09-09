import { upcomingPayments } from "../data/upcomingPayments";
import { ArrowIcon } from "@/assets";

const UpcomingPayments = () => {
  return (
    <section
      className="
        w-full
        rounded-[24px]
        bg-white
        p-4

        sm:p-5
        lg:h-[351px]
        lg:p-6
      "
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="
            min-w-0
            font-[Inter]
            text-[18px]
            font-semibold
            text-[#12115C]

            sm:text-[20px]
            lg:text-[22px]
          "
        >
          Upcoming Payments
        </h2>

        <button
          type="button"
          className="
            shrink-0
            font-[Sora]
            text-[13px]
            font-medium
            text-[#3634C7]

            sm:text-[14px]
            lg:text-[16px]
          "
        >
          View All
        </button>
      </div>

      {/* Payments */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className="
              w-full
              rounded-[16px]
              border
              border-[#E5E7EB]
              p-4

              sm:p-5
              lg:h-[122px]
              lg:p-6
            "
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              {/* Project Info */}
              <div className="min-w-0 flex-1">
              <h3
            className="
            text-left
                truncate
                font-[Inter]
                text-[14px]
                font-semibold
                text-[#12115C]

                sm:text-[15px]
                lg:text-[16px]
            "
            title={payment.projectName}
            >
            {payment.projectName}
            </h3>

                <p
                  className="
                  text-left
                    mt-1
                    font-[Inter]
                    text-[11px]
                    text-[#9CA3AF]

                    sm:text-[12px]
                  "
                >
                  Final Payment
                </p>
              </div>

              {/* Amount */}
              <span
                className="
                  shrink-0
                  whitespace-nowrap
                  font-[Inter]
                  text-[18px]
                  font-semibold
                  text-[#12115C]

                  sm:text-[20px]
                  lg:text-[22px]
                "
              >
                {payment.amount}
              </span>
            </div>

            {/* Bottom */}
            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                gap-3
              "
            >
              {/* Due Status */}
              <span
                className={`
                  flex
                  h-[22px]
                  w-fit
                  min-w-[92px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[6px]
                  px-[10px]
                  py-[4px]
                  font-[Inter]
                  text-[10px]
                  font-medium

                  ${
                    payment.dueType === "danger"
                      ? "bg-[#FF3B300D] text-[#FF3B30]"
                      : "bg-[#FFF7E8] text-[#F59E0B]"
                  }
                `}
              >
                {payment.dueText}
              </span>

              {/* Open Project */}
              <button
                type="button"
                className="
                  inline-flex
                  min-w-0
                  shrink-0
                  items-center
                  gap-1
                  font-[Sora]
                  text-[11px]
                  font-semibold
                  text-[#2F1ABD]

                  sm:text-[12px]
                "
              >
                <span className="truncate">Open Project</span>

                <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingPayments;