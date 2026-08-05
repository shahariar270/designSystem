"use client";

import PropTypes from "prop-types";

/**
 * Tag — compact label for categorisation, filtering, or metadata display.
 *
 * @example
 * <Tag variant="primary">React</Tag>
 * <Tag variant="success" dismissible onDismiss={() => removeTag('active')}>Active</Tag>
 */
export const Tag = ({
  children,
  variant    = "default",  // "default"|"primary"|"success"|"warning"|"error"|"info"
  size       = "md",       // "sm" | "md"
  outlined   = false,
  dismissible = false,
  onDismiss,
  className  = "",
  style      = {},
}) => {
  const classes = [
    "st-tag",
    `st-tag--${variant}`,
    `st-tag--${size}`,
    outlined && "st-tag--outlined",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} style={style}>
      {children}
      {dismissible && (
        <button
          type="button"
          className="st-tag__dismiss"
          onClick={onDismiss}
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  );
};

Tag.propTypes = {
  children:    PropTypes.node,
  variant:     PropTypes.oneOf(["default","primary","success","warning","error","info"]),
  size:        PropTypes.oneOf(["sm","md"]),
  outlined:    PropTypes.bool,
  dismissible: PropTypes.bool,
  onDismiss:   PropTypes.func,
  className:   PropTypes.string,
  style:       PropTypes.object,
};

export default Tag;
