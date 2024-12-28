"use client";
import {
  useDeleteCoupon,
  useDeleteCouponProduct,
} from "@/src/hook_with_service/delete/delete.mutate.hook";
import { useGetAllVendorCoupons } from "@/src/hook_with_service/swrGet/coupon.fetch";
import { useGetMyInfos } from "@/src/hook_with_service/swrGet/user.fetch";
import { TCoupon, TProductCoupon } from "@/src/types/response.type";
import {
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Avatar } from "@nextui-org/avatar";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import type { TableColumnsType } from "antd";
import { Button, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";

interface ExpandedDataType {
  key: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  couponId: string;
}

interface DataType extends TCoupon {
  key: string;
}

export default function Page() {
  const [data, setData] = useState<DataType[]>([]);
  const { data: UserInfoResponse, isLoading: userDataLoading } = useGetMyInfos({
    includes: "vendor",
  });
  const vendorId = UserInfoResponse?.data?.Vendor
    ? UserInfoResponse?.data?.Vendor.id
    : "";
  const {
    data: couponResponse,
    isLoading: couponDataLoading,
    revalidate,
  } = useGetAllVendorCoupons({ vendorId });

  const {
    mutate: mutateDeleteCoupon,
    isLoading: deleteCouponLoading,
    isSuccess: deleteCouponSuccess,
  } = useDeleteCoupon();
  const {
    mutate: mutateDeleteCouponProduct,
    isLoading: deleteCouponProductLoading,
    isSuccess: deleteCouponProductSuccess,
  } = useDeleteCouponProduct();

  const couponData = couponResponse?.data;

  useEffect(() => {
    if (couponData?.length) {
      const updatedData = couponData.map((coupon: TCoupon) => ({
        key: coupon.id,
        ...coupon,
        expiryDate: coupon.expiryDate?.split("T")[0],
        percentage: coupon.percentage,
      }));
      setData(updatedData);
    }
  }, [couponData]);
  useEffect(() => {
    if (deleteCouponSuccess || deleteCouponProductSuccess) {
      revalidate();
    }
  }, [deleteCouponSuccess, deleteCouponProductSuccess]);

  const expandedRowRender = (coupon: TCoupon) => {
    const productInfo: ExpandedDataType[] =
      coupon.ProductCoupon?.map((productCoupon: TProductCoupon) => ({
        key: productCoupon.productId,
        productTitle: productCoupon.Product?.title || "Unknown Title",
        productDescription:
          productCoupon.Product?.description || "No description available",
        productPrice: productCoupon.Product?.price || 0,
        productQuantity: productCoupon.Product?.quantity || 0,
        productImage: productCoupon.Product?.img[0] as string,
        couponId: coupon?.id,
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
    {
      title: "Products",
      key: "ProductImage",
      render: (data) => {
        return <Avatar src={data?.productImage} />;
      },
    },
    { title: "Title", dataIndex: "productTitle", key: "productTitle" },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    { title: "Price", dataIndex: "productPrice", key: "productPrice" },
    { title: "Quantity", dataIndex: "productQuantity", key: "productQuantity" },
    {
      title: "Action",
      key: "action",
      render: (data: ExpandedDataType) => {
        return (
          <DeleteFilled
            className="hover:text-red-600 cursor-pointer duration-100"
            onClick={() => handleCouponProductDelete(data?.couponId, data?.key)}
          />
        );
      },
    },
  ];

  const columns: TableColumnsType<DataType> = [
    { title: "Coupon Code", dataIndex: "code", key: "code" },
    { title: "Discount", dataIndex: "percentage", key: "percentage" },
    { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Number of Products",
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
      render: (data) => (
        <div className="flex space-x-4 text-xl">
          <div>
            <EditFilled
              className="hover:text-blue-600 cursor-pointer duration-100"
              onClick={() => handleEdit(data)}
            />
          </div>
          <div>
            <DeleteFilled
              className="hover:text-red-600 cursor-pointer duration-100"
              onClick={() => handleDelete(data?.id)}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleEdit = (couponId: string) => {
    // const confirm = window.confirm("Are you sure to delete this coupon?");
    // if (confirm) {
    //   console.log(couponId);
    // }
  };

  const handleDelete = (couponId: string) => {
    const confirm = window.confirm("Are you sure to delete this coupon?");
    if (confirm) {
      mutateDeleteCoupon(couponId);
    }
  };

  const handleCouponProductDelete = async (
    couponId: string,
    productId: string
  ) => {
    const data = { couponId, productId };
    const confirm = window.confirm(
      "Are you sure to delete this coupon product?"
    );
    if (confirm) {
      mutateDeleteCouponProduct(data);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">All Coupons</h1>
      <Table<DataType>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
        }}
        dataSource={data}
        pagination={false}
        size="small"
        loading={
          userDataLoading ||
          couponDataLoading ||
          deleteCouponLoading ||
          deleteCouponProductLoading
        }
      />
    </div>
  );
}
