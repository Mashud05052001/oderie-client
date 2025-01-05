import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteCouponProductService,
  deleteCouponService,
  deleteProductService,
  deleteVendorResponseService,
} from "./delete.mutate.service";
import { mutate } from "swr";

export const useDeleteProduct = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (productId: string) =>
      await deleteProductService(productId),
    onSuccess: () => {
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useDeleteCouponProduct = () => {
  return useMutation<
    any,
    Error,
    { productId: string; couponId: string },
    unknown
  >({
    mutationFn: async ({ productId, couponId }) =>
      await deleteCouponProductService({ productId, couponId }),
    onSuccess: () => {
      toast.success("Product deleted successfully from coupon");
      mutate;
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useDeleteCoupon = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (couponId: string) => await deleteCouponService(couponId),
    onSuccess: () => {
      toast.success("Coupon deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useDeleteVendorResponse = () => {
  return useMutation<any, Error, string, unknown>({
    mutationFn: async (responseId: string) =>
      await deleteVendorResponseService(responseId),
    onSuccess: () => {
      toast.success("Vendor response deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
