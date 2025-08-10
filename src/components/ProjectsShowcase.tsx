import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Categories",
  portfolio: "Portfolios",
  "landing": "Landing Pages",
  saas: "SaaS Apps",
  prototypes: "Prototypes",
  ai: "AI Integrated",
  services: "Service Tools"
};

type Project = {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  isPublic?: boolean;
  tags?: string[];
  category?: string; // backward compatibility (will be merged into categories)
  categories?: string[];
};

export default function ProjectsShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (projects as Project[]).filter(p => {
      const cats = (p.categories && p.categories.length ? p.categories : [p.category]).filter(Boolean).map(c => c!.toLowerCase());
      const catOk = category === "all" || cats.includes(category);
      const text = (p.title + " " + p.description + " " + (p.tags || []).join(" ") + " " + cats.join(" ")).toLowerCase();
      const qOk = !q || text.includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  const activeCount = filtered.length;

  return (
    <section id="projects" aria-label="Projects" className="py-16 sm:py-24">
      <div className="container">
        <header className="mb-8 sm:mb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Featured Work</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">What I’ve Built</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                A curated selection of projects with smooth motion, depth, and delightful micro‑interactions.
              </p>
            </div>
            <div className="w-full sm:w-80 flex flex-col gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key,label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key,label]) => {
              const isActive = category === key;
              return (
                <Button
                  key={key}
                  size="sm"
                  variant={isActive ? "default" : "secondary"}
                  onClick={() => setCategory(key)}
                  className="rounded-full px-4"
                >
                  {label}
                </Button>
              );
            })}
            <div className="ml-auto text-xs text-muted-foreground self-center">{activeCount} shown</div>
          </div>
        </header>

        <motion.ul
          key={category + query}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <motion.li key={p.title} variants={item}>
              <Card
                className="interactive-card interactive-card-transition overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl"
                onPointerMove={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  const rect = target.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  target.style.setProperty('--mx', x + 'px');
                  target.style.setProperty('--my', y + 'px');
                }}
              >
                <div className="fx-overlay">
                  <div className="fx-gradient" />
                  <div className="fx-clouds">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} preview by Abdul Hajees`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                </div>
                <div className="p-5 lift relative z-[1]">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                  </div>
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
          {filtered.length === 0 && (
            <div className="col-span-full text-sm text-muted-foreground p-8 border border-dashed rounded-md text-center">
              No projects match your search.
            </div>
          )}
        </motion.ul>
      </div>
    </section>
  );
}
