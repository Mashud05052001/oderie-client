"use client";

import CenterContainer from "@/src/components/UI/container/CenterContainer";
import Link from "next/link";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserProvider } from "@/src/context/user.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useUserRegister } from "@/src/hook_with_service/auth/auth.mutate.hook";
import OdForm from "@/src/components/UI/form/OdForm";
import { registerValidationSchema } from "@/src/schema/auth.schema";
import OdInput from "@/src/components/UI/form/OdInput";
import OdButton from "@/src/components/UI/button/OdButton";
import { TSelectOption } from "@/src/components/UI/form/OdAutocomplete";
import OdSelect from "@/src/components/UI/form/OdSelect";
import OdTextarea from "@/src/components/UI/form/OdTextArea";
import { Select, SelectItem } from "@nextui-org/select";
import { TUserRole } from "@/src/types";
import OdImages from "@/src/components/UI/form/OdImages";

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<
    "CUSTOMER" | "VENDOR" | null
  >(null);
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
    console.log(data);
    const registerUserData: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      role: selectedRole,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };
    if (selectedRole === "VENDOR") {
      registerUserData["description"] = data?.description;
    }
    const formData = new FormData();
    formData.append("file", data?.img[0]);
    formData.append("data", JSON.stringify(registerUserData));
    handleRegister(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      setUserLoading(true);
      router.replace(redirect);
    } else {
      console.log(error);
    }
  }, [isSuccess, redirect, router, isLoading]);
  const userRoleSelectOptions: TSelectOption[] = [
    { key: "CUSTOMER", label: "Customer" },
    { key: "VENDOR", label: "Vendor" },
  ];
  return (
    <div>
      <CenterContainer className="w-[96vw]">
        <OdForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="space-y-6 sm:mx-auto mx-6 sm:w-10/12 md:w-10/12 lg:w-[900px] rounded-lg border bg-white dark:bg-gray-800 p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                Register
              </h1>
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
              <OdInput
                name="name"
                label={`${selectedRole === "VENDOR" ? "Shop Name" : "Name"}`}
                type="text"
              />
              <OdInput name="email" label="Email" type="textEmail" />
              <OdInput name="phone" label="Phone" type="text" />
              {/* <div className="md:col-span-2"> */}
              <div>
                <Controller
                  name="role"
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <Select
                        {...field}
                        onChange={(event) => {
                          const selectedRole = event.target.value as
                            | "CUSTOMER"
                            | "VENDOR";
                          setSelectedRole(selectedRole);
                          field.onChange(selectedRole);
                        }}
                        label="Role"
                        variant="underlined"
                        size="md"
                        className={`dark:bg-default-500/20`}
                      >
                        {userRoleSelectOptions.map((item) => (
                          <SelectItem key={item.key} value={item.key}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                      {error && (
                        <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
                          <small>{error.message}</small>
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              {/* </div> */}
              <OdInput name="password" label="Password" type="password" />
              <OdInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />

              {/* <div className="md:col-span-2"> */}
              <OdTextarea label="Address" name="address" rows={5} />
              {/* </div> */}

              <OdImages
                name="img"
                maxImageUpload={1}
                label={
                  selectedRole === "VENDOR"
                    ? "Select Shop Logo"
                    : "Select Profile Picture"
                }
              />

              {selectedRole === "VENDOR" && (
                <div className="md:col-span-2">
                  <OdTextarea
                    label="About Yourshop"
                    name="description"
                    rows={5}
                  />
                </div>
              )}
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
