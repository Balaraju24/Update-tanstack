import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/mainLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
