import { motion } from "framer-motion";
import logo from "@/assets/space-box-logo.png";
import aboutImg from "@/assets/about-us-img.png";
import SplitText from "./animations/SplitText";
import ImageReveal from "./animations/ImageReveal";
import LineReveal from "./animations/LineReveal";
import FadeIn from "./animations/FadeIn";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80, skewX: 3 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 1, ease: EASE_OUT },
  },
};

const AboutCompanySection = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={slideUp}
              className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body"
            >
              About Us
            </motion.p>

            <LineReveal className="h-[2px] w-16 bg-secondary" delay={0.4} duration={0.8} />

            <motion.img
              variants={slideInLeft}
              src={logo}
              alt="SpaceBox Concepts"
              className="h-16 md:h-20 w-auto object-contain mt-6"
              loading="lazy"
              decoding="async"
            />

            <FadeIn delay={0.3} y={30}>
              <p className="mt-6 text-muted-foreground font-body max-w-md leading-relaxed">
                At SpaceBox Concepts, we believe interior design should improve how a space functions, feels, and performs. As a growing Interior Design Company in Telangana.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} y={30}>
              <p className="mt-4 text-muted-foreground font-body max-w-md leading-relaxed">
                With 7+ years of industry experience and 75+ completed projects across Telangana, our team of 12+ in-house designers handles everything from space planning and 3D visualization to site supervision and final execution.
              </p>
            </FadeIn>

            <FadeIn delay={0.6} y={30}>
              <p className="mt-4 text-muted-foreground font-body max-w-md leading-relaxed">
                We specialize in residential interior design, office interior design, and commercial interior projects with a focus on clarity, material quality, and disciplined project management.
              </p>
            </FadeIn>
          </motion.div>

          {/* Image Column — cinematic clip reveal */}
          <ImageReveal direction="right" delay={0.3} duration={1.4} className="flex items-center justify-center">
            <img
              src={aboutImg}
              alt="SpaceBox Concepts – Modern office interior"
              className="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-xl"
              loading="lazy"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
