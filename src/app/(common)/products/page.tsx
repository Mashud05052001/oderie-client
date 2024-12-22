import FilterProducts from "@/src/components/modules/products/FilterProducts";
import ProductAllCarts from "@/src/components/modules/products/ProductAllCarts";
import ProductPagination from "@/src/components/modules/products/ProductPagination";
import ScrollToTopContainer from "@/src/components/UI/container/ScrollToTopContainer";
import { getProducts } from "@/src/hook_with_service/product.fetch.service";

type TProps = {
  searchParams: {
    page?: string | number;
    limit?: string | number;
    searchTerm?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: string;
    price?: string;
  };
};

export default async function ProductsPage({ searchParams }: TProps) {
  const { page, limit, searchTerm, categoryId, sortBy, sortOrder, price } =
    await searchParams;

  const products = await getProducts({
    page: Number(page) || 1,
    limit: Number(limit) || 15,
    searchTerm: searchTerm || "",
    categoryId: categoryId || "",
    includes: "_count,productCoupon",
    sortBy: sortBy || "",
    sortOrder: sortOrder || "",
    price: price || "",
  });

  return (
    <ScrollToTopContainer>
      <div className="mb-20 relative">
        <div className="flex flex-col md:flex-row gap-0 md:gap-6 px-6 xl:px-0">
          <FilterProducts />
          {/* Meeting room section */}
          <div className="mt-6 flex-grow">
            <div className="min-h-[80vh]">
              <ProductAllCarts allProducts={products?.data} />
            </div>
            {products?.meta.total > 0 ? (
              <div className="mt-20 flex justify-end">
                <ProductPagination meta={products.meta} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </ScrollToTopContainer>
  );
}
