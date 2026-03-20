import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Whether this section should have the stacking effect (scale down + fade as you scroll past) */
  isSticky?: boolean;
  /** Z-index for stacking order — higher = on top */
  zIndex?: number;
}

/**
 * Stacking-cards parallax section.
 * Each section is sticky; as you scroll past it, it scales down and fades
 * while the next section slides up and covers it — like layered cards.
 */
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

  // Scale down from 1 → 0.85 as the section scrolls out
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  // Fade from 1 → 0 in the last portion of the scroll
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  // Slight upward shift as it scales
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  // Add a border-radius as it scales down
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
          style={{ scale, opacity, y, borderRadius }}
          className="origin-top will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
