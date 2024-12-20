"use client";
import { Star } from "lucide-react";

export default function RatingsIcon({
  rating,
  total = 5,
}: {
  rating: number;
  total?: number;
}) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(total)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`}
        />
      ))}
    </div>
  );
}
