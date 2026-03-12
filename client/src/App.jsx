import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ExploreCrafts from "./pages/ExploreCrafts";
import ArtisanProfile from "./pages/ArtisanProfile";
import Workshops from "./pages/Workshops";
import Volunteer from "./pages/Volunteer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { LanguageProvider } from "./components/LanguageContext";
import { trackVisitor } from "./services/api";

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const sessionId = window.localStorage.getItem("visakruthiSession") || crypto.randomUUID();
    window.localStorage.setItem("visakruthiSession", sessionId);

    trackVisitor({
      sessionId,
      path: location.pathname
    }).catch(() => {});
  }, [location.pathname]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <VisitorTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/explore" element={<ExploreCrafts />} />
          <Route path="/artisans/:artisanId" element={<ArtisanProfile />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}
