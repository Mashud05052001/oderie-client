import { TUserRole } from "@/src/types";
import React from "react";

interface RoleBadgeProps {
  role: TUserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const getBadgeColor = () => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "VENDOR":
        return "bg-purple-100 text-purple-800";
      case "CUSTOMER":
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 mb-2 rounded-full text-xs font-medium ${getBadgeColor()}`}
    >
      {role.toLowerCase()}
    </span>
  );
}
