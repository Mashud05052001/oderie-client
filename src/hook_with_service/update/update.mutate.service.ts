"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { TCoupon, TProfile, TReturnData } from "@/src/types";
import catchServiceAsync from "@/src/utils/servicesCatchAsync";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const updateUserProfile = catchServiceAsync(
  async (payload: FieldValues | FormData) => {
    const response = await axiosInstance.patch(`/user/update`, payload);
    const data = response?.data as TReturnData<TProfile>;
    console.log(response);
    if (data?.success) {
      revalidateTag("userProfile");
    }
    return data;
  }
);

export const changePassword = catchServiceAsync(
  async (payload: FieldValues) => {
    const response = await axiosInstance.post(`/auth/change-password`, payload);
    const data = response?.data as TReturnData<string>;
    console.log(data);
    return data;
  }
);

export const updateCoupon = catchServiceAsync(
  async (couponId: string, payload: FieldValues) => {
    const response = await axiosInstance.patch(`/coupon/${couponId}`, payload);
    const data = response?.data as TReturnData<TCoupon>;
    return data;
  }
);
