import nexiosInstance from "@/src/lib/nexiosInstance";
import { TOrder, TSuccessMetaData } from "@/src/types";

export default async function OrderPage() {
  const response = await nexiosInstance.get("/order", {
    next: {
      tags: ["myOrderData"],
      revalidate: 60,
    },
  });
  const orderData = response?.data as TSuccessMetaData<TOrder[]>;
  console.log(orderData);

  return (
    <div>
      <h1 className="text-2xl"> This is Order Page </h1>
    </div>
  );
}
