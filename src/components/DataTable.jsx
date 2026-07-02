/**
 * Reusable DataTable component with sorting, filtering, and pagination.
 * Uses React Bootstrap for styling and layout.
 * Accepts columns and data as props to display in a table format.
 */

import React, { useMemo, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { ITEMS_PER_PAGE } from "../constants/constants";
import PropTypes from "prop-types";

function DataTable({ inputId, columns, data }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // We use useMemo to optimize the filtering and sorting of data based on search and sortKey.
  const searchText = search.toLowerCase();
  const processedData = useMemo(() => {
    let filtered = data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchText),
      ),
    );
    if (!sortKey) {
      return filtered;
    }
    return filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }, [data, searchText, sortKey]);

  // to implement the pagination, we use offset based on the current page and items per page
  // The offset is calculated as (currentPage - 1) * ITEMS_PER_PAGE,
  // and we slice the processedData array to get the paginated data for the current page.
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = processedData.slice(offset, offset + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pages = [];

  pages.push(
    <Pagination.Prev
      aria-label="Previous"
      key="prev"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />,
  );

  const startPage = currentPage <= 3 ? 1 : currentPage;

  const visiblePages = Array.from(
    {
      length: Math.min(3, totalPages - startPage + 1),
    },
    (_, index) => startPage + index,
  );

  pages.push(
    ...visiblePages.map((page) => (
      <Pagination.Item
        aria-label={`Go to page ${page}`}
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    )),
  );

  if (totalPages > 4 && currentPage + 2 < totalPages) {
    pages.push(<Pagination.Ellipsis key="ellipsis" />);
  }

  if (totalPages > 3 && currentPage + 2 < totalPages) {
    pages.push(
      <Pagination.Item
        aria-label={`Go to page ${totalPages}`}
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>,
    );
  }

  pages.push(
    <Pagination.Next
      key="next"
      aria-label="Next"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />,
  );

  return (
    <div>
      <input
        aria-label="Search"
        id={inputId}
        type="text"
        placeholder="Search..."
        className="mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Table striped bordered responsive data-testid="datatable">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={Number(index)} onClick={() => setSortKey(col.key)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, colIndex) => (
                  <td key={Number(colIndex)}>{String(row[col.key] ?? "")}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && <Pagination>{pages}</Pagination>}
    </div>
  );
}

DataTable.propTypes = {
  inputId: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
