import EditUserProfile from "@/src/components/modal/editProfileModal/EditUserProfile";
import UserFollowingsModal from "@/src/components/modal/followingsFollowers/UserFollowingsModal";
import { TUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Mail, MapPin, Phone } from "lucide-react";
import { headers } from "next/headers";
import { RoleBadge } from "./RoleBadge";
import ChangeUserPassword from "@/src/components/modal/editProfileModal/ChangeUserPassword";

export async function UserProfile({ userData }: { userData: TUser }) {
  const headersList = await headers();
  const currentUrl = headersList.get("referer");
  const edithref = currentUrl?.split("/")[currentUrl?.split("/")?.length - 2]!;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-900 to-orange-600" />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-4">
          <Avatar
            src={
              userData?.Profile!?.img ||
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
            }
            alt={`${userData?.Profile!?.name}`}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Edit Button */}
        <EditUserProfile userData={userData} />
        <ChangeUserPassword />
        {/* <Link
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          href={`/${edithref}/settings`}
        >
          <Pencil className="w-5 h-5 text-gray-600" />
        </Link> */}
      </div>

      <div className="pt-20 px-6 pb-6">
        {/* Name */}
        <div className="flex justify-between mb-6 items-center ">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {userData?.Profile!?.name}
            </h1>
            <RoleBadge role={userData?.role} />
          </div>
          {/* Followings */}
          <UserFollowingsModal userData={userData} />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{userData.email}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>{userData?.Profile!.phone}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{userData?.Profile!?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}