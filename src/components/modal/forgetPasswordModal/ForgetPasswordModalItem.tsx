import { Dispatch, SetStateAction, useEffect } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";

import { FieldValues, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import OdForm from "../../UI/form/OdForm";
import OdInput from "../../UI/form/OdInput";
import { forgetPasswordValidationSchema } from "@/src/schema/auth.schema";
import OdButton from "../../UI/button/OdButton";
import { useUserForgetPassword } from "@/src/hook_with_service/auth/auth.mutate.hook";

type TForgetPasswordModalItem = {
  setModalContent: TSetModalContent;
  setResetEmail: Dispatch<SetStateAction<string>>;
};
const ForgetPasswordModalItem = ({
  setModalContent,
  setResetEmail,
}: TForgetPasswordModalItem) => {
  const {
    mutate: handleForgetPassword,
    isSuccess,
    error,
    isLoading,
  } = useUserForgetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setResetEmail(data?.email);
    handleForgetPassword(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setModalContent("otpVerify");
    }
  }, [isSuccess]);
  return (
    <>
      <p>Please enter your email address to receive a verification code.</p>
      <OdForm
        onSubmit={onSubmit}
        resolver={zodResolver(forgetPasswordValidationSchema)}
      >
        <div className="">
          <OdInput label="Email" name="email" type="email" />
          {/* Error Message */}
          <div className="text-red-600 font-medium ml-1 text-xs mb-6">
            {error && <p className="mt-7">{error?.message}</p>}
          </div>
          <OdButton
            buttonText="Submit"
            className={`${error ?? "mt-4"}`}
            isLoading={isLoading}
          />
        </div>
      </OdForm>
    </>
  );
};

export default ForgetPasswordModalItem;
