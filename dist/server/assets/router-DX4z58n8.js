import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useContext, createContext, useState, useEffect } from "react";
const appCss = "/assets/app-D3MeEd0C.css";
const WorkspaceContext = createContext(
  void 0
);
const WorkspaceProvider = ({
  children
}) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    null
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWorkspace = localStorage.getItem("selectedWorkspace");
      if (savedWorkspace) {
        try {
          const parsed = JSON.parse(savedWorkspace);
          setSelectedWorkspace(parsed);
        } catch (error) {
          localStorage.removeItem("selectedWorkspace");
        }
      }
    }
  }, []);
  const handleSetWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    if (typeof window !== "undefined") {
      if (workspace) {
        const stringified = JSON.stringify(workspace);
        localStorage.setItem("selectedWorkspace", stringified);
      } else {
        localStorage.removeItem("selectedWorkspace");
      }
    }
  };
  useEffect(() => {
  }, [selectedWorkspace]);
  return /* @__PURE__ */ jsx(
    WorkspaceContext.Provider,
    {
      value: {
        selectedWorkspace,
        setSelectedWorkspace: handleSetWorkspace
      },
      children
    }
  );
};
const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === void 0) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
const queryClient = new QueryClient();
const Route$5 = createRootRoute({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "Sales Table AutoRAG"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(WorkspaceProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }) });
}
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-100", children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true, closeButton: true })
    ] })
  ] });
}
const $$splitComponentImporter$4 = () => import("./_layout-01ip8MQc.js");
const Route$4 = createFileRoute("/_layout")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-Psp5gy8A.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-CryywXFm.js");
const Route$2 = createFileRoute("/_layout/mainLayout/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-Cm99Xgit.js");
const Route$1 = createFileRoute("/_layout/mainLayout/urls/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CgvzSunL.js");
const Route = createFileRoute("/_layout/mainLayout/files/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LayoutRoute = Route$4.update({
  id: "/_layout",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const LayoutMainLayoutIndexRoute = Route$2.update({
  id: "/mainLayout/",
  path: "/mainLayout/",
  getParentRoute: () => LayoutRoute
});
const LayoutMainLayoutUrlsIndexRoute = Route$1.update({
  id: "/mainLayout/urls/",
  path: "/mainLayout/urls/",
  getParentRoute: () => LayoutRoute
});
const LayoutMainLayoutFilesIndexRoute = Route.update({
  id: "/mainLayout/files/",
  path: "/mainLayout/files/",
  getParentRoute: () => LayoutRoute
});
const LayoutRouteChildren = {
  LayoutMainLayoutIndexRoute,
  LayoutMainLayoutFilesIndexRoute,
  LayoutMainLayoutUrlsIndexRoute
};
const LayoutRouteWithChildren = LayoutRoute._addFileChildren(LayoutRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  LayoutRoute: LayoutRouteWithChildren
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useWorkspace as u
};
