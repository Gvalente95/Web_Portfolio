import data from "../../../../../data/web-apps.json";

type AppData = {
  info: string;
  info_short: string;
  image: string;
  video: string;
  url: string;
  language: string;
  tags: string;
};

type AppsData = {
  title: string;
  description: string;
  description_short: string;
  content: AppData[];
};
export function Projects() {
  return <div></div>;
}
