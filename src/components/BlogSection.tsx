import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogList } from "@/services/blogService";
import { mediaUrl } from "@/config/api";
import ImageReveal from "./animations/ImageReveal";
import MagneticWrap from "./animations/MagneticWrap";

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

const textSlideUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const BlogSection = () => {
  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["blogList"],
    queryFn: fetchBlogList,
  });

  const posts = allPosts.slice(0, 3);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Header with split text reveal */}
        <motion.div
          className="flex items-end justify-between mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
        >
          <div>
            <motion.p variants={textSlideUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
              Insights
            </motion.p>
            <h2 className="text-4xl md:text-5xl text-foreground">
              <motion.span
                className="inline"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
              >
                {"Latest Blogs".split(" ").map((word, i, arr) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span className="inline-block" variants={wordReveal}>
                      {word}{i < arr.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>
          </div>
          <motion.a
            variants={textSlideUp}
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-primary font-body font-medium hover:text-secondary transition-colors"
            whileHover={{ x: 4 }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-[0_12px_40px_hsl(var(--secondary)/0.12)] hover:border-secondary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: EASE_OUT }}
                whileHover={{ y: -6 }}
              >
                <ImageReveal direction="right" delay={i * 0.1} duration={1} className="overflow-hidden">
                  <img
                    src={mediaUrl(post.image)}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </ImageReveal>
                <div className="p-6">
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE_OUT }}
                  >
                    {post.tags && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full font-body">
                        {post.tags.split(",")[0]?.trim()}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                      <Calendar className="w-3 h-3" />{" "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </motion.div>
                  <h3 className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                    {post.short_description}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-secondary font-body group-hover:gap-3 transition-all duration-300"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT }}
        >
          <MagneticWrap className="inline-block" strength={8}>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
            >
              View More <ArrowRight className="w-4 h-4" />
            </a>
          </MagneticWrap>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
