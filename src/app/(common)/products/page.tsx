import FilterProducts from "@/src/components/modules/products/FilterProducts";
import ProductAllCarts from "@/src/components/modules/products/ProductAllCarts";
import ProductPagination from "@/src/components/modules/products/ProductPagination";
import ScrollToTopContainer from "@/src/components/UI/container/ScrollToTopContainer";
import { getProducts } from "@/src/hook_with_service/product.fetch.service";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 15;
  const searchTerm = searchParams?.searchTerm || "";
  const categoryId = searchParams?.categoryId || "";
  const products = await getProducts(
    page,
    limit,
    searchTerm,
    categoryId,
    "_count,productCoupon"
  );
  console.log(products);

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
