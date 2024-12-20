import { TCategory } from "@/src/types";
import Image from "next/image";

const ProductDescription = ({
  description,
  category,
}: {
  description: string;
  category: TCategory;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product Details</h2>

      <div className="bg-white pr-6 pb-6 pt-3 rounded-lg shadow-sm">
        <div className="pb-4 pl-2">
          <div className="flex items-center">
            <Image
              src={category?.icon}
              alt="Missing"
              width={60}
              height={60}
              className="rounded-full p-1 border-2 mr-2"
            />
            <p className="text-lg font-semibold">{category?.name}</p>
          </div>
        </div>
        <section className="pl-6">{description}</section>
      </div>
    </div>
  );
};

export default ProductDescription;
