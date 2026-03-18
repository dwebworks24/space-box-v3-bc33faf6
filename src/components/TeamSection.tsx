import { motion } from "framer-motion";
import teamMockup from "@/assets/team-mockup.jpg";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const team = [
  { name: "Amruta Desai", role: "Managing Director, Finance & Strategy", image: teamMockup },
  { name: "Mini Khapekar", role: "Managing Director, Operations & Execution", image: teamMockup },
  { name: "Pratyusha Ravula", role: "Principal Designer & Founder", image: teamMockup },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

const cardPop = (i: number) => ({
  hidden: { opacity: 0, y: 60, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: easeOut },
  },
});

const TeamSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2 variants={fadeBlurUp} className="text-4xl md:text-5xl text-foreground mb-4">
            Our Team
          </motion.h2>
          <motion.p variants={fadeBlurUp} className="text-muted-foreground font-body max-w-xl mx-auto mb-16">
            12+ In-house Designers, Design Managers, Execution Managers & Sales Managers driving innovation.
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto perspective-container">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardPop(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -12,
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              className="flex flex-col items-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-28 h-28 rounded-full object-cover shadow-lg"
                />
                {/* Glow ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-secondary/0"
                  whileHover={{ borderColor: "hsl(var(--secondary) / 0.6)", scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground font-body">{t.name}</h3>
              <p className="text-sm text-muted-foreground font-body mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
