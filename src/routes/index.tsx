// Envie o comentário por aqui
import { createFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coleção Modão Sertanejo Raiz — Redirecionando" },
      { name: "description", content: "Redirecionando para a Coleção Modão Sertanejo Raiz." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RootRedirect,
});

function RootRedirect() {
  useEffect(() => {
    window.location.replace("/modao" + window.location.search + window.location.hash);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        aria-label="Carregando"
        role="status"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "4px solid rgba(65,38,19,.18)",
          borderTopColor: "#412613",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
