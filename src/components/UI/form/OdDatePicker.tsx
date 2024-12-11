"use client";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  className?: string;
  defaultValue?: string | Date;
  minValue?: any;
};

export default function OdDatePicker({
  name,
  label,
  variant = "underlined",
  size = "md",
  className,
  defaultValue = "",
  minValue = now(getLocalTimeZone()),
}: TProps) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <DatePicker
            hideTimeZone
            {...field}
            label={label}
            variant={variant}
            className={`${className} ${variant}`}
            minValue={minValue}
            size={size}
          />
          {error && (
            <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
              <small>{error?.message}</small>
            </div>
          )}
        </div>
      )}
    />
  );
}
