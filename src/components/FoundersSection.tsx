import { useState } from 'react';
import { motion } from 'framer-motion';
import teamMockup from '@/assets/team-mockup.jpg';
import teamBg from '@/assets/team-bg.jpg';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const founders = [
  {
    name: 'Amruta Desai',
    role: 'Managing Director, Finance & Strategy',
    bio: 'Amruta Desai is a strategic finance and business operations leader with extensive experience in corporate planning, budgeting, and organizational growth. As Managing Director at Spacebox Concepts, she oversees financial strategy, resource allocation, and long-term business development. Her analytical mindset and structured approach to decision-making ensure sustainable growth and operational efficiency across all verticals.',
    image: teamMockup,
  },
  {
    name: 'Mini Khapekar',
    role: 'Managing Partner, Spacebox Concepts',
    bio: 'Mini Khapekar is a seasoned technology and operations leader with 19 years of experience in the IT industry and over a decade in management. She drives operations, administration, and execution at Spacebox Concepts with a structured, process-driven approach. She also serves as Director of Engineering at a fast-growing startup, blending operational excellence with innovation-driven thinking.',
    image: teamMockup,
  },
  {
    name: 'Prathyusha Ravula',
    role: 'Interior Design Lead & Founder',
    bio: 'Prathyusha Ravula is a passionate interior designer with 8 years of professional experience delivering refined, functional, and timeless interiors. Known for a detail-driven approach and client-focused design philosophy, she specializes in creating spaces that balance aesthetics, comfort, and individuality.',
    image: teamMockup,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function FoundersSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={teamBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
            The Minds Behind Spacebox
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
            Meet the <span className="text-secondary">Founders</span>
          </motion.h2>
        </motion.div>

        {/* Accordion Cards — Desktop */}
        <div
          className="hidden md:flex gap-3 h-[420px] lg:h-[480px]"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {founders.map((f, i) => {
            const isActive = activeIndex === i;
            const hasActive = activeIndex !== null;

            return (
              <motion.div
                key={f.name}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-primary-foreground/10 hover:border-secondary/40"
                style={{
                  flex: isActive ? 3 : hasActive ? 0.5 : 1,
                  transition: 'flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: easeOut }}
              >
                {/* Full image — always visible */}
                <img
                  src={f.image}
                  alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

                {/* Collapsed state — name & title at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-500"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <h3 className="text-lg font-bold text-primary-foreground leading-tight">{f.name}</h3>
                  <p className="text-secondary text-xs font-body mt-1">{f.role}</p>
                </div>

                {/* Expanded state — split layout with bio panel */}
                <div
                  className="absolute inset-0 z-10 flex transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  {/* Left spacer for image area */}
                  <div className="w-[45%] shrink-0" />

                  {/* Right bio panel */}
                  <div className="flex-1 flex flex-col justify-center px-8 py-10 bg-gradient-to-r from-primary/80 via-primary/90 to-primary/95">
                    <div
                      className="transition-all duration-600"
                      style={{
                        transform: isActive ? 'translateX(0)' : 'translateX(40px)',
                        opacity: isActive ? 1 : 0,
                        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.5s ease 0.15s',
                      }}
                    >
                      <div className="h-px w-12 bg-secondary mb-5" />
                      <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">{f.name}</h3>
                      <p className="text-secondary text-sm font-body mb-5">{f.role}</p>
                      <p className="text-primary-foreground/70 text-sm font-body leading-relaxed max-w-sm">
                        {f.bio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div
                  className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-secondary/40 rounded-tr-lg z-20 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
                <div
                  className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg z-20 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile — stacked cards */}
        <div className="md:hidden space-y-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="relative rounded-2xl overflow-hidden border border-primary-foreground/10 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-primary-foreground mb-1">{f.name}</h3>
                <p className="text-secondary text-sm font-body mb-3">{f.role}</p>
                <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-primary-foreground/40 font-body mt-16 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          12+ In-house Designers, Design Managers, Execution Managers & Sales Managers driving innovation.
        </motion.p>
      </div>
    </section>
  );
}
