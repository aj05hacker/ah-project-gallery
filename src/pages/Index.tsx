import Spotlight from "@/components/Spotlight";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Globe, Github, Instagram } from "lucide-react";

const Index = () => {
  return (
    <main>
      <Helmet>
        <title>Abdul Hajees — Project Gallery</title>
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
            <p className="mt-2 text-lg text-muted-foreground">Curator & Creator</p>
            <p className="mt-4 max-w-prose text-muted-foreground">
              <strong>Welcome to my digital gallery.</strong> I'm Abdul Hajees, a B.Tech IT graduate from Trichy who curates and creates digital experiences. This exhibition space showcases my ongoing experiments—from polished web applications to playful AI workflows—each piece thoughtfully displayed for your exploration.
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
              <strong>Gallery Overview.</strong> Each exhibition piece in this digital space tells a story—whether it's a production-ready web application, an experimental interface study, or an AI workflow prototype. Browse at your own pace, click through live demos, peek behind the scenes at source code, and discover the creative process behind each build.
            </p>
            <p className="mt-4">
              <strong>What's on Display.</strong> React • TypeScript • Next.js • Tailwind & shadcn‑ui • Node & APIs • UI/UX Design Systems • AI tooling & workflow automation • Creative coding experiments.<br /><br />
              <strong>Gallery Guest Book.</strong> Enjoyed exploring? Found something that sparked an idea? Let's connect on <a href="https://www.linkedin.com/in/abdulhajees" target="_blank" rel="noreferrer" className="underline underline-offset-2">LinkedIn</a> or drop me a line at <a href="mailto:me@abdulhajees.in" className="underline underline-offset-2">me@abdulhajees.in</a>.
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
