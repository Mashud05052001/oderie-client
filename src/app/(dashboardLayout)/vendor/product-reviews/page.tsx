"use client";
import ModalContainer from "@/src/components/modal/ModalContainer";
import CreateVendorResponse from "@/src/components/modal/reviewModal/VendorResponseModal";
import MyPagination from "@/src/components/shared/Pagination";
import { useGetAllReviews } from "@/src/hook_with_service/swrGet/review.fetch";
import { TReview } from "@/src/types/response.type";
import { getStringLastPortion } from "@/src/utils/utils";
import { EditFilled } from "@ant-design/icons";
import { Avatar } from "@nextui-org/avatar";
import type { TableColumnsType } from "antd";
import { Popover, Table } from "antd";
import { MessageCircleReply } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TTableContent extends TReview {
  key: string;
}

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [data, setData] = useState<TTableContent[]>([]);
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);

  const {
    data: reviewResponse,
    isLoading: reviewDataLoading,
    revalidate,
  } = useGetAllReviews({ page, limit });

  const reviewData = reviewResponse?.data?.data;
  const meta = reviewResponse?.data?.meta!;

  useEffect(() => {
    if (reviewData?.length) {
      const updatedData = reviewData.map((review: TReview) => ({
        key: review.id,
        ...review,
      }));
      setData(updatedData);
    } else {
      setData([]);
    }
  }, [reviewData]);

  const columns: TableColumnsType<TTableContent> = [
    {
      title: "Product Info",
      key: "product",
      render: (data: TTableContent) => (
        <Link
          className="flex min-w-fit space-x-3 items-center text-black hover:text-blue-600 hover:underline w-fit"
          href={`/products/${data?.productId}`}
        >
          <Avatar src={data?.Product?.img[0]} size="sm" />
          <h4>{data?.Product?.title}</h4>
        </Link>
      ),
    },
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
      title: <p className="min-w-12">Ratings</p>,
      dataIndex: "ratings",
      key: "ratings",
      render: (rating) => <p className="ml-4">{rating}</p>,
    },
    {
      title: "Review",
      key: "Review",
      dataIndex: "message",
      render: (msg: string) => (
        <Popover
          content={
            <div className="max-w-80 max-h-80 overflow-y-auto">
              <p>{msg}</p>
            </div>
          }
          mouseLeaveDelay={0.05}
        >
          <span className="truncate block max-w-[20ch]">{msg}</span>
        </Popover>
      ),
    },
    {
      title: "Response",
      key: "Response",
      render: (data: TTableContent) => (
        <>
          {data?.VendorResponse ? (
            <Popover
              content={
                <div className="max-w-80 max-h-80 overflow-y-auto">
                  <p>{data?.VendorResponse?.message}</p>
                </div>
              }
              mouseLeaveDelay={0.05}
            >
              <span className="truncate block max-w-[20ch]">
                {data?.VendorResponse?.message}
              </span>
            </Popover>
          ) : (
            <p>No response Yet</p>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (data: TTableContent) => {
        return (
          <div className="flex space-x-4 text-xl">
            <div className="pl-2">
              <ModalContainer
                isOpen={editModalOpenId === data?.id}
                setIsOpen={(isOpen) =>
                  isOpen
                    ? setEditModalOpenId(data?.id)
                    : setEditModalOpenId(null)
                }
                placement="top"
                triggerElement={
                  <div className="hover:text-blue-600 cursor-pointer duration-100">
                    {data?.VendorResponse ? (
                      <EditFilled />
                    ) : (
                      <MessageCircleReply />
                    )}
                  </div>
                }
                title={`${data?.VendorResponse ? "Update" : "Send"} Response`}
              >
                {data?.VendorResponse ? (
                  <CreateVendorResponse
                    revalidate={revalidate}
                    setEditModalClose={setEditModalOpenId}
                    userReview={data}
                    isEdit={true}
                  />
                ) : (
                  <CreateVendorResponse
                    revalidate={revalidate}
                    setEditModalClose={setEditModalOpenId}
                    userReview={data}
                  />
                )}
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
        <h1 className="text-2xl font-bold mb-8">All Reviews</h1>
        <Table<TTableContent>
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          loading={reviewDataLoading}
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
