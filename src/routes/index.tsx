import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coleção Modão Sertanejo Raiz" },
      { name: "description", content: "+5.000 modões de sertanejo raiz por R$10. Acesso vitalício." },
      { property: "og:title", content: "Coleção Modão Sertanejo Raiz" },
      { property: "og:description", content: "+5.000 modões de sertanejo raiz por R$10. Acesso vitalício." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/landing/index.html"
      title="Landing — Coleção Modão Sertanejo Raiz"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
    />
  );
}
