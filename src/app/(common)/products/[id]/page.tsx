import ProductDescription from "@/src/components/modules/singleProduct/ProductDescription";
import ProductGallery from "@/src/components/modules/singleProduct/ProductGallery";
import ProductInfo from "@/src/components/modules/singleProduct/ProductInfo";
import ProductReviews from "@/src/components/modules/singleProduct/ProductReviews";
import SimilarProducts from "@/src/components/modules/singleProduct/SimilarProducts";
import VendorInformation from "@/src/components/modules/singleProduct/VendorInformation";
import VendorInformationOnSingleProductSkeleton from "@/src/components/shared/skeleton/VendorInformationOnSingleProductSkeleton";
import { getSingleProduct } from "@/src/hook_with_service/product.fetch.service";
import { Suspense } from "react";

type TProps = {
  params: { id: string };
};

export default async function SingleProductPage({ params }: TProps) {
  const { id: productId } = await params;
  const productData = await getSingleProduct(productId);

  return (
    <div>
      <main className="px-4 py-8 space-y-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery images={productData?.img} />
          <ProductInfo productData={productData} />
        </div>
        <ProductDescription
          description={productData?.description}
          category={productData?.Category!}
        />
        <Suspense fallback={<VendorInformationOnSingleProductSkeleton />}>
          <VendorInformation vendorId={productData.vendorId} />
        </Suspense>
        <ProductReviews />
        <SimilarProducts />
      </main>
    </div>
  );
}
