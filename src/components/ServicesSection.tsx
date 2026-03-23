import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import { Link } from "react-router-dom";
import { ArrowUpRight, Home, Building2, LayoutGrid, Palette, FolderKanban, BadgeCheck } from "lucide-react";
import Galaxy from "./Galaxy";
import consultationImg from "@/assets/services/consultation.jpg";
import designPlanningImg from "@/assets/services/design-planning.jpg";
import spaceOptImg from "@/assets/services/space-optimization.jpg";
import colourImg from "@/assets/services/colour-schemes.jpg";
import qualityImg from "@/assets/services/quality.jpg";
import projectMgmtImg from "@/assets/services/project-management.jpg";

const serviceIcons = [Home, Building2, LayoutGrid, Palette, FolderKanban, BadgeCheck];

export const services = [
  { slug: "residential-interior-design", title: "Residential Interior Design", image: consultationImg, desc: "Transforming homes into personalised, functional living spaces.", fullDesc: "We design homes that reflect your personality and lifestyle. From cosy bedrooms to elegant living rooms, our residential interior design service covers space planning, material selection, furniture curation, and styling — creating warm, inviting spaces that feel uniquely yours. Every detail is crafted to balance aesthetics with everyday comfort." },
  { slug: "commercial-interior-design", title: "Commercial Interior Design", image: designPlanningImg, desc: "Professional interiors for offices, retail & hospitality spaces.", fullDesc: "Our commercial design expertise transforms workplaces, retail outlets, restaurants, and hospitality venues into high-performing environments. We consider brand identity, employee well-being, customer experience, and operational efficiency to deliver interiors that elevate your business and leave lasting impressions." },
  { slug: "space-planning-concept-development", title: "Space Planning & Concept Development", image: spaceOptImg, desc: "Strategic layouts, zoning & creative concept ideation.", fullDesc: "Great interiors begin with great planning. We develop comprehensive spatial strategies with functional zoning, traffic flow analysis, and creative concept ideation. Through mood boards, 3D visualisations, and detailed floor plans, we map every square foot to ensure your space is both beautiful and brilliantly functional." },
  { slug: "material-color-consultation", title: "Material & Color Consultation", image: colourImg, desc: "Expert guidance on palettes, textures, finishes & materials.", fullDesc: "Choosing the right materials and colours is critical to achieving the desired look and feel. Our consultants combine colour psychology with hands-on material expertise to develop cohesive palettes and textures. From paint finishes and flooring to fabrics and fixtures, every selection is curated to create a harmonious, lasting interior." },
  { slug: "end-to-end-project-execution", title: "End-to-end Project Execution", image: projectMgmtImg, desc: "Complete project management from concept to move-in.", fullDesc: "We manage your entire project from initial concept through to final handover. Our end-to-end service includes vendor coordination, timeline management, on-site supervision, budget tracking, and quality inspections at every phase. With a single point of contact and regular progress updates, we deliver a stress-free experience and move-in ready spaces." },
  { slug: "quality-of-service", title: "Quality of Service", image: qualityImg, desc: "Snag correction, decor layering & meticulous finishing.", fullDesc: "Quality is at the heart of everything we do. Our meticulous approach includes thorough snag correction, precise decor layering, and attention to the finest finishing details. We conduct multiple quality checks throughout the project to ensure every element meets our exacting standards and your expectations." },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.7, ease: easeOut },
  },
});

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-foreground">
      {/* Galaxy background */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <AnimatedTitle
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-[0.15em]"
            delay={0.1}
          >
            Where Innovation Meet Interior Design
          </AnimatedTitle>
        </motion.div>

        {/* Cards Grid — vertical card layout like reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={s.slug}
                variants={cardVariant(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link to={`/services/${s.slug}`} className="group block h-full">
                  <div className="relative h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col transition-all duration-500 hover:border-secondary/40 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_hsl(var(--secondary)/0.1)]">
                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-5 group-hover:border-secondary/50 transition-colors duration-500">
                      <Icon className="w-6 h-6 text-secondary/80 group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-sm font-bold uppercase tracking-wider leading-snug mb-4 min-h-[2.5rem]">
                      {s.title}
                    </h3>

                    {/* Image */}
                    <div className="relative rounded-lg overflow-hidden mb-5 aspect-[4/3]">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Description */}
                    <p className="text-white/50 text-sm font-body leading-relaxed flex-1 mb-5">
                      {s.desc}
                    </p>

                    {/* Arrow link */}
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-secondary transition-colors duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
