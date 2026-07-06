import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import i18n from "../i18n";
import { PageContainer, type PageType } from "./sections/PageContainer";
import { Debugger } from "./debugger/debugger";
import { FloatingElements } from "./floating/FloatingElements";
import { useEffect } from "react";

const supportedLangs = ["en", "fr", "it"] as const;

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

function LangRoute() {
  const { lang, page } = useParams();

  if (!supportedLangs.includes(lang as any)) {
    return <Navigate to="/en" replace />;
  }

  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <FloatingElements />
      <PageContainer page={page as PageType} />
      <Debugger />
    </>
  );
}

export function Router() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LangRoute />} />
        <Route path="/:lang/:page?" element={<LangRoute />} />
      </Routes>
    </HashRouter>
  );
}
