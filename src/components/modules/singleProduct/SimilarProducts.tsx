import { getProducts } from "@/src/hook_with_service/product.fetch.service";
import SingleCart from "../products/SingleCart";

type TProps = { categoryId: string; currentProductId: string };

const SimilarProducts = async ({ categoryId, currentProductId }: TProps) => {
  const allProducts = await getProducts({ categoryId, limit: 12, page: 1 });
  const allProductsWithoutCurrentProduct = allProducts?.data?.filter(
    (product) => product?.id !== currentProductId
  );
  return (
    <div>
      <h2 className="text-xl font-semibold">Similar Products</h2>
      <div className="p-6">
        {allProductsWithoutCurrentProduct.length === 0 && (
          <h3 className="text-lg font-medium">No similar products exist</h3>
        )}
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
          {allProductsWithoutCurrentProduct &&
            allProductsWithoutCurrentProduct?.map((product) => (
              <div key={product?.id}>
                <SingleCart product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
