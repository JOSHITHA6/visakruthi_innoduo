import Navbar from "./Navbar";
import Footer from "./Footer";
import KalaSaathi from "./KalaSaathi";
import SvarGuide from "./SvarGuide";

export default function Layout({ children }) {
  return (
    <div className="content-shell min-h-screen">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <SvarGuide />
      <KalaSaathi />
    </div>
  );
}
