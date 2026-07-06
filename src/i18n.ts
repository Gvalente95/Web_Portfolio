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
        about: {
          title: "Audio engineer and Frontend developer.",
          p0: "I build interactive web applications with a strong focus on clean interfaces, motion, audio, and playful technical systems.",
          p1: "My background in audio engineering gives me a creative approach to software: I like building tools, interfaces, and experiences that feel responsive, polished, and alive.",
        },
        musician: {
          intro: "Explore a selection of the music I've released over the years.",
          p0: "From metal to ambient, and everything in between.",
        },
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
        about: {
          title: "Audio engineer et developpeur frontend.",
          p0: "Je conçois des applications et pages web interactives en mettant l'accent sur des interfaces soignées, les animations, l'audio et des systèmes techniques ludiques.",
          p1: "Ma formation en ingénierie audio m'apporte une approche créative du développement logiciel : j'aime concevoir des outils, des interfaces et des expériences qui sont réactifs, soignés et vivants.",
        },
        musician: {
          intro: "Découvrez une sélection de la musique que j'ai publiée au fil des années.",
          p0: "Du metal à l'ambient, en passant par de nombreux autres styles.",
        },
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
            en: "Anglais",
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
        about: {
          title: "Audio engineer e Frontend developer.",
          p0: "Realizzo pagine e applicazioni web interattive con una forte attenzione a interfacce curate, animazioni, audio e sistemi tecnici creativi.",
          p1: "La mia formazione in ingegneria del suono mi ha permesso di costruire un approccio creativo allo sviluppo software: mi piace creare strumenti, interfacce ed esperienze che siano reattivi, curati e coinvolgenti.",
        },
        musician: {
          intro: "Esplora una selezione della musica che ho pubblicato nel corso degli anni.",
          p0: "Dal metal all'ambient, passando per molti altri generi.",
        },
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
