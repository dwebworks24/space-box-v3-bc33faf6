import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticWrap from "./animations/MagneticWrap";

import work1 from "@/assets/projects/work-1.png";
import work2 from "@/assets/projects/work-2.png";
import work3 from "@/assets/projects/work-3.png";
import work4 from "@/assets/projects/work-4.png";
import work5 from "@/assets/projects/work-5.png";
import work6 from "@/assets/projects/work-6.png";
import work7 from "@/assets/projects/work-7.png";
import work8 from "@/assets/projects/work-8.png";
import work9 from "@/assets/projects/work-9.png";

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

const projects = [
  { img: work1, title: "Restaurant Lounge", category: "Commercial" },
  { img: work2, title: "Aviation Dining", category: "Hospitality" },
  { img: work3, title: "Contemporary Living", category: "Residential" },
  { img: work4, title: "Modular Kitchen", category: "Residential" },
  { img: work5, title: "Luxury Lounge", category: "Residential" },
  { img: work6, title: "Outdoor Seating", category: "Hospitality" },
  { img: work7, title: "Rooftop Café", category: "Commercial" },
  { img: work8, title: "Trophy Room", category: "Commercial" },
  { img: work9, title: "Kids Play Zone", category: "Commercial" },
];

const PROJECT_HEIGHT = 420;
const GAP = 24;

const OurWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const cardHeight = isMobile ? 240 : PROJECT_HEIGHT;
  const totalScrollHeight = (projects.length) * (cardHeight + GAP);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const maxTranslate = (projects.length - 1) * (cardHeight + GAP);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  const headlineWords = "Spaces We Designed".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalScrollHeight + 100}px` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-32 lg:pt-0">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center">
            {/* Left: Sticky text with split text reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 mt-8 sm:mt-0 font-body"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                Our Work
              </motion.p>
              <h2 className="text-4xl md:text-5xl text-foreground leading-tight mt-4 sm:mt-0">
                <motion.span
                  className="inline"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
                >
                  {headlineWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                      <motion.span className="inline-block" variants={wordReveal}>
                        {word}{i < headlineWords.length - 1 ? "\u00A0" : ""}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              </h2>
              <motion.p
                className="mt-6 text-muted-foreground font-body max-w-sm leading-relaxed"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
              >
                Explore our completed projects in the form of Residential, Commercial, and Office Interior Designers in Telangana.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
              >
                <MagneticWrap className="inline-block mt-8" strength={8}>
                  <a
                    href="/projects"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    View All Projects <ArrowRight className="w-4 h-4" />
                  </a>
                </MagneticWrap>
              </motion.div>

              {/* Progress dots */}
              <div className="mt-10 flex gap-2">
                {projects.map((_, i) => (
                  <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} total={projects.length} />
                ))}
              </div>
            </motion.div>

            {/* Right: Scrolling projects with image reveal */}
            <div className="relative h-[65vh] sm:h-[65vh] lg:h-[calc(100vh-120px)] overflow-hidden pb-10">
              <motion.div
                style={{ y: translateY }}
                className="flex flex-col"
                transition={{ type: "tween", ease: "linear" }}
              >
                {projects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    className="group relative overflow-hidden rounded-sm"
                    style={{
                      height: `${cardHeight}px`,
                      marginBottom: i < projects.length - 1 ? `${GAP}px` : 0,
                    }}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                      <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-xs text-secondary uppercase tracking-widest font-body">
                          {p.category}
                        </p>
                        <h3 className="text-lg text-background mt-1">{p.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Small progress dot component
function ProgressDot({
  index,
  scrollYProgress,
  total,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [0.25, 1, 1, 0.25]);
  const scale = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [1, 1.4, 1.4, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-secondary"
    />
  );
}

export default OurWorkSection;
