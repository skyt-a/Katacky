"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/ui/utils";
import { Button } from "~/components/common/button";
import { Calendar } from "~/components/common/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/common/popover";
import { ja } from "date-fns/locale";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeHolder?: string;
};

export function CalendarDatePicker({
  value,
  onChange,
  placeHolder,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "yyyy年MM月dd日") : <span>{placeHolder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ja}
        />
      </PopoverContent>
    </Popover>
  );
}
