import { cn } from "@/lib/utils";
import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full  p-6 rounded-lg backdrop:blur-sm bg-foreground shadow-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
