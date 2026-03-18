import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import heroImg from "@/assets/hero-office.jpg";
import MagneticWrap from "./animations/MagneticWrap";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};

// Unseen-style: each word slides up from behind a clipping mask
const wordReveal = {
  hidden: { y: "110%", rotate: 3, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

// Split headline into words for cinematic reveal
const headline = "Introducing Custom Interior Solutions in Telangana";
const words = headline.split(" ");

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden"
    >
      {/* Video with scale-down reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroImg}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay with delayed fade */}
      <motion.div
        className="absolute inset-0 bg-primary/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3 }}
      />

      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16">
        <motion.div
          className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Split text headline — each word clips up */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-primary-foreground">
            <motion.span
              className="inline"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.06, delayChildren: 0.6 }}
            >
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span className="inline-block" variants={wordReveal}>
                    {word}{i < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            variants={slideInLeft}
            className="mt-6 text-primary-foreground/80 max-w-md text-sm sm:text-lg leading-relaxed font-body text-justify"
          >
            Not out of the box. We think within your space.
          </motion.p>

          <motion.div variants={fadeUp}>
            <MagneticWrap className="inline-block" strength={8}>
              <Link
                to="/projects"
                className="mt-8 inline-flex px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-out"
              >
                Explore Projects
              </Link>
            </MagneticWrap>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
