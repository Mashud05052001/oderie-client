import React from "react";
import { Star } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
};
const products: Product[] = [
  {
    id: 1,
    name: "Professional Badminton Shuttlecocks",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1614111345870-b05058e924fa?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    name: "Training Shuttlecocks (12pcs)",
    price: 249,
    originalPrice: 329,
    rating: 4.0,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1614111345917-a3561ff5e412?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    name: "Premium Feather Shuttlecocks",
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1614111345870-b05058e924fa?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    name: "Beginner Shuttlecocks Set",
    price: 199,
    originalPrice: 249,
    rating: 4.2,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1614111345917-a3561ff5e412?auto=format&fit=crop&q=80&w=300",
  },
];

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-square object-cover rounded-lg mb-4"
      />
      <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
        {product.name}
      </h3>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-orange-500 font-bold">৳{product.price}</span>
        <span className="text-sm text-gray-500 line-through">
          ৳{product.originalPrice}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({product.reviews})</span>
      </div>
    </div>
  );
};

const SimilarProducts = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
