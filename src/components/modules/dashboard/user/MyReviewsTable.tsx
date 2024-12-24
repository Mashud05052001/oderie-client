"use client";

import ModalContainer from "@/src/components/modal/ModalContainer";
import { TReview } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

type TReviewTableData = {
  key: string;
  productId: string;
  productImg: string;
  productTitle: string;
  review: string;
  reviewImg: string;
  vendorResponse: string;
};

export default function MyReviewsTable({
  reviewData,
}: {
  reviewData: TReview[];
}) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const formattedData: TReviewTableData[] =
    reviewData?.map((review) => ({
      key: review?.id,
      productId: review?.productId,
      productImg: review?.Product?.img[0]!,
      productTitle: review?.Product?.title!,
      review: review?.message,
      reviewImg: review?.productImg,
      vendorResponse: review?.VendorResponse?.message ?? "",
    })) || [];

  const columns: ColumnsType<TReviewTableData> = [
    {
      title: "Product Info",
      render: (data: TReviewTableData) => (
        <Link
          className="flex items-center space-x-2 text-gray-900 hover:text-blue-700"
          href={`/products/${data?.productId}`}
        >
          <Avatar src={data?.productImg} size={"md"} />
          <p>{data?.productTitle}</p>
        </Link>
      ),
    },
    {
      title: "My Review",
      render: (data: TReviewTableData) => (
        <ModalContainer
          isOpen={reviewOpen && selectedReviewId === data.key}
          setIsOpen={setReviewOpen}
          triggerElement={
            <button onClick={() => setSelectedReviewId(data.key)}>
              {data?.review?.length > 20 ? (
                <p>{data.review.slice(0, 20)}...</p>
              ) : (
                <p>{data.review}</p>
              )}
            </button>
          }
          title="Your Review"
          placement="top"
        >
          <div>
            {data?.reviewImg && (
              <Avatar
                src={data?.reviewImg && data?.reviewImg}
                name={"None"}
                className="min-w-60 h-auto min-h-40 mx-auto text-3xl mb-6"
                radius="md"
              />
            )}
            <p>{data?.review}</p>
          </div>
        </ModalContainer>
      ),
    },
    {
      title: "Vendor Response",
      render: (data: TReviewTableData) => {
        return data?.vendorResponse ? (
          <ModalContainer
            isOpen={vendorOpen && selectedReviewId === data.key}
            setIsOpen={setVendorOpen}
            triggerElement={
              <button onClick={() => setSelectedReviewId(data.key)}>
                {data?.vendorResponse?.length > 20 ? (
                  <p>{data.vendorResponse.slice(0, 20)}...</p>
                ) : (
                  <p>{data.vendorResponse}</p>
                )}
              </button>
            }
            title="Vendor Response"
            placement="top"
          >
            <div>
              <p>{data?.vendorResponse}</p>
            </div>
          </ModalContainer>
        ) : (
          <p>❌ No response ❌</p>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        size="small"
      />
    </div>
  );
}
