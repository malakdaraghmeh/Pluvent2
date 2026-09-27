



import { useTranslation } from 'react-i18next';

import supportTicket from "@/assets/images/support-ticket.png";
import warrantyBg from "@/assets/images/warranty-bg.png";
import bgSupport from "@/assets/images/bg-support.png";

import { True, Arrow } from "@/assets";

const SupportTicket = () => {
  const { t } = useTranslation("supportTickets");

  const features = t("features", { returnObjects: true }) as string[];

  return (
    <section
      className="
        flex
        w-full
        flex-col
        gap-4
        rounded-[24px]
        bg-white
        p-6
        shadow-[0px_4px_20px_0px_#00000008]
      "
    >
      <h2 className="text-[20px] font-semibold text-[#12115C]">
        {t("title")}
      </h2>

      <div
        className="
          grid
          w-full
          grid-cols-1
          items-center
          gap-6
          lg:grid-cols-[250px_minmax(0,1fr)_360px]
        "
      >
        {/* 1. Illustration */}

        <div className="flex w-full items-center justify-center">
          <img
            src={supportTicket}
            alt="Support Ticket"
            width={250}
            height={190}
            className="
              h-auto
              w-full
              max-w-[250px]
              object-contain
            "
          />
        </div>

        {/* 2. Warranty Support */}

        <div className="flex min-w-0 flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#12115C]">
            {t("warrantySupport")}
          </h3>

          <p
            className="
              max-w-[360px]
              text-[14px]
              leading-[1.6]
              text-[#6B7280]
            "
          >
            {t("description")}
          </p>

          {/* Features */}

          <div className="flex flex-col gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <span
                  className="
                    flex
                    h-[24px]
                    w-[24px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#39E1D7]
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  <True />
                </span>

                <span className="text-[16px] text-[#12115C]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Warranty Active */}

        <div
          className="
            flex
            min-h-[258px]
            w-full
            flex-col
            gap-6
            rounded-[24px]
            border-[0.5px]
            border-[#39E1D7]
            bg-[#39E1D70D]
            bg-cover
            bg-center
            bg-no-repeat
            p-6
            shadow-[0px_1px_3px_3px_#0000000D]
          "
          style={{
            backgroundImage: `url(${warrantyBg})`,
          }}
        >
          {/* Status Header */}

          <div className="flex items-center gap-2">
            <div>
              <img
                src={bgSupport}
                alt="Support Status"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            <h3 className="text-[24px] font-bold text-[#12115C]">
              {t("status.title")}
            </h3>
          </div>

          {/* Status Description */}

          <p
            className="
              text-[16px]
              leading-[1.6]
              text-[#12115C]
            "
          >
            {t("status.description")}
          </p>

          {/* Button */}

          <button
            type="button"
            className="
              mt-auto
              flex
              h-[40px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-[10px]
              bg-[#12115C]
              text-[18px]
              text-white
              transition
              hover:opacity-90
            "
          >
            {t("status.buttonText")}

            <span className="flex shrink-0 items-center rtl:rotate-180">
              <Arrow />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportTicket;