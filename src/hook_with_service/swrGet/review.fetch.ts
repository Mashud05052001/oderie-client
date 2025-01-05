import axiosInstance from "@/src/lib/axiosInstance";
import { TReview, TSuccessMetaData } from "@/src/types";
import { AxiosError } from "axios";
import useSWR from "swr";

type TProps = {
  page?: number;
  limit?: number;
  productId?: string;
  isVendorResponse?: boolean | null;
};

export const useGetAllReviews = ({
  page = 1,
  limit = 10,
  productId = "",
  isVendorResponse = null,
}: TProps) => {
  const fetcher = async (url: string) => {
    const data: TSuccessMetaData<TReview[]> = (await axiosInstance.get(url))
      .data;
    return data;
  };

  const url =
    `/review?page=${page}&limit=${limit}` +
    (productId !== "" ? `&productId=${productId}` : "") +
    (isVendorResponse !== null ? `&isVendorResponse=${isVendorResponse}` : "");

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    errorRetryCount: 5,
    shouldRetryOnError: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const isLoading = isValidating;

  return {
    data: data || null,
    error: error as AxiosError,
    isLoading,
    revalidate: () => mutate(),
  };
};
