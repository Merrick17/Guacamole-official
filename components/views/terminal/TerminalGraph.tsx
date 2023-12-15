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
import { useGetTrendingTodayFull } from "@/hooks/use-get-trending-today";
interface TerminalGraphProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  handleSelect: (dataType: string) => void;
  handleDisplayChange: (displayValue: string) => void;
  display?: string;
  activePage: number;
  handlePageChange: (pageNumber: number) => void;
}

const RalewayFont = Raleway({
  weight: "700",
  subsets: ["latin"],
});
const TerminalGraph: FC<TerminalGraphProps> = ({
  className,
  children,
  title,
  handleSelect,
  handleDisplayChange,
  display,
  activePage,
  handlePageChange,
}) => {
  const { totalPages } = useGetTrendingTodayFull({ page: activePage });
  return (
    <Container
      className={cn(
        "flex lg:w-full flex-col gap-10 rounded-lg bg-foreground p-6 max-sm:w-[100%] font-medium",
        className
      )}
    >
      <div className="w-full flex items-center  justify-between text-black">
        <Select 
          defaultValue="tpp"
          onValueChange={(value) => {
            handleDisplayChange(value);
          }}
        >
          <SelectTrigger className="lg:w-[280px] guac-btn guac-bg h-[30px] max-sm:w-full max-sm:mx-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tpp">Token Performance Tracker </SelectItem>
            <SelectItem value="vatr">Token Activity Tracking</SelectItem>
            <SelectItem value="vw">View Watchlist</SelectItem>
          </SelectContent>
        </Select>
        {display == "tpp" ? (
          <Select
            defaultValue="1D"
            onValueChange={(value) => {
              handleSelect(value);
            }}
          >
            <SelectTrigger className="w-[100px] guac-btn">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">1 Day</SelectItem>
              <SelectItem value="1W">1 Week</SelectItem>
              <SelectItem value="1M">1 Month</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Select
            // defaultValue={`${(0 + 1).toString()}`}
            value={activePage.toString()}
            onValueChange={(value) => {
              handlePageChange(Number(value));
            }}
          >
            <SelectTrigger className="w-[100px] guac-btn">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }).map((elm: number, ind) => (
                <SelectItem value={`${(ind + 1).toString()}`}>{`${(
                  ind + 1
                ).toString()}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {children}
    </Container>
  );
};

export default TerminalGraph;
