import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./data/projects";
import { Search } from "@/assets";
import { Filter } from "@/assets";

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-5">
      {/* Page Header */}
      <div className="flex flex-col gap-1 text-left">
        <h1
          className="
            text-[24px]
            font-semibold
            text-[#000000]
          "
        >
          Projects
        </h1>

        <p
          className="
            text-[12px]
            text-[#7E8492]
          "
        >
          All your projects with Pulvent in one place.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex w-full items-center gap-[10px]">
        {/* Search Box */}
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-[10px]
            rounded-[20px]
            border-[0.5px]
            border-[#D9D9D9]
            bg-white
            px-[14px]
            py-[13px]
          "
        >
          {/* Search Input */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0">
              <Search />
            </span>

            <input
              type="text"
              placeholder="Find your work"
              className="
                w-full
                min-w-0
                bg-transparent
                text-[14px]
                text-[#888282]
                outline-none
              "
            />
          </div>
        </div>

        {/* Filter Box */}
        <button
          type="button"
          className="
            flex
            h-auto
            w-[56px]
            shrink-0
            items-center
            justify-center
            rounded-[16px]
            border-[0.5px]
            border-[#D9D9D9]
            bg-white
            p-[4px]
          "
        >
          <Filter />
        </button>
      </div>

      {/* Projects Container */}
      <div
        className="
          mx-auto
          flex
          w-full
          flex-col
          gap-5
          rounded-tr-[24px]
          rounded-br-[24px]
          rounded-bl-[24px]
          border-r
          border-b
          border-l
          border-[#39E1D7]
          bg-white
          p-4
          sm:gap-6
          sm:p-5
          lg:max-w-[1086px]
          lg:gap-8
          lg:p-6
        "
      >
        {/* Projects */}
        <div className="flex w-full flex-col gap-5 sm:gap-6 lg:gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </main>
  );
}