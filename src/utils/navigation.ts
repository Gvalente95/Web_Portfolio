export function openPage(page: string) {
  window.open(page, "_blank", "noopener,noreferrer");
}

export const scrollToSection = (section: string, offset = 0) => {
  const element = document.getElementById(section.toLowerCase());
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export const isMobile = () => window.matchMedia("(max-width: 700px)").matches;
