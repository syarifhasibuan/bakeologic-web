import type { Route } from "./+types/home";

import MainImage from "~/assets/home.jpeg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bakeologic" },
    { name: "description", content: "Baking with logic, love and magic." },
  ];
}

export default function Home() {
  return (
    <div>
      <img src={MainImage} height="" />
      <h1 className="justify-center">FEATURED</h1>
    </div>
  );
}
