import { projectProgressData } from "../data/projectProgress";
import ProjectProgressCard from "./ProjectProgressCard";

const ProjectProgress = () => {
  return (
    <section
      className="
        w-full
        rounded-[24px]
        bg-white
        p-4
        shadow-sm

        sm:p-5

        lg:h-[577px]
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-3

          sm:mb-5

          lg:mb-6
        "
      >
        <h2
          className="
            min-w-0
            text-[17px]
            font-semibold
            text-[#12115C]

            sm:text-[18px]

            lg:text-[20px]
          "
        >
          Project Progress
        </h2>

        <button
          type="button"
          className="
            shrink-0
            text-[13px]
            font-normal
            leading-[100%]
            tracking-[0%]
            text-[#3634C7]

            sm:text-[14px]

            lg:text-[16px]
          "
        >
          View All
        </button>
      </div>

      {/* Projects */}
      <div
        className="
          space-y-4

          sm:space-y-5

          lg:space-y-6
        "
      >
        {projectProgressData.map((project) => (
          <ProjectProgressCard
            key={project.id}
            {...project}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectProgress;