export function openPage(page: string) {
  window.open(page, "_blank", "noopener,noreferrer");
}

export const scrollToSection = (section: string) => {
  document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
};

export const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
