import React from "react";

import {DynamicBlock} from "@/storyblok/content-type/page-template";

const Grid = ({block}: any) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${block.columns}, 1fr)`,
      }}
      className="gap-4 mb-3"
    >
      {block.gridLayout.map((blok: any) => (
        <DynamicBlock key={blok._uid} block={blok} />
      ))}
    </div>
  );
};

export default Grid;
