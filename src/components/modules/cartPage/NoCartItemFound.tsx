import Image from "next/image";
import Link from "next/link";
import OdButton from "../../UI/button/OdButton";
import cartImage3 from "@/src/assets/no_cart3.png";

export default function NoCartItemFound() {
  return (
    <div className="flex-1 min-h-screen bg-gray-100">
      <div className="bg-white  rounded-lg shadow-sm flex flex-col items-center pb-16">
        <Image
          src={cartImage3}
          width={300}
          height={300}
          alt="No Cart Data Available"
        />
        <h2 className="text-lg font-medium">No Cart Items Found</h2>
        <Link href={"/products"}>
          <OdButton
            buttonText="Add To Cart"
            size="sm"
            className="px-6 mt-6"
            variant="ghost"
          />
        </Link>
      </div>
    </div>
  );
}
