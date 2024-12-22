export default function ProductReviewSkeleton({
  cartItem = 2,
}: {
  cartItem?: number;
}) {
  const singleReview = (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
      <div className="flex space-x-4 items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-4">
          <div className="h-4 bg-gray-300 rounded w-80" />
          <div className="h-3 bg-gray-300 rounded w-28" />
        </div>
      </div>
      <div className="mt-4 h-20 bg-gray-300 rounded w-5/6 mb-2" />
      <div className="mt-6 h-10 ml-6 bg-gray-300 rounded w-4/6 mb-2" />
    </div>
  );
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <button className="text-orange-500 hover:text-orange-600">
            Write a Review
          </button>
        </div>
        {Array.from({ length: cartItem }).map((_, idx) => (
          <div key={idx}>{singleReview}</div>
        ))}
      </div>
    </div>
  );
}
