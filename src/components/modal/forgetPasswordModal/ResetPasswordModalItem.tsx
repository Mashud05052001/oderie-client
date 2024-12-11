import { Dispatch, SetStateAction, useEffect } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserResetPassword } from "@/src/hook_with_service/auth/auth.mutate.hook";
import OdForm from "../../UI/form/OdForm";
import { resetPasswordValidationSchema } from "@/src/schema/auth.schema";
import OdInput from "../../UI/form/OdInput";
import OdButton from "../../UI/button/OdButton";

type TResetPasswordModalItem = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  resetEmail: string;
  otp: string;
  setModalContent: TSetModalContent;
};

const ResetPasswordModalItem = ({
  setOpenModal,
  setModalContent,
  otp,
  resetEmail,
}: TResetPasswordModalItem) => {
  const {
    mutate: handleResetPassword,
    isSuccess,
    error,
    isLoading,
  } = useUserResetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const resetData = {
      email: resetEmail,
      password: data?.password,
      code: otp,
    };
    console.log(resetData);
    handleResetPassword(resetData);
  };
  useEffect(() => {
    if (isSuccess) {
      setModalContent("forgetPass");
      setOpenModal(false);
    }
  }, [isSuccess]);
  return (
    <>
      <p>Please provide your new password to complete the reset process.</p>
      <OdForm
        onSubmit={onSubmit}
        resolver={zodResolver(resetPasswordValidationSchema)}
      >
        <div className="">
          <OdInput label="New Password" name="password" type="password" />
          {/* Error Message */}
          <div className="text-red-600 font-medium ml-1 text-xs mb-6">
            {error && <p className="mt-7">{error?.message}</p>}
          </div>
          <OdButton
            buttonText="Reset Password"
            className="mt-4"
            isLoading={isLoading}
          />
        </div>
      </OdForm>
    </>
  );
};

export default ResetPasswordModalItem;
