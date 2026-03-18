import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wordReveal = {
  hidden: { y: "110%", rotate: 3, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

interface SubBannerProps {
  image: string;
  title: string;
  highlight: string;
  subtitle?: string;
  height?: number;
}

export default function SubBanner({ image, title, highlight, subtitle, height = 330 }: SubBannerProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const allWords = `${title} ${highlight}`.split(" ");
  const titleWordCount = title.split(" ").length;

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ height: `${height}px` }}>
      {/* Image with cinematic scale-in */}
      <motion.div
        className="absolute inset-0"
        style={{ y: heroY, scale: heroScale }}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
        style={{ width: '20%' }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16"
        style={{ opacity: heroOpacity }}
      >
        <motion.p
          className="text-white/80 text-xs uppercase tracking-[0.3em] mb-2 font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        >
          {subtitle || 'SpaceBox Concepts'}
        </motion.p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white leading-[0.95]">
          <motion.span
            className="inline"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
          >
            {allWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${i >= titleWordCount ? "font-semibold" : ""}`}
                  variants={wordReveal}
                >
                  {word}{i < allWords.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>
      </motion.div>
    </section>
  );
}
