const VendorInformationOnSingleProductSkeleton = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
      <div className="animate-pulse flex flex-col space-y-4 p-6 rounded-lg bg-white">
        <div className="bg-gray-300 h-6 w-40" />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="bg-gray-300 h-6 w-56" />

              <div className="bg-gray-300 h-10 w-20 rounded-md" />
            </div>

            <div className="bg-gray-300 h-4 w-48" />
            <div className="bg-gray-300 h-4 w-32" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-gray-300 h-6 w-36 ml-4" />
            <div className="bg-gray-300 h-6 w-36 ml-4" />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-300 h-10 w-48 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInformationOnSingleProductSkeleton;
