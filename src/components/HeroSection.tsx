import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import heroImg from "@/assets/hero-office.jpg";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easeOut },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easeOut },
  },
};

const charReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: 0.4 + i * 0.03, ease: easeOut },
  }),
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const title = "Introducing Custom Interior Solutions in Telangana";
  const words = title.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden"
    >
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={heroImg}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: easeOut }}
      >
        <source src={heroVideo} type="video/mp4" />
      </motion.video>

      <motion.div
        className="absolute inset-0 bg-primary"
        style={{ opacity: overlayOpacity }}
      />

      {/* Animated grain/noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16">
        <motion.div
          className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Word-by-word reveal with 3D flip */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-primary-foreground" style={{ perspective: "600px" }}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charReveal}
                  className="inline-block mr-[0.3em]"
                  style={{ transformOrigin: "bottom" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={slideInLeft}
              className="mt-6 text-primary-foreground/80 max-w-md text-sm sm:text-lg leading-relaxed font-body text-justify"
            >
              Not out of the box. We think within your space.
            </motion.p>

            <motion.div variants={fadeBlurUp}>
              <Link
                to="/projects"
                className="mt-8 inline-flex px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-out shimmer"
              >
                Explore Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary-foreground/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
