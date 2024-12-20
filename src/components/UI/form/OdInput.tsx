"use client";
import { Input } from "@nextui-org/input";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TProps = {
  name: string;
  label: string;
  type: "email" | "password" | "text" | "number" | "textEmail";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  className?: string;
  defaultValue?: string | number; // Add defaultValue prop
};

export default function OdInput({
  name,
  label,
  type,
  variant = "underlined",
  size = "md",
  className,
  defaultValue = "", // Set a default value if none is provided
}: TProps) {
  const [isVisible, setIsVisible] = useState(false);

  const generateInput = (field: ControllerRenderProps<FieldValues, string>) => {
    const { value, onChange, ...restField } = field;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onBlur, ...otherRestField } = restField;
    const inputValue = value || "";

    if (type === "password") {
      return (
        <Input
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          {...restField}
          size={size}
          label={label}
          variant={variant}
          type={isVisible ? "text" : "password"}
          className={`${className}`}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      );
    }

    return (
      <Input
        value={inputValue}
        onChange={(e) => {
          const updatedValue =
            type === "number"
              ? e.target.value
                ? Number(e.target.value)
                : ""
              : e.target.value;
          onChange(updatedValue);
        }}
        onBlur={() => {
          if (type === "textEmail" && inputValue !== "") {
            let updatedValue = inputValue;
            if (updatedValue.includes("@")) {
              updatedValue = updatedValue.split("@")[0];
            }
            onChange(`${updatedValue}@gmail.com`);
          }
        }}
        {...otherRestField}
        size={size}
        label={
          type === "textEmail" ? (
            <div className="flex items-center">
              <MailIcon className="size-5 mr-1.5 text-default-400" />
              {label}
            </div>
          ) : (
            label
          )
        }
        variant={variant}
        type={type === "textEmail" ? "text" : type}
        endContent={
          type === "textEmail" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">@gmail.com</span>
            </div>
          )
        }
        min={type === "number" ? 0 : undefined} // Only set `min` for number inputs
      />
    );
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue} // Pass defaultValue to Controller
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {generateInput(field)}
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
