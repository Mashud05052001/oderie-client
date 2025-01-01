import axiosInstance from "@/src/lib/axiosInstance";
import { TSuccessMetaData } from "@/src/types";
import { TCoupon } from "@/src/types/response.type";
import { AxiosError } from "axios";
import useSWR from "swr";

type TProps = {
  vendorId?: string;
  page?: number;
  limit?: number;
};

export const useGetAllVendorCoupons = ({
  vendorId,
  page = 1,
  limit = 10,
}: TProps) => {
  const fetcher = async (url: string) => {
    const data: TSuccessMetaData<TCoupon[]> = (await axiosInstance.get(url))
      .data;
    return data;
  };

  const url = vendorId
    ? `/coupon/vendor/${vendorId}`
    : "/coupon/vendor" + `?page=${page}&limit=${limit}`;
  console.log(url);
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
