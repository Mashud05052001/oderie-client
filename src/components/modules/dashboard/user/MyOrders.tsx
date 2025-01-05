"use client";

import OrderedProductsModal from "@/src/components/modal/reviewModal/CustomerOrderedProductsModal";
import PriceOrganize from "@/src/components/shared/smallComponents/PriceOrganize";
import { TOrder } from "@/src/types";
import { getStatusColor } from "@/src/utils/utils";
import { Tooltip } from "@nextui-org/tooltip";
import type { TableColumnsType } from "antd";
import { Avatar, Badge, Table } from "antd";
import moment from "moment";
import React from "react";

// Add missing properties to DataType for type compatibility
type TOrderTableData = TOrder & {
  key: React.Key;
};

// const expandColumns: TableColumnsType<ExpandedDataType> = [
//   {
//     title: "Product No",
//     dataIndex: "idx",
//     key: "idx",
//   },
//   {
//     title: "Image",
//     dataIndex: "productImg",
//     key: "productImg",
//     render: (imgUrl) => {
//       return <Avatar src={imgUrl} size={"small"} />;
//     },
//   },
//   {
//     title: "Title",
//     key: "productTitle",
//     render: (data: ExpandedDataType) => {
//       return (
//         <Link
//           href={`/products/${data?.key}`}
//           className="text-gray-800 hover:text-blue-700"
//         >
//           {data?.productTitle}
//         </Link>
//       );
//     },
//   },
//   { title: "Quantity", dataIndex: "productQuantity", key: "productQuantity" },
// ];

// const expandedRowRender = (order: TOrder) => {
//   const productInfo: ExpandedDataType[] =
//     order?.OrderItem?.map((item: TOrderItem, idx) => ({
//       idx: idx + 1,
//       key: item?.Product?.id!,
//       productTitle: item?.Product?.title! || "Unknown Title",
//       productQuantity: item?.quantity,
//       productImg: item?.Product?.img[0]!,
//     })) || [];

//   return (
//     <Table<ExpandedDataType>
//       columns={expandColumns}
//       dataSource={productInfo}
//       pagination={false}
//       size="small"
//     />
//   );
// };

export default function MyOrders({ orderData }: { orderData: TOrder[] }) {
  const orderTableData: TOrderTableData[] = orderData.map((order) => ({
    key: order?.id,
    vendorName: order?.Vendor?.name!,
    status: order?.status,
    totalPrice: order?.totalPrice,
    paymentStatus: order?.paymentStatus,
    date: new Date(order?.updatedAt).toLocaleString(),
    id: order?.id, // Ensure these fields are included
    userId: order?.userId,
    vendorId: order?.vendorId,
    OrderItem: order?.OrderItem,
    Vendor: order?.Vendor,
    Payment: order?.Payment,
    createdAt: new Date(order?.createdAt).toLocaleString(),
    updatedAt: new Date(order?.updatedAt).toLocaleString(),
  }));
  const columns: TableColumnsType<TOrderTableData> = [
    {
      title: "Vendor",
      key: "vendorName",
      render: (data: TOrder) => {
        return (
          <div className="flex items-center space-x-2">
            <Avatar src={data?.Vendor?.logo} size={"small"} />
            <p>{data?.Vendor?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      render: (data: TOrder) => (
        <Badge
          color={getStatusColor(data?.status)}
          text={data?.status}
          className="min-w-24"
        />
      ),
    },
    {
      title: <p className="min-w-20">Total Price</p>,
      key: "totalPrice",
      render: (data: TOrder) => <PriceOrganize price={data?.totalPrice} />,
    },
    {
      title: <p className="min-w-28">Payment Status</p>,
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: <p className="min-w-24">Transaction Id</p>,
      key: "transactionId",
      render: (data: TOrder) => (
        <>
          {data?.paymentStatus === "PAID" ? (
            <Tooltip content={data?.Payment?.transactionId} closeDelay={200}>
              <p>{data?.Payment?.transactionId.slice(0, 10)}...</p>
            </Tooltip>
          ) : (
            <p className="ml-7">❌</p>
          )}
        </>
      ),
    },
    {
      title: <p className="text-center">Date</p>,
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <Tooltip
          content={moment(date).format("MMMM Do YYYY, h:mm:ss a")}
          closeDelay={200}
          delay={500}
        >
          <p className="min-w-[120px]">
            {moment(date).format("LL") || "No Expiry"}
          </p>
        </Tooltip>
      ),
      width: "1%",
    },
    {
      title: <p className="text-center min-w-32">Products</p>,
      key: "updatedAt",
      render: (data: TOrderTableData) => {
        return (
          <OrderedProductsModal
            orderItems={data?.OrderItem}
            orderStatus={data?.status}
          />
        );
      },
      width: "1%",
    },
  ];
  return (
    <div>
      <Table<TOrderTableData>
        columns={columns}
        // expandable={{
        //   expandedRowRender: (record) => expandedRowRender(record),
        // }}
        dataSource={orderTableData}
        pagination={false}
        size="middle"
      />
    </div>
  );
}
