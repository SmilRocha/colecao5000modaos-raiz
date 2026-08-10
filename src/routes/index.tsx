import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redirecionando…" },
      { name: "robots", content: "noindex" },
      { httpEquiv: "refresh", content: "0; url=/modao" },
    ],
    links: [{ rel: "canonical", href: "/modao" }],
  }),
  component: RootRedirect,
});

function RootRedirect() {
  useEffect(() => {
    window.location.replace("/modao" + window.location.search + window.location.hash);
  }, []);

  return (
    <p style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      Redirecionando para <a href="/modao">/modao</a>…
    </p>
  );
}
