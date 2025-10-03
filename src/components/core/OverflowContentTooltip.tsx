import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const OverflowContentTooltip = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.offsetWidth);
    }
  }, [text]);

  const content = (
    <div
      ref={textRef}
      className="whitespace-nowrap overflow-hidden text-ellipsis w-full text-xs 3xl:text-base font-medium "
    >
      {text}
    </div>
  );

  if (!isTruncated) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          {content}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm bg-white   ">
          {text} <TooltipArrow className="fill-white" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default OverflowContentTooltip;
