"use client";

import CenterContainer from "@/src/components/UI/container/CenterContainer";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserProvider } from "@/src/context/user.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useUserRegister } from "@/src/hook_with_service/auth/auth.mutate.hook";
import OdForm from "@/src/components/UI/form/OdForm";
import { registerValidationSchema } from "@/src/schema/auth.schema";
import OdInput from "@/src/components/UI/form/OdInput";
import OdButton from "@/src/components/UI/button/OdButton";
import { TSelectOption } from "@/src/components/UI/form/OdAutocomplete";
import OdSelect from "@/src/components/UI/form/OdSelect";

const RegisterPage = () => {
  const { setIsLoading: setUserLoading } = useUserProvider();
  const router = useRouter();
  const redirect = "/login";
  const {
    mutate: handleRegister,
    isLoading,
    error,
    isSuccess,
  } = useUserRegister();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const registerUserData = {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    };
    handleRegister(registerUserData);
  };
  useEffect(() => {
    if (isSuccess) {
      setUserLoading(true);
      router.replace(redirect);
    }
  }, [isSuccess, redirect, router, isLoading]);
  const userRoleSelectOptions: TSelectOption[] = [
    { key: "CUSTOMER", label: "Customer" },
    { key: "VENDOR", label: "Vendor" },
  ];
  return (
    <div>
      <CenterContainer className="w-[100vw]">
        <OdForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="space-y-6 sm:mx-auto mx-6 sm:w-10/12 md:w-10/12 lg:w-[800px] rounded-lg border bg-white dark:bg-gray-800 p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                Register
              </h1>
              {/* Back to Home Button */}
              <Link
                href="/"
                className="font-semibold flex text-green-700 hover:text-green-600 duration-100"
              >
                <FaHome className="size-6 mr-1" />
                <p className="pt-0.5">Back to Home</p>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
              <OdInput name="name" label="Name" type="text" />
              <OdInput name="email" label="Email" type="email" />
              <div className="md:col-span-2">
                <OdSelect
                  name="role"
                  label="Role"
                  options={userRoleSelectOptions}
                />
              </div>
              <OdInput name="password" label="Password" type="password" />
              <OdInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </div>

            {/* Error Message */}
            <div className="text-xs">
              {error ? (
                <p className="text-red-600 font-medium ml-1">
                  {error?.message}
                </p>
              ) : (
                <p className="opacity-0 select-none">No error</p>
              )}
            </div>

            <OdButton
              buttonText="Register"
              buttonType="submit"
              isLoading={isLoading}
            />

            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
              Already have an account?
              <Link href="/login" className="font-semibold underline ml-1">
                Login
              </Link>
            </p>
          </div>
        </OdForm>
      </CenterContainer>
    </div>
  );
};

export default RegisterPage;
