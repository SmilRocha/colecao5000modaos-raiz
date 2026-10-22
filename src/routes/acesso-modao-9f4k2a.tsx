import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/acesso-modao-9f4k2a")({
  head: () => ({
    meta: [
      { title: "Acesso liberado — Coleção Modão Sertanejo Raiz" },
      { name: "description", content: "Área de acesso do comprador." },
      { property: "og:title", content: "Acesso liberado" },
      { property: "og:description", content: "Área de acesso do comprador." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow,noarchive,nosnippet,noimageindex" },
      { name: "googlebot", content: "noindex,nofollow" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: Acesso,
});

function Acesso() {
  return (
    <iframe
      src="/landing/acesso-modao-9f4k2a/index.html"
      title="Acesso à coleção"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
    />
  );
}
