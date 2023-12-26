import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex h-[40px] items-center w-full gap-4 rounded-md  bg-background p-[10px] md:max-w-[200px]  xl:max-w-full focus-within:outline-none focus-within:ring-1 focus-within:ring-[#8BD796] ">
        <div className="text-gray-500 sm:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14 14L11.3333 11.3333M11.3333 6.66667C11.3333 7.90434 10.8417 9.09133 9.9665 9.9665C9.09133 10.8417 7.90434 11.3333 6.66667 11.3333C5.42899 11.3333 4.242 10.8417 3.36683 9.9665C2.49167 9.09133 2 7.90434 2 6.66667C2 5.42899 2.49167 4.242 3.36683 3.36683C4.242 2.49167 5.42899 2 6.66667 2C7.90434 2 9.09133 2.49167 9.9665 3.36683C10.8417 4.242 11.3333 5.42899 11.3333 6.66667Z"
              stroke="#A8A8A8"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <input
          type={type}
          className={cn(
            "flex  w-full  text-sm  bg-transparent shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground read-only:cursor-default disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="text-[#A8A8A8] text-xs px-1 bg-background border border-muted rounded-[2px]">
          F
        </div>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
