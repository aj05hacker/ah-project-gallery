import Spotlight from "@/components/Spotlight";
import TopRightControls from "@/components/TopRightControls";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Globe, Github, Instagram } from "lucide-react";

const Index = () => {
  return (
    <main>
      <TopRightControls />
      <Helmet>
  <title>Abdul Hajees · Project Gallery</title>
        <meta
          name="description"
          content="Step into Abdul Hajees' Project Gallery - a curated showcase of web applications, design experiments, and AI workflows displayed in an interactive exhibition space."
        />
      </Helmet>

      <Spotlight />

      <header className="container pt-16 sm:pt-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">PROJECT GALLERY</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-tight">Abdul Hajees</h1>
            <p className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 text-transparent bg-clip-text">
              Professional Enough to Impress, Fun Enough to Stay
            </p>
            <p className="mt-3 text-lg text-muted-foreground">Curator & Creator</p>
            <p className="mt-4 max-w-prose text-muted-foreground">
              <strong>Welcome to my digital gallery.</strong> I'm Abdul Hajees, a B.Tech IT graduate from Trichy who loves shaping friendly, curious digital experiences. This space holds my living collection of experiments: polished web apps, whimsical interface studies, and playful AI builds. Every piece is laid out so you can wander, tap, and explore at your own rhythm.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects"><Button variant="default">Browse Gallery</Button></a>
              <a href="https://blogs.abdulhajees.in/" target="_blank" rel="noreferrer">
                <Button variant="secondary">Visit My Journal</Button>
              </a>
            </div>
          </div>

          <article className="text-sm leading-7 text-muted-foreground">
            <p>
              <strong>Gallery Overview.</strong> Each piece here tells a tiny story: production ready web apps, exploratory interface sketches, AI workflow prototypes, and little creative detours. Stroll through, open live demos, peek at source code, and enjoy the making-of energy behind every build.
            </p>
            <p className="mt-4">
              <strong>What's on Display.</strong> React • TypeScript • Next.js • Tailwind & shadcn‑ui • Node & APIs • Design systems • AI tooling & workflow automation • Creative coding experiments and cheerful prototypes.<br /><br />
              <strong>Guest Book.</strong> Did something spark an idea or a smile? Say hi on <a href="https://www.linkedin.com/in/abdulhajees" target="_blank" rel="noreferrer" className="underline underline-offset-2">LinkedIn</a> or drop a note at <a href="mailto:me@abdulhajees.in" className="underline underline-offset-2">me@abdulhajees.in</a>.
            </p>
            <div className="mt-8 pt-6 border-t" aria-label="Social links">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Connect</p>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <a
                  href="https://www.linkedin.com/in/abdulhajees"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide uppercase">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/abdulhajeesprojects"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide uppercase">GitHub</span>
                </a>
                <a
                  href="mailto:me@abdulhajees.in"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide uppercase">Email</span>
                </a>
                <a
                  href="https://blogs.abdulhajees.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide uppercase">Blog</span>
                </a>
                <a
                  href="https://instagram.com/abdulhajees"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wide uppercase">Instagram</span>
                </a>
                <a
                  href="https://www.fiverr.com/abdulhajees"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.5 1.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-4 5c-.8 0-1.5.7-1.5 1.5S7.7 9.5 8.5 9.5 10 8.8 10 8s-.7-1.5-1.5-1.5zm8 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-4 5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-8 0c-.8 0-1.5.7-1.5 1.5S3.7 13.5 4.5 13.5 6 12.8 6 12s-.7-1.5-1.5-1.5zm16 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-12 5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm8 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"/>
                  </svg>
                  <span className="text-xs font-medium tracking-wide uppercase">Fiverr</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </header>

      <ProjectsShowcase />

      <footer className="container py-12 border-t mt-8 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Abdul Hajees. Curated with React, Tailwind, and creative curiosity.</p>
      </footer>
    </main>
  );
};

export default Index;
