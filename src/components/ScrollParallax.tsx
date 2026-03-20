import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = opposite direction
  scale?: [number, number]; // [start, end] scale
  opacity?: [number, number]; // [start, end] opacity
  rotate?: [number, number]; // [start, end] rotation in degrees
  className?: string;
  offset?: [string, string];
}

export default function ScrollParallax({
  children,
  speed = 0.3,
  scale,
  opacity,
  rotate,
  className = "",
  offset = ["start end", "end start"],
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const scaleVal = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], scale[1], scale[0]])
    : undefined;
  const opacityVal = opacity
    ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [opacity[0], 1, 1, opacity[1]])
    : undefined;
  const rotateVal = rotate
    ? useTransform(scrollYProgress, [0, 1], rotate)
    : undefined;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          scale: scaleVal,
          opacity: opacityVal,
          rotate: rotateVal,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Horizontal parallax variant
interface HorizontalParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function HorizontalParallax({
  children,
  speed = 0.2,
  className = "",
}: HorizontalParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x }}>{children}</motion.div>
    </div>
  );
}

// Text reveal on scroll
interface TextRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollTextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}>
        {children}
      </motion.div>
    </div>
  );
}
