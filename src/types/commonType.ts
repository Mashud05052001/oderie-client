import { ReactNode } from "react";

export type TChildrenProps = {
  children: ReactNode;
  className?: string;
};

export type TJwtUser = {
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "VENDOR";
  profilePicture: string;
  iat: number;
  exp: number;
};
export type TMetaData = {
  total: number;
  page: number;
  limit: number;
};
export type TReturnData<T> = {
  success: boolean;
  message: string;
  data: T;
};
export type TSuccessMetaData<T> = {
  success: true;
  message: string;
  data: {
    meta: TMetaData;
    data: T;
  };
};

export type TError = {
  success: false;
  message: string;
  errorSources: {
    path: string;
    message: string;
  }[];
  stack?: string;
};
