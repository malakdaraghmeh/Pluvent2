import imagePlaceholder from '@images/default.png';
import Image from "next/image";
import React from "react";

export default function MainTitle({ title }: { title: string }) {
  return (
    <div
      className="flex flex-col gap-1 justify-center items-center py-10"
    >
      <h2 className="text-main text-xl font-semibold">{title}</h2>
      <Image
        src={imagePlaceholder}
        alt="line-img"
        className="w-[100px] object-cover"
      />
    </div>
  );
}
