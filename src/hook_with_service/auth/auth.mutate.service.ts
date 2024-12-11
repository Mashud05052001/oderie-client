"use server";

import { cookies } from "next/headers";
import { TJwtUser, TReturnData } from "../../types";
import { jwtDecode } from "jwt-decode";
import catchServiceAsync from "../../utils/servicesCatchAsync";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/axiosInstance";
import { TLoginResponse, TUser } from "../../types/response.type";

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData: null | TJwtUser = null;
  if (accessToken) decodedData = await jwtDecode(accessToken);
  return decodedData;
};
export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};
export const getAccessToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value || null;
  return accessToken;
};
export const getRefreshToken = async () => {
  const accessToken = (await cookies()).get("refreshToken")?.value || null;
  return accessToken;
};
export const setAccessToken = async (token: string) => {
  (await cookies()).set("accessToken", token);
};

export const registerUserService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post("/auth/register", payload);
    return res.data as TReturnData<TUser>;
  }
);

export const loginUserService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post("/auth/login", payload);
    console.log(res);
    const data = res.data as TReturnData<TLoginResponse>;
    if (data?.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.accessToken);
    }
    return data;
  }
);

export const generateAccessTokenService = catchServiceAsync<
  TReturnData<{ accessToken: string }>
>(async () => {
  const res = await axiosInstance.post("/auth/refresh-token");
  return res.data;
});

export const forgetPasswordService = catchServiceAsync<TReturnData<string>>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post("/auth/forget-password", payload);
    return data;
  }
);

export const checkResetCodeService = catchServiceAsync<TReturnData<string>>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post(
      "/auth/check-reset-code",
      payload
    );
    return data;
  }
);

export const resetPasswordService = catchServiceAsync<TReturnData<string>>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post("/auth/reset-password", payload);
    return data;
  }
);

export const sendContactEmail = catchServiceAsync<any>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post(
      "/auth/send-contact-email",
      payload
    );
    return data;
  }
);
