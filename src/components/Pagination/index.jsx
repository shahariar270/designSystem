"use client";

import PropTypes from "prop-types";

/**
 * Pagination — page navigation with optional page-size selector.
 *
 * @example
 * <Pagination page={p} pageSize={10} total={230} onPageChange={setP} />
 */
export const Pagination = ({
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  className = "",
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const go = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onPageChange?.(next);
  };

  return (
    <div className={["st-pagination", className].filter(Boolean).join(" ")}>
      <div className="st-pagination__info">
        {start}–{end} of {total}
      </div>

      <div className="st-pagination__controls">
        {onPageSizeChange && (
          <select
            className="st-pagination__size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          className="st-pagination__btn"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        <span className="st-pagination__btn st-pagination__btn--active" aria-current="page">
          {page}
        </span>

        <button
          type="button"
          className="st-pagination__btn"
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
};

export default Pagination;
