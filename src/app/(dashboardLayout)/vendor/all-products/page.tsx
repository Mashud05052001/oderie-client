"use client";
import { useDeleteProduct } from "@/src/hook_with_service/delete/delete.mutate.hook";
import { useGetAllProducts } from "@/src/hook_with_service/swrGet/product.fetch";
import { CopyOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Avatar } from "@nextui-org/avatar";
import type { TableColumnsType } from "antd";
import { Popover, Table } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import OdButton from "@/src/components/UI/button/OdButton";
import CreateCouponModal from "@/src/components/modal/modalBody/CreateCouponModal";
import UpdateProductModal from "@/src/components/modal/modalBody/UpdateProductModal";
import MyPagination from "@/src/components/shared/Pagination";
import { useDuplicateProduct } from "@/src/hook_with_service/create/create.mutate.hook";
import useDebounce from "@/src/hook_with_service/useDebounce";
import { TProduct } from "@/src/types/response.type";
import { Input } from "@nextui-org/input";

interface DataType {
  key: React.Key;
  image: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
}

const AllProductsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [range, setRange] = useState<number[] | []>([]);

  const debounceValue = useDebounce(searchTerm);
  const {
    data: allProducts,
    error,
    isLoading: productDataLoading,
    revalidate: revalidateProductData,
  } = useGetAllProducts({
    includes: "category",
    searchTerm: debounceValue,
    limit,
    page,
  });
  const {
    mutate: mutateDeleteProduct,
    isLoading: deleteProductLoading,
    isSuccess: deleteProductSuccess,
  } = useDeleteProduct();
  const {
    mutate: mutateCreateCoupon,
    isLoading: createCouponLoading,
    isSuccess: createCouponSuccess,
  } = useDeleteProduct();
  const {
    mutate: mutateDuplicateProduct,
    isLoading: duplicateProductLoading,
    isSuccess: duplicateProductSuccess,
  } = useDuplicateProduct();

  useEffect(() => {
    if (
      deleteProductSuccess ||
      duplicateProductSuccess ||
      createCouponSuccess
    ) {
      revalidateProductData();
    }
  }, [
    deleteProductLoading,
    deleteProductSuccess,
    duplicateProductLoading,
    duplicateProductSuccess,
    createCouponLoading,
    createCouponSuccess,
  ]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "Image",
      render: (imgUrl) => {
        return <Avatar src={imgUrl} />;
      },
    },
    { title: "Title", dataIndex: "title", key: "Title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (data) => {
        const handleDelete = (productId: string) =>
          mutateDeleteProduct(productId);
        const handleDuplicate = (productId: string) =>
          mutateDuplicateProduct(productId);
        return (
          <div className="flex space-x-4 text-xl">
            <div>
              <EditFilled
                className="hover:text-blue-600 cursor-pointer duration-100"
                onClick={() => {
                  setEditModalOpen(true);
                  const selectedProductData = allProducts?.data?.data.find(
                    (item) => item.id === data?.key
                  );
                  setEditModalData(selectedProductData!);
                }}
              />
            </div>
            <div>
              <Popover
                content={
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-yellow-600 text-yellow-600 hover:text-white hover:bg-yellow-600 
                    duration-100 mt-2 px-3 py-1 rounded-lg font-semibold"
                      onClick={() => handleDuplicate(data?.key)}
                    >
                      Yes, Duplicate It
                    </button>
                  </div>
                }
                title="Are you sure to duplicate the product?"
                trigger="click"
                placement="left"
              >
                <CopyOutlined className="hover:text-yellow-600 cursor-pointer duration-100 " />
              </Popover>
            </div>
            <div>
              <Popover
                content={
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 
                    duration-100 mt-2 px-3 py-1 rounded-lg font-semibold"
                      onClick={() => handleDelete(data?.key)}
                    >
                      Yes, Delete It
                    </button>
                  </div>
                }
                title="Are you sure to delete the product?"
                trigger="click"
                placement="left"
              >
                <DeleteFilled className="hover:text-red-600 cursor-pointer duration-100 " />
              </Popover>
            </div>
          </div>
        );
      },
    },
  ];

  const allProductsData: DataType[] =
    !error && allProducts?.data?.data
      ? allProducts.data.data.map((item) => ({
          image: item.img[0],
          category: item?.Category ? item.Category.name : "",
          price: item.price,
          quantity: item.quantity,
          title: item.title,
          key: item.id,
        }))
      : [];
  const metaData = allProducts?.data.meta;

  useEffect(() => {
    if (!editModalOpen) {
      setEditModalData({});
    }
  }, [editModalOpen]);

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div className="min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="mb-6 flex items-end space-x-4 justify-between">
          <div>
            <Input
              label="Search By"
              type="text"
              className="w-48"
              size="md"
              variant="underlined"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-x-2 flex items-center font-semibold">
            <p>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </p>

            <OdButton
              onClick={() => setCouponModalOpen(true)}
              isDisabled={!hasSelected}
              isLoading={loading}
              buttonText="Add Coupon"
              className="text-white bg-[#1c4368] px-4"
            />
          </div>
        </div>
        <Table<DataType>
          className={``}
          pagination={false}
          columns={columns}
          dataSource={allProductsData}
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys) =>
              setSelectedRowKeys(newSelectedRowKeys),
          }}
          scroll={{ x: "max-content" }}
          loading={productDataLoading}
        />
      </div>

      <MyPagination
        className="mt-5 mb-10"
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        total={metaData?.total!}
      />

      {editModalData && (
        <UpdateProductModal
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          productData={editModalData as TProduct}
          revalidateProductData={revalidateProductData}
        />
      )}
      <CreateCouponModal
        isOpen={couponModalOpen}
        setIsOpen={setCouponModalOpen}
        productIds={selectedRowKeys as string[]}
        setProductIds={setSelectedRowKeys as Dispatch<SetStateAction<string[]>>}
      />
    </div>
  );
};

export default AllProductsPage;
