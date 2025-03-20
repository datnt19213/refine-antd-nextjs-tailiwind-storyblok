import React from "react";

import {cn} from "@/lib/cn";
import {DynamicBlock} from "@/storyblok/content-type/page-template";

const Linear = ({block}: any) => {
  return (
    <div
      className={cn(
        "flex gap-5",
        block.direction === "row" ? "flex-row" : "flex-col"
      )}
    >
      {block.items.map((blok: any) => (
        <DynamicBlock key={blok._uid} block={blok} />
      ))}
    </div>
  );
};

export default Linear;
