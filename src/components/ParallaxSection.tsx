import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  isSticky?: boolean;
  zIndex?: number;
}

const ParallaxSection = ({
  children,
  className = "",
  isSticky = true,
  zIndex = 1,
}: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 20]);

  if (!isSticky) {
    return (
      <div className={`relative ${className}`} style={{ zIndex }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ zIndex }}
    >
      <div className="sticky top-0 overflow-hidden">
        <motion.div
          style={{ scale, opacity, borderRadius }}
          className="origin-top will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
