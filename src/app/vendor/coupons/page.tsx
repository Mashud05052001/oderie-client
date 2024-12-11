"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { useGetAllVendorCoupons } from "@/src/hook_with_service/swrGet/coupon.fetch";
import { useGetMyInfos } from "@/src/hook_with_service/swrGet/user.fetch";
import { TCoupon, TProductCoupon } from "@/src/types/response.type";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import React from "react";

interface ExpandedDataType {
  key: React.Key;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
}

interface DataType extends TCoupon {
  key: string;
}

export default function Page() {
  const { user } = useUserProvider();
  const { data: UserInfoResponse } = useGetMyInfos({ includes: "vendor" });

  const vendorId = UserInfoResponse?.data?.Vendor
    ? UserInfoResponse?.data?.Vendor.id
    : "";
  const { data: couponResponse } = useGetAllVendorCoupons({ vendorId });

  const couponData = couponResponse?.data;

  // Function to render product info in the expanded section
  const expandedRowRender = (coupon: TCoupon) => {
    const productInfo: ExpandedDataType[] =
      coupon.ProductCoupon?.map((productCoupon: TProductCoupon) => ({
        key: productCoupon.productId,
        productTitle: productCoupon.Product?.title || "Unknown Title",
        productDescription:
          productCoupon.Product?.description || "No description available",
        productPrice: productCoupon.Product?.price || 0,
        productQuantity: productCoupon.Product?.quantity || 0,
      })) || [];

    return (
      <Table<ExpandedDataType>
        columns={expandColumns}
        dataSource={productInfo}
        pagination={false}
        size="small"
      />
    );
  };

  const expandColumns: TableColumnsType<ExpandedDataType> = [
    { title: "Products", key: "ProductInformation" },
    { title: "Title", dataIndex: "productTitle", key: "productTitle" },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    { title: "Price", dataIndex: "productPrice", key: "productPrice" },
    { title: "Quantity", dataIndex: "productQuantity", key: "productQuantity" },
  ];

  const columns: TableColumnsType<DataType> = [
    { title: "Coupon Code", dataIndex: "code", key: "code" },
    {
      title: "Discount",
      dataIndex: "percentage",
      key: "percentage",
    },
    { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Number of Products", // New column for the number of products
      key: "productCount",
      render: (coupon: TCoupon) => {
        const productCount = coupon.ProductCoupon
          ? coupon.ProductCoupon.length
          : 0;
        return <span className="md:pl-14">{productCount}</span>;
      },
    },
    {
      title: "Action",
      key: "operation",
      render: () => <p>Action</p>,
    },
  ];

  const dataSource: DataType[] =
    couponData?.map((coupon: TCoupon) => ({
      key: coupon?.id,
      ...coupon,
      expiryDate: coupon?.expiryDate.split("T")[0],
      percentage: `${coupon?.percentage} %`,
    })) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Coupons</h1>
      <Table<DataType>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record), // Pass the coupon object
        }}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
    </div>
  );
}
