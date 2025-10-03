import { createFileRoute } from "@tanstack/react-router";
import UrlsComponent from "@/components/urls/UrlsComponent";

export const Route = createFileRoute("/_layout/mainLayout/urls/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <UrlsComponent />
    </>
  );
}
