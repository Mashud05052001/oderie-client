"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData, TReview, TVendorResponse } from "@/src/types";
import catchServiceAsync from "@/src/utils/servicesCatchAsync";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createProductService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post("/product", payload);
    return res.data as TReturnData<any>;
  }
);
export const duplicateProductService = catchServiceAsync(
  async (productId: string) => {
    const res = await axiosInstance.post(`/product/duplicate/${productId}`);
    return res.data as TReturnData<any>;
  }
);
export const updateProductService = catchServiceAsync(
  async (productId: string, payload: FieldValues) => {
    const res = await axiosInstance.patch(`/product/${productId}`, payload);
    return res.data as TReturnData<any>;
  }
);
export const createCouponService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post(`/coupon`, payload);
    return res.data as TReturnData<any>;
  }
);
export const createReviewService = catchServiceAsync(
  async (payload: FieldValues | FormData) => {
    const res = await axiosInstance.post(`/review`, payload);
    revalidateTag("myOrderData");
    revalidateTag("myRemainingReviewOrderData");
    revalidateTag("myReviews");
    return res.data as TReturnData<TReview>;
  }
);
export const createResponseService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post(`/vendor-response`, payload);
    return res.data as TReturnData<TVendorResponse>;
  }
);
