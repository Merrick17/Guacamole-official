import { cn } from "@/lib/utils";
import { FC } from "react";

import { title } from "process";
import { Raleway } from "next/font/google";
import Container from "@/components/common/container";
import ColorBlocks from "@/components/common/color-block";
import { Dropdown } from "@/components/common/Dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface TerminalGraphProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const RalewayFont = Raleway({
  weight: "700",
  subsets: ["latin"],
});
const TerminalGraph: FC<TerminalGraphProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <Container
      className={cn(
        "flex    w-full flex-col gap-10 rounded-lg lg:bg-foreground p-6   font-medium",

        className
      )}
    >
      <div className="w-full flex items-center justify-between text-black">
        <Select defaultValue="tpp">
          <SelectTrigger className="w-[280px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tpp">token Performance Tracker </SelectItem>
            <SelectItem value="vatr">View All Token Rankings</SelectItem>
            <SelectItem value="vw">View Watchlist</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="1-day">
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-day">1 Day</SelectItem>
            <SelectItem value="1-week">1 Week</SelectItem>
            <SelectItem value="1-month">1 Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {children}
    </Container>
  );
};

export default TerminalGraph;
