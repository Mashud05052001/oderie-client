"use client";

import { TUser } from "@/src/types";
import { Button } from "antd";
import { MapPin, Users } from "lucide-react";
import { useState } from "react";
import ModalContainer from "../ModalContainer";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

export default function UserFollowingsModal({ userData }: { userData: TUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const followingsButton = (
    <div className="border rounded-lg border-gray-300">
      <Button type="text" className="" size="large">
        <Users className="h-4 w-4 text-gray-500" />
        <span>{userData?._count!?.Follow || 0} Following</span>
      </Button>
    </div>
  );
  const following = userData?.Follow;
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
          <Link
            className="flex items-center space-x-4 px-4 py-2 border rounded-lg"
            key={follow?.Vendor!?.id}
            href={`/vendors/${follow?.Vendor?.id}`}
          >
            <Avatar
              src={follow!?.Vendor!?.logo!}
              alt={follow!?.Vendor!?.name}
            />
            <div>
              <h4 className="font-semibold text-gray-900">
                {follow!?.Vendor!?.name}
              </h4>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{follow!?.Vendor!?.address}</span>
              </div>
            </div>
          </Link>
        ))}
        {(!following || following.length === 0) && (
          <p className="text-center text-gray-500">
            You are not following any vendors yet.
          </p>
        )}
      </div>
    </ModalContainer>
  );
}
