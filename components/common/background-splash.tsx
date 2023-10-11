import { cn } from "@/lib/utils";

const BackgroundSplash = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-no-repeat bg-center bg-cover   antialiased z-[-1]",
        className
      )}
    />
  );
};

export default BackgroundSplash;
