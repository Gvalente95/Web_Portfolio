import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { DevPage } from "./pages/dev/DevPage";
import { MusicianPage } from "./pages/musician/MusicianPage";
import { HomePage } from "./pages/home/HomePage";
import { AudioEngineerPage } from "./pages/audio-engineer/AudioEngineerPage";
import { isMobile } from "@/utils/navigation";
import { HeaderMobile } from "./header/mobile/HeaderMobile";

import "./style.css";

export type PageType = "audio" | "music" | "dev" | "home";

export function PageContainer({ page }: { page?: PageType }) {
  return (
    <div className="page-content">
      {isMobile() ? <HeaderMobile /> : <Header />}
      {page === "audio" ? <AudioEngineerPage /> : page === "dev" ? <DevPage /> : page === "music" ? <MusicianPage /> : <HomePage />}
      <Footer />
    </div>
  );
}
