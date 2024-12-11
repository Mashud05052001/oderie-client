"use client";

import { useCreateCoupon } from "@/src/hook_with_service/create/create.mutate.hook";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import OdButton from "../../UI/button/OdButton";
import OdForm from "../../UI/form/OdForm";
import OdInput from "../../UI/form/OdInput";
import ModalContainer from "../ModalContainer";
import moment from "moment";
import { IsoDateGenerator } from "@/src/utils/generateDate";
import { zodResolver } from "@hookform/resolvers/zod";
import couponSchema from "@/src/schema/coupon.schema";
import { code } from "@nextui-org/theme";
import { toast } from "sonner";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productIds: string[];
  setProductIds: Dispatch<SetStateAction<string[]>>;
};

export default function CreateCouponModal({
  isOpen,
  setIsOpen,
  productIds,
  setProductIds,
}: TProps) {
  const { mutate, isLoading, isSuccess } = useCreateCoupon();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.code !== "" && data?.code.length < 5) {
      toast.error(
        "Coupon code is optional but if provide it must be at least 4 characters long"
      );
      return;
    }
    const dateObject = data.expiryDate;
    const expiryDate = moment([
      dateObject?.year,
      dateObject?.month - 1,
      dateObject?.day,
    ]).toISOString();
    const createCouponData = {
      ...(data?.code && { code: data?.code }),
      percentage: data?.percentage,
      expiryDate,
      productIds,
    };
    mutate(createCouponData);
  };
  useEffect(() => {
    if (isSuccess) {
      setProductIds([]);
      setIsOpen(false);
    }
  }, [isLoading, isSuccess]);
  const { handleSubmit, control } = useForm();
  return (
    <div>
      <ModalContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        triggerElement={<></>}
        title={"Create Coupon"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
        size="3xl"
      >
        <OdForm
          onSubmit={onSubmit}
          className="max-w-4xl"
          resolver={zodResolver(couponSchema)}
        >
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <OdInput label="Code (Optional)" name="code" type="text" />
            <OdInput
              label="Discount Percentage"
              name="percentage"
              type="number"
            />

            <Controller
              name="expiryDate"
              render={({ field, fieldState: { error } }) => (
                <div className="relative">
                  <DatePicker
                    {...field}
                    label="Expiry Date"
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
          </div>
          <OdButton
            buttonType="submit"
            buttonText="Create Coupon"
            className="mt-10 font-semibold bg-[#1c4368] text-white"
            isLoading={isLoading}
          />
        </OdForm>
      </ModalContainer>
    </div>
  );
}
