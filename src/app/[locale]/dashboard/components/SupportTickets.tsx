import { supportTickets } from "../data/supportTickets";

const SupportTickets = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-semibold text-[#12115C] sm:text-[20px]">
          Support Ticket
        </h2>

        <button
          type="button"
          className="shrink-0 text-[13px] font-medium text-[#3634C7] transition-opacity hover:opacity-70 sm:text-[16px]"
        >
          View All
        </button>
      </div>

      {/* Tickets */}
      <div className="space-y-3">
        {supportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="
              relative
              flex
              flex-col
              gap-2
              rounded-xl
              bg-[#F8FAFC]
              px-3
              py-3

              sm:min-h-[52px]
              sm:flex-row
              sm:items-center
              sm:gap-3
            "
          >
            {/* Ticket Number */}
            <span
              className="
                shrink-0
                                text-[10px]
                font-semibold
                text-[#94A3B8]

                sm:text-[11px]
              "
            >
              {ticket.ticketNumber}
            </span>

            {/* Ticket Title */}
            <p
              className="
                w-full
                min-w-0
                truncate
                                text-[12px]
                font-semibold
                text-[#12115C]

                sm:absolute
                sm:left-1/2
                sm:w-auto
                sm:max-w-[42%]
                sm:-translate-x-1/2
                sm:text-[13px]

                lg:max-w-[48%]
              "
              title={ticket.title}
            >
              {ticket.title}
            </p>

            {/* Status */}
            <span
              className={`
                flex
                h-[23px]
                w-fit
                min-w-[89px]
                shrink-0
                items-center
                justify-center
                self-start
                rounded-[6px]
                px-[10px]
                py-[4px]
                                text-[11px]
                font-medium

                sm:ml-auto
                sm:w-[89px]
                sm:self-auto
                sm:text-[12px]

                ${
                  ticket.status === "In Progress"
                    ? "bg-[#EEF6FF] text-[#007AFF]"
                    : "bg-[#FFF7E8] text-[#F59E0B]"
                }
              `}
            >
              {ticket.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportTickets;