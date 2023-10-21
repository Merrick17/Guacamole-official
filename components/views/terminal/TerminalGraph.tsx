import { cn } from "@/lib/utils";
import { FC } from "react";

import { title } from "process";
import { Raleway } from "next/font/google";
import Container from "@/components/common/container";
import ColorBlocks from "@/components/common/color-block";


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
        "flex text-white w-full flex-col gap-10 rounded-lg lg:bg-foreground p-6   font-medium",

        className
      )}
    >
     
      {children}
    </Container>
  );
};

export default TerminalGraph;
