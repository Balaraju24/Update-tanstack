import { useLocation, useRouter } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useCallback, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import PaginationComponent from "./Pagination";
import TableSortAscIcon from "@/icons/sort-asc";
import TableSortDscIcon from "@/icons/sort-dsc";
import TableSortNormIcon from "@/icons/sort-norm";

export interface pageProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  heightClass?: string;
  getData?: any;
  paginationDetails: any;
  removeSortingForColumnIds?: string[];
  noDataLabel?: string;
}

export interface TanStackTableProps extends pageProps {
  noDataDescription?: string;
  showNoDataIcon?: boolean;
  noDataHeight?: string;
}

const TanStackTable: FC<TanStackTableProps> = ({
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
  noDataHeight,
}) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Check if we need sticky last column (more than 6 columns)
  const shouldStickyLastColumn = columns.length > 4;
  const lastColumnIndex = columns.length - 1;

  const table = useReactTable({
    columns,
    data: data?.length ? data : [],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const capturePageNum = useCallback(
    (value: number) => {
      getData({
        ...searchParams,
        limit: searchParams.get("limit")
          ? Number(searchParams.get("limit"))
          : 15,
        page: value,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type"),
      });
    },
    [getData, searchParams]
  );

  const captureRowPerItems = useCallback(
    (value: number) => {
      getData({
        ...searchParams,
        limit: value,
        page: 1,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type"),
      });
    },
    [getData, searchParams]
  );

  const sortAndGetData = useCallback(
    (header: any) => {
      if (
        removeSortingForColumnIds &&
        removeSortingForColumnIds.length &&
        removeSortingForColumnIds.includes(header.id)
      ) {
        return;
      }
      let sortBy = header.id;
      let sortDirection = "asc";
      let orderBy = `${sortBy}:asc`;
      if (searchParams.get("order_by")?.startsWith(header.id)) {
        if (searchParams.get("order_by") === `${header.id}:asc`) {
          sortDirection = "desc";
          orderBy = `${sortBy}:desc`;
        } else {
          sortBy = "";
          sortDirection = "";
          orderBy = "";
        }
      }
      getData({
        ...searchParams,
        page: 1,
        limit: searchParams.get("limit") || paginationDetails?.limit || 15,
        order_by: orderBy,
      });
    },
    [getData, searchParams, removeSortingForColumnIds, paginationDetails?.limit]
  );

  // Calculate dynamic width based on content and column configuration
  const calculateContentWidth = useCallback(
    (headerId: string, data: any[]): number => {
      // Default widths for when data is not available
      const defaultWidths: { [key: string]: number } = {
        web_id: 120,
        web_url: 250,
        pageTitle: 180,
        filename: 150,
        context: 140,
        scrape_status: 140,
        rag_status: 140,
        actions: 80,
      };

      if (!data.length) {
        return defaultWidths[headerId] || 150;
      }

      const column = columns.find((col) => col.id === headerId);
      if (!column) {
        return defaultWidths[headerId] || 150;
      }

      // Get max content length for this column
      let maxLength = 0;
      data.forEach((row) => {
        const value = column.accessorFn
          ? column.accessorFn(row)
          : row[headerId];
        const stringValue = String(value || "");
        maxLength = Math.max(maxLength, stringValue.length);
      });

      // Base width calculation (rough estimate: 8px per character + padding)
      const baseWidth = Math.max(80, Math.min(400, maxLength * 8 + 40));

      // Column-specific adjustments
      const adjustments: { [key: string]: number } = {
        web_url: 1.2, // URLs need more space
        pageTitle: 1.1,
        context: 1.1, // Context might be longer
        actions: 0.8, // Actions are typically shorter
      };

      const multiplier = adjustments[headerId] || 1;
      return Math.round(baseWidth * multiplier);
    },
    [columns]
  );

  const isLastColumn = useCallback(
    (index: number) => {
      return shouldStickyLastColumn && index === lastColumnIndex;
    },
    [shouldStickyLastColumn, lastColumnIndex]
  );

  const getColumnStyle = useCallback(
    (headerId: string, index: number) => {
      const column = columns.find((col) => col.id === headerId);
      let baseStyle: React.CSSProperties = {};

      if (column?.minWidth && column?.maxWidth) {
        // Use defined min/max widths from column configuration
        baseStyle = {
          minWidth: `${column.minWidth}px`,
          maxWidth: `${column.maxWidth}px`,
          width: "auto",
        };
      } else if (column?.minWidth || column?.maxWidth) {
        // Use partial constraints
        baseStyle = {
          ...(column.minWidth && { minWidth: `${column.minWidth}px` }),
          ...(column.maxWidth && { maxWidth: `${column.maxWidth}px` }),
          width: "auto",
        };
      } else {
        // Calculate dynamic width based on content
        const calculatedWidth = calculateContentWidth(headerId, data);
        baseStyle = {
          width: `${calculatedWidth}px`,
          minWidth: `${Math.max(80, calculatedWidth)}px`,
        };
      }

      // Handle sticky positioning
      if (index === 0) {
        return {
          ...baseStyle,
          position: "sticky" as const,
          left: 0,
          backgroundColor: "#f8f9fa",
          zIndex: 11,
        };
      }
      if (isLastColumn(index)) {
        return {
          ...baseStyle,
          position: "sticky" as const,
          right: 0,
          backgroundColor: "#f8f9fa",
          zIndex: 11,
        };
      }

      return baseStyle;
    },
    [columns, data, calculateContentWidth, isLastColumn]
  );

  const getCellStyle = useCallback(
    (index: number, isEven: boolean) => {
      if (index === 0) {
        return {
          position: "sticky" as const,
          left: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5,
        };
      }
      if (isLastColumn(index)) {
        return {
          position: "sticky" as const,
          right: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5,
        };
      }
      return {};
    },
    [isLastColumn]
  );

  return (
    <div className="w-full rounded-md bg-white border border-gray-200">
      <div
        className={`w-full relative bg-white ${heightClass || "h-96"} overflow-auto custom-scrollbar`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <div className="w-full h-full flex flex-col">
            <table className="w-full border-collapse bg-white table-auto">
              <thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: Header<any, unknown>, index: number) => (
                        <th
                          key={`${header.id}-${index}`}
                          colSpan={header.colSpan}
                          className="text-left px-3 py-1 text-sm font-medium text-gray-600 border-b border-gray-200 sticky top-0 z-10"
                          style={{
                            ...getColumnStyle(header.id, index),
                            backgroundColor: "#f8f9fa",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16px",
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              onClick={() => sortAndGetData(header)}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <SortItems
                                header={header}
                                removeSortingForColumnIds={
                                  removeSortingForColumnIds
                                }
                              />
                            </div>
                          )}
                        </th>
                      )
                    )}
                  </tr>
                ))}
              </thead>
              <tbody>
                {[...Array(paginationDetails?.limit || 15)].map((_, i) => (
                  <tr
                    key={`loading-row-${i}`}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {[...Array(columns.length)].map((_, j) => (
                      <td
                        key={`loading-cell-${i}-${j}`}
                        className="px-3 py-2"
                        style={{
                          ...getCellStyle(j, i % 2 === 0),
                          fontSize: "13px",
                          lineHeight: "20px",
                        }}
                      >
                        {j === 1 ? (
                          <div className="flex gap-2 items-center">
                            <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
                            <Skeleton className="h-3 w-32 bg-gray-200 rounded-sm" />
                          </div>
                        ) : (
                          <Skeleton className="h-3 w-24 bg-gray-200 rounded-sm" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !data.length ? (
          <div className="flex flex-col items-center justify-center h-full py-16">
            <div className="text-gray-500 text-base font-medium">
              {noDataLabel || "No data available"}
            </div>
            {noDataDescription && (
              <div className="text-gray-400 text-sm mt-1">
                {noDataDescription}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="w-full overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse bg-white table-auto">
                <thead>
                  {table?.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(
                        (header: Header<any, unknown>, index: number) => (
                          <th
                            key={`${header.id}-${index}`}
                            colSpan={header.colSpan}
                            className="text-left px-3 py-2 text-gray-600 border-b border-gray-200 sticky top-0 z-10"
                            style={{
                              ...getColumnStyle(header.id, index),
                              backgroundColor: "#f8f9fa",
                              fontSize: "12px",
                              fontWeight: "500",
                              lineHeight: "16px",
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                onClick={() => sortAndGetData(header)}
                                className="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                <SortItems
                                  header={header}
                                  removeSortingForColumnIds={
                                    removeSortingForColumnIds
                                  }
                                />
                              </div>
                            )}
                          </th>
                        )
                      )}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {data?.length ? (
                    table?.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`transition-colors duration-150 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                        {...(row?.original.issue_id && row?.original.id
                          ? {
                              onClick: () =>
                                router.navigate({
                                  to: `/cases/${row.original.id}/case-history`,
                                }),
                            }
                          : {})}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => (
                          <td
                            key={cell.id}
                            className="px-3 py-2 text-gray-900"
                            style={{
                              ...getCellStyle(cellIndex, index % 2 === 0),
                              fontSize: "13px",
                              lineHeight: "20px",
                              fontWeight: "400",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center py-8 text-gray-500"
                        style={{ fontSize: "14px" }}
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {!loading && data?.length && paginationDetails ? (
        <div className="border-t border-gray-200">
          <PaginationComponent
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
            initialPage={paginationDetails?.current_page || 1}
          />
        </div>
      ) : null}
    </div>
  );
};

const SortItems = ({
  header,
  removeSortingForColumnIds,
}: {
  header: any;
  removeSortingForColumnIds?: string[];
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const sortBy = searchParams.get("order_by")?.split(":")[0];
  const sortDirection = searchParams.get("order_by")?.split(":")[1];

  if (removeSortingForColumnIds?.includes(header.id)) {
    return null;
  }

  return (
    <div className="flex items-center">
      {sortBy === header.id ? (
        sortDirection === "asc" ? (
          <TableSortAscIcon className="w-3 h-3 text-gray-400" />
        ) : (
          <TableSortDscIcon className="w-3 h-3 text-gray-400" />
        )
      ) : (
        <TableSortNormIcon className="w-3 h-3 text-gray-400" />
      )}
    </div>
  );
};

export default TanStackTable;
