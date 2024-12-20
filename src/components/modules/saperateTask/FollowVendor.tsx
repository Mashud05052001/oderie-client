"use client";

import { TReturnData, TVendor } from "@/src/types";
import OdButton from "../../UI/button/OdButton";
import axiosInstance from "@/src/lib/axiosInstance";
import { revalidateTag } from "next/cache";
type TProps = {
  vendorId: string;
  followingData: TReturnData<TVendor | string>;
};

export default function FollowVendor({ vendorId, followingData }: TProps) {
  const handleFollow = async () => {
    const confirm = window.confirm("Are you sure to follow this store?");
    if (confirm) {
      const url = `/follow/${vendorId}`;
      const result = (await axiosInstance.post(url))
        .data as TReturnData<TVendor>;
      if (result?.success) {
        revalidateTag("followUserInfo");
      }
    }
  };
  return (
    <OdButton
      className="px-4 py-2"
      buttonText={followingData?.success ? "Unfollow" : "Follow"}
      variant={followingData?.success ? "ghost" : "solid"}
      onClick={handleFollow}
    />
  );
}
