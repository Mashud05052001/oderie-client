"use client";
import { TOrder } from "@/src/types";
import { ColumnsType } from "antd/es/table";
import { Avatar, Badge, Table } from "antd";
import moment from "moment";
import CreateReviewModal from "@/src/components/modal/reviewModal/CreateReviewModal";
import Link from "next/link";

type TOrderTableData = {
  key: React.Key;
  productImg: string;
  productTitle: string;
  vendorImg: string;
  vendorName: string;
  vendorId: string;
  productId: string;
  orderId: string;
  orderTime: string;
};

export default function CreateReviewsTable({
  orderData,
}: {
  orderData: TOrder[];
}) {
  const formattedData: TOrderTableData[] =
    orderData?.flatMap((order) => {
      const orderId = order?.id!;
      const orderTime = order?.updatedAt!;
      const vendorImg = order?.Vendor?.logo!;
      const vendorName = order?.Vendor?.name!;
      const vendorId = order?.vendorId!;
      return (
        order?.OrderItem?.map((orderItem) => ({
          key: `${orderId}+${orderItem?.productId!}`,
          productImg: orderItem?.Product?.img[0]!,
          productTitle: orderItem?.Product?.title!,
          vendorImg,
          vendorName,
          vendorId,
          productId: orderItem?.productId,
          orderId,
          orderTime,
        })) || []
      );
    }) || [];

  const columns: ColumnsType<TOrderTableData> = [
    {
      title: "Product Info",
      render: (data: TOrderTableData) => (
        <Link
          className="flex items-center space-x-2 text-gray-900 hover:text-blue-700"
          href={`/products/${data?.productId}`}
        >
          <Avatar src={data?.productImg} size={"default"} />
          <p>{data?.productTitle}</p>
        </Link>
      ),
    },
    {
      title: "Vendor Info",
      render: (data: TOrderTableData) => (
        <Link
          className="flex items-center space-x-2 text-gray-900 hover:text-blue-700"
          href={`/vendors/${data?.vendorId}`}
        >
          <Avatar src={data?.vendorImg} size={"default"} />
          <p>{data?.vendorName}</p>
        </Link>
      ),
    },
    {
      title: "Order Time",
      dataIndex: "orderTime",
      render: (date) => moment(date).format("LL"),
      //   render: (date) => moment(date).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Create Review",
      key: "action",
      render: (data: TOrderTableData) => {
        return (
          <CreateReviewModal
            orderId={data?.orderId}
            productId={data?.productId}
          />
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={formattedData} pagination={false} />
    </div>
  );
}
