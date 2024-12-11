"use client";
import { useUserProvider } from "@/src/context/user.provider";
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
import { Popover, Table, Button } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface ExpandedDataType {
  key: React.Key;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  couponId: string;
}

interface DataType extends TCoupon {
  key: string;
  editable: boolean; // To track if the row is being edited
}

export default function Page() {
  const [editableData, setEditableData] = useState<DataType[]>([]);
  const { data: UserInfoResponse, isLoading: userDataLoading } = useGetMyInfos({
    includes: "vendor",
  });
  const vendorId = UserInfoResponse?.data?.Vendor
    ? UserInfoResponse?.data?.Vendor.id
    : "";
  const { data: couponResponse, isLoading: couponDataLoading } =
    useGetAllVendorCoupons({ vendorId });
  const couponData = couponResponse?.data;

  useEffect(() => {
    if (couponData) {
      setEditableData(
        couponData.map((coupon: TCoupon) => ({
          key: coupon?.id,
          editable: false,
          ...coupon,
          expiryDate: coupon?.expiryDate.split("T")[0],
          percentage: `${coupon?.percentage} %`,
        }))
      );
    }
  }, [couponData]);

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
  ];

  const columns: TableColumnsType<DataType> = [
    { title: "Coupon Code", dataIndex: "code", key: "code" },
    {
      title: "Discount",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, record) =>
        record.editable ? (
          <Input
            defaultValue={text}
            onChange={(e) => handleChange(e, "percentage", record.key)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text, record) => {
        return record.editable ? (
          <DatePicker
            onChange={(date) => {
              return date;
            }}
            minValue={now(getLocalTimeZone())}
          />
        ) : (
          text
        );
      },
    },
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
          {data.editable ? (
            <>
              <div>
                <Button
                  onClick={() => handleSave(data.key)}
                  type="primary"
                  size="small"
                >
                  <SaveOutlined />
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleCancel(data.key)}
                  type="default"
                  size="small"
                >
                  <CloseOutlined />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <EditFilled
                  className="hover:text-blue-600 cursor-pointer duration-100"
                  onClick={() => handleEdit(data.key)}
                />
              </div>
              <div>
                <Popover
                  content={
                    <div className="flex justify-end">
                      <button
                        className="border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 
                      duration-100 mt-2 px-3 py-1 rounded-lg font-semibold"
                        onClick={() => console.log(data)}
                      >
                        Yes, Delete It
                      </button>
                    </div>
                  }
                  title="Are you sure to delete the product?"
                  trigger="click"
                  placement="left"
                >
                  <DeleteFilled className="hover:text-red-600 cursor-pointer duration-100 " />
                </Popover>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleEdit = (key: string) => {
    setEditableData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, editable: true } : item
      )
    );
  };

  const handleSave = (key: string) => {
    console.log(key);
    setEditableData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              editable: false,
              percentage: item.percentage,
              expiryDate: item.expiryDate,
            }
          : item
      )
    );
    console.log("Saved data:", editableData);
  };

  const handleCancel = (key: string) => {
    setEditableData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              editable: false,
              percentage: `${item.percentage}`, // reset to original value
              expiryDate: item.expiryDate, // reset to original value
            }
          : item
      )
    );
  };

  const handleChange = (e: any, field: string, key: string) => {
    setEditableData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? { ...item, [field]: e.target ? e.target.value : e }
          : item
      )
    );
  };

  const dataSource: DataType[] = editableData || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">All Coupons</h1>
      <Table<DataType>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
        }}
        dataSource={dataSource}
        pagination={false}
        size="small"
        loading={userDataLoading || couponDataLoading}
      />
    </div>
  );
}
