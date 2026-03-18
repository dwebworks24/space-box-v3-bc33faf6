import { motion } from "framer-motion";
import { Building2, Home, Monitor, Hotel, UtensilsCrossed, TreePine, Coffee } from "lucide-react";
import MagneticWrap from "./animations/MagneticWrap";

const categories = [
  { label: "Commercial", icon: Building2 },
  { label: "Residential", icon: Home },
  { label: "Office Design", icon: Monitor },
  { label: "Hospitality", icon: Hotel },
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Play Area", icon: TreePine },
  { label: "Cafe", icon: Coffee },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CategoryBar = () => {
  return (
    <section className="bg-card border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 md:px-16">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.7, ease: EASE_OUT },
                },
              }}
            >
              <MagneticWrap strength={6} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                  <cat.icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-300"
                  />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground group-hover:text-secondary transition-colors duration-300 font-body text-center">
                  {cat.label}
                </span>
              </MagneticWrap>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryBar;
