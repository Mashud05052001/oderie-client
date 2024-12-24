"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OdButton from "../../UI/button/OdButton";
import OdForm from "../../UI/form/OdForm";
import OdImages from "../../UI/form/OdImages";
import OdInput from "../../UI/form/OdInput";
import OdTextarea from "../../UI/form/OdTextArea";
import ModalContainer from "../ModalContainer";
import { useCreateReview } from "@/src/hook_with_service/create/create.mutate.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewValidationSchema } from "@/src/schema/product.schema";

type TProps = {
  orderId: string;
  productId: string;
  setPrevModalOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function CreateReviewModal({
  orderId,
  productId,
  setPrevModalOpen,
}: TProps) {
  const { mutate, isLoading, isSuccess, error } = useCreateReview();
  //   const [ratingValue, setRatingValue] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const reviewData = {
      orderId,
      productId,
      message: data.message,
      ratings: Number(data?.ratings),
    };
    if (data?.img && data?.img?.length !== 0) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(reviewData));
      formData.append("file", data.img[0]);
      mutate(formData);
    } else {
      mutate(reviewData);
    }
    console.log(reviewData);
  };
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      setPrevModalOpen && setPrevModalOpen(false);
    }
  }, [isLoading, isSuccess]);

  return (
    <ModalContainer
      triggerElement={
        <OdButton
          className={`${setPrevModalOpen && "mt-2"} text-sm px-3 rounded transition-colors`}
          buttonText="Add A Review"
          size="sm"
          variant="ghost"
          onClick={() => setModalOpen(true)}
        />
      }
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title="Add Review"
      placement="top"
      size="xl"
    >
      {!orderId || !productId ? (
        <div>
          <p>Something went wrong. Please try again later</p>
        </div>
      ) : (
        <OdForm
          onSubmit={onSubmit}
          className="space-y-4"
          resolver={zodResolver(createReviewValidationSchema)}
        >
          <OdInput
            label="Ratings*"
            name="ratings"
            type="number"
            min={0}
            max={5}
          />

          {/* <Rate
          tooltips={desc}
          onChange={setRatingValue}
          value={ratingValue}
          style={{ fontSize: "40px !important" }} // Increase the font size here
        />
        {ratingValue ? <span>{desc[ratingValue - 1]}</span> : null} */}

          <OdTextarea label="Review*" name="message" />
          <OdImages
            name="img"
            maxImageUpload={1}
            label="Add Images(Not Necessary)"
          />
          <div className="relative">
            {error && (
              <small className="absolute font-medium text-red-600">
                {error?.message}
              </small>
            )}
            <OdButton
              buttonText="Create Review"
              className="mt-8"
              isLoading={isLoading}
            />
          </div>
        </OdForm>
      )}
      {/* Nested Modal */}
    </ModalContainer>
  );
}
