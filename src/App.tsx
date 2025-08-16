import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FloatingRobot from "@/components/FloatingRobot";
import Index from "./pages/Index";
import HireMe from "./pages/HireMe";
import NotFound from "./pages/NotFound";
import Archive from "./pages/Archive";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="global-ambient" aria-hidden="true" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hireme" element={<HireMe />} />
            <Route path="/archive" element={<Archive />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <FloatingRobot />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
