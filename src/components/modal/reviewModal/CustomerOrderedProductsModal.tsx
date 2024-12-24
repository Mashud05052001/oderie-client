"use client";

import { TOrderItem, TOrderStatus } from "@/src/types";
import { LayoutGrid } from "lucide-react";
import { useState } from "react";
import NoDataFound from "../../shared/smallComponents/NoDataFound";
import ModalContainer from "../ModalContainer";
import { Avatar } from "@nextui-org/avatar";
import moment from "moment";
import Link from "next/link";
import OdButton from "../../UI/button/OdButton";
import { Tooltip } from "@nextui-org/tooltip";
import CreateReviewModal from "./CreateReviewModal";

export default function CustomerOrderedProductsModal({
  orderItems,
  orderStatus,
}: {
  orderItems: TOrderItem[] | undefined;
  orderStatus: TOrderStatus;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const editButton = (
    <LayoutGrid className="mx-auto cursor-pointer" size={20} />
  );

  return (
    <ModalContainer
      triggerElement={editButton}
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title="Order Details"
      placement="top"
      size="xl"
    >
      {orderItems && orderItems.length > 0 ? (
        <div>
          <div className="overflow-y-auto max-h-[60vh]">
            {orderItems.map((orderData) => (
              <div
                key={orderData?.id}
                className="pl-3 py-2 border-b rounded-lg border shadow-sm flex justify-between items-center"
              >
                <Link
                  className="flex gap-4 w-fit pr-5"
                  href={`/products/${orderData?.productId}`}
                >
                  <Avatar
                    src={orderData?.Product?.img[0]}
                    alt={orderData?.Product?.title}
                    className="border"
                    size="lg"
                  />
                  <div>
                    <h3 className="text-base font-medium truncate">
                      {orderData?.Product?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {orderData?.quantity}
                    </p>
                    {orderStatus === "PENDING" && (
                      <small className=" font-medium">
                        Payment incomplete for this order
                      </small>
                    )}
                    {orderStatus === "PROCESSING" && (
                      <small className="font-medium">
                        Review available after successful delivery by the
                        vendor.
                      </small>
                    )}
                    {orderStatus === "CANCELLED" && (
                      <small className=" font-medium">
                        Your order was canceled
                      </small>
                    )}
                  </div>
                </Link>

                <div className="min-w-0">
                  {orderStatus === "DELIVERED" ? (
                    // orderData?.Order?._count?.Review === 0 ? (
                    orderData?.Order?.Review?.find(
                      (item) => item.productId !== orderData?.productId
                    ) || orderData?.Order?._count?.Review === 0 ? (
                      <CreateReviewModal
                        orderId={orderData?.orderId}
                        productId={orderData?.productId}
                        setPrevModalOpen={setModalOpen}
                      />
                    ) : (
                      <p className="mr-4 text-sm">Review Done</p>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <p className="text-sm text-gray-600">
              Order Date:
              <strong className="ml-2">
                {moment(orderItems[0]?.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </strong>
            </p>
            <p className="text-sm text-gray-600">
              Status:
              <strong className="ml-2">{orderStatus}</strong>
            </p>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </ModalContainer>
  );
}
