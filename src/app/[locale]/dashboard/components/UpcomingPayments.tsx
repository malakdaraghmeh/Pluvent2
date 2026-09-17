import { upcomingPayments } from "../data/upcomingPayments";
import { Icon } from "@/assets";

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
            text-[22px]
            font-semibold
            text-[#12115C]

            
          "
        >
          Upcoming Payments
        </h2>

        <button
          type="button"
          className="
            text-[16px]
           
            text-[#3634C7]
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
                
                text-[16px]
                font-semibold
                text-[#12115C]

               
            "
            title={payment.projectName}
            >
            {payment.projectName}
            </h3>

                <p
                  className="
                  text-left
                    mt-1
                    
                    text-[13px]
                    text-[#9CA3AF]

               
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
                  
                  text-[22px]
                  font-semibold
                  text-[#12115C]

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
    inline-flex
    shrink-0
    items-center
    justify-center
    rounded-[6px]
    px-[10px]
    py-[4px]
    text-[11px]
    font-semibold
    leading-none
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
            {/*   <button
                type="button"
                className="
                  inline-flex
                  min-w-0
                  shrink-0
                  items-center
                  gap-1
                  
                  text-[12px]
                  font-semibold
                  text-[#2F1ABD]

                  sm:text-[12px]
                "
              >
                <span className="truncate">Open Project</span>

                <ArrowIcon  />
              </button> */}

<button 
  type="button" 
  className="
    inline-flex 
    shrink-0 
    items-center 
    justify-center
    gap-1.5 
    text-[12px] 
    font-semibold 
    text-[#2F1ABD] 
   
  " 
> 
  <span>Open Project</span> 

  <Icon
  
  />
</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingPayments;