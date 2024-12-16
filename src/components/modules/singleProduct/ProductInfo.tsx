import { TProduct } from "@/src/types";
import { Rate } from "antd";
import { Star, Truck, Shield, Package } from "lucide-react";

type TProps = {
  productData: TProduct;
};

const ProductInfo = ({ productData }: TProps) => {
  //   const [quantity, setQuantity] = useState(1);
  const quantity = 10;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {productData?.title}
        </h1>
        <div className="flex items-center mt-2 space-x-2">
          <div className="flex text-yellow-400">
            <Rate disabled defaultValue={productData?.ratings || 0} allowHalf />
          </div>
          <span className="text-sm text-gray-500">
            {(productData?._count)!?.Review} Reviews
          </span>
        </div>
      </div>

      <div className="border-t border-b py-4">
        <div className="text-3xl font-bold text-orange-500">৳149</div>
        <div className="mt-2 text-sm text-gray-500">
          <span className="line-through">৳{productData?.price}</span>
          <span className="ml-2 text-orange-500">25% OFF</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <p
              //   onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border-r hover:bg-gray-100"
            >
              -
            </p>
            <span className="px-4 py-1">{quantity}</span>
            <p
              //   onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border-l hover:bg-gray-100"
            >
              +
            </p>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
          Add to Cart
        </button>
        <button className="w-full border border-orange-500 text-orange-500 py-3 rounded-md hover:bg-orange-50 transition-colors">
          Buy Now
        </button>
      </div>

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
    </div>
  );
};

export default ProductInfo;
