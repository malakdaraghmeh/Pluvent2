"use client";

import { paymentsData } from "../data/payments";

const Payments = () => {
  return (
    <section
      className="
        flex
        w-full
        max-w-[380px]
        flex-col
        gap-6
        rounded-[24px]
        bg-white
        px-8
        py-6
        shadow-[0px_10px_30px_0px_#0000000D]
      "
    >
      {/* Title */}
      <h2
        className="
        text-left
          text-[22px]
          font-semibold
          text-[#12115C]
        "
      >
        Payments
      </h2>

      {/* Total Paid */}
<div
  className="
    flex
   
    w-full
    flex-col
    items-center
    justify-center
    gap-[6.77px]
    rounded-[16px]
    bg-[#ACF5EE80]
    py-[8px]
  "
>
  <p
    className="
      text-[45px]
      font-semibold
      leading-none
      text-[#12115C]
    "
  >
    $4,000
  </p>

  <p
    className="
      text-[18px]
      text-[#6B7A99]
    "
  >
    Paid of $6,000
  </p>
</div>

    {/* Payment Cards */}
<div className="flex flex-col gap-3">
  {paymentsData.map((payment) => (
    <div
      key={payment.id}
      className={`
        relative
        h-[96px]
        w-full
        overflow-hidden
        rounded-[16px]
        bg-white
        border-r
        border-b
        border-l
        border-t-[15px]
        ${
          payment.status === "due"
            ? "border-[#FF3B30]"
            : "border-[#6B7280]"
        }
      `}
    >
      {/* Payment Content */}
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          px-6
        "
      >
        {/* Left */}
        <div>
          <p
            className="
              text-[13px]
              text-[#9CA3AF]
            "
          >
            {payment.label}
          </p>

          <p
            className={`
              mt-1
              text-[22px]
              font-semibold
              leading-none
              ${
                payment.status === "due"
                  ? "text-[#12115C]"
                  : "text-[#5F6573]"
              }
            `}
          >
            {payment.amount}
          </p>
        </div>

        {/* Pay Now */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            text-[12px]
            font-medium
            text-[#12115C]
            transition-opacity
            hover:opacity-70
          "
        >
          Pay Now
          <span className="text-[14px]">›</span>
        </button>
      </div>
    </div>
  ))}
</div>
    </section>
  );
};

export default Payments;