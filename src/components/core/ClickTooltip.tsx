"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";

interface PlusTooltipProps {
  text: string;
  children: React.ReactNode;
}

const PlusTooltip = ({ text, children }: PlusTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="bg-white text-black shadow-md rounded-md px-3 py-1 text-sm font-medium"
        >
          {text}
          <TooltipArrow className="fill-white" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PlusTooltip;
