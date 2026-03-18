import { motion } from "framer-motion";
import { Shield, Clock, Gem, Handshake, Leaf, HeartHandshake } from "lucide-react";
import LineReveal from "./animations/LineReveal";

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

const promises = [
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Carefully selected materials, experienced workmanship, and site-level supervision ensure consistent quality.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Defined project timelines and milestone tracking help us complete projects as committed.",
  },
  {
    icon: Gem,
    title: "Transparent Pricing",
    desc: "Clear scope of work, structured costing, and detailed quotations with no hidden charges.",
  },
  {
    icon: Handshake,
    title: "Client-First Approach",
    desc: "Every design is developed around your lifestyle, operational needs, and long-term usability.",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    desc: "Thoughtful material selection and energy-efficient planning integrated into every project.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Project Support",
    desc: "We remain available for assistance and support even after project handover.",
  },
];

const PromisesSection = () => {
  return (
    <section className="py-28 bg-background border-t border-border">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Header — cinematic word reveal */}
        <div className="mb-20">
          <motion.p
            className="text-secondary text-xs uppercase tracking-[0.4em] mb-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            Our Commitment
          </motion.p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2 className="text-4xl md:text-5xl text-foreground leading-tight max-w-md">
              <motion.span
                className="inline"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.06, delayChildren: 0.15 }}
              >
                {"Promises We Stand By".split(" ").map((word, i, arr) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span className="inline-block" variants={wordReveal}>
                      {word}{i < arr.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>
            <motion.p
              className="text-muted-foreground font-body max-w-sm text-sm leading-relaxed pb-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              We deliver reliable interior design services across Telangana with accountability at every stage.
            </motion.p>
          </div>
          <LineReveal className="h-px w-full bg-border mt-10" delay={0.5} duration={1.2} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
              className="group"
            >
              <div className="flex items-start gap-5">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border group-hover:border-secondary transition-colors duration-500"
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <p.icon
                    className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <div>
                  <h3 className="text-base text-foreground mb-2 tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromisesSection;
