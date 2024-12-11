import { useMutation } from "@tanstack/react-query";
import {
  createCouponService,
  createProductService,
  duplicateProductService,
  updateProductService,
} from "./create.mutate.service";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export const useCreateProduct = () => {
  return useMutation<any, Error, FormData, unknown>({
    mutationFn: async (payload: FormData) =>
      await createProductService(payload),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useDuplicateProduct = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (productId: string) =>
      await duplicateProductService(productId),
    onSuccess: () => {
      toast.success("Product duplicated successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUpdateProduct = () => {
  return useMutation<
    any,
    Error,
    { productId: string; payload: FieldValues },
    unknown
  >({
    mutationFn: async ({ payload, productId }) =>
      await updateProductService(productId, payload),
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useCreateCoupon = () => {
  return useMutation<any, Error, FormData, unknown>({
    mutationFn: async (payload: FormData) => await createCouponService(payload),
    onSuccess: () => {
      toast.success("Coupon created successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};