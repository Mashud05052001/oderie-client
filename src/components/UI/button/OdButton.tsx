import { Button } from "@nextui-org/button";
import { ReactNode } from "react";
import ButtonLoadingIcon from "../icons/buttonLoadingIcon";

type TProps = {
  buttonText?: string | ReactNode;
  buttonType?: "button" | "submit" | "reset";
  variant?: "solid" | "shadow" | "ghost";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?: "success" | "warning" | "danger" | "primary" | "secondary";
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  spinnerPlacement?: "start" | "end";
  className?: string;
  onClick?: () => void;
};

export default function OdButton({
  color = "success",
  buttonText = "Submit",
  buttonType = "submit",
  variant = "solid",
  size = "md",
  radius = "sm",
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  spinnerPlacement = "start",
  className,
  onClick,
}: TProps) {
  return (
    <Button
      color={color}
      type={buttonType}
      variant={variant}
      size={size}
      radius={radius}
      isLoading={isLoading}
      isDisabled={isDisabled}
      fullWidth={fullWidth}
      spinnerPlacement={spinnerPlacement}
      spinner={<ButtonLoadingIcon />}
      // className={`px-10 text-base ${className}`}
      className={`px-10 text-base dark:bg-gray-700 dark:text-white ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
