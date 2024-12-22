import { TProduct } from "@/src/types/response.type";
import SingleCart from "./SingleCart";

type TProps = {
  allProducts: TProduct[] | undefined;
  //   productsDataLoading: boolean;
  //   productsDataFetching: boolean;
  //   loadingSkeletonNumber?: number;
  className?: string;
  noProductExistMsg?: boolean;
};

const ProductAllCarts = ({
  allProducts,
  className,
  noProductExistMsg = true,
  //   productsDataFetching,
  //   productsDataLoading,
  //   loadingSkeletonNumber = 12,
}: TProps) => {
  //   if (productsDataLoading) {
  //     return (
  //       <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
  //         {Array(loadingSkeletonNumber)
  //           .fill(0)
  //           .map((_, index) => (
  //             <CartSkeleton key={index} />
  //           ))}
  //       </div>
  //     );
  //   }
  if (allProducts?.length === 0)
    return (
      <div className="text-3xl text-red-600 font-semibold flex justify-center mt-10">
        {noProductExistMsg && "There are no product exist"}
      </div>
    );

  return (
    <div className={`relative`}>
      {/* {productsDataFetching && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-opacity-50 bg-gray-100 w-full min-h-[calc(100vh-100px)] h-full z-20">
          <MainLoading />
        </div>
      )} */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-5">
        {allProducts &&
          allProducts?.map((product: TProduct) => (
            <div key={product?.id} className={className}>
              <SingleCart product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductAllCarts;
