import { useEffect, useRef, useState } from "react";
import "./style.css";

export function BorderArrow({ dir }: { dir: "top" | "bottom" }) {
  const [active, setActive] = useState(true);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      hasScrolledRef.current = true;
      if (dir === "top") setActive(window.scrollY <= 0 || (!hasScrolledRef.current && window.scrollY - window.innerHeight < window.outerWidth));
      else setActive(window.scrollY > window.outerHeight);
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  if (!active) return <></>;

  function handleClick() {
    if (dir === "top") {
      window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: "smooth" });
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  }
  let path = dir === "top" ? "M20 35 L50 65 L80 35" : "M20 65 L50 35 L80 65";

  return (
    <div onClick={handleClick} className={`border-arrow ${dir}`}>
      <svg className="arrow-icon" viewBox="0 0 100 100" fill="currentColor">
        <path d={path} fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
