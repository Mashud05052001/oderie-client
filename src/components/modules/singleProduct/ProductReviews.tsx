import { Star, ThumbsUp } from "lucide-react";

type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  image?: string; // Optional property
};

const reviews: Review[] = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    date: "2024-03-15",
    content:
      "Great shuttlecocks for casual play. They last longer than expected.",
    helpful: 12,
    image:
      "https://images.unsplash.com/photo-1614111345870-b05058e924fa?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    date: "2024-03-10",
    content: "Good quality for the price. Perfect for practice sessions.",
    helpful: 8,
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    date: "2024-03-05",
    content:
      "Excellent product! The cork base provides good stability during play.",
    helpful: 15,
    image:
      "https://images.unsplash.com/photo-1614111345917-a3561ff5e412?auto=format&fit=crop&q=80&w=200",
  },
];

type Tprops = {
  review: Review;
};

const ReviewCard = ({ review }: Tprops) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{review.author}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "fill-current" : ""}`}
                />
              ))}
            </div>
          </div>
          <span className="text-sm text-gray-500">{review.date}</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{review.content}</p>
      {review.image && (
        <img
          src={review.image}
          alt="Review"
          className="mt-4 rounded-lg w-32 h-32 object-cover"
        />
      )}
      <div className="mt-4 flex items-center space-x-2 text-gray-500">
        <button className="flex items-center space-x-1 text-sm hover:text-orange-500">
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
};

const ProductReviews = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <button className="text-orange-500 hover:text-orange-600">
          Write a Review
        </button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
