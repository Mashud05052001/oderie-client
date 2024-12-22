import { TProduct } from "@/src/types";
import { Package, Shield, Truck } from "lucide-react";
import RatingsIcon from "../../UI/icons/RatingsIcon";
import PriceOrganize from "../../shared/smallComponents/PriceOrganize";
import ProductAddToCart from "./ProductAddToCart";

type TProps = {
  productData: TProduct;
};

const ProductInfo = ({ productData }: TProps) => {
  const productPrice = productData?.price;
  const productDiscount = productData?.discount;
  const discountPrice = parseFloat(
    (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
  );
  const companyOffer = (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 text-gray-600">
        <Truck className="w-5 h-5" />
        <span>Free Shipping</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Shield className="w-5 h-5" />
        <span>7 Days Return</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Package className="w-5 h-5" />
        <span>Genuine Product</span>
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {productData?.title}
        </h1>
        <div className="flex items-center mt-2 space-x-2">
          <RatingsIcon rating={productData?.ratings} />
          <span className="text-sm text-gray-500">
            {(productData?._count)!?.Review} Reviews
          </span>
        </div>
      </div>

      <div className="border-t border-b py-4 grid-cols-2 grid">
        <div className="">
          <div className="text-3xl font-bold text-orange-500">
            ৳ <PriceOrganize price={discountPrice} />
          </div>

          {productDiscount !== 0 && (
            <div className="my-2 text-sm text-gray-500">
              <span className="line-through">
                ৳
                <PriceOrganize price={discountPrice} />
              </span>
              <span className="ml-2 text-orange-500">
                {productDiscount}% OFF
              </span>
            </div>
          )}

          <div className={`${productDiscount === 0 && "mt-4 -mb-4"}`}>
            {productData?.quantity < 100 && "Only "}
            <strong className="mr-1.5 text-orange-600">
              {productData?.quantity}
            </strong>
            in stock
          </div>
        </div>
        <div className="md:hidden ml-10">{companyOffer}</div>
      </div>

      <ProductAddToCart productData={productData} />

      <div className="hidden md:block">{companyOffer}</div>
    </div>
  );
};

export default ProductInfo;
