import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  checkResetCodeService,
  forgetPasswordService,
  loginUserService,
  registerUserService,
  resetPasswordService,
  sendContactEmail,
} from "./auth.mutate.service";
import { TReturnData } from "@/src/types";
import { TLoginResponse } from "@/src/types/response.type";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (payload: FieldValues) =>
      await registerUserService(payload),
    onSuccess: () => {
      toast.success("User registered successfully. Please login to continue");
    },
    onError: (error) => {
      toast.error(`Register failed. ${error?.message}`);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<TReturnData<TLoginResponse>, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) => await loginUserService(payload),
    onSuccess: (data) => {
      let role = (data as TReturnData<TLoginResponse>)?.data?.role;
      role = role[0].toUpperCase() + role.slice(1).toLowerCase();
      toast.success(`${role} logged in successfully`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Login failed. ${error?.message}`);
    },
  });
};

// export const useUserPasswordChange = () => {
//   return useMutation<any, Error, FieldValues, unknown>({
//     mutationFn: async (payload: FieldValues) =>
//       await changePasswordService(payload),
//     onSuccess: () => {
//       toast.success("User password changed successfully");
//     },
//     onError: (error) => {
//       toast.error(`Failed. ${error?.message}`);
//     },
//   });
// };

export const useUserForgetPassword = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) =>
      await forgetPasswordService(payload),
    onSuccess: () => {
      toast.success(
        "Successfully send mail. Please check email to get the verification code"
      );
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUserCheckResetCode = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) =>
      await checkResetCodeService(payload),
    onSuccess: () => {
      toast.success("Code verified successfully. Please enter a new password");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUserResetPassword = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) =>
      await resetPasswordService(payload),
    onSuccess: () => {
      toast.success(
        "Password reset successfully. Please login with new password"
      );
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useSendContactEmail = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: async (payload: FieldValues) => await sendContactEmail(payload),
    onSuccess: () => {
      toast.success("Contact email send successfull");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
