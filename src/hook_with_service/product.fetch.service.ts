"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TReturnData, TSuccessMetaData, TProduct, TReview } from "@/src/types";

type TGetProductsProps = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
  includes?: string;
  sortBy?: string;
  sortOrder?: string;
  price?: string;
};

export const getProducts = async ({
  page = 1,
  limit = 10,
  searchTerm = "",
  categoryId = "",
  includes = "",
  sortBy = "",
  sortOrder = "",
  price = "",
}: TGetProductsProps) => {
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

export const getSingleProduct = async (
  productId: string,
  includesObj?: {
    Category?: boolean;
    Order?: boolean;
    ProductCoupon?: boolean;
    Vendor?: boolean;
    Review?: boolean;
    _count?: boolean;
  }
) => {
  const includes = includesObj
    ? Object.entries(includesObj)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(",")
    : "";

  const response = await nexiosInstance.get(
    `/product/${productId}?includes=${includes}`,
    {
      next: {
        tags: ["singleProduct"],
        revalidate: 60,
      },
    }
  );
  const data = response.data as TReturnData<TProduct>;
  return data?.data;
};

export const getSingleProductAllReviewsWithResponse = async (
  productId: string,
  page: number = 1,
  limit: number = 5
) => {
  const url = `/review/${productId}?page=${page}&limit=${limit}`;
  const response = await nexiosInstance.get(url, {
    next: {
      tags: ["singleProductAllReviewsWithResponse"],
      revalidate: 60,
    },
  });
  const data = response.data as TSuccessMetaData<TReview[]>;
  return data;
};
