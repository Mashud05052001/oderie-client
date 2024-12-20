import nexiosInstance from "@/src/lib/nexiosInstance";
import { TReturnData, TVendor } from "@/src/types";
import { Award, Clock, LucideProps, MapPin } from "lucide-react";
import React from "react";
import OdButton from "../../UI/button/OdButton";
import RatingsIcon from "../../UI/icons/RatingsIcon";
import { Avatar } from "@nextui-org/avatar";
import FollowVendor from "../saperateTask/FollowVendor";
import { getCurrentUser } from "@/src/hook_with_service/auth/auth.mutate.service";

const StatItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-3 text-gray-600">
    <Icon className="w-5 h-5 text-gray-400" />
    <div>
      <div className="text-sm">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  </div>
);

const VendorInformation = async ({ vendorId }: { vendorId: string }) => {
  const vendorData = (
    (await nexiosInstance.get(`/user/vendor/${vendorId}`))
      .data as TReturnData<TVendor>
  ).data;
  const currentLoginUser = await getCurrentUser();
  let followingData: TReturnData<TVendor | string> = {
    data: "You are not following the user",
    message: "Vendor follow data get successfull",
    success: false,
  };
  if (currentLoginUser?.email) {
    followingData = (
      await nexiosInstance.get(
        `/follow/${vendorId}?userEmail=${currentLoginUser.email}`,
        {
          next: {
            tags: ["followUserInfo"],
          },
        }
      )
    ).data as TReturnData<TVendor | string>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vendor Profile */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-5 items-center">
                <Avatar src={vendorData?.logo!} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {vendorData?.name}
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <RatingsIcon rating={vendorData?.ratings ?? 0} />
                    <span className="text-sm text-gray-500">
                      {vendorData?.ratings} ({vendorData?.ratingsCount} ratings)
                    </span>
                  </div>
                </div>
              </div>
              {/* <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50">
                Follow
              </button> */}
              <FollowVendor
                vendorId={vendorData?.id}
                followingData={followingData}
              />
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span> {(vendorData?._count)!.Product} Products</span>
              <span>•</span>
              <span> {(vendorData?._count)!.Follow} Followers</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {/* {vendorData?.address} */}
                asdasd
              </span>
            </div>
          </div>

          {/* Vendor Stats */}
          <div className="grid grid-cols-1 gap-4">
            <StatItem
              icon={Award}
              label="Positive Seller Rating"
              value={`95%`}
            />
            <StatItem icon={Clock} label="Ships on Time" value={`99%`} />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <OdButton
              buttonText="Visit Store"
              className="flex items-center justify-center px-4 py-2 border rounded-md w-48"
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInformation;
