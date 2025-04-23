import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const Table = ({
  data = [],
  columns = [],
  pageSize = 10,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  sortBy = null,
  sortOrder = "asc",
  isLoading = false,
  error = null,
  onPageChange,
  onSortChange,
  className = "",
  loader = "Loading..",
  errorClassName = "",
  tableClassName = "",
  tableHeaderClassName = "",
  tableRowClassName = "",
  stripedRowClassName = ["bg-gray-50", "bg-gray-100"],
  emptyState = "No Data Found",
  emptyStateClassName = "",
  paginationContainerClassName = "",
  paginationButtonClassName = "",
  paginationPagesClassName = "",
  paginationTextClassName = "",
  sortable = true,
}) => {
  const handleSort = (accessor) => {
    if (!sortable) return;

    let newSortOrder = "asc";
    if (sortBy === accessor) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    onSortChange(accessor, newSortOrder);
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className={clsx("w-full", className)}>
      {/* Loading/Error States */}
      {isLoading && loader}
      {error && (
        <div className={clsx("text-center py-8 text-red-500", errorClassName)}>
          {error}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <>
          <div className="overflow-x-auto">
            <table
              className={clsx("min-w-full border-collapse", tableClassName)}
            >
              <thead>
                <tr className="bg-gray-100 text-left">
                  {columns.map(({ header, accessor, isSortable }) => (
                    <th
                      key={accessor}
                      className={clsx(
                        "p-1 font-medium text-gray-700 text-sm",
                        sortable && isSortable && "cursor-pointer select-none",
                        tableHeaderClassName,
                      )}
                      onClick={() => {
                        if (isSortable) {
                          handleSort(accessor);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {header}
                        {sortBy === accessor && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? (
                              <SvgIcon
                                size={"12px"}
                                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg>`}
                              />
                            ) : (
                              <SvgIcon
                                size={"12px"}
                                svg={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>`}
                              />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        "border-b text-sm",
                        stripedRowClassName.length && idx % 2 === 0
                          ? stripedRowClassName[0]
                          : stripedRowClassName[1],
                        tableRowClassName,
                      )}
                    >
                      {columns.map(({ accessor, cellRenderer }) => (
                        <td key={accessor} className="p-1">
                          {cellRenderer ? cellRenderer(row) : row[accessor]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className={clsx(
                        "px-4 py-8 text-center text-gray-500",
                        emptyStateClassName,
                      )}
                    >
                      {emptyState}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.length > 0 && (
            <div
              className={clsx(
                "flex flex-col sm:flex-row justify-between items-center mt-2 px-1",
                paginationContainerClassName,
              )}
            >
              <span
                className={clsx(
                  "text-sm text-gray-600 mb-2 sm:mb-0",
                  paginationTextClassName,
                )}
              >
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
                entries
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className={clsx(
                    "px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100",
                    paginationButtonClassName,
                  )}
                >
                  Prev
                </button>
                <span
                  className={clsx(
                    "px-3 py-1 text-sm border rounded bg-gray-100",
                    paginationPagesClassName,
                  )}
                >
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className={clsx(
                    "px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100",
                    paginationButtonClassName,
                  )}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      isSortable: PropTypes.bool,
      cellRenderer: PropTypes.func,
    }),
  ),
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.oneOf(["asc", "desc"]),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  loader: PropTypes.elementType,
  errorClassName: PropTypes.string,
  tableClassName: PropTypes.string,
  tableHeaderClassName: PropTypes.string,
  tableRowClassName: PropTypes.string,
  stripedRowClassName: PropTypes.arrayOf(PropTypes.string),
  emptyState: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  emptyStateClassName: PropTypes.string,
  paginationContainerClassName: PropTypes.string,
  paginationButtonClassName: PropTypes.string,
  paginationPagesClassName: PropTypes.string,
  paginationTextClassName: PropTypes.string,
  sortable: PropTypes.bool,
};

export default Table;
