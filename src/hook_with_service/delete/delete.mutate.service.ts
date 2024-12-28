"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData } from "@/src/types";
import catchServiceAsync from "@/src/utils/servicesCatchAsync";

export const deleteProductService = catchServiceAsync(
  async (productId: string) => {
    const res = await axiosInstance.delete(`/product/${productId}`);
    return res.data as TReturnData<any>;
  }
);

export const deleteCouponProductService = catchServiceAsync(
  async (payload: { productId: string; couponId: string }) => {
    const res = await axiosInstance.patch(`/coupon/product`, payload);
    return res.data as TReturnData<any>;
  }
);

export const deleteCouponService = catchServiceAsync(
  async (couponId: string) => {
    const res = await axiosInstance.delete(`/coupon/${couponId}`);
    return res.data as TReturnData<any>;
  }
);
