"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Table — card-row data table with optional sorting.
 *
 * @example
 * <Table columns={[{ key: "name", title: "Name" }]} data={rows} sortable />
 */
const Table = ({
  columns = [],
  data = [],
  onRowClick,
  sortable = false,
  bordered = false,
  compact = false,
  responsive = true,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    if (!sortable) return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const getSortClass = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc"
      ? "st-table__header-cell--sortable--asc"
      : "st-table__header-cell--sortable--desc";
  };

  const tableClasses = [
    "st-table",
    bordered && "st-table--bordered",
    compact && "st-table--compact",
    loading && "st-table--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tableContent = (
    <table className={tableClasses} {...props}>
      <thead className="st-table__header">
        <tr className="st-table__header-row">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`st-table__header-cell ${
                sortable
                  ? `st-table__header-cell--sortable ${getSortClass(column.key)}`
                  : ""
              }`}
              onClick={() => handleSort(column.key)}
              style={{ width: column.width, textAlign: column.align || "left" }}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="st-table__body">
        {sortedData.length > 0 ? (
          sortedData.map((row, index) => (
            <tr
              key={index}
              className={`st-table__body-row ${
                onRowClick ? "st-table__body-row--clickable" : ""
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="st-table__body-cell"
                  style={{ textAlign: column.align || "left" }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="st-table__empty">
              <div className="st-table__empty-icon">📊</div>
              <p className="st-table__empty-message">{emptyMessage}</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  if (responsive) {
    return <div className="st-table--responsive">{tableContent}</div>;
  }

  return tableContent;
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.node,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      align: PropTypes.oneOf(["left", "center", "right"]),
      render: PropTypes.func,
    })
  ),
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  sortable: PropTypes.bool,
  bordered: PropTypes.bool,
  compact: PropTypes.bool,
  responsive: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.node,
  className: PropTypes.string,
};

export default Table;
