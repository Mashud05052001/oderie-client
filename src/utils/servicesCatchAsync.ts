"use server";

import { AxiosError } from "axios";
import { TError } from "../types";

const catchServiceAsync = <T = any>(fn: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.log((error as AxiosError)?.response?.data);
      const errorMessage = ((error as AxiosError)?.response?.data as TError)
        ?.message;
      throw new Error(errorMessage || "An unexpected error occurred");
    }
  };
};

export default catchServiceAsync;
