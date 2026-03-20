import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import PasswordGate from "./components/PasswordGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobsManager from "./pages/admin/JobsManager";
import ResourcesManager from "./pages/admin/ResourcesManager";
import DepartmentsManager from "./pages/admin/DepartmentsManager";
import CouncilManager from "./pages/admin/CouncilManager";
import SiteContentEditor from "./pages/admin/SiteContentEditor";

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) setLocation("/admin/login");
  }, [loading, user, setLocation]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#c8d5e0" }}><p style={{ color: "#555" }}>Loading...</p></div>;
  if (!user) return null;
  return <Component />;
}

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
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/jobs">{() => <AdminRoute component={JobsManager} />}</Route>
      <Route path="/admin/resources">{() => <AdminRoute component={ResourcesManager} />}</Route>
      <Route path="/admin/departments">{() => <AdminRoute component={DepartmentsManager} />}</Route>
      <Route path="/admin/council">{() => <AdminRoute component={CouncilManager} />}</Route>
      <Route path="/admin/content">{() => <AdminRoute component={SiteContentEditor} />}</Route>
      <Route path="/admin">{() => <AdminRoute component={AdminDashboard} />}</Route>
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
      <AuthProvider>
        <PasswordGate>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <Toaster />
              <ScrollToTop />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </PasswordGate>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
