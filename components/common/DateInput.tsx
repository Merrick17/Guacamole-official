"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateInputProps {
  selectedDate: Date;
  handleSelectDate: (date: Date) => void;
}
const DateInput: React.FC<DateInputProps> = ({
  selectedDate,
  handleSelectDate,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start text-left font-normal px-1",
            !selectedDate && "text-muted-foreground"
          )}
        >
         
          {selectedDate ? (
            format(selectedDate, "MMMM d, yyyy, h:mm a")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
