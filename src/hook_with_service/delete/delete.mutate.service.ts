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
