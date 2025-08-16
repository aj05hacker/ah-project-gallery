import Spotlight from "@/components/Spotlight";
import TopRightControls from "@/components/TopRightControls";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import projectsData from "../projects.json";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  isPublic?: boolean;
  categories?: string[];
  category?: string;
  tags?: string[];
  year?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const getArchiveProjects = (list: Project[]): Project[] => {
  return (list || []).filter(p => {
    const cats = (p.categories && p.categories.length ? p.categories : [p.category]).filter(Boolean) as string[];
    return cats.some(c => c.toLowerCase() === "archive" || c.toLowerCase() === "archived");
  });
};

export default function Archive() {
  const archived = getArchiveProjects(projectsData as Project[]);
  const hasAny = archived.length > 0;

  return (
    <main>
      <div className="flex justify-end items-center gap-2 pt-4 pr-4">
        <TopRightControls />
      </div>
      <Helmet>
        <title>Archived Projects · Abdul Hajees</title>
        <meta name="description" content="Older or experimental projects moved to the archive." />
  {/* Prevent indexing but allow access for direct visitors */}
  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href="https://gallery.abdulhajees.in/archive" />
      </Helmet>

      <Spotlight />

      <header className="container pt-16 sm:pt-24">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Project Archive</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-tight">Archived Experiments</h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          A quieter corner for early drafts, experiments, or designs that no longer reflect the current standard. Visitors can explore, but recruiters should focus on the main gallery.
        </p>
        <div className="mt-6">
          <a href="/">
            <Button variant="secondary">Back to Gallery</Button>
          </a>
        </div>
      </header>

      <section className="py-16 sm:py-24">
        <div className="container">
          {!hasAny && (
            <div className="text-sm text-muted-foreground p-8 border border-dashed rounded-md text-center">
              No archived projects yet.
            </div>
          )}

          {hasAny && (
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {archived.map((p) => (
                <motion.li key={p.title} variants={item}>
                  <Card className="interactive-card interactive-card-transition overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl">
                    <div className="fx-overlay">
                      <div className="fx-gradient" />
                      <div className="fx-clouds">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={p.image} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                    </div>
                    <div className="p-5 lift relative z-[1]">
                      <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                      {p.tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
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
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="hover-scale">
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </Button>
                          </a>
                        ) : !p.isPublic ? (
                          <Button variant="outline" className="hover-scale" disabled>
                            <Github className="w-4 h-4 mr-2" />
                            Private
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                </motion.li>
              ))}
            </motion.ul>
          )}

          <div className="mt-12 text-center">
            <a href="/">
              <Button variant="secondary">Back to Gallery</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
