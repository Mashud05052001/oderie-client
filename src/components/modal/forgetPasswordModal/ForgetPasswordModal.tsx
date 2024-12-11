"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalContainer from "../ModalContainer";
import ForgetPasswordModalItem from "./ForgetPasswordModalItem";
import VerifyOtpModalItem from "./VerifyOtpModalItem";
import ResetPasswordModalItem from "./ResetPasswordModalItem";

export type TSetModalContent = Dispatch<
  SetStateAction<"forgetPass" | "otpVerify" | "resetPass">
>;

const ForgetPasswordModal = () => {
  const [otp, setOtp] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<
    "forgetPass" | "otpVerify" | "resetPass"
  >("forgetPass");
  const modalTitle =
    modalContent === "forgetPass"
      ? "Forgot Password"
      : modalContent === "otpVerify"
        ? "OTP Code Verification"
        : "Reset Password";
  const handleModalClose = () => {
    const confirm = window.confirm("Are you sure to cancle reset password?");
    if (confirm) {
      setOtp("");
      setModalContent("forgetPass");
      setOpenModal(false);
    }
  };
  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={
          <p className="text-zinc-700 hover:underline dark:text-zinc-300 cursor-pointer text-sm">
            Forget Password?
          </p>
        }
        title={modalTitle}
        backdrop="opaque"
        outsideClickToCloseModal={false}
        hideCloseButton={true}
      >
        <>
          {modalContent === "forgetPass" ? (
            <>
              <div className="absolute top-4 right-4  rounded-full  hover:bg-common-50 cursor-pointer duration-200">
                <RxCross2
                  className="size-8 p-1"
                  onClick={() => setOpenModal(false)}
                />
              </div>
              <ForgetPasswordModalItem
                setModalContent={setModalContent}
                setResetEmail={setResetEmail}
              />
            </>
          ) : (
            <>
              <div className="absolute top-4 right-4  rounded-full  hover:bg-common-50 cursor-pointer duration-200">
                <RxCross2 className="size-8 p-1" onClick={handleModalClose} />
              </div>

              {modalContent === "otpVerify" ? (
                <VerifyOtpModalItem
                  setModalContent={setModalContent}
                  otp={otp}
                  resetEmail={resetEmail}
                  setOtp={setOtp}
                />
              ) : (
                <ResetPasswordModalItem
                  setOpenModal={setOpenModal}
                  setModalContent={setModalContent}
                  otp={otp}
                  resetEmail={resetEmail}
                />
              )}
            </>
          )}
        </>
      </ModalContainer>
    </div>
  );
};

export default ForgetPasswordModal;
