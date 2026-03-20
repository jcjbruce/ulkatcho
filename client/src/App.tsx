import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Resources from "./pages/Resources";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ChiefCouncil from "./pages/ChiefCouncil";
import MemberPortal from "./pages/MemberPortal";
import VisionFuture from "./pages/VisionFuture";
import HistoryPage from "./pages/HistoryPage";
import AncestralOrigins from "./pages/AncestralOrigins";
import Travellers from "./pages/Travellers";
import Departments from "./pages/Departments";
import JobDetail from "./pages/JobDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/vision-future" component={VisionFuture} />
      <Route path="/history-of-ulkatcho-first-nation" component={HistoryPage} />
      <Route path="/ancestral-origins" component={AncestralOrigins} />
      <Route path="/travellers-entrepreneurs" component={Travellers} />
      <Route path="/education" component={Education} />
      <Route path="/resources" component={Resources} />
      <Route path="/careers/:slug" component={JobDetail} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/departments" component={Departments} />
      <Route path="/chief-council" component={ChiefCouncil} />
      <Route path="/member-portal" component={MemberPortal} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
