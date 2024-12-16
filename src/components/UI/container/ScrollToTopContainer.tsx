"use client";

import { TChildrenProps } from "@/src/types";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

type TScrollToTopContainerProps = TChildrenProps & {
  scrollBehaviour?: "smooth" | "instant";
};

const ScrollToTopContainer = ({
  children,
  className,
  scrollBehaviour = "smooth",
}: TScrollToTopContainerProps) => {
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehaviour,
    });
  }, [scrollBehaviour]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollIcon(true);
      } else {
        setShowScrollIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehaviour,
    });
  };

  return (
    <div className={`${className} relative`}>
      {children}

      {showScrollIcon && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-common-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopContainer;
