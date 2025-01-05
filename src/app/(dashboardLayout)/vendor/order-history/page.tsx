"use client";
import ModalContainer from "@/src/components/modal/ModalContainer";
import MyPagination from "@/src/components/shared/Pagination";
import { useGetAllOrders } from "@/src/hook_with_service/swrGet/order.fetch";
import { TOrder, TOrderItem, TOrderStatus } from "@/src/types/response.type";
import {
  getStringLastPortion,
  onlyFirstCharacterCapitalize,
} from "@/src/utils/utils";
import { EditFilled } from "@ant-design/icons";
import { Avatar } from "@nextui-org/avatar";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

// export default function Page() {
//   const [page, setPage] = useState<number>(1);
//   const [limit, setLimit] = useState<number>(5);
//   const [data, setData] = useState<TTableContent[]>([]);
//   const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);

//   const {
//     data: orderResponse,
//     isLoading: orderDataLoading,
//     revalidate,
//   } = useGetAllOrders({
//     page,
//     limit,
//     status
//   });

//   const orderData = orderResponse?.data?.data;
//   const meta = orderResponse?.data?.meta!;

//   useEffect(() => {
//     if (orderData?.length) {
//       const updatedData = orderData.map((order: TOrder) => ({
//         key: order.id,
//         ...order,
//       }));
//       setData(updatedData);
//     } else {
//       setData([]);
//     }
//   }, [orderData]);

//   const columns: TableColumnsType<TTableContent> = [
//     {
//       title: "Product Info",
//       key: "product",
//       render: (data: TTableContent) => (
//         <Link
//           className="flex min-w-fit space-x-3 items-center text-black hover:text-blue-600 hover:underline w-fit"
//           href={`/products/${data?.}`}
//         >
//           <Avatar src={data?.Product?.img[0]} size="sm" />
//           <h4>{data?.Product?.title}</h4>
//         </Link>
//       ),
//     },
//     {
//       title: "Customer Info",
//       key: "customer",
//       render: (data: TTableContent) => (
//         <div className="flex space-x-3 items-center min-w-fit">
//           <Avatar src={data?.User?.Profile?.img} size="sm" />
//           <h4>{getStringLastPortion(data?.User?.Profile?.name!)}</h4>
//         </div>
//       ),
//     },
//     {
//       title: <p className="min-w-12">Ratings</p>,
//       dataIndex: "ratings",
//       key: "ratings",
//       render: (rating) => <p className="ml-4">{rating}</p>,
//     },
//     {
//       title: "Review",
//       key: "Review",
//       dataIndex: "message",
//       render: (msg: string) => (
//         <Popover
//           content={
//             <div className="max-w-80 max-h-80 overflow-y-auto">
//               <p>{msg}</p>
//             </div>
//           }
//           mouseLeaveDelay={0.05}
//         >
//           <span className="truncate block max-w-[20ch]">{msg}</span>
//         </Popover>
//       ),
//     },
//     {
//       title: "Response",
//       key: "Response",
//       render: (data: TTableContent) => (
//         <>
//           {data?.VendorResponse ? (
//             <Popover
//               content={
//                 <div className="max-w-80 max-h-80 overflow-y-auto">
//                   <p>{data?.VendorResponse?.message}</p>
//                 </div>
//               }
//               mouseLeaveDelay={0.05}
//             >
//               <span className="truncate block max-w-[20ch]">
//                 {data?.VendorResponse?.message}
//               </span>
//             </Popover>
//           ) : (
//             <p>No response Yet</p>
//           )}
//         </>
//       ),
//     },
//     {
//       title: "Action",
//       key: "operation",
//       render: (data: TTableContent) => {
//         return (
//           <div className="flex space-x-4 text-xl">
//             <div className="flex space-x-3 items-center">
//               <ModalContainer
//                 isOpen={editModalOpenId === data?.id}
//                 setIsOpen={(isOpen) =>
//                   isOpen
//                     ? setEditModalOpenId(data?.id)
//                     : setEditModalOpenId(null)
//                 }
//                 placement="top"
//                 triggerElement={
//                   <div className="hover:text-blue-600 cursor-pointer duration-100">
//                     {data?.VendorResponse ? (
//                       <EditFilled />
//                     ) : (
//                       <MessageCircleReply className="ml-3.5" />
//                     )}
//                   </div>
//                 }
//                 title={`${data?.VendorResponse ? "Update" : "Send"} Response`}
//               >
//                 {data?.VendorResponse ? (
//                   <CreateVendorResponse
//                     revalidate={revalidate}
//                     setEditModalClose={setEditModalOpenId}
//                     userReview={data}
//                     isEdit={true}
//                   />
//                 ) : (
//                   <CreateVendorResponse
//                     revalidate={revalidate}
//                     setEditModalClose={setEditModalOpenId}
//                     userReview={data}
//                   />
//                 )}
//               </ModalContainer>
//               {data?.VendorResponse && (
//                 <Trash2
//                   size={20}
//                   className="hover:text-red-600 cursor-pointer duration-100"
//                   onClick={() => {
//                     const confirm = window.confirm(
//                       `Are you sure to delete this response?`
//                     );
//                     if (confirm) {
//                       mutateDeleteResponse(data?.VendorResponse?.id!);
//                     }
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div>
//       <div className="min-h-[80vh]">
//         <h1 className="text-2xl font-bold mb-4">All Orders</h1>
//         <div className="mb-6 flex gap-x-10">
//           <div className="relative w-fit">
//             <Select
//               className="min-w-40"
//               label="Review Type"
//               size="sm"
//               variant="underlined"
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value === "1") setIsVendorResponse(true);
//                 else if (value === "2") setIsVendorResponse(false);
//                 else setIsVendorResponse(null);
//               }}
//               selectedKeys={
//                 isVendorResponse !== null
//                   ? [String(isVendorResponse ? "1" : "2")]
//                   : []
//               }
//             >
//               <SelectItem key={3}>All</SelectItem>
//               <SelectItem key={1}>Reviewed</SelectItem>
//               <SelectItem key={2}>Not Reviewed</SelectItem>
//             </Select>
//           </div>
//         </div>

//         <Table<TTableContent>
//           columns={columns}
//           dataSource={data}
//           pagination={false}
//           size="small"
//           loading={orderDataLoading || deleteResponseLoading}
//         />
//       </div>

//       <MyPagination
//         className="mt-5 mb-10"
//         limit={limit}
//         page={page}
//         setLimit={setLimit}
//         setPage={setPage}
//         total={meta?.total}
//       />
//     </div>
//   );
// }

interface TSubTableContent {
  key: string;
  quantity: number;
  productTitle: string;
  productImage: string;
}

interface TTableContent extends TOrder {
  key: string;
}

export default function Page() {
  const [status, setStatus] = useState<TOrderStatus | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [data, setData] = useState<TTableContent[]>([]);
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);

  const {
    data: orderResponse,
    isLoading: orderDataLoading,
    revalidate,
  } = useGetAllOrders({
    page,
    limit,
    status,
  });

  const orderData = orderResponse?.data?.data;
  const meta = orderResponse?.data?.meta!;
  console.log(data);

  useEffect(() => {
    if (orderData?.length) {
      const updatedData = orderData.map((order: TOrder) => ({
        key: order.id,
        ...order,
      }));
      setData(updatedData);
    } else {
      setData([]);
    }
  }, [orderData]);

  const expandedRowRender = (order: TOrder) => {
    const productInfo: TSubTableContent[] =
      order?.OrderItem?.map((item: TOrderItem) => ({
        key: item?.id,
        quantity: item?.quantity,
        productTitle: item?.Product?.title || "Unknown Title",
        productImage: item?.Product?.img[0] as string,
      })) || [];

    return (
      <Table<TSubTableContent>
        columns={expandColumns}
        dataSource={productInfo}
        pagination={false}
        size="small"
      />
    );
  };

  const expandColumns: TableColumnsType<TSubTableContent> = [
    {
      title: "Product Info",
      key: "product",
      render: (data: TSubTableContent) => (
        <Link
          className="flex min-w-fit space-x-3 items-center text-black hover:text-blue-600 hover:underline w-fit "
          href={`/products/${data?.key}`}
        >
          <Avatar src={data?.productImage} size="sm" />
          <h4 className="min-w-40">{data?.productTitle}</h4>
        </Link>
      ),
      width: "1%",
    },
    { title: "Quantity", dataIndex: "quantity", key: "productQuantity" },
  ];

  const columns: TableColumnsType<TTableContent> = [
    {
      title: "Customer Info",
      key: "customer",
      render: (data: TTableContent) => (
        <div className="flex space-x-3 items-center min-w-fit">
          <Avatar src={data?.User?.Profile?.img} size="sm" />
          <h4>{getStringLastPortion(data?.User?.Profile?.name!)}</h4>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <p>{onlyFirstCharacterCapitalize(status)}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => <p>{onlyFirstCharacterCapitalize(status)}</p>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "operation",
      render: (data: TTableContent) => {
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
                title={`Change status`}
              >
                mashudubasdbjbads
                {/* <EditCouponData
                  couponData={data}
                  revalidate={revalidate}
                  setEditModalClose={setEditModalOpenId}
                /> */}
              </ModalContainer>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-8">All Orders</h1>
        <Table<TTableContent>
          columns={columns}
          expandable={{
            expandedRowRender: (record) => expandedRowRender(record),
          }}
          dataSource={data}
          pagination={false}
          size="small"
          loading={orderDataLoading}
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
