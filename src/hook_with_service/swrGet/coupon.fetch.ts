import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData } from "@/src/types";
import { TCoupon } from "@/src/types/response.type";
import { AxiosError } from "axios";
import useSWR from "swr";

export const useGetAllVendorCoupons = ({ vendorId }: { vendorId: string }) => {
  const fetcher = async (url: string) => {
    const data: TReturnData<TCoupon[]> = (await axiosInstance.get(url)).data;
    return data;
  };

  const url = vendorId ? `/coupon/vendor/${vendorId}` : null;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const isLoading = isValidating;

  return {
    data: data || null,
    error: error as AxiosError,
    isLoading,
    revalidate: () => mutate(),
  };
};
