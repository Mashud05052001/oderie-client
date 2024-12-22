"use client";

import OdButton from "@/src/components/UI/button/OdButton";
import { TSelectOption } from "@/src/components/UI/form/OdAutocomplete";
import OdForm from "@/src/components/UI/form/OdForm";
import OdImages from "@/src/components/UI/form/OdImages";
import OdInput from "@/src/components/UI/form/OdInput";
import OdSelect from "@/src/components/UI/form/OdSelect";
import OdTextarea from "@/src/components/UI/form/OdTextArea";
import { useCreateProduct } from "@/src/hook_with_service/create/create.mutate.hook";
import { useGetAllCategories } from "@/src/hook_with_service/swrGet/category.fetch";
import { createProductValidationSchem } from "@/src/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Page() {
  const { mutate: mutateCreateProduct, isLoading: createProductLoading } =
    useCreateProduct();

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategories();
  const categoryOptions: TSelectOption[] =
    (categoryData?.data &&
      categoryData.data.map((item) => ({
        key: item.id,
        label: item.name,
      }))) ||
    [];
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { pictures, ...others } = data;
    const formData = new FormData();
    formData.append("data", JSON.stringify(others));
    for (const picture of pictures) {
      formData.append("files", picture);
    }
    console.log(data);
    // mutateCreateProduct(formData);
  };
  return (
    <div>
      <OdForm
        onSubmit={onSubmit}
        resolver={zodResolver(createProductValidationSchem)}
        className="max-w-4xl"
      >
        <h1 className="text-2xl mb-6 font-medium"> Create Product</h1>
        <div className="grid md:grid-cols-3 gap-x-12 gap-y-2 sm:gap-y-5 md:gap-y-8">
          <div className="md:col-span-2">
            <OdInput label="Title" name="title" type="text" />
          </div>
          <OdSelect
            label="Category"
            name="categoryId"
            options={categoryOptions}
            isDisabled={categoryDataLoading}
          />
          <OdInput label="Price" name="price" type="number" />
          <OdInput label="Quantity" name="quantity" type="number" />
          <OdInput label="Discount" name="discount" type="number" />

          {/* <OdTextEditor label="Description" name="description" /> */}
          <div className="md:col-span-2 space-y-8">
            <OdTextarea label="Description" name="description" />
            <OdImages name="pictures" label="Pictures" maxImageUpload={4} />
          </div>
        </div>
        <OdButton
          buttonType="submit"
          buttonText="Create"
          className="mt-10 font-semibold text-lg bg-[#1c4368] text-white"
          isLoading={createProductLoading}
          isDisabled={createProductLoading}
        />
      </OdForm>
    </div>
  );
}
