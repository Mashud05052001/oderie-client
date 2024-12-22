"use client";

import { useEffect, useState } from "react";
import { TOdCartData } from "../types";

export default function useGetOdCart() {
  const [cartData, setCartData] = useState<TOdCartData | null>(null);
  useEffect(() => {
    const odCart = localStorage.getItem("odCart");
    if (odCart) {
      const cartData = JSON.parse(odCart) as TOdCartData;
      setCartData(cartData);
    }
  }, []);

  return cartData;
}
