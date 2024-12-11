// "use client";

// import { useGetAllProducts } from "@/src/hook_with_service/swrGet/product.fetch";

// export default function Page() {
//

//   return (
//     <div>
//       <h1 className="text-2xl"> This is all products Page </h1>
//     </div>
//   );
// }
"use client";
import { useDeleteProduct } from "@/src/hook_with_service/delete/delete.mutate.hook";
import { useGetAllProducts } from "@/src/hook_with_service/swrGet/product.fetch";
import { CopyOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Avatar } from "@nextui-org/avatar";
import type { TableColumnsType } from "antd";
import { Pagination, Popover, Slider, Table } from "antd";
import React, { useEffect, useState } from "react";

import useDebounce from "@/src/hook_with_service/useDebounce";
import { Input } from "@nextui-org/input";
import ModalContainer from "@/src/components/modal/ModalContainer";
import { useDuplicateProduct } from "@/src/hook_with_service/create/create.mutate.hook";
import UpdateProductModal from "@/src/components/modal/modalBody/UpdateProductModal";
import { TProduct } from "@/src/types/response.type";

interface DataType {
  key: React.Key;
  image: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
}

const AllProductsPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [range, setRange] = useState<number[] | []>([]);

  const debounceValue = useDebounce(searchTerm);

  const {
    data: allProducts,
    error,
    isLoading: productDataLoading,
    revalidate: revalidateProductData,
  } = useGetAllProducts({ includes: "category", searchTerm: debounceValue });
  const {
    mutate: mutateDeleteProduct,
    isLoading: deleteProductLoading,
    isSuccess: deleteProductSuccess,
  } = useDeleteProduct();
  const {
    mutate: mutateDuplicateProduct,
    isLoading: duplicateProductLoading,
    isSuccess: duplicateProductSuccess,
  } = useDuplicateProduct();

  useEffect(() => {
    if (deleteProductSuccess || duplicateProductSuccess) {
      revalidateProductData();
    }
  }, [
    deleteProductLoading,
    deleteProductSuccess,
    duplicateProductLoading,
    duplicateProductSuccess,
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="mb-6 flex items-end space-x-4">
        <Input
          label="Search By"
          type="text"
          className="w-48"
          size="md"
          variant="underlined"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table<DataType>
        className={``}
        pagination={false}
        columns={columns}
        dataSource={allProductsData}
        scroll={{ x: "max-content" }}
        loading={productDataLoading}
      />
      <div className="mt-8">
        <Pagination
          className=""
          total={metaData?.total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={limit}
          defaultCurrent={page}
        />
      </div>
      {editModalData && (
        <UpdateProductModal
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          productData={editModalData as TProduct}
          revalidateProductData={revalidateProductData}
        />
      )}
    </div>
  );
};

export default AllProductsPage;
