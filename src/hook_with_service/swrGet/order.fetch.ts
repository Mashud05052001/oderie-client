import axiosInstance from "@/src/lib/axiosInstance";
import {
  TOrder,
  TOrderStatus,
  TPaymentStatus,
  TSuccessMetaData,
} from "@/src/types";
import { AxiosError } from "axios";
import useSWR from "swr";

type TProps = {
  page?: number;
  limit?: number;
  status?: TOrderStatus | null;
  paymentStatus?: TPaymentStatus | null;
};

export const useGetAllOrders = ({
  page = 1,
  limit = 10,
  status = null,
  paymentStatus = null,
}: TProps) => {
  const fetcher = async (url: string) => {
    const data: TSuccessMetaData<TOrder[]> = (await axiosInstance.get(url))
      .data;
    return data;
  };

  const url =
    `/order?page=${page}&limit=${limit}` +
    (status ? `&status=${status}` : "") +
    (paymentStatus ? `&paymentStatus=${paymentStatus}` : "");

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    errorRetryCount: 5,
    shouldRetryOnError: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    data: data || null,
    error: error as AxiosError,
    isLoading: isValidating,
    revalidate: () => mutate(),
  };
};
