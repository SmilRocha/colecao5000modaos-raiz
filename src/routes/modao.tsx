import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/modao")({
  head: () => ({
    meta: [
      { title: "Coleção Modão Sertanejo Raiz — +5.000 Músicas por R$10,00" },
      { name: "description", content: "+5.000 modões de sertanejo raiz por R$10,00. Acesso vitalício." },
      { property: "og:title", content: "Coleção Modão Sertanejo Raiz" },
      { property: "og:description", content: "+5.000 modões de sertanejo raiz por R$10,00. Acesso vitalício." },
    ],
  }),
  component: Modao,
});

function Modao() {
  return (
    <iframe
      src="/landing/modao/index.html"
      title="Landing — Coleção Modão Sertanejo Raiz (R$10,00)"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
    />
  );
}
