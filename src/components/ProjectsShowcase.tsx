import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import projects from "../projects.json";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsShowcase() {
  return (
    <section id="projects" aria-label="Projects" className="py-16 sm:py-24">
      <div className="container">
        <header className="mb-10 sm:mb-14">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Featured Work</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
            What I’ve Built
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A curated selection of projects with smooth motion, depth, and delightful micro‑interactions.
          </p>
        </header>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.li key={p.title} variants={item}>
              <Card className="overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-[var(--shadow-elev)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} preview by Abdul Hajees`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                  {p.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t: string) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="hover-scale">View Project</Button>
                      </a>
                    )}
                    {p.isPublic && p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="hover-scale">GitHub</Button>
                      </a>
                    ) : (
                      <Button variant="outline" className="hover-scale" disabled>Private</Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
