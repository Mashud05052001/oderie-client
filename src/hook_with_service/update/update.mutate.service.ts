"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import {
  TCoupon,
  TOrder,
  TOrderStatus,
  TProfile,
  TReturnData,
  TVendorResponse,
} from "@/src/types";
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

export const updateResponseService = catchServiceAsync(
  async (responseId: string, payload: FieldValues) => {
    const res = await axiosInstance.patch(
      `/vendor-response/${responseId}`,
      payload
    );
    return res.data as TReturnData<TVendorResponse>;
  }
);

export const changeOrderStatus = catchServiceAsync(
  async (orderId: string, payload: { status: "DELIVERED" | "CANCELLED" }) => {
    const res = await axiosInstance.patch(`/order/${orderId}`, payload);
    return res.data as TReturnData<TOrder>;
  }
);
