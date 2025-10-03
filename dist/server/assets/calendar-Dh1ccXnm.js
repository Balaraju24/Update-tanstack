import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn, b as buttonVariants, B as Button } from "./button-Cul2gyf-.js";
import { useRouter, useLocation } from "@tanstack/react-router";
import { useReactTable, getSortedRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as React from "react";
import { useState, useCallback } from "react";
import { I as Input } from "./input-DDl6Pfw1.js";
import { ChevronLeftIcon, MoreHorizontalIcon, ChevronRightIcon, ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      "aria-current": isActive ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const PaginationComponent = ({
  capturePageNum,
  captureRowPerItems,
  initialPage = 1,
  limitOptionsFromProps = [],
  paginationDetails
}) => {
  const [inputPageValue, setInputPageValue] = useState(
    initialPage.toString()
  );
  const [limitOptions, setLimitOptions] = useState(
    limitOptionsFromProps.length ? limitOptionsFromProps : [
      { title: "15/page", value: 15 },
      { title: "25/page", value: 25 },
      { title: "100/page", value: 100 },
      { title: "250/page", value: 250 },
      { title: "500/page", value: 500 }
    ]
  );
  const totalPages = paginationDetails?.total_pages ?? 1;
  const selectedValue = paginationDetails?.page_size ?? 15;
  const totalRecords = paginationDetails?.total_records ?? 0;
  const currentPage = paginationDetails?.current_page ?? initialPage;
  const lastIndex = currentPage * selectedValue;
  const firstIndex = lastIndex - selectedValue;
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setInputPageValue(page.toString());
        capturePageNum(page);
      }
    },
    [capturePageNum, totalPages]
  );
  const handleRowChange = useCallback(
    (newLimit) => {
      captureRowPerItems(Number(newLimit));
    },
    [captureRowPerItems]
  );
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "" || /^[0-9]+$/.test(value)) {
        setInputPageValue(value);
      }
    },
    []
  );
  const onKeyDownInPageChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const page = Math.max(
          1,
          Math.min(parseInt(inputPageValue) || 1, totalPages)
        );
        handlePageChange(page);
      }
    },
    [inputPageValue, totalPages, handlePageChange]
  );
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(null);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  }, [currentPage, totalPages]);
  return /* @__PURE__ */ jsxs(Pagination, { className: "flex justify-between items-center !mx-0 !px-0 sticky bottom-0 shadow-inner-none !shadow-none !bordeer-none", children: [
    /* @__PURE__ */ jsxs(PaginationContent, { className: "!px-0 pt-1 flex gap-5", children: [
      /* @__PURE__ */ jsxs(
        Select,
        {
          value: selectedValue?.toString(),
          onValueChange: handleRowChange,
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-24 text-xs !py-0 !h-8 border cursor-pointer", children: /* @__PURE__ */ jsx(
              SelectValue,
              {
                placeholder: "Items per page",
                className: "font-normal text-xs!rounded-none "
              }
            ) }),
            /* @__PURE__ */ jsx(SelectContent, { className: "w-[120px]  text-xs bg-white pointer", children: limitOptions.map((item) => /* @__PURE__ */ jsx(
              SelectItem,
              {
                value: item.value?.toString(),
                className: "cursor-pointer font-normal text-xs opacity-90",
                children: item.title
              },
              item.value
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "font-normal text-xs opacity-80", children: [
        Math.min(firstIndex + 1, totalRecords),
        " -",
        " ",
        Math.min(lastIndex, totalRecords),
        " of ",
        totalRecords
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center", children: [
      /* @__PURE__ */ jsx(PaginationContent, { className: "px-1 py-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center font-normal text-xs opacity-80", children: [
        "GoTo",
        /* @__PURE__ */ jsx(
          Input,
          {
            value: inputPageValue,
            onChange: handleInputChange,
            onKeyDown: onKeyDownInPageChange,
            className: "h-6 w-10 text-center bg-gray-300 rounded-none text-xs ml-2",
            placeholder: "Page"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(PaginationContent, { className: "px-1 py-0 font-normal", children: [
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationPrevious,
          {
            href: currentPage === 1 ? void 0 : "#",
            onClick: (e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            },
            "aria-disabled": currentPage === 1,
            className: currentPage === 1 ? "opacity-50 " : ""
          }
        ) }),
        getPageNumbers().map(
          (pageNumber, index) => pageNumber === null ? /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }, `ellipsis-${index}`) : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
            PaginationLink,
            {
              href: "#",
              isActive: pageNumber === currentPage,
              onClick: (e) => {
                e.preventDefault();
                handlePageChange(pageNumber);
              },
              className: `text-xs ${pageNumber === currentPage ? "bg-black text-white w-6 h-6 rounded-none " : "rounded-none"}`,
              children: pageNumber
            }
          ) }, pageNumber)
        ),
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
          PaginationNext,
          {
            href: currentPage === totalPages ? void 0 : "#",
            onClick: (e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            },
            "aria-disabled": currentPage === totalPages,
            className: currentPage === totalPages ? "opacity-50 " : ""
          }
        ) })
      ] })
    ] })
  ] });
};
const TableSortAscIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M445.667 236.333L334.333 125L223 236.333",
          stroke: "white",
          strokeWidth: "66.6667",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const TableSortDscIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M223 432L334.333 543.333L445.667 432",
          stroke: "white",
          strokeWidth: "66.6667",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const TableSortNormIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "668",
      height: "668",
      viewBox: "0 0 668 668",
      fill: "none",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M223 432L334.333 543.333L445.667 432",
            stroke: "#fff",
            strokeWidth: "66.6667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M445.667 236.333L334.333 125L223 236.333",
            stroke: "#fff",
            strokeWidth: "66.6667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
};
const TanStackTable = ({
  columns,
  data,
  loading = false,
  getData,
  paginationDetails,
  removeSortingForColumnIds,
  heightClass,
  noDataLabel,
  noDataDescription,
  showNoDataIcon = true,
  noDataHeight
}) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const [sorting, setSorting] = useState([]);
  const shouldStickyLastColumn = columns.length > 4;
  const lastColumnIndex = columns.length - 1;
  const table = useReactTable({
    columns,
    data: data?.length ? data : [],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  const capturePageNum = useCallback(
    (value) => {
      getData({
        ...searchParams,
        limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 15,
        page: value,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type")
      });
    },
    [getData, searchParams]
  );
  const captureRowPerItems = useCallback(
    (value) => {
      getData({
        ...searchParams,
        limit: value,
        page: 1,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type")
      });
    },
    [getData, searchParams]
  );
  const sortAndGetData = useCallback(
    (header) => {
      if (removeSortingForColumnIds && removeSortingForColumnIds.length && removeSortingForColumnIds.includes(header.id)) {
        return;
      }
      let sortBy = header.id;
      let orderBy = `${sortBy}:asc`;
      if (searchParams.get("order_by")?.startsWith(header.id)) {
        if (searchParams.get("order_by") === `${header.id}:asc`) {
          orderBy = `${sortBy}:desc`;
        } else {
          sortBy = "";
          orderBy = "";
        }
      }
      getData({
        ...searchParams,
        page: 1,
        limit: searchParams.get("limit") || paginationDetails?.limit || 15,
        order_by: orderBy
      });
    },
    [getData, searchParams, removeSortingForColumnIds, paginationDetails?.limit]
  );
  const calculateContentWidth = useCallback(
    (headerId, data2) => {
      const defaultWidths = {
        web_id: 120,
        web_url: 250,
        pageTitle: 180,
        filename: 150,
        context: 140,
        scrape_status: 140,
        rag_status: 140,
        actions: 80
      };
      if (!data2.length) {
        return defaultWidths[headerId] || 150;
      }
      const column = columns.find((col) => col.id === headerId);
      if (!column) {
        return defaultWidths[headerId] || 150;
      }
      let maxLength = 0;
      data2.forEach((row) => {
        const value = column.accessorFn ? column.accessorFn(row) : row[headerId];
        const stringValue = String(value || "");
        maxLength = Math.max(maxLength, stringValue.length);
      });
      const baseWidth = Math.max(80, Math.min(400, maxLength * 8 + 40));
      const adjustments = {
        web_url: 1.2,
        // URLs need more space
        pageTitle: 1.1,
        context: 1.1,
        // Context might be longer
        actions: 0.8
        // Actions are typically shorter
      };
      const multiplier = adjustments[headerId] || 1;
      return Math.round(baseWidth * multiplier);
    },
    [columns]
  );
  const isLastColumn = useCallback(
    (index) => {
      return shouldStickyLastColumn && index === lastColumnIndex;
    },
    [shouldStickyLastColumn, lastColumnIndex]
  );
  const getColumnStyle = useCallback(
    (headerId, index) => {
      const column = columns.find((col) => col.id === headerId);
      let baseStyle = {};
      if (column?.minWidth && column?.maxWidth) {
        baseStyle = {
          minWidth: `${column.minWidth}px`,
          maxWidth: `${column.maxWidth}px`,
          width: "auto"
        };
      } else if (column?.minWidth || column?.maxWidth) {
        baseStyle = {
          ...column.minWidth && { minWidth: `${column.minWidth}px` },
          ...column.maxWidth && { maxWidth: `${column.maxWidth}px` },
          width: "auto"
        };
      } else {
        const calculatedWidth = calculateContentWidth(headerId, data);
        baseStyle = {
          width: `${calculatedWidth}px`,
          minWidth: `${Math.max(80, calculatedWidth)}px`
        };
      }
      if (index === 0) {
        return {
          ...baseStyle,
          position: "sticky",
          left: 0,
          backgroundColor: "#f8f9fa",
          zIndex: 11
        };
      }
      if (isLastColumn(index)) {
        return {
          ...baseStyle,
          position: "sticky",
          right: 0,
          backgroundColor: "#f8f9fa",
          zIndex: 11
        };
      }
      return baseStyle;
    },
    [columns, data, calculateContentWidth, isLastColumn]
  );
  const getCellStyle = useCallback(
    (index, isEven) => {
      if (index === 0) {
        return {
          position: "sticky",
          left: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5
        };
      }
      if (isLastColumn(index)) {
        return {
          position: "sticky",
          right: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5
        };
      }
      return {};
    },
    [isLastColumn]
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full rounded-md bg-white border border-gray-200", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-full relative bg-white ${heightClass || "h-96"} overflow-auto custom-scrollbar`,
        style: {
          display: "flex",
          flexDirection: "column"
        },
        children: loading ? /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse bg-white table-auto", children: [
          /* @__PURE__ */ jsx("thead", { children: table?.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map(
            (header, index) => /* @__PURE__ */ jsx(
              "th",
              {
                colSpan: header.colSpan,
                className: "text-left px-3 py-1 text-sm font-medium text-gray-600 border-b border-gray-200 sticky top-0 z-10",
                style: {
                  ...getColumnStyle(header.id, index),
                  backgroundColor: "#f8f9fa",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "16px"
                },
                children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => sortAndGetData(header),
                    className: "flex items-center gap-1 cursor-pointer",
                    children: [
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ),
                      /* @__PURE__ */ jsx(
                        SortItems,
                        {
                          header,
                          removeSortingForColumnIds
                        }
                      )
                    ]
                  }
                )
              },
              `${header.id}-${index}`
            )
          ) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx("tbody", { children: [...Array(paginationDetails?.limit || 15)].map((_, i) => /* @__PURE__ */ jsx(
            "tr",
            {
              className: `border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`,
              children: [...Array(columns.length)].map((_2, j) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "px-3 py-2",
                  style: {
                    ...getCellStyle(j, i % 2 === 0),
                    fontSize: "13px",
                    lineHeight: "20px"
                  },
                  children: j === 1 ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded-full bg-gray-200" }),
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-32 bg-gray-200 rounded-sm" })
                  ] }) : /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-gray-200 rounded-sm" })
                },
                `loading-cell-${i}-${j}`
              ))
            },
            `loading-row-${i}`
          )) })
        ] }) }) : !data.length ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-16", children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-base font-medium", children: noDataLabel || "No data available" }),
          noDataDescription && /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm mt-1", children: noDataDescription })
        ] }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse bg-white table-auto", children: [
          /* @__PURE__ */ jsx("thead", { children: table?.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map(
            (header, index) => /* @__PURE__ */ jsx(
              "th",
              {
                colSpan: header.colSpan,
                className: "text-left px-3 py-2 text-gray-600 border-b border-gray-200 sticky top-0 z-10",
                style: {
                  ...getColumnStyle(header.id, index),
                  backgroundColor: "#f8f9fa",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "16px"
                },
                children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => sortAndGetData(header),
                    className: "flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors",
                    children: [
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ),
                      /* @__PURE__ */ jsx(
                        SortItems,
                        {
                          header,
                          removeSortingForColumnIds
                        }
                      )
                    ]
                  }
                )
              },
              `${header.id}-${index}`
            )
          ) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx("tbody", { children: data?.length ? table?.getRowModel().rows.map((row, index) => /* @__PURE__ */ jsx(
            "tr",
            {
              className: `transition-colors duration-150 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`,
              ...row?.original.issue_id && row?.original.id ? {
                onClick: () => router.navigate({
                  to: `/cases/${row.original.id}/case-history`
                })
              } : {},
              children: row.getVisibleCells().map((cell, cellIndex) => /* @__PURE__ */ jsx(
                "td",
                {
                  className: "px-3 py-2 text-gray-900",
                  style: {
                    ...getCellStyle(cellIndex, index % 2 === 0),
                    fontSize: "13px",
                    lineHeight: "20px",
                    fontWeight: "400"
                  },
                  children: flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                },
                cell.id
              ))
            },
            row.id
          )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
            "td",
            {
              colSpan: columns.length,
              className: "text-center py-8 text-gray-500",
              style: { fontSize: "14px" },
              children: "No data found"
            }
          ) }) })
        ] }) }) })
      }
    ),
    !loading && data?.length && paginationDetails ? /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200", children: /* @__PURE__ */ jsx(
      PaginationComponent,
      {
        paginationDetails,
        capturePageNum,
        captureRowPerItems,
        initialPage: paginationDetails?.current_page || 1
      }
    ) }) : null
  ] });
};
const SortItems = ({
  header,
  removeSortingForColumnIds
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const sortBy = searchParams.get("order_by")?.split(":")[0];
  const sortDirection = searchParams.get("order_by")?.split(":")[1];
  if (removeSortingForColumnIds?.includes(header.id)) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: sortBy === header.id ? sortDirection === "asc" ? /* @__PURE__ */ jsx(TableSortAscIcon, { className: "w-3 h-3 text-gray-400" }) : /* @__PURE__ */ jsx(TableSortDscIcon, { className: "w-3 h-3 text-gray-400" }) : /* @__PURE__ */ jsx(TableSortNormIcon, { className: "w-3 h-3 text-gray-400" }) });
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
export {
  Calendar as C,
  Select as S,
  TanStackTable as T,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectItem as d,
  Textarea as e
};
