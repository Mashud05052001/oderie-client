"use client";

import { TUser } from "@/src/types";
import { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import { Pencil } from "lucide-react";
import OdForm from "../../UI/form/OdForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OdInput from "../../UI/form/OdInput";
import OdImages from "../../UI/form/OdImages";
import OdButton from "../../UI/button/OdButton";
import { toast } from "sonner";
import { useUpdateUserProfile } from "@/src/hook_with_service/update/update.mutate.hook";

type TUpdatedFields = {
  img?: File[];
  phone?: string;
  name?: string;
  address?: string;
  [key: string]: unknown;
};

export default function EditUserProfile({ userData }: { userData: TUser }) {
  const { mutate, isLoading, isSuccess } = useUpdateUserProfile();
  const [modalOpen, setModalOpen] = useState(false);
  const profile = userData?.Profile;
  const editButton = (
    <button className="absolute top-4 right-16 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
      <Pencil className="w-5 h-5 text-gray-600" />
    </button>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!profile) {
      toast.error("Profile data is not loaded.");
      return;
    }
    const updatedFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "img") {
        if (value !== undefined && Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        }
      } else if (value !== profile[key as keyof typeof profile]) {
        acc[key] = value as string;
      }
      return acc;
    }, {} as TUpdatedFields);

    if (Object.keys(updatedFields).length === 0) {
      toast.error("Please change anything before update");
    } else {
      if (data?.img && data?.img?.length) {
        const { img, ...others } = updatedFields;
        const formdata = new FormData();
        formdata.append("file", img![0]);
        formdata.append("data", JSON.stringify(others));
        mutate(formdata);
      } else {
        mutate(updatedFields);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);

  return (
    <ModalContainer
      triggerElement={editButton}
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title="Edit Profile"
      placement="top"
      size="xl"
      outsideClickToCloseModal={false}
    >
      <OdForm onSubmit={onSubmit} className="space-y-4">
        <OdInput
          label="Name"
          defaultValue={userData?.Profile?.name}
          name="name"
          type="text"
        />
        <OdInput
          label="Phone"
          defaultValue={userData?.Profile?.phone}
          name="phone"
          type="text"
        />
        <OdInput
          label="Address"
          defaultValue={userData?.Profile?.address}
          name="address"
          type="text"
        />
        <div className="ml-1">
          <OdImages
            name="img"
            maxImageUpload={1}
            label="Update Profile Picture"
            defaultImages={[`${userData?.Profile?.img}`]}
          />
          <OdButton
            buttonText="Update Profile"
            className="mt-8"
            isLoading={isLoading}
          />
        </div>
      </OdForm>
    </ModalContainer>
  );
}
