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
import OdTextarea from "../../UI/form/OdTextArea";
import OdTextEditor from "../../UI/form/OdTextEditor";
import Tiptap from "../../UI/form/Tiptap";

type TUpdatedFields = {
  img?: File[];
  phone?: string;
  name?: string;
  address?: string;
  [key: string]: unknown;
};

export default function EditVendorProfile({ userData }: { userData: TUser }) {
  const [content, setContent] = useState<string>("");
  const { mutate, isLoading, isSuccess } = useUpdateUserProfile();
  const [modalOpen, setModalOpen] = useState(false);
  const vendor = userData?.Vendor;
  const editButton = (
    <button className="absolute top-4 right-16 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
      <Pencil className="w-5 h-5 text-gray-600" />
    </button>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!vendor) {
      toast.error("Vendor data is not loaded.");
      return;
    }
    const updatedFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "logo") {
        if (value !== undefined && Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        }
      } else if (value !== vendor[key as keyof typeof vendor]) {
        acc[key] = value as string;
      }
      return acc;
    }, {} as TUpdatedFields);

    if (Object.keys(updatedFields).length === 0) {
      toast.error("Please change anything before update");
    } else {
      console.log(updatedFields);
      if (data?.img && data?.img?.length) {
        const { img, ...others } = updatedFields;
        const formdata = new FormData();
        formdata.append("file", img![0]);
        formdata.append("data", JSON.stringify(others));
        // mutate(formdata);
      } else {
        // mutate(updatedFields);
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
    >
      <OdForm onSubmit={onSubmit} className="space-y-4">
        <OdInput
          label="Vendor Name"
          defaultValue={userData?.Vendor?.name}
          name="name"
          type="text"
        />
        <OdInput
          label="Phone"
          defaultValue={userData?.Vendor?.phone}
          name="phone"
          type="text"
        />
        <OdInput
          label="Address"
          defaultValue={userData?.Vendor?.address}
          name="address"
          type="text"
        />

        <OdTextarea
          label="Description"
          name="description"
          defaultValue={userData?.Vendor?.description}
        />
        <div className="ml-1">
          <OdImages
            name="img"
            maxImageUpload={1}
            label="Update Vendor Logo"
            defaultImages={[`${userData?.Vendor?.logo}`]}
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
