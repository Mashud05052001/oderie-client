"use client";
import { useUpdateCoupon } from "@/src/hook_with_service/update/update.mutate.hook";
import { TCoupon, TReturnData, TSuccessMetaData } from "@/src/types";
import { generateSelectedDateToLastMinuteOfTheDay } from "@/src/utils/generateDate";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import OdForm from "../../UI/form/OdForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCouponSchema } from "@/src/schema/coupon.schema";
import OdInput from "../../UI/form/OdInput";
import moment from "moment";
import OdButton from "../../UI/button/OdButton";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, now } from "@internationalized/date";
import { toast } from "sonner";

const EditCouponData = ({
  couponData,
  revalidate,
  setEditModalClose,
}: {
  couponData: TCoupon & { key: string };
  revalidate: () => Promise<TSuccessMetaData<TCoupon[]> | undefined>;
  setEditModalClose: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<boolean>(false);
  const { mutate, isLoading, isSuccess } = useUpdateCoupon();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const expiryDate = generateSelectedDateToLastMinuteOfTheDay(
      data.expiryDate
    );
    const updatedData: Partial<TCoupon> = {};
    if (couponData?.code !== data?.code) updatedData["code"] = data?.code;
    if (couponData?.expiryDate !== expiryDate)
      updatedData["expiryDate"] = expiryDate;
    if (couponData?.percentage !== data?.percentage)
      updatedData["percentage"] = data?.percentage;
    if (Object.keys(updatedData).length === 0) {
      toast.error("Please change anything before update");
      return;
    }

    const confirm = window.confirm("Are you sure to update the coupon");
    if (confirm) {
      const payload = {
        couponId: couponData?.id,
        payload: updatedData,
      };
      mutate(payload);
    }
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      revalidate();
      setEditModalClose(null);
    }
  }, [isLoading, isSuccess]);
  return (
    <OdForm
      onSubmit={onSubmit}
      className="space-y-6"
      resolver={zodResolver(updateCouponSchema)}
    >
      <OdInput
        label="Coupon Code"
        name="code"
        type="text"
        defaultValue={couponData?.code}
      />
      <OdInput
        label="Percentage"
        name="percentage"
        type="number"
        defaultValue={couponData?.percentage}
      />
      <Controller
        name="expiryDate"
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <DatePicker
              {...field}
              onChange={(date) => {
                setSelectedDate(true);
                field.onChange(date);
              }}
              label={`Previous Expiry Date : ${moment(couponData?.expiryDate).utc().format("MM/DD/YYYY")}`}
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
      <div>
        <OdButton
          buttonText="Update Coupon"
          className="mt-5"
          isLoading={isLoading}
          isDisabled={!selectedDate}
        />
      </div>
    </OdForm>
  );
};

export default EditCouponData;
