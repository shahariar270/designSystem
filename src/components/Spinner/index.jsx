"use client";

import PropTypes from "prop-types";

/**
 * Spinner — small inline loading indicator.
 * Lighter than Loading (no overlay, no fullscreen mode).
 *
 * @example
 * <Spinner size="sm" />
 * <Spinner size="md" color="var(--color-primary)" />
 */
export const Spinner = ({
  size      = "md",   // "xs" | "sm" | "md" | "lg"
  color,              // defaults to currentColor via CSS
  label     = "Loading",
  className = "",
  style     = {},
}) => {
  const classes = ["st-spinner", `st-spinner--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      style={{ ...(color ? { "--spinner-color": color } : {}), ...style }}
      role="status"
      aria-label={label}
    >
      <span className="st-spinner__ring" aria-hidden="true" />
      <span className="st-spinner__sr">{label}</span>
    </span>
  );
};

Spinner.propTypes = {
  size:      PropTypes.oneOf(["xs","sm","md","lg"]),
  color:     PropTypes.string,
  label:     PropTypes.string,
  className: PropTypes.string,
  style:     PropTypes.object,
};

export default Spinner;
