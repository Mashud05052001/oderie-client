import { TProduct } from "@/src/types/response.type";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import PriceOrganize from "../../shared/smallComponents/PriceOrganize";
import RatingsIcon from "../../UI/icons/RatingsIcon";

const SingleCart = ({ product }: { product: TProduct }) => {
  const productPrice = product?.price;
  const productDiscount = product?.discount;
  const discountPrice = parseFloat(
    (productPrice - productPrice * (productDiscount / 100)).toFixed(2)
  );

  return (
    <div
      className={`max-w-[250px] space-y-4 rounded-lg bg-white shadow mx-auto`}
    >
      <Link
        href={`/products/${product.id}`}
        className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        <div className="">
          {product?.img?.[0] ? (
            <Image
              //   fill
              width={250}
              height={200}
              src={product.img[0]}
              alt={product.title || "Product Image"}
              className="group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Image Not Available</p>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base tracking-tight font-medium text-gray-900 transition-colors line-clamp-2">
            {product.title}
          </h3>
          {/* Price */}
          <div className="mt-2 flex items-center justify-between">
            <div className={`font-semibold `}>
              <span className="text-orange-600 text-lg">
                ট:&nbsp;
                <PriceOrganize price={discountPrice} />
              </span>
              {/* {maxCoupon !== 0 && (
                <span className="ml-1 text-xs">(-{maxCoupon}%)</span>
              )} */}
              {productDiscount !== 0 && (
                <div className="my-2 text-xs text-gray-500">
                  <span className="line-through">
                    ৳
                    <PriceOrganize price={discountPrice} />
                  </span>
                  <span className="ml-1 text-orange-500">
                    {productDiscount}% OFF
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Ratings */}
          <div className="mt-2 flex items-center gap-x-2 text-sm">
            {/* <Rate disabled defaultValue={product?.ratings || 0} allowHalf /> */}
            <RatingsIcon rating={product?.ratings} />
            <span>
              (<span className="font-medium">{(product?._count)!?.Review}</span>
              )
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleCart;
