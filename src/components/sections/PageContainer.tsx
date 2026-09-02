import { Header } from "./header/Header";
import { DevPage } from "./pages/dev/DevPage";
import { MusicianPage } from "./pages/musician/MusicianPage";
import { HomePage } from "./pages/home/HomePage";
import { AudioEngineerPage } from "./pages/audio-engineer/AudioEngineerPage";
import { isMobile } from "@/utils/navigation";
import { HeaderMobile } from "./header/mobile/HeaderMobile";
import { BorderArrow } from "../floating/borderArrow/BorderArrow";
import { LateralBar } from "../floating/lateralBar/LateralBar";

import "./style.css";
import { SimpleFooter } from "./footer/SimpleFooter";

export type PageType = "audio" | "music" | "dev" | "home";

export function PageContainer({ page }: { page?: PageType }) {
  return (
    <div className="page-content">
      {isMobile() ? <HeaderMobile /> : <Header />}
      {page === "audio" ? <AudioEngineerPage /> : page === "dev" ? <DevPage /> : page === "music" ? <MusicianPage /> : <HomePage />}
      <BorderArrow dir="top" />
      {!isMobile() ? <BorderArrow dir="bottom" /> : null}
      {!isMobile() ? <LateralBar /> : null}
      <SimpleFooter />
    </div>
  );
}
