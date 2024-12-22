"use client";

import { TJwtUser, TReturnData, TVendor } from "@/src/types";
import OdButton from "../../UI/button/OdButton";
import axiosInstance from "@/src/lib/axiosInstance";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/src/hook_with_service/auth/auth.mutate.service";
import { Tooltip } from "antd";
import useGetCurrentUser from "@/src/hook_with_service/useGetCurrentUser";
type TProps = {
  vendorId: string;
  followingData: TReturnData<TVendor | string>;
};

export default function FollowVendor({ vendorId }: TProps) {
  const [followButtonLoading, setFollowButtonLoading] = useState(true);
  const currentLoginUser = useGetCurrentUser();

  const [followingData, setFollowingData] = useState<TReturnData<
    TVendor | string
  > | null>(null);

  const fetchFollowData = async () => {
    if (currentLoginUser?.email) {
      try {
        const response = await axiosInstance.get(
          `/follow/${vendorId}?userEmail=${currentLoginUser.email}`
        );
        setFollowingData(response.data as TReturnData<TVendor | string>);
        setFollowButtonLoading(false);
      } catch (error) {
        setFollowButtonLoading(false);
        console.error("Failed to fetch follow data:", error);
      }
    } else {
      setFollowButtonLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentLoginUser?.email) {
      window.alert("Please login first to follow a vendor shop");
      return;
    }
    const confirm = window.confirm(
      `Are you sure to ${followingData && followingData.success ? "Unfollow" : "Follow"} this store?`
    );
    if (confirm) {
      setFollowButtonLoading(true);
      try {
        const url = `/follow/${vendorId}`;
        const result = (await axiosInstance.post(url))
          .data as TReturnData<TVendor>;

        if (result?.success) {
          await fetchFollowData(); // Refetch follow data after a successful follow/unfollow action
        }
      } catch (error) {
        console.error("Failed to follow/unfollow the vendor:", error);
      } finally {
        setFollowButtonLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFollowData();
  }, [currentLoginUser]);

  return (
    <Tooltip
      className="capitalize relative"
      title={!currentLoginUser?.email && "Please login to follow"}
      color={"#ea580c"}
    >
      {<p className="absolute -z-10">m</p>}
      <OdButton
        className="px-4 py-2"
        buttonText={followingData?.success ? "Unfollow" : "Follow"}
        variant={followingData?.success ? "ghost" : "solid"}
        onClick={handleFollow}
        isLoading={followButtonLoading}
        isDisabled={!currentLoginUser?.email}
      />
    </Tooltip>
  );
}
