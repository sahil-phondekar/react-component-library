import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const Table = ({
  columns,
  data,
  pageSize = 10,
  className = "",
  striped = false,
  hoverEffect = true,
  compact = false,
  sortable = true,
  pagination = true,
  emptyState = "No data available",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedData = useMemo(() => {
    if (!sortBy || !sortable) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortBy, sortOrder, sortable]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (accessor) => {
    if (!sortable) return;
    if (sortBy === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(accessor);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (accessor) => {
    if (sortBy !== accessor) return null;
    return (
      <span className="ml-1">
        {sortOrder === "asc" ? (
          <SvgIcon svg="M5 15l7-7 7 7" size="12px" />
        ) : (
          <SvgIcon svg="M19 9l-7 7-7-7" size="12px" />
        )}
      </span>
    );
  };

  return (
    <div className={clsx("w-full overflow-x-auto", className)}>
      <table
        className={clsx(
          "min-w-full border-collapse",
          compact ? "text-sm" : "text-base",
        )}
      >
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map(({ header, accessor }) => (
              <th
                key={accessor}
                className={clsx(
                  "px-4 py-3 font-medium text-gray-700",
                  sortable && "cursor-pointer select-none hover:bg-gray-200",
                )}
                onClick={() => handleSort(accessor)}
              >
                <div className="flex items-center">
                  {header}
                  {renderSortIcon(accessor)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className={clsx(
                  "border-b",
                  striped && idx % 2 === 0 && "bg-gray-50",
                  hoverEffect && "hover:bg-gray-100",
                )}
              >
                {columns.map(({ accessor, cellRenderer }) => (
                  <td
                    key={accessor}
                    className={clsx("px-4", compact ? "py-2" : "py-3")}
                  >
                    {cellRenderer ? cellRenderer(row) : row[accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination && sortedData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2">
          <span className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} entries
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm border rounded bg-gray-100">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      cellRenderer: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  className: PropTypes.string,
  striped: PropTypes.bool,
  hoverEffect: PropTypes.bool,
  compact: PropTypes.bool,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  emptyState: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Table.defaultProps = {
  pageSize: 10,
  className: "",
  striped: false,
  hoverEffect: true,
  compact: false,
  sortable: true,
  pagination: true,
  emptyState: "No data available",
};

export default Table;
