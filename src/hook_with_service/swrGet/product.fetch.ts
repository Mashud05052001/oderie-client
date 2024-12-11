import axiosInstance from "@/src/lib/axiosInstance";
import { TSuccessMetaData } from "@/src/types";
import { TProduct } from "@/src/types/response.type";
import { AxiosError } from "axios";
import useSWR from "swr";

type TGetAllProductsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  searchTerm?: string;
  price?: string;
  includes?: string;
};

export const useGetAllProducts = ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  searchTerm = "",
  price = "",
  includes = "",
}: TGetAllProductsParams) => {
  const fetcher = async (url: string) => {
    const data: TSuccessMetaData<TProduct[]> = (await axiosInstance.get(url))
      .data;
    return data;
  };

  const url = `/product?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&price=${price}&includes=${includes}`;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher);

  const isLoading = isValidating;

  return {
    data: data || null,
    error: error as AxiosError,
    isLoading,
    revalidate: () => mutate(),
  };
};
