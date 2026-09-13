import ProjectCard from "./components/ProjectCard";
import { projectsData } from "./data/projects";
import { Search } from "@/assets";
import { Filter } from "@/assets";
import { ArrowFilter  } from "@/assets";




export default function Page() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-6">

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
<div
  className="
    flex
    h-[68px]
    w-full
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
    <span >
    <Search/>
    </span>

    <input
      type="text"
      placeholder="Find your work"
      className="
        w-full
        bg-transparent
        text-[14px]
        text-[#888282]
        outline-none
       
      "
    />
  </div>

  {/* Search Button */}
  <button
  className="
    flex
    h-[44px]
    w-[126px]
    shrink-0
    items-center
    justify-center
    gap-2
    rounded-[16px]
    bg-[#12115C]
    px-5
    py-4
    text-[18px]
    text-white
  "
>
  <span>Search</span>
  <span className="flex items-center">
    <ArrowFilter />
  </span>
</button>

  {/* Filter Button */}
  <button
    className="
      flex
      h-[44px]
      w-[44px]
      shrink-0
      items-center
      justify-center
      rounded-[16px]
      bg-[#F8F9FB]
    "
  >
    {/* Filter icon */}
    <Filter/>
  </button>
</div>
      {/* Projects Container */}
      <div
        className="
          mx-auto
          flex
          w-full
          flex-col
          gap-8
          rounded-tr-[24px]
          rounded-br-[24px]
          rounded-bl-[24px]
          border-r
          border-b
          border-l
          border-[#39E1D7]
          bg-white
          p-6

          lg:h-[996px]
          lg:max-w-[1086px]
        "
      >
       

        {/* Projects */}
        <div className="flex w-full flex-col gap-8">
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