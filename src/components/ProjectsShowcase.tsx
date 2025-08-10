import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  url: string;
  tags?: string[];
}

const projects: ProjectItem[] = [
  {
    title: "Time and Thought",
    description:
      "A blog showcase powered by Firebase where anyone can submit posts. Content is managed dynamically for easy publishing.",
    image: "https://www.abdulhajees.in/Resources/project_1.jpg",
    url: "https://blogs.abdulhajees.in/",
    tags: ["Firebase", "Blog", "CMS"],
  },
  {
    title: "AH Chat Bot",
    description:
      "Conversational AI built with Google Gemini API that simulates human‑like interactions with fast, contextual responses.",
    image: "https://www.abdulhajees.in/Resources/project_2.jpg",
    url: "https://ai.abdulhajees.in/",
    tags: ["AI", "Gemini", "Chat"],
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing skills, experiences, certificates, and projects — a reflection of professional growth.",
    image: "https://www.abdulhajees.in/Resources/project_3.jpg",
    url: "https://me.abdulhajees.in/",
    tags: ["Portfolio", "Design", "Web"],
  },
  {
    title: "Search Hub",
    description:
      "A web tool with a multi‑engine search bar for platforms like Shodan and GHDB — great for cross‑platform discovery.",
    image: "https://www.abdulhajees.in/Resources/project_4.jpg",
    url: "https://search.abdulhajees.in/",
    tags: ["Search", "Utilities"],
  },
  {
    title: "AH Assistant AI",
    description:
      "An assistant that shares insights about Abdul Hajees — work, achievements, and interests — via conversational AI.",
    image: "https://www.abdulhajees.in/Resources/project_5.jpg",
    url: "https://about.abdulhajees.in/",
    tags: ["AI", "Profile"],
  },
];

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
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
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
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="mt-4">
                      <Button variant="secondary" className="hover-scale">View live project</Button>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
