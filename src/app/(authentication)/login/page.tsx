"use client";
import ForgetPasswordModal from "@/src/components/modal/forgetPasswordModal/ForgetPasswordModal";
import OdButton from "@/src/components/UI/button/OdButton";
import CenterContainer from "@/src/components/UI/container/CenterContainer";
import OdForm from "@/src/components/UI/form/OdForm";
import OdInput from "@/src/components/UI/form/OdInput";
import envConfig from "@/src/config/envConfig";
import { useUserProvider } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hook_with_service/auth/auth.mutate.hook";
import { loginValidationSchema } from "@/src/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaHome } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { setIsLoading: setUserLoading } = useUserProvider();
  const {
    mutate: mutateLogin,
    isLoading: isLoginLoading,
    isSuccess,
    error,
    data: loginData,
  } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    mutateLogin(data);
  };
  const customLogin = (email: string, password: string) => {
    console.log(email, password);
    mutateLogin({ email, password });
  };

  useEffect(() => {
    if (isSuccess && loginData) {
      console.log(isSuccess, loginData);
      setUserLoading(true);
      const role = loginData?.data?.role;
      if (role === "ADMIN") {
        router.replace("/admin/profile");
      } else if (role === "VENDOR") {
        router.replace("/vendor/profile");
      } else {
        router.replace(redirect);
      }
    }
  }, [isSuccess, redirect, router, isLoginLoading, loginData]);

  return (
    <div>
      <CenterContainer className="w-[100vw]">
        <div className="relative space-y-8 sm:mx-auto mx-6 sm:w-10/12 md:w-10/12 lg:w-[800px] rounded-lg border bg-white dark:bg-gray-800 p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
          <OdForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="space-y-6 relative ">
              <div className="flex justify-between items-center ">
                <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                  Login
                </h1>
                <div className="flex gap-x-0.5">
                  <button
                    type="button"
                    className="px-4 py-2 hover:bg-orange-300 duration-200 rounded-lg font-medium "
                    onClick={() =>
                      customLogin(
                        envConfig?.admin_email!,
                        envConfig?.admin_password!
                      )
                    }
                    disabled={isLoginLoading}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 hover:bg-orange-300 duration-200 rounded-lg font-medium "
                    onClick={() =>
                      customLogin(
                        envConfig?.vendor_email!,
                        envConfig?.vendor_password!
                      )
                    }
                    disabled={isLoginLoading}
                  >
                    Vendor
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 hover:bg-orange-300 duration-200 rounded-lg font-medium"
                    onClick={() =>
                      customLogin(
                        envConfig?.customer_email!,
                        envConfig?.customer_password!
                      )
                    }
                    disabled={isLoginLoading}
                  >
                    Customer
                  </button>
                </div>
                {/* Back to Home Button */}
                <Link
                  href="/"
                  className="font-semibold flex text-orange-600 hover:text-orange-700 duration-100"
                >
                  <FaHome className="size-6 mr-1" />
                  <p className="pt-0.5">Back to Home</p>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                <OdInput name="email" label="Email" type="email" />
                <OdInput name="password" label="Password" type="password" />
              </div>
              {/* Error Message & Forget Password */}
              {error && (
                <div className="flex justify-between text-xs pt-3 absolute bottom-[6.5rem]">
                  {error ? (
                    <p className="text-red-600 font-medium ml-1">
                      {error?.message}
                    </p>
                  ) : (
                    <p className="opacity-0 select-none">No error</p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between pt-6">
                <OdButton
                  buttonText="Login"
                  buttonType="submit"
                  isLoading={isLoginLoading}
                />
              </div>
              <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 mt-6">
                Don&apos;t have an account?
                <Link
                  href={
                    redirect === "/"
                      ? "/register"
                      : `/register?redirect=${redirect}`
                  }
                  className="font-semibold underline ml-1"
                >
                  Register
                </Link>
              </p>
            </div>
          </OdForm>
          <div className="absolute bottom-24 right-12">
            <ForgetPasswordModal />
          </div>
          {/* <div className="flex space-x-4 justify-center">
            <button onClick={() => signIn("google", { callbackUrl: "/" })}>
              Google
            </button>
            <button onClick={() => signIn("github", { callbackUrl: "/" })}>
              Github
            </button>
          </div> */}
        </div>
      </CenterContainer>
    </div>
  );
};

export default LoginPage;
