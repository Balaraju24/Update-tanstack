import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Button } from "./button-Cul2gyf-.js";
import { I as Input } from "./input-DDl6Pfw1.js";
import { Label } from "@radix-ui/react-label";
import React__default, { useState, useMemo } from "react";
import { toast } from "sonner";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Calendar, T as TanStackTable, e as Textarea } from "./calendar-Dh1ccXnm.js";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { b as getScrapedFilesTable, u as uploadIntoRag, d as deleteScrapedFileFromTable, c as crawlSubPageLinks } from "./ragServices-BTI_KB5q.js";
import { Trash2, CalendarIcon, Search, Globe } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { u as useWorkspace } from "./router-DX4z58n8.js";
import "js-cookie";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-table";
import "@radix-ui/react-select";
import "react-day-picker";
const RetryIcon = React__default.forwardRef(
  ({ size = 14, strokeWidth = 2, title = "Retry", className, ...rest }, ref) => /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": title,
      role: "img",
      className,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("title", { children: title }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21 12a9 9 0 10-3.2 6.6",
            stroke: "currentColor",
            strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21 3v6h-6",
            stroke: "currentColor",
            strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  )
);
RetryIcon.displayName = "RetryIcon";
function ScrapeFilesColumns({
  deleteMutation,
  retryMutation
}) {
  const handleRetry = (info) => {
    const payload = {
      urls: [
        {
          id: info.id,
          base_url: info.web_url,
          web_id: info.web_id,
          page_title: info.pageTitle
        }
      ],
      tags: [],
      category: "demo",
      context: ""
    };
    retryMutation.mutate(payload);
  };
  return [
    {
      accessorFn: (row) => row.web_id,
      id: "web_id",
      header: () => /* @__PURE__ */ jsx("span", { children: "Website Id" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: info.getValue() }),
      minWidth: 100,
      maxWidth: 150
    },
    {
      accessorFn: (row) => row.web_url,
      id: "web_url",
      header: () => /* @__PURE__ */ jsx("span", { children: "URL" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx("div", { className: "truncate", title: info.getValue(), style: { maxWidth: 260 }, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: info.getValue(),
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-blue-500 hover:underline text-sm",
          children: info.getValue()
        }
      ) }),
      minWidth: 100,
      maxWidth: 200
    },
    {
      accessorFn: (row) => row.pageTitle,
      id: "pageTitle",
      header: () => /* @__PURE__ */ jsx("span", { children: "Page Title" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx("span", { className: "text-gray-700 text-sm hover:underline", children: info.getValue() }),
      minWidth: 60,
      maxWidth: 100
    },
    {
      accessorFn: (row) => row.scrape_status,
      id: "scrape_status",
      header: () => /* @__PURE__ */ jsx("span", { children: "Scrape Status" }),
      footer: (props) => props.column.id,
      cell: (info) => {
        const status = info.getValue();
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: `px-2 py-1 text-xs font-semibold rounded-md ${status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
            children: status
          }
        );
      },
      minWidth: 180,
      maxWidth: 180
    },
    {
      accessorFn: (row) => row.ragStatus,
      id: "rag_status",
      header: () => /* @__PURE__ */ jsx("span", { children: "Rag Status" }),
      footer: (props) => props.column.id,
      cell: (info) => {
        const status = info.getValue();
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: `px-2 py-1 text-xs font-semibold rounded-md ${status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
            children: status
          }
        );
      },
      minWidth: 180,
      maxWidth: 180
    },
    {
      accessorFn: (row) => row.id,
      id: "actions",
      header: () => /* @__PURE__ */ jsx("span", { children: "ACTIONS" }),
      footer: (props) => props.column.id,
      cell: (info) => {
        const rowData = info.row.original;
        return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center justify-center", children: [
          rowData.scrape_status === "FAILED" && /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => handleRetry(rowData),
              className: "bg-white hover:bg-white text-black",
              children: /* @__PURE__ */ jsx(RetryIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Trash2,
            {
              className: "hover:text-red-700 transition-colors cursor-pointer",
              style: { width: 16, height: 16, color: "#dc2626" },
              onClick: () => deleteMutation.mutate(rowData.id)
            }
          )
        ] });
      },
      minWidth: 80,
      maxWidth: 100
    }
  ];
}
function UrlsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const router = useRouter();
  const [date, setDate] = useState(void 0);
  const { selectedWorkspace } = useWorkspace();
  const handleDateSelect = (d) => {
    if (!d) return setDate(void 0);
    setDate(Array.isArray(d) ? d[0] : d);
  };
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["scraped-files-list", page, limit, selectedWorkspace?.id],
    queryFn: async () => {
      const res = selectedWorkspace?.id ? await getScrapedFilesTable(
        `/files/upload/scraped?page=${page}&limit=${limit}&user_id=${selectedWorkspace?.id}`
      ) : await getScrapedFilesTable(
        `/files/upload/scraped?page=${page}&limit=${limit}`
      );
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(
          res?.message || "Something went wrong while fetching files..."
        );
      }
      return res;
    },
    refetchOnWindowFocus: false
  });
  const uploadScrapedLinksIntoRagMutation = useMutation({
    mutationKey: ["upload-scrape-files-into-rag"],
    mutationFn: async (payload) => {
      const res = await uploadIntoRag("/scrape/scrape-and-save", payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
      toast.success("Selected links uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload links");
    }
  });
  const deleteScrapedFilesMutation = useMutation({
    mutationKey: ["scraped-file-delete"],
    mutationFn: async (id) => {
      const res = await deleteScrapedFileFromTable(
        `/files/upload/scraped/${id}`
      );
      return res;
    },
    onSuccess: () => {
      toast.success("file is deleted...");
    },
    onError: (error) => {
      toast.error(error?.message || `file deletion error...`);
    }
  });
  router.navigate({
    to: "/mainLayout/urls",
    params: { page },
    search: { page, limit }
  });
  const FilesData = useMemo(() => {
    if (!data?.data?.records) return [];
    if (!Array.isArray(data.data.records)) return [];
    return data.data.records;
  }, [data?.data?.records]);
  const paginationInfo = data?.data?.paginationInfo;
  const columns = useMemo(
    () => ScrapeFilesColumns({ deleteMutation: deleteScrapedFilesMutation, retryMutation: uploadScrapedLinksIntoRagMutation }),
    []
  );
  const getData = ({ page: page2, limit: limit2 }) => {
    setPage(page2);
    setLimit(limit2);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between  mr-2", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 md:gap-4 items-center pb-1", children: [
        /* @__PURE__ */ jsxs(Select, { children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px] bg-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "option2", children: "Option 2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: `w-[180px] justify-start text-left font-normal ${!date && "text-muted-foreground"} border-1 border-gray-200`,
              children: [
                /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                date ? format(date, "PPP") : "Select Date"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              mode: "single",
              selected: date,
              onSelect: handleDateSelect,
              initialFocus: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-[200px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Search", className: "pl-8 bg-white" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden ", children: /* @__PURE__ */ jsx(
      TanStackTable,
      {
        data: FilesData,
        columns,
        paginationDetails: paginationInfo || {},
        getData,
        loading: isPending,
        removeSortingForColumnIds: ["serial", "actions"],
        heightClass: "h-[calc(100vh-238px)]",
        noDataLabel: "files",
        noDataDescription: "No files available",
        showNoDataIcon: true
      }
    ) })
  ] });
}
function UrlsComponent() {
  const [scrapedLinks, setScrapedLinks] = useState([]);
  const [scrappingLink, setScrappingLink] = useState("");
  const [selectedLinks, setSelectedLinks] = useState([]);
  const queryClient = useQueryClient();
  const [scrapedBtnState, setScrapeBtnState] = useState(false);
  const [inputTag, setInputTag] = useState("");
  const [context, setContext] = useState("");
  const [category, setCategory] = useState("");
  const crawlLinksMutation = useMutation({
    mutationKey: ["crawl-links"],
    mutationFn: async (payload) => {
      const res = await crawlSubPageLinks("/scrape/get-scrape-urls", payload);
      return res;
    },
    onSuccess: (data) => {
      setScrapedLinks((prev) => [...prev, ...data?.data.data.urls]);
      return data?.data;
    },
    onError: (error) => {
      toast.error(
        error?.message || `Scraping sub pages for this website failed..`
      );
    }
  });
  const uploadScrapedLinksIntoRagMutation = useMutation({
    mutationKey: ["upload-scrape-files-into-rag"],
    mutationFn: async (payload) => {
      const res = await uploadIntoRag("/scrape/scrape-and-save", payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
      toast.success("Selected links uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload links");
    }
  });
  async function handleScrape() {
    try {
      setScrapeBtnState(true);
      if (scrappingLink === "") {
        toast.error("please paste the url to scrape");
        setScrapeBtnState(false);
        return;
      }
      await crawlLinksMutation.mutateAsync({ base_url: scrappingLink });
    } catch (error) {
      console.error("Scraping failed:", error);
    }
  }
  async function handleScrapeLinksUpload() {
    if (selectedLinks.length === 0) {
      toast.error("Please select at least one link to upload!");
      return;
    }
    try {
      const tagsArray = inputTag.split(",");
      const payload = {
        urls: selectedLinks.map((link) => {
          const urlObj = new URL(link);
          const web_id = urlObj.hostname;
          let page_title = link.split("/").pop();
          if (!page_title) page_title = "Home";
          return {
            base_url: link,
            web_id,
            page_title
          };
        }),
        tags: tagsArray,
        category,
        context
      };
      const res = await uploadScrapedLinksIntoRagMutation.mutateAsync(payload);
      if (res) {
        setScrapedLinks([]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
  function toggleLinkSelection(url, checked) {
    setSelectedLinks(
      (prev) => checked ? [...prev, url] : prev.filter((u) => u !== url)
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "h-auto lg:h-[calc(100vh-144px)] w-full lg:w-[380px] bg-blue-50 border border-gray-200 ml-2 rounded-md overflow-y-auto shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700", children: "Website URL" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-col gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Paste the URL",
              className: "w-full rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500",
              value: scrappingLink,
              onChange: (e) => setScrappingLink(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end", children: /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleScrape,
              className: "bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md h-7 text-xs 3xl:text-sm",
              disabled: scrapedBtnState,
              children: [
                /* @__PURE__ */ jsx(Globe, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Scrape & Process" })
              ]
            }
          ) })
        ] })
      ] }),
      scrapedLinks.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "Created RAG Files" }),
        /* @__PURE__ */ jsx("div", { className: "h-[200px] overflow-y-auto rounded-md bg-white shadow-sm", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3 p-2", children: scrapedLinks.map((scrape, index) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:bg-gray-50",
            children: scrape?.flag === true ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "mt-1 cursor-not-allowed",
                  title: "This link is already uploaded",
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col max-w-full", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: scrape?.url || "#",
                  className: "text-sm text-blue-600 hover:underline break-words max-w-full",
                  target: "_blank",
                  rel: "noreferrer",
                  children: scrape?.url || "https://www.saletable.ai/product/reporting/"
                }
              ) })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "mt-1 cursor-pointer",
                  onChange: (e) => toggleLinkSelection(scrape.url, e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col max-w-full", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: scrape?.url || "#",
                  className: "text-xs text-blue-600 break-words hover:underline",
                  target: "_blank",
                  rel: "noreferrer",
                  children: scrape?.url || "https://www.saletable.ai/product/reporting/"
                }
              ) })
            ] })
          },
          index
        )) }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full mt-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-700", children: "Tags" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Enter Tags",
                type: "text",
                className: "rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-green-500",
                value: inputTag,
                onChange: (e) => setInputTag(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-700", children: "Category" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Enter Category",
                className: "rounded-md border bg-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-green-500",
                value: category,
                onChange: (e) => setCategory(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-700", children: "Context" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Enter Context",
                className: "rounded-md border bg-white border-gray-300 px-3 py-2 text-sm h-24 resize-none shadow-sm focus:ring-2 focus:ring-green-500",
                value: context,
                onChange: (e) => setContext(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full bg-blue-600 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-md",
            onClick: () => {
              handleScrapeLinksUpload();
              setSelectedLinks([]);
              setScrappingLink("");
              setScrapeBtnState(false);
            },
            children: "Submit"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 rounded-md shadow-sm flex-1 overflow-x-auto mr-2 p-1", children: /* @__PURE__ */ jsx(UrlsTable, {}) })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(UrlsComponent, {}) });
}
export {
  RouteComponent as component
};
