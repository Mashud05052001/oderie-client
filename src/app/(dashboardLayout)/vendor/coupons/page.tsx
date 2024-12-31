"use client";
import ModalContainer from "@/src/components/modal/ModalContainer";
import OdButton from "@/src/components/UI/button/OdButton";
import OdDatePicker from "@/src/components/UI/form/OdDatePicker";
import OdForm from "@/src/components/UI/form/OdForm";
import OdInput from "@/src/components/UI/form/OdInput";
import {
  useDeleteCoupon,
  useDeleteCouponProduct,
} from "@/src/hook_with_service/delete/delete.mutate.hook";
import { useGetAllVendorCoupons } from "@/src/hook_with_service/swrGet/coupon.fetch";
import { useGetMyInfos } from "@/src/hook_with_service/swrGet/user.fetch";
import { useUpdateCoupon } from "@/src/hook_with_service/update/update.mutate.hook";
import { updateCouponSchema } from "@/src/schema/coupon.schema";
import { TReturnData } from "@/src/types";
import { TCoupon, TProductCoupon } from "@/src/types/response.type";
import { generateSelectedDateToLastMinuteOfTheDay } from "@/src/utils/generateDate";
import {
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Avatar } from "@nextui-org/avatar";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import type { TableColumnsType } from "antd";
import { Button, Popover, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface TExpandedContent {
  key: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  couponId: string;
}

interface TMainContent extends TCoupon {
  key: string;
}

export default function Page() {
  const [data, setData] = useState<TMainContent[]>([]);
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
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
        expiryDate: coupon.expiryDate,
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
    const productInfo: TExpandedContent[] =
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
      <Table<TExpandedContent>
        columns={expandColumns}
        dataSource={productInfo}
        pagination={false}
        size="small"
      />
    );
  };

  const expandColumns: TableColumnsType<TExpandedContent> = [
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
      render: (data: TExpandedContent) => {
        return (
          <DeleteFilled
            className="hover:text-red-600 cursor-pointer duration-100"
            onClick={() => handleCouponProductDelete(data?.couponId, data?.key)}
          />
        );
      },
    },
  ];

  const columns: TableColumnsType<TMainContent> = [
    { title: "Coupon Code", dataIndex: "code", key: "code" },
    { title: "Discount", dataIndex: "percentage", key: "percentage" },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date: string) => date?.split("T")[0],
    },
    {
      title: "Number of Products",
      key: "productCount",
      render: (coupon: TMainContent) => {
        const productCount = coupon.ProductCoupon
          ? coupon.ProductCoupon.length
          : 0;
        return <span className="md:pl-14">{productCount}</span>;
      },
    },
    {
      title: "Action",
      key: "operation",
      render: (data: TMainContent) => {
        return (
          <div className="flex space-x-4 text-xl">
            <div>
              <ModalContainer
                isOpen={editModalOpenId === data.id}
                setIsOpen={(isOpen) =>
                  isOpen
                    ? setEditModalOpenId(data.id)
                    : setEditModalOpenId(null)
                }
                placement="top"
                triggerElement={
                  <EditFilled className="hover:text-blue-600 cursor-pointer duration-100" />
                }
                title={`Edit ${data?.code} coupon`}
              >
                <EditCouponData
                  couponData={data}
                  revalidate={revalidate}
                  setEditModalClose={setEditModalOpenId}
                />
              </ModalContainer>
            </div>
            <div>
              <DeleteFilled
                className="hover:text-red-600 cursor-pointer duration-100"
                onClick={() => handleDelete(data?.id)}
              />
            </div>
          </div>
        );
      },
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
      <Table<TMainContent>
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
        }}
        dataSource={data}
        pagination={false}
        size="small"
        loading={
          // userDataLoading
          // ||
          couponDataLoading || deleteCouponLoading || deleteCouponProductLoading
        }
      />
    </div>
  );
}

const EditCouponData = ({
  couponData,
  revalidate,
  setEditModalClose,
}: {
  couponData: TMainContent;
  revalidate: () => Promise<TReturnData<TCoupon[]> | undefined>;
  setEditModalClose: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<boolean>(false);
  const { mutate, isLoading, isSuccess } = useUpdateCoupon();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const expiryDate = generateSelectedDateToLastMinuteOfTheDay(
      data.expiryDate
    );
    const updatedData: Partial<TCoupon> = {};
    if (couponData?.code !== data?.code) updatedData["code"] = data?.code;
    if (couponData?.expiryDate !== expiryDate)
      updatedData["expiryDate"] = expiryDate;
    if (couponData?.percentage !== data?.percentage)
      updatedData["percentage"] = data?.percentage;
    if (Object.keys(updatedData).length === 0) {
      toast.error("Please change anything before update");
      return;
    }

    const confirm = window.confirm("Are you sure to update the coupon");
    if (confirm) {
      const payload = {
        couponId: couponData?.id,
        payload: updatedData,
      };
      mutate(payload);
    }
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      revalidate();
      setEditModalClose(null);
    }
  }, [isLoading, isSuccess]);
  return (
    <OdForm
      onSubmit={onSubmit}
      className="space-y-6"
      resolver={zodResolver(updateCouponSchema)}
    >
      <OdInput
        label="Coupon Code"
        name="code"
        type="text"
        defaultValue={couponData?.code}
      />
      <OdInput
        label="Percentage"
        name="percentage"
        type="number"
        defaultValue={couponData?.percentage}
      />
      <Controller
        name="expiryDate"
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <DatePicker
              {...field}
              onChange={(date) => {
                setSelectedDate(true);
                field.onChange(date);
              }}
              label={`Previous Expiry Date : ${moment(couponData?.expiryDate).utc().format("MM/DD/YYYY")}`}
              variant="underlined"
              showMonthAndYearPickers
              hideTimeZone
              minValue={now(getLocalTimeZone())}
            />
            {error && (
              <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
                <small>{error.message}</small>
              </div>
            )}
          </div>
        )}
      />
      <div>
        <OdButton
          buttonText="Update Coupon"
          className="mt-5"
          isLoading={isLoading}
          isDisabled={!selectedDate}
        />
      </div>
    </OdForm>
  );
};
