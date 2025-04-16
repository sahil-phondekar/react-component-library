import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const DataTable = ({
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
  striped = false,
  hoverEffect = true,
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
      {isLoading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {/* Table */}
      {!isLoading && !error && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  {columns.map(({ header, accessor }) => (
                    <th
                      key={accessor}
                      className={clsx(
                        "px-4 py-3 font-medium text-gray-700",
                        sortable &&
                          "cursor-pointer select-none hover:bg-gray-200",
                      )}
                      onClick={() => handleSort(accessor)}
                    >
                      <div className="flex items-center">
                        {header}
                        {sortBy === accessor && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
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
                        "border-b",
                        striped && idx % 2 === 0 && "bg-gray-50",
                        hoverEffect && "hover:bg-gray-100",
                      )}
                    >
                      {columns.map(({ accessor, cellRenderer }) => (
                        <td key={accessor} className="px-4 py-3">
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
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2">
              <span className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
                entries
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-sm border rounded bg-gray-100">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
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
  striped: PropTypes.bool,
  hoverEffect: PropTypes.bool,
  sortable: PropTypes.bool,
};

DataTable.defaultProps = {
  data: [],
  columns: [],
  pageSize: 10,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  isLoading: false,
  className: "",
  striped: false,
  hoverEffect: true,
  sortable: true,
};

export default DataTable;
