import axiosInstance from "@/src/lib/axiosInstance";
import { TReturnData } from "@/src/types";
import { TUser } from "@/src/types/response.type";
import { AxiosError } from "axios";
import useSWR from "swr";

export const useGetMyInfos = ({ includes = "" }: { includes?: string }) => {
  const fetcher = async (url: string) => {
    const data: TReturnData<TUser> = (await axiosInstance.get(url)).data;
    return data;
  };
  const url = `/user/me?includes=${includes}`;
  const { data, error, isValidating, mutate } = useSWR(url, fetcher);
  const isLoading = isValidating;
  return {
    data: data || null,
    error: error as AxiosError,
    isLoading,
    revalidate: () => mutate(),
  };
};
