import Spotlight from "@/components/Spotlight";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Download, Phone } from "lucide-react";

const HireMe = () => {
  return (
    <main>

      <Helmet>
        <title>Hire Me · Abdul Hajees</title>
        <meta name="description" content="Contact Abdul Hajees for web development, UI/UX, and creative coding projects. Download resume, email, WhatsApp, and LinkedIn." />
      </Helmet>
      <Spotlight />
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <section className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-background/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-border flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-center">Hire Me</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 text-center max-w-prose">Let's build something great together. Reach out for freelance, full-time, or collaboration opportunities.</p>
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            <a href="/Abdul_Hajees_Resume.pdf" download>
              <Button variant="default" className="w-full flex items-center gap-2 text-sm sm:text-base h-10 sm:h-11">
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </a>
            <a href="mailto:me@abdulhajees.in">
              <Button variant="outline" className="w-full flex items-center gap-2 text-sm sm:text-base h-10 sm:h-11">
                <Mail className="w-4 h-4" />
                Email: me@abdulhajees.in
              </Button>
            </a>
            <a href="https://wa.me/919361730050" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full flex items-center gap-2 text-sm sm:text-base h-10 sm:h-11">
                <Phone className="w-4 h-4" />
                WhatsApp: +91 93617 30050
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/abdulhajees" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full flex items-center gap-2 text-sm sm:text-base h-10 sm:h-11">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </a>
          </div>
        </section>
      </header>
    </main>
  );
};

export default HireMe;
