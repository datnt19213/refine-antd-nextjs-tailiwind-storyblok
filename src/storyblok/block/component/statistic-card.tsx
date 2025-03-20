import React from "react";

import {cn} from "@/lib/cn";

const StatisticCard = ({block}: any) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "aspect-square p-3 rounded-lg",
            block.variant === "primary" && "bg-blue-300/50",
            block.variant === "success" && "bg-green-300/50",
            block.variant === "warn" && "bg-yellow-300/50",
            block.variant === "destructive" && "bg-red-300/50"
          )}
        >
          <img src={block.icon.filename} alt="img" className="w-4 h-4" />
        </div>

        <span className="font-medium text-sm text-gray-500">
          {block.labelBlock}
        </span>
      </div>
      <span className="font-bold text-xl">1,234</span>
      <span className="text-sm text-green-700/80">{block.stastiticString}</span>
    </div>
  );
};

export default StatisticCard;
