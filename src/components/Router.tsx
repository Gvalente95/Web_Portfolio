import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import i18n from "../i18n";
import { PageContainer, type PageType } from "./sections/PageContainer";
import { Debugger } from "./debugger/debugger";

const supportedLangs = ["en", "fr", "it"] as const;

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
      <PageContainer page={page as PageType} />
      <Debugger />
    </>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LangRoute />} />
        <Route path="/:lang/:page?" element={<LangRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
