import MyOrders from "@/src/components/modules/dashboard/user/MyOrders";
import NoDataFound from "@/src/components/shared/smallComponents/NoDataFound";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TOrder, TOrderStatus, TSuccessMetaData } from "@/src/types";

export default async function OrderPage() {
  const response = await nexiosInstance.get("/order", {
    next: {
      tags: ["myOrderData"],
      revalidate: 60,
    },
  });
  const orderData = response?.data as TSuccessMetaData<TOrder[]>;
  orderData?.data?.data?.sort((a, b) => {
    const statusOrder: Record<TOrderStatus, number> = {
      DELIVERED: 1,
      PROCESSING: 2,
      PENDING: 3,
      CANCELLED: 4,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div>
      {orderData?.data?.meta?.total === 0 ? (
        <NoDataFound text="No Order Data Found" />
      ) : (
        <MyOrders orderData={orderData?.data?.data} />
      )}
    </div>
  );
}
