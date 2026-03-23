import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  scaleAmount?: number;
  sticky?: boolean;
  fadeOut?: boolean;
  zIndex?: number;
}

export default function ParallaxSection({
  children,
  className = "",
  scaleAmount = 0.05,
  sticky = true,
  fadeOut = true,
  zIndex = 1,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mobileScale = isMobile ? scaleAmount * 0.4 : scaleAmount;
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - mobileScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, fadeOut ? (isMobile ? 0.8 : 0.6) : 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", isMobile ? "12px" : "20px"]);

  if (!sticky) {
    return (
      <div className={`relative ${className}`} style={{ zIndex }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ zIndex, height: "auto" }}>
      <div className="sticky top-0">
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
            transformOrigin: "center center",
            overflow: "hidden",
            willChange: "transform, opacity",
            boxShadow: "0 -8px 30px -5px rgba(0,0,0,0.12), 0 -2px 6px -2px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
