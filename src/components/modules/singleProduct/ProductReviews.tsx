import { getSingleProductAllReviewsWithResponse } from "@/src/hook_with_service/product.fetch.service";
import { TReview } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import RatingsIcon from "../../UI/icons/RatingsIcon";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex space-x-4 items-center">
        <div>
          <Avatar
            src={review?.User?.Profile?.img}
            name={review?.User?.Profile?.name || "A"}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              {review?.User?.Profile?.name || "Anonymous"}
            </span>
            <RatingsIcon rating={review?.ratings || 0} />
          </div>
          <span className="text-sm text-gray-500">
            {review?.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{review?.message || ""}</p>
      {review?.productImg && (
        <img
          src={review.productImg}
          alt="Review"
          className="mt-4 rounded-lg w-32 h-32 object-cover"
        />
      )}

      {review?.VendorResponse && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg ml-6">
          <p className="text-sm text-gray-800 font-semibold">
            Vendor Response:
          </p>
          <p className="text-sm text-gray-600">
            {review?.VendorResponse?.message || ""}
          </p>
          <span className="text-xs text-gray-500">
            {review?.VendorResponse?.createdAt
              ? new Date(review.VendorResponse.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      )}
    </div>
  );
};

const ProductReviews = async ({ productId }: { productId: string }) => {
  const response = await getSingleProductAllReviewsWithResponse(productId);

  if (!response?.success) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load reviews.
        </h2>
      </div>
    );
  }
  const { data } = response;
  const reviews: TReview[] = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <button className="text-orange-500 hover:text-orange-600">
          Write a Review
        </button>
      </div>
      <div className="space-y-4">
        {response?.data?.meta?.total === 0 ? (
          <p className="p-6 text-gray-600">
            This product currently has no reviews. Be the first to write one!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review?.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
