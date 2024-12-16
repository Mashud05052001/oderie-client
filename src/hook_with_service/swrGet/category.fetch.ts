import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData } from "@/src/types";
import { TCategory } from "@/src/types/response.type";
import { AxiosError } from "axios";
import useSWR from "swr";

export const useGetAllCategories = () => {
  const fetcher = async (url: string) => {
    const data: TReturnData<TCategory[]> = (await axiosInstance.get(url)).data;
    return data;
  };

  const { data, error, isValidating, mutate } = useSWR(`/category`, fetcher);

  const isLoading = isValidating;

  return {
    data: data || null,
    error: error as AxiosError,
    isLoading,
    revalidate: () => mutate(),
  };
};
