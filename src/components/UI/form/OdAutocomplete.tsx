"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Controller } from "react-hook-form";

export type TSelectOption = { key: string; label: string };

type TProps = {
  name: string;
  label: string;
  options: TSelectOption[];
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
};

export default function OdAutocomplete({
  name,
  label,
  options,
  variant = "underlined",
  size = "md",
  isDisabled = false,
}: TProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Autocomplete
            isDisabled={isDisabled}
            {...field}
            label={label}
            variant={variant}
            size={size}
          >
            {options.map((item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            ))}
          </Autocomplete>
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
