const CartSkeleton = () => {
  return (
    <div className="animate-pulse  flex flex-col space-y-4 p-4 border rounded-lg shadow-lg">
      <div className="bg-gray-300 h-36 w-full" />
      <div className="flex-1 space-y-5 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-8 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default CartSkeleton;
