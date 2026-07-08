import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePageChange() {
  const { pathname } = useLocation();
  const [pageVersion, setPageVersion] = useState(0);

  useEffect(() => {
    setPageVersion((v) => v + 1);
  }, [pathname]);

  return pageVersion;
}
