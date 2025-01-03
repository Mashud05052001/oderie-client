import { UserProfile } from "@/src/components/modules/dashboard/shared/Profile";
import nexiosInstance from "@/src/lib/nexiosInstance";
import { TReturnData, TUser } from "@/src/types";
import { toast } from "sonner";

export default async function ProfilePage() {
  const url = "/user/me?includes=follow,profile,_count";
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
      <UserProfile userData={userData?.data} />
    </div>
  );
}
