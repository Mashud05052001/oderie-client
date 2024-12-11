"use client";
import { Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  defaultValue?: string; // Add defaultValue prop
};

export default function OdTextarea({
  name,
  label,
  variant = "underlined",
  size = "md",
  defaultValue = "", // Set a default fallback value
}: TProps) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue} // Pass defaultValue to Controller
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <div className="relative">
          <Textarea
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            label={label}
            variant={variant}
          />
          {error && (
            <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
              <small>{error.message}</small>
            </div>
          )}
        </div>
      )}
    />
  );
}
