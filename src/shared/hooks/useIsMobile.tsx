import { useEffect, useState } from "react";

export function useIsMobile() {
  const query = "(max-width: 700px)";
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return mobile;
}
