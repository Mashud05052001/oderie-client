"use client";
import { TOdCartData, TProduct } from "@/src/types";
import OdButton from "../../UI/button/OdButton";
import { useUserProvider } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TProps = {
  productData: TProduct;
};

export default function ProductAddToCart({ productData }: TProps) {
  const { user } = useUserProvider();
  const router = useRouter();
  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please login to add product to cart");
      router.push(`/login?redirect=/products/${productData?.id}`);
    } else {
      const odCart = localStorage.getItem("odCart");
      if (!odCart) {
        const cartData: TOdCartData = {
          vendorId: productData?.vendorId,
          products: [{ productId: productData?.id, quantity: 1 }],
        };
        localStorage.setItem("odCart", JSON.stringify(cartData));
        toast.success("Product added successfully to cart");
      } else {
        const prevCartData = JSON.parse(odCart) as TOdCartData;

        if (prevCartData.vendorId !== productData.vendorId) {
          const confirm = window.confirm(
            "You are about to add products from a different vendor. Please note that adding this item will remove all products from your current cart. Are you sure you want to proceed?"
          );
          if (confirm) {
            const cartData: TOdCartData = {
              vendorId: productData?.vendorId,
              products: [{ productId: productData?.id, quantity: 1 }],
            };
            localStorage.setItem("odCart", JSON.stringify(cartData));
            toast.success("Product added successfully to cart");
          }
        } else {
          const prevProducts = prevCartData?.products;
          const existingProductIndex = prevProducts.findIndex(
            (product) => product.productId === productData?.id
          );

          if (existingProductIndex !== -1) {
            const existingProduct = prevProducts[existingProductIndex];
            const newQuantity = existingProduct.quantity + 1;
            if (newQuantity <= productData?.quantity) {
              existingProduct.quantity = newQuantity;
              prevCartData.products[existingProductIndex] = existingProduct;
              localStorage.setItem("odCart", JSON.stringify(prevCartData));
              toast.success("Product added successfully to cart");
            } else {
              existingProduct.quantity = productData?.quantity;
              prevCartData.products[existingProductIndex] = existingProduct;
              localStorage.setItem("odCart", JSON.stringify(prevCartData));
              toast.warning(
                "You cannot add more of this product than the available stock."
              );
            }
          } else {
            prevCartData.products.push({
              productId: productData?.id,
              quantity: 1,
            });
            localStorage.setItem("odCart", JSON.stringify(prevCartData));
            toast.success("Product added successfully to cart");
          }
        }
      }
    }
  };

  return (
    <OdButton
      buttonText="Add to Cart"
      className="font-medium"
      onClick={handleAddToCart}
    />
  );
}
