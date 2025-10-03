import { BeforeLoadContextOptions, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
const getIsAuthenticated = () => {
  return Cookies.get("token");
};
const authRoutes = [
  // "/",
  "/signup",
  "/signin",
  "/verify",
  "/forgot-password",
  "/auth/reset-password",
  "/company-details",
  "/verify-user-document",
  "/success",
  "/complete",
  "/workflow-response/",
  "/finish-later",
];
const routesAccessedByAnybody = ["/documents-received", "/oauth/concent"];
export const authMiddleware = async ({
  location,
}: BeforeLoadContextOptions<any, undefined, {}, {}, any>) => {
  if (typeof window == "undefined") return;
  if (routesAccessedByAnybody.includes(location.pathname)) {
    return;
  }
  if (
    !getIsAuthenticated() &&
    !authRoutes.some((arrayUrl: string) => location.pathname.includes(arrayUrl))
  ) {
    throw redirect({
      to: "/",
      replace: true,
    });
  }
  if (getIsAuthenticated() && authRoutes.includes(location.pathname)) {
    throw redirect({
      to: "/",
      replace: true,
    });
  }
};













