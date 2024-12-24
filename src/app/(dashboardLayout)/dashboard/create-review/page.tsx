import CreateReviewsTable from "@/src/components/modules/dashboard/user/CreateReviewsTable";
import NoDataFound from "@/src/components/shared/smallComponents/NoDataFound";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TOrder, TSuccessMetaData } from "@/src/types";

export default async function CreateReviewsPage() {
  const response = await nexiosInstance.get("/order?remainingReview=true", {
    next: {
      tags: ["myRemainingReviewOrderData"],
      revalidate: 60,
    },
  });
  const orderData = response?.data as TSuccessMetaData<TOrder[]>;

  return (
    <div>
      {orderData?.data?.meta?.total === 0 ? (
        <NoDataFound
          text="No order found to review"
          className="text-blue-900"
        />
      ) : (
        <CreateReviewsTable orderData={orderData?.data?.data} />
      )}
    </div>
  );
}
