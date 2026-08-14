"use client";

import PropTypes from "prop-types";

const DEFAULT_ICON = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="8" width="32" height="32" rx="4"/>
    <path d="M20 24h8M24 20v8"/>
  </svg>
);

/**
 * EmptyState — zero-data placeholder with icon, title, description and action.
 *
 * @example
 * <EmptyState
 *   title="No transactions yet"
 *   description="Add your first transaction to get started."
 *   action={<Button variant="primary" onClick={handleAdd}>Add transaction</Button>}
 * />
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  size = "md",    // "sm" | "md" | "lg"
  className = "",
  style = {},
}) => {
  const classes = ["st-empty-state", `st-empty-state--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} role="status" aria-live="polite">
      <span className="st-empty-state__icon" aria-hidden="true">
        {icon ?? DEFAULT_ICON}
      </span>
      {title       && <p className="st-empty-state__title">{title}</p>}
      {description && <p className="st-empty-state__desc">{description}</p>}
      {action      && <div className="st-empty-state__action">{action}</div>}
    </div>
  );
};

EmptyState.propTypes = {
  icon:        PropTypes.node,
  title:       PropTypes.node,
  description: PropTypes.node,
  action:      PropTypes.node,
  size:        PropTypes.oneOf(["sm", "md", "lg"]),
  className:   PropTypes.string,
  style:       PropTypes.object,
};

export default EmptyState;
