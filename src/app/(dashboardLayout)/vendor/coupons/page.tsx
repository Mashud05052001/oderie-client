"use client";
import EditCouponData from "@/src/components/modal/couponModal/EditCouponData";
import ModalContainer from "@/src/components/modal/ModalContainer";
import MyPagination from "@/src/components/shared/Pagination";
import {
  useDeleteCoupon,
  useDeleteCouponProduct,
} from "@/src/hook_with_service/delete/delete.mutate.hook";
import { useGetAllVendorCoupons } from "@/src/hook_with_service/swrGet/coupon.fetch";
import { TCoupon, TProductCoupon } from "@/src/types/response.type";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Avatar } from "@nextui-org/avatar";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { useEffect, useState } from "react";

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
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [data, setData] = useState<TMainContent[]>([]);
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);

  const {
    data: couponResponse,
    isLoading: couponDataLoading,
    revalidate,
  } = useGetAllVendorCoupons({ page, limit });
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

  const couponData = couponResponse?.data?.data;
  const meta = couponResponse?.data?.meta!;

  useEffect(() => {
    if (couponData?.length) {
      const updatedData = couponData.map((coupon: TCoupon) => ({
        key: coupon.id,
        ...coupon,
        expiryDate: coupon.expiryDate,
        percentage: coupon.percentage,
      }));
      setData(updatedData);
    } else {
      setData([]);
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
      <div className="min-h-[80vh]">
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
            couponDataLoading ||
            deleteCouponLoading ||
            deleteCouponProductLoading
          }
        />
      </div>

      <MyPagination
        className="mt-5 mb-10"
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        total={meta?.total}
      />
    </div>
  );
}
