import { createFileRoute } from "@tanstack/react-router";
import UploadFilesComponent from "@/components/files/UploadFilesComponent";

export const Route = createFileRoute("/_layout/mainLayout/files/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <UploadFilesComponent />
    </>
  );
}
