import MyReviewsTable from "@/src/components/modules/dashboard/user/MyReviewsTable";
import NoDataFound from "@/src/components/shared/smallComponents/NoDataFound";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TReview, TSuccessMetaData } from "@/src/types";

export default async function ReviewsPage() {
  const response = await nexiosInstance.get("/review", {
    next: {
      tags: ["myReviews"],
      revalidate: 60,
    },
  });
  const reviewsData = response?.data as TSuccessMetaData<TReview[]>;
  console.log(reviewsData);
  return (
    <div>
      {reviewsData?.data?.meta?.total === 0 ? (
        <NoDataFound text="No review data found" className="text-blue-900" />
      ) : (
        <MyReviewsTable reviewData={reviewsData?.data?.data} />
      )}
    </div>
  );
}
