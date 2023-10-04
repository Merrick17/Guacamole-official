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
        "w-full  p-6 rounded-lg backdrop:blur-sm bg-foreground shadow-lg drop-shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
