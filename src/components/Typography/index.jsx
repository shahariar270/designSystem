"use client";

import PropTypes from "prop-types";

/**
 * Typography — semantic text primitives with consistent token-based styles.
 *
 * @example
 * <Typography as="h1" variant="h1">Dashboard</Typography>
 * <Typography variant="body">Regular body text.</Typography>
 * <Typography variant="caption" color="secondary">Last updated 5 mins ago</Typography>
 */
export const Typography = ({
  as,
  variant   = "body",  // "h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"body"|"body-sm"|"caption"|"label"|"overline"
  color     = "primary", // "primary"|"secondary"|"disabled"|"inherit"
  weight,               // "normal"|"medium"|"semibold"|"bold" — overrides variant default
  truncate  = false,
  className = "",
  style     = {},
  children,
  ...rest
}) => {
  const TAG_MAP = {
    h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6",
    body: "p", "body-sm": "p", caption: "span", label: "label", overline: "span",
  };

  const Tag = as || TAG_MAP[variant] || "span";

  const classes = [
    "st-typography",
    `st-typography--${variant}`,
    `st-typography--${color}`,
    weight    && `st-typography--${weight}`,
    truncate  && "st-typography--truncate",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
};

Typography.propTypes = {
  as:        PropTypes.string,
  variant:   PropTypes.oneOf(["h1","h2","h3","h4","h5","h6","body","body-sm","caption","label","overline"]),
  color:     PropTypes.oneOf(["primary","secondary","disabled","inherit"]),
  weight:    PropTypes.oneOf(["normal","medium","semibold","bold"]),
  truncate:  PropTypes.bool,
  className: PropTypes.string,
  style:     PropTypes.object,
  children:  PropTypes.node,
};

export default Typography;
