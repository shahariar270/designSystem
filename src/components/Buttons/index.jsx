"use client";

import PropTypes from "prop-types";

/**
 * Button — primary interactive primitive.
 *
 * @example
 * <Button variant="primary" size="md" onClick={fn}>Save</Button>
 */
const Button = ({
  children,
  label, // backward-compat: falls back to children
  type = "button",
  variant = "primary",
  size = "md",
  border = "none",
  disabled = false,
  loading = false,
  startIcon = null,
  endIcon = null,
  className = "",
  style = {},
  onClick,
  onclick, // backward-compat alias
  ...rest
}) => {
  const handleClick = onClick || onclick;
  const content = children ?? label;

  const classes = [
    "st-btn",
    `st-btn--${variant}`,
    `st-btn--${size}`,
    `st-btn__border--${border}`,
    loading && "st-btn--loading",
    disabled && "st-btn--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      style={style}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="st-btn__spinner" aria-hidden="true" />}
      {!loading && startIcon}
      {content}
      {!loading && endIcon}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "transparent"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  border: PropTypes.oneOf(["none", "primary", "focus"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onclick: PropTypes.func,
};

export default Button;
