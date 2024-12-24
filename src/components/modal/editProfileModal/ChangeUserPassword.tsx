"use client";

import { useChangePassword } from "@/src/hook_with_service/update/update.mutate.hook";
import { changePasswordValidationSchema } from "@/src/schema/auth.schema";
import { TUser } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OdButton from "../../UI/button/OdButton";
import OdForm from "../../UI/form/OdForm";
import OdInput from "../../UI/form/OdInput";
import ModalContainer from "../ModalContainer";

export default function ChangeUserPassword() {
  const { mutate, isLoading, isSuccess, error } = useChangePassword();
  const [modalOpen, setModalOpen] = useState(false);

  const changePassButton = (
    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
      <Lock className="w-5 h-5 text-gray-600" />
    </button>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);

  return (
    <ModalContainer
      triggerElement={changePassButton}
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title="Change Password"
      placement="top"
      size="lg"
    >
      <OdForm
        onSubmit={onSubmit}
        className="space-y-4"
        resolver={zodResolver(changePasswordValidationSchema)}
      >
        <OdInput label="Old Passowrd" name="oldPassword" type="password" />
        <OdInput label="New Passowrd" name="newPassword" type="password" />
        <div className="relative">
          {error && (
            <small className="absolute font-medium text-red-600">
              {error?.message}
            </small>
          )}
          <OdButton
            buttonText="Change Password"
            className="mt-8"
            isLoading={isLoading}
          />
        </div>
      </OdForm>
    </ModalContainer>
  );
}
