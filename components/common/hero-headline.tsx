import { cn } from "@/lib/utils";
import { FC } from "react";
import ColorBlocks from "./color-block";
import { title } from "process";
import { Raleway } from "next/font/google";
import Container from "./container";

interface HeroHeadlineProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const RalewayFont = Raleway({
  weight: "700",
  subsets: ["latin"],
});
const HeroHeadline: FC<HeroHeadlineProps> = ({
  className,
  children,
  title,
}) => {
  return (
    <Container
      className={cn(
        "flex text-white w-full flex-col gap-10 rounded-lg bg-foreground p-6 lg:px-14 lg:py-10  font-medium",

        className
      )}
    >
      <header className={cn("flex flex-col gap-6", RalewayFont.className)}>
        <ColorBlocks />
        {typeof title === "string" ? (
          <h1 className="text-3xl sm:text-6xl lg:text-[60px] lg:leading-[72px] ">
            {title}
          </h1>
        ) : (
          title
        )}
      </header>
      {children}
    </Container>
  );
};

export default HeroHeadline;
