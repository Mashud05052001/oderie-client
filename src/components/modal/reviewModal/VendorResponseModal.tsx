"use client";
import { useCreateResponse } from "@/src/hook_with_service/create/create.mutate.hook";
import { createVendorResponseSchema } from "@/src/schema/review.schema";
import { TReview, TSuccessMetaData } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import OdButton from "../../UI/button/OdButton";
import OdTextarea from "../../UI/form/OdTextArea";
import { useChangeOrderStatus } from "@/src/hook_with_service/update/update.mutate.hook";

const CreateVendorResponse = ({
  userReview,
  revalidate,
  setEditModalClose,
  isEdit = false,
}: {
  userReview: TReview & { key: string };
  revalidate: () => Promise<TSuccessMetaData<TReview[]> | undefined>;
  setEditModalClose: React.Dispatch<React.SetStateAction<string | null>>;
  isEdit?: boolean;
}) => {
  const methods = useForm({
    resolver: zodResolver(createVendorResponseSchema),
  });
  const message = methods.watch("message");

  const { mutate: createMutate, isLoading, isSuccess } = useCreateResponse();
  const {
    mutate: updateMutate,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
  } = useChangeOrderStatus();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const confirm = window.confirm(
      `Are you sure to ${isEdit ? "edit" : "create"} response`
    );
    if (confirm) {
      if (isEdit && userReview?.VendorResponse) {
        const updatedData = {
          payload: { message: data?.message },
          responseId: userReview?.VendorResponse?.id,
        };
        updateMutate(updatedData);
      } else {
        const createdData = {
          reviewId: userReview?.id,
          message: data?.message,
        };
        createMutate(createdData);
      }
    }
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      revalidate();
      setEditModalClose(null);
    }
  }, [isLoading, isSuccess]);
  useEffect(() => {
    if (isEdit && !isLoading1 && isSuccess1) {
      revalidate();
      setEditModalClose(null);
    }
  }, [isLoading1, isSuccess1]);
  return (
    <div>
      <div className="bg-white border-gray-200 mb-6">
        <div className="flex space-x-3">
          <h3 className=" font-semibold text-gray-800">Review:</h3>
          <p className="text-gray-600 italic ">{userReview?.message}</p>
        </div>

        <div className="mt-2">
          <span className="font-medium">Ratings:</span>
          <span className="text-gray-800 text-base font-semibold ml-3">
            {userReview?.ratings}
          </span>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            onSubmit(data);
            // methods.reset();
          })}
        >
          <OdTextarea
            label="Your response"
            name="message"
            variant="underlined"
            defaultValue={
              isEdit && userReview?.VendorResponse?.message
                ? userReview.VendorResponse.message
                : ""
            }
          />
          <OdButton
            buttonText={`${isEdit ? "Update" : "Create"} Response`}
            className="mt-5"
            isLoading={isLoading || isLoading1}
            isDisabled={
              (isEdit && userReview?.VendorResponse?.message === message) ||
              message === "" ||
              !message
            }
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateVendorResponse;
