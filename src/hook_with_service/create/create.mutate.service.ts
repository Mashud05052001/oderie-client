"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData } from "@/src/types";
import catchServiceAsync from "@/src/utils/servicesCatchAsync";
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
