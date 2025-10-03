import MainLayout from "@/components/MainLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});
