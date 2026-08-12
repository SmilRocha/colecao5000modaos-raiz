import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/modao-promocao")({
  head: () => ({
    meta: [
      { title: "Coleção Modão Sertanejo Raiz — +5.000 Músicas por R$8,49" },
      { name: "description", content: "+5.000 modões de sertanejo raiz por R$8,49. Acesso vitalício." },
      { property: "og:title", content: "Coleção Modão Sertanejo Raiz" },
      { property: "og:description", content: "+5.000 modões de sertanejo raiz por R$8,49. Acesso vitalício." },
    ],
  }),
  component: ModaoPromocao,
});

function ModaoPromocao() {
  const [src, setSrc] = useState("/landing/modao-promocao/index.html");

  useEffect(() => {
    const qs = window.location.search;
    if (qs && qs.length > 1) setSrc("/landing/modao-promocao/index.html" + qs);
  }, []);

  return (
    <iframe
      src={src}
      title="Landing — Coleção Modão Sertanejo Raiz (R$8,49)"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
    />
  );
}
