"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TReturnData, TSuccessMetaData, TProduct } from "@/src/types";

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = "",
  categoryId: string = "",
  includes: string = "",
  sortBy: string = "",
  sortOrder: string = "",
  price: string = ""
) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });

  // Conditionally add searchTerm and category if they are provided
  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (categoryId) queryParams.append("categoryId", categoryId);
  if (includes) queryParams.append("includes", includes);
  if (price) queryParams.append("price", price);
  if (sortBy && sortOrder) {
    queryParams.append("sortBy", sortBy);
    queryParams.append("sortOrder", sortOrder);
  }
  const url = `/product?${queryParams.toString()}`;

  const response = await nexiosInstance.get(url, {
    next: {
      tags: ["products"],
      revalidate: 60,
    },
  });

  const data = response?.data as TSuccessMetaData<TProduct[]>;

  return data?.data || { data: [], meta: {} };
};

export const getSingleProduct = async (productId: string) => {
  const response = await nexiosInstance.get(`/product/${productId}`, {
    next: {
      tags: ["singleProduct"],
    },
  });
  const data = response.data as TReturnData<TProduct>;
  return data?.data;
};
