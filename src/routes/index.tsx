import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/modao", search: search as Record<string, unknown> });
  },
  component: () => null,
});
