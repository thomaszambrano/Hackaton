import TopBar from "./components/Layout/TopBar";
import Header from "./components/Layout/Header";
import HeroBanner from "./components/Features/HeroBanner";
import PqrsInfo from "./components/Features/PqrsInfo";
import InfoGrid from "./components/Features/InfoGrid";
import ActionSelector from "./components/Features/ActionSelector";
import Footer from "./components/Layout/Footer";

export default function App() {
  return (
    <div className="font-work text-gray-800 bg-[#f9fafb] min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <PqrsInfo />
        <InfoGrid />
        <ActionSelector />
      </main>
      <Footer />
    </div>
  );
}
