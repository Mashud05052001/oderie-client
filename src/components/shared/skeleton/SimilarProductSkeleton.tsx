import CartSkeleton from "./CartSkeleton";

export default function SimilarProductSkeleton({
  cartItem = 6,
}: {
  cartItem?: number;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Similar Products</h2>
      <div className="p-6">
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
          {Array.from({ length: cartItem }).map((_, idx) => (
            <CartSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
