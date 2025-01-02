"use client";

import { TUser } from "@/src/types";
import { Button, Popover } from "antd";
import { Eye, MapPin, Users } from "lucide-react";
import { useState } from "react";
import ModalContainer from "../ModalContainer";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

export default function VendorFollowersModal({
  userData,
}: {
  userData: TUser;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const followingsButton = (
    <div className="border rounded-lg border-gray-300">
      <Button type="text" className="" size="large">
        <Users className="h-4 w-4 text-gray-500" />
        <span>{userData?.Vendor?._count!?.Follow || 0} Followers</span>
      </Button>
    </div>
  );
  const following = userData?.Vendor?.Follow;
  return (
    <ModalContainer
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title="Followings"
      triggerElement={followingsButton}
      placement="top"
    >
      <div className="space-y-4">
        {following?.map((follow) => (
          <div
            key={follow?.User?.Profile?.id}
            className="flex items-center justify-between space-x-4 px-4 py-2 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Avatar
                src={follow?.User?.Profile!?.img!}
                alt={follow?.User?.Profile!?.name}
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {
                    follow?.User?.Profile?.name?.split(" ")[
                      follow?.User?.Profile?.name?.split(" ")?.length - 1
                    ]
                  }
                </h4>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{follow?.User?.Profile?.address}</span>
                </div>
              </div>
            </div>
            <Popover
              content={
                <div>
                  <div className="flex">
                    <p className="min-w-12 ">Name :</p>
                    <p className="font-medium">{follow?.User?.Profile?.name}</p>
                  </div>
                  <div className="flex">
                    <p className="min-w-12 ">Email :</p>
                    <p className="font-medium">
                      {follow?.User?.Profile?.email}
                    </p>
                  </div>
                </div>
              }
              trigger={"click"}
              placement="topRight"
              mouseLeaveDelay={0.05}
            >
              <Eye size={20} className="cursor-pointer" />
            </Popover>
          </div>
        ))}
        {(!following || following.length === 0) && (
          <p className="text-center text-gray-500">
            {/* You are not following any vendors yet. */}
            You have no followers yet
          </p>
        )}
      </div>
    </ModalContainer>
  );
}
