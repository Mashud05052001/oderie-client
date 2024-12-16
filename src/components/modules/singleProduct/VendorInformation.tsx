import React from "react";
import {
  Star,
  MapPin,
  Clock,
  Award,
  MessageCircle,
  LucideProps,
} from "lucide-react";

const vendorStats = {
  name: "Sports Galaxy BD",
  rating: 4.8,
  totalRatings: 1250,
  positiveRating: 96,
  shipOnTime: 98,
  responseRate: 99,
  joinedDate: "2020",
  location: "Dhaka, Bangladesh",
  followers: 5420,
  products: 328,
};

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

const VendorInformation = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vendor Profile */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {vendorStats.name}
                </h3>
                <div className="flex items-center mt-1 space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(vendorStats.rating) ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {vendorStats.rating} ({vendorStats.totalRatings} ratings)
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50">
                Follow
              </button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{vendorStats.products} Products</span>
              <span>•</span>
              <span>{vendorStats.followers} Followers</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{vendorStats.location}</span>
            </div>
          </div>

          {/* Vendor Stats */}
          <div className="grid grid-cols-1 gap-4">
            <StatItem
              icon={Award}
              label="Positive Seller Rating"
              value={`${vendorStats.positiveRating}%`}
            />
            <StatItem
              icon={Clock}
              label="Ships on Time"
              value={`${vendorStats.shipOnTime}%`}
            />
            <StatItem
              icon={MessageCircle}
              label="Chat Response Rate"
              value={`${vendorStats.responseRate}%`}
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              <MessageCircle className="w-4 h-4" />
              <span>Chat Now</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <span>Visit Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInformation;
