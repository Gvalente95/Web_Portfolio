import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const common = {
  name: "Giulio Valente",
  homeButton: "GV",
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

        copyEmail: "Copy e-mail",
        emailCopied: "Email copied to clipboard!",

        common,
        vitrine: {
          title_0: "FEATURED",
          title_1: "WORK",
          action: "View More",
        },
        hero: {
          greeting: "Hello! I'm ",
          brief: {
            character: "Patient, Passionate, Creative",
            spec: "UI/UX, sound-design, software architecture",
          },
          contact: "Get in touch",
          resume: "Read My Resume",
        },
        about: {
          title: "My journey",
          p0: "I started programming in 2022, driven mostly by curiosity and a desire to understand how things work.",
          p1: "Joining 42 Lausanne in 2024 turned that curiosity into a much deeper commitment: two intensive years of learning through projects, challenges, mistakes, and collaboration, culminating in the completion of the Common Core in 2026. Along the way, I grew increasingly drawn to web development, building everything from small experiments to full-stack applications, interactive tools, and a collaborative browser-based digital audio workstation. Each project has been an opportunity to push a little further, learn something new, and become a more thoughtful developer.",
        },
        musician: {
          intro: "Explore a selection of the music I've released over the years.",
          p0: "From metal to ambient, and everything in between.",
        },
        skills: {},
        dev: {
          intro: "Building interactive experiences, one system at a time.",
          p0: "What started with small Unity experiments gradually evolved into a passion for software engineering. Since then I've explored everything from game development and physics simulations to browser-based digital audio workstations, always driven by curiosity and a desire to understand how things work beneath the surface.",
          open: "Open in browser",
        },
        contact: {
          title: "Contact",
          brief: "Have a question, project or collab in *mind ?",
          nameQuery: "Name",
          emailQuery: "Email",
          messageQuery: "Message",
          send: "Send Message",
          sending: "Sending...",
          receiveQuery: "Messae received!",
          receiveQueryBrief: "Thanks for your message, i'll get back to you soon.",
          sendBack: "Send another",
        },
        footer: {},
        header: {
          pages: {
            dev: "Developper",
            music: "Musician",
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

        copyEmail: "Copier l'adresse e-mail",
        emailCopied: "Adresse e-mail copiée dans le presse-papiers !",

        hero: {
          greeting: "Hi! Je suis ",
          brief: {
            character: "Patient, Passioné, Créatif",
            spec: "UI/UX, sound-design, architecture de software",
          },
          contact: "Prendre contact",
          resume: "Lire mon CV",
        },
        vitrine: {
          title_0: "VITRINE",
          title_1: "PROJETS",
          action: "Explorer",
        },
        about: {
          title: "Mon parcours",
          p0: "J'ai commencé à programmer en 2022, principalement par curiosité et par envie de comprendre comment les choses fonctionnent.",
          p1: "Mon arrivée à 42 Lausanne en 2024 a transformé cette curiosité en un engagement bien plus profond : deux années intensives d'apprentissage par les projets, les défis, les erreurs et la collaboration, jusqu'à l'achèvement du Common Core en 2026. Au fil de ce parcours, je me suis progressivement tourné vers le développement web, en passant de petites expérimentations à des applications full-stack, des outils interactifs et une station audionumérique collaborative fonctionnant directement dans le navigateur. Chaque projet a été l'occasion d'aller un peu plus loin, d'apprendre quelque chose de nouveau et de devenir un développeur plus réfléchi.",
        },
        musician: {
          intro: "Découvrez une sélection de la musique que j'ai publiée au fil des années.",
          p0: "Du metal à l'ambient, en passant par de nombreux autres styles.",
        },
        skills: {},
        dev: {
          intro: "Concevoir des expériences interactives, un système après l'autre.",
          p0: "Ce qui a commencé par de petites expérimentations sur Unity s'est progressivement transformé en une véritable passion pour le développement logiciel. Depuis, j'ai exploré des domaines allant du développement de jeux vidéo et des simulations physiques aux stations de travail audio numériques accessibles depuis un navigateur, toujours guidé par la curiosité et le désir de comprendre le fonctionnement des systèmes en profondeur.",
          open: "Ouvrir dans le navigateur",
        },
        contact: {
          title: "Contacte moi",
          brief: "Envie de collaborer sur un *projet?",
          nameQuery: "Nom",
          emailQuery: "Adresse email",
          messageQuery: "Message",
          send: "Envoyer",
          sending: "Envoi en cour...",
          receiveQuery: "Message reçu!",
          receiveQueryBrief: "Merci d'avoir pris contact! je vous répond bientôt.",
          sendBack: "Envoyez un autre message.",
        },
        footer: {},
        header: {
          pages: {
            dev: "Developpeur",
            music: "Musicien",
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

        copyEmail: "Copia e-mail",
        emailCopied: "Indirizzo e-mail copiato negli appunti!",

        hero: {
          greeting: "Ciao! Sono",
          brief: {
            character: "Paziente, Apassionato, Creativo",
            spec: "UI/UX, sound-design, software architecture",
          },
          contact: "Contattami",
          resume: "Leggi il mio CV",
        },
        vitrine: {
          title_0: "VETRINA",
          title_1: "PROGETTI",
          action: "Esplorare",
        },
        about: {
          title: "Il mio percorso",
          p0: "Realizzo pagine e applicazioni web interattive con una forte attenzione a interfacce curate, animazioni, audio e sistemi tecnici creativi.",
          p1: "La mia formazione in ingegneria del suono mi ha permesso di costruire un approccio creativo allo sviluppo software: mi piace creare strumenti, interfacce ed esperienze che siano reattivi, curati e coinvolgenti.",
        },
        musician: {
          intro: "Esplora una selezione della musica che ho pubblicato nel corso degli anni.",
          p0: "Dal metal all'ambient, passando per molti altri generi.",
        },
        skills: {},
        dev: {
          intro: "Entrare a 42 Lausanne nel 2024 ha trasformato questa curiosità in un impegno molto più profondo.",
          p0: "due anni intensivi di apprendimento attraverso progetti, sfide, errori e collaborazione, fino al completamento del Common Core nel 2026. Durante questo percorso mi sono avvicinato sempre di più allo sviluppo web, passando da piccoli esperimenti ad applicazioni full-stack, strumenti interattivi e una workstation audio digitale collaborativa interamente nel browser. Ogni progetto è stato un'occasione per spingermi un po' oltre, imparare qualcosa di nuovo e diventare uno sviluppatore più consapevole.",
          open: "Apri nel navigatore",
        },
        contact: {
          title: "Prendi Contatto",
          brief: "Un Progetto, idea o collaborazione in *mente?",
          nameQuery: "Nome",
          emailQuery: "Email",
          messageQuery: "Messagio",
          send: "Invia",
          sending: "Invio in corso...",
          receiveQuery: "Messagio mandato!",
          receiveQueryBrief: "Grazie di aver preso contatto",
          sendBack: "Manda un altro",
        },
        footer: {},
        header: {
          pages: {
            dev: "Developper",
            // audio: "Ingeniere Audio",
            music: "Musicista",
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
