"use client";

import { useGetAllCategories } from "@/src/hook_with_service/swrGet/category";
import { TProduct } from "@/src/types/response.type";
import { GetProp, Upload, UploadFile, UploadProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OdButton from "../../UI/button/OdButton";
import { TSelectOption } from "../../UI/form/OdAutocomplete";
import OdForm from "../../UI/form/OdForm";
import OdInput from "../../UI/form/OdInput";
import OdSelect from "../../UI/form/OdSelect";
import OdTextarea from "../../UI/form/OdTextArea";
import ModalContainer from "../ModalContainer";
import ImgCrop from "antd-img-crop";
import { toast } from "sonner";
import { useUpdateProduct } from "@/src/hook_with_service/create/create.mutate.hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllProducts } from "@/src/hook_with_service/swrGet/product.fetch";
import { TSuccessMetaData } from "@/src/types";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productData: TProduct;
  revalidateProductData: () => Promise<
    TSuccessMetaData<TProduct[]> | undefined
  >;
};

export default function UpdateProductModal({
  isOpen,
  setIsOpen,
  productData,
  revalidateProductData,
}: TProps) {
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategories();
  const {
    mutate: mutateUpdateProduct,
    isLoading: updateProductLoading,
    isSuccess,
  } = useUpdateProduct();

  const categoryOptions: TSelectOption[] =
    (categoryData?.data &&
      categoryData.data.map((item) => ({
        key: item.id,
        label: item.name,
      }))) ||
    [];

  //   const imageFile =
  //     (productData as TProduct)?.img?.map((item, index) => {
  //       console.log(item);
  //       return {
  //         uid: `${index}`,
  //         name: `Image-${index + 1}`,
  //         status: "done" as UploadFile["status"],
  //         url: item as string,
  //       };
  //     }) || [];
  //   const [fileList, setFileList] = useState<UploadFile[]>(imageFile);
  //   console.log(imageFile);

  //   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //     const images = newFileList.map((item) => item.originFileObj || item.url);
  //     console.log("Updated Images:", images);
  //   };

  //   const onPreview = async (file: UploadFile) => {
  //     let src = file.url as string;
  //     if (!src && file.originFileObj) {
  //       src = await new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file.originFileObj as FileType);
  //         reader.onload = () => resolve(reader.result as string);
  //       });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow?.document.write(image.outerHTML);
  //   };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const changedFields = Object.keys(data).reduce(
      (acc, key) => {
        if (data[key] !== productData[key]) {
          acc[key] = data[key];
        }
        return acc;
      },
      {} as Record<string, any>
    );

    if (Object.keys(changedFields).length === 0) {
      toast.error("Please change something before update");
    } else {
      mutateUpdateProduct({
        productId: productData?.id,
        payload: changedFields,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      revalidateProductData();
      setIsOpen(false);
    }
  }, [isSuccess, updateProductLoading]);

  return (
    <div>
      <ModalContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        triggerElement={<></>}
        title={"Edit Product"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
        size="3xl"
      >
        <OdForm onSubmit={onSubmit} className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <OdInput
              label="Title"
              name="title"
              type="text"
              defaultValue={(productData as TProduct)?.title}
            />
            <OdSelect
              label="Category"
              name="categoryId"
              options={categoryOptions}
              isDisabled={categoryDataLoading}
              defaultValue={(productData as TProduct)?.categoryId}
            />
            <OdInput
              label="Price"
              name="price"
              type="number"
              defaultValue={(productData as TProduct)?.price}
            />
            <OdInput
              label="Quantity"
              name="quantity"
              type="number"
              defaultValue={(productData as TProduct)?.quantity}
            />
            <div className="md:col-span-2 space-y-8">
              <OdTextarea
                label="Description"
                name="description"
                defaultValue={(productData as TProduct)?.description}
              />
            </div>
            {/* <div>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  maxCount={4}
                  onPreview={onPreview}
                  beforeUpload={() => false}
                >
                  {fileList.length < 4 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div> */}
          </div>
          <OdButton
            buttonType="submit"
            buttonText="Update"
            className="mt-10 font-semibold text-lg bg-[#1c4368] text-white"
            isLoading={updateProductLoading}
          />
        </OdForm>
      </ModalContainer>
    </div>
  );
}
