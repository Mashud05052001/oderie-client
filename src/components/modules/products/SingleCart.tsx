import { TCoupon, TProduct } from "@/src/types/response.type";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";

const SingleCart = ({ product }: { product: TProduct }) => {
  const maxCoupon =
    product?.ProductCoupon?.reduce((max, item) => {
      const percentage = item?.Coupon?.percentage ?? -Infinity;
      return percentage > max ? percentage : max;
    }, 0) || 0;
  const discountPrice =
    maxCoupon !== 0
      ? ((product?.price * (100 - maxCoupon)) / 100).toFixed(2)
      : product?.price;

  return (
    <div
      className={`max-w-[250px] space-y-4 rounded-lg bg-white shadow mx-auto`}
    >
      <Link
        href={`/product/${product.id}`}
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
          <h3 className="text-sm tracking-tight font-medium text-gray-900 transition-colors line-clamp-2">
            {product.title}
          </h3>
          {/* Price */}
          <div className="mt-2 flex items-center justify-between text-sm">
            <p className={`font-semibold `}>
              <span className="text-orange-600 text-base">
                ট:&nbsp;
                <span>
                  {discountPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </span>
              {maxCoupon !== 0 && (
                <span className="ml-1 text-xs">(-{maxCoupon}%)</span>
              )}
            </p>
          </div>
          {/* Ratings */}
          <div className="mt-2">
            <Rate disabled defaultValue={product?.ratings || 0} allowHalf />
            <span className="text-sm ml-2">
              (<span className="font-medium">{(product?._count)!.Review}</span>)
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleCart;
