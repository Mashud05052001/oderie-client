import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword, updateUserProfile } from "./update.mutate.service";
import { FieldValues } from "react-hook-form";

export const useUpdateUserProfile = () => {
  return useMutation<any, Error, FormData | FieldValues, unknown>({
    mutationFn: async (payload: FormData | FieldValues) =>
      await updateUserProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) => await changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
