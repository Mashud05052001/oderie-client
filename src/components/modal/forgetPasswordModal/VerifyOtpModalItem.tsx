import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";
import { useUserCheckResetCode } from "@/src/hook_with_service/auth/auth.mutate.hook";

// import OTPInput from "react-otp-input";
import OdButton from "../../UI/button/OdButton";
import { InputOtp } from "@nextui-org/input-otp";

type TVerifyOtpModalItem = {
  resetEmail: string;
  otp: string;
  setModalContent: TSetModalContent;
  setOtp: Dispatch<SetStateAction<string>>;
};

const VerifyOtpModalItem = ({
  setModalContent,
  otp,
  setOtp,
  resetEmail,
}: TVerifyOtpModalItem) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    mutate: handleCheckResetCode,
    isSuccess,
    error,
    isLoading,
  } = useUserCheckResetCode();
  const onSubmit = () => {
    if (!/^[A-Za-z0-9]{6}$/.test(otp)) {
      setErrorMessage("OTP must be a 6-digit code.");
      return;
    }
    const data = {
      code: otp,
      email: resetEmail,
    };
    handleCheckResetCode(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setOtp("");
      setModalContent("resetPass");
    }
  }, [isSuccess]);

  return (
    <>
      <p>
        An OTP has been sent to your email. Please enter the code to verify your
        identity.
      </p>
      <div className="">
        <InputOtp
          length={6}
          value={otp}
          onValueChange={setOtp}
          allowedKeys="^[0-9a-zA-Z]*$"
          variant="bordered"
          className="mt-2"
        />

        {/* Error Message */}
        <div className="text-red-600 font-medium ml-1 text-xs mb-6">
          {error && <p>{error?.message}</p>}
        </div>
        <OdButton
          onClick={onSubmit}
          buttonText="Verify OTP"
          className="mt-4"
          isLoading={isLoading}
          isDisabled={otp.length !== 6}
        />
      </div>
    </>
  );
};

export default VerifyOtpModalItem;

{
  /* <>{allowedKeysConfig.map((config, idx) => (
        <div key={idx}>
          <div className="text-default-500">{config.name}</div>
          <InputOtp allowedKeys={config.value} length={4} />
        </div>
      ))}  <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={() => <p className="px-1">-</p>}
            renderInput={(props) => (
              <input
                {...props}
                className="mx-1 rounded-md border-2 border-gray-400 w-20"
                onFocus={() => setErrorMessage("")}
              />
            )}
            inputStyle={{ width: "100%", height: "2rem" }}
          />
          {errorMessage && (
            <div className="absolute left-1 bottom-[-1.5rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
              <small>{errorMessage}</small>
            </div>
          )}</> */
}
