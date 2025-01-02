import { UserProfile } from "@/src/components/modules/dashboard/shared/Profile";
import { VendorProfile } from "@/src/components/modules/dashboard/shared/VendorProfile";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TReturnData, TUser } from "@/src/types";
import { toast } from "sonner";

export default async function ProfilePage() {
  const url = "/user/me?includes=follow,vendor,_count";
  const response = await nexiosInstance.get(url, {
    next: {
      tags: ["userProfile"],
    },
  });
  const userData = response?.data as TReturnData<TUser>;
  if (!userData?.success) {
    // Logout user
    toast.error("Something went wrong! Please again login to continue");
  }
  return (
    <div>
      <VendorProfile userData={userData?.data} />
    </div>
  );
}
