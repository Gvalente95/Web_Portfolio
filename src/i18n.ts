import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const common = {
  name: "Giulio Valente",
  email: "giulio@example.com",
  github: "GitHub",
  linkedin: "LinkedIn",
  loading: "Loading...",
  country: "Switzerland",
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        langPath: "/en",
        language: "English",
        common,
        hero: {
          greeting: "Hello! I'm ",
          brief: {
            character: "Patient, passionate, pragmatic",
            spec: "ui/ux, sound-design, software architecture",
          },
        },
        about: {},
        skills: {},
        projects: {},
        contact: {},
        footer: {},
        header: {
          pages: {
            dev: "Developper",
            audio: "Audio-engineer",
            music: "Music",
          },
          languages: {
            en: "English",
            fr: "French",
            it: "Italian",
          },
        },
      },
    },
    fr: {
      translation: {
        common,
        langPath: "/fr",
        language: "Français",
        hero: {
          greeting: "Salut! Moi c'est ",
          brief: {
            character: "Patient, Passioné, pragmatique",
            spec: "ui/ux, sound-design, architecture de software",
          },
        },
        about: {},
        skills: {},
        projects: {},
        contact: {},
        footer: {},
        header: {
          pages: {
            dev: "Developpeur",
            audio: "Ingénieur son",
            music: "Musique",
          },
          languages: {
            en: "Angais",
            fr: "Français",
            it: "Italien",
          },
        },
      },
    },
    it: {
      translation: {
        common,
        langPath: "/it",
        language: "Italiano",
        hero: {
          greeting: "Ciao! Sono",
          brief: {
            character: "Paziente, Apassionato, pragmatico",
            spec: "ui/ux, sound-design, software architecture",
          },
        },
        about: {},
        skills: {},
        projects: {},
        contact: {},
        footer: {},
        header: {
          pages: {
            dev: "Sviluppatore Informatico",
            audio: "Ingeniere Audio",
            music: "Musica",
          },
          languages: {
            en: "Inglese",
            fr: "Francese",
            it: "Italiano",
          },
        },
      },
    },
  },
});

export default i18n;
