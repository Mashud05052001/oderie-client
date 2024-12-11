"use client";
import { TChildrenProps } from "@/src/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionOpacityContainer = ({ children, className }: TChildrenProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionOpacityContainer;
