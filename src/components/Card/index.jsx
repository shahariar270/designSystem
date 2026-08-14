"use client";

import PropTypes from "prop-types";

/**
 * Card — general-purpose surface container.
 * Composes Header, Body, Footer and Image sub-components.
 *
 * @example
 * <Card>
 *   <Card.Header title="Revenue" action={<Button size="sm">View all</Button>} />
 *   <Card.Body>Content here</Card.Body>
 *   <Card.Footer>Last updated 2 mins ago</Card.Footer>
 * </Card>
 */
export const Card = ({
  children,
  variant = "default",  // "default" | "outlined" | "flat"
  padding = "md",       // "none" | "sm" | "md" | "lg"
  hoverable = false,
  className = "",
  style = {},
  ...rest
}) => {
  const classes = [
    "st-card",
    `st-card--${variant}`,
    `st-card--pad-${padding}`,
    hoverable && "st-card--hoverable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} {...rest}>
      {children}
    </div>
  );
};

// ---- Card.Image ----
const CardImage = ({ src, alt = "", className = "", style = {} }) => (
  <div className={["st-card__image", className].filter(Boolean).join(" ")} style={style}>
    <img src={src} alt={alt} />
  </div>
);

// ---- Card.Header ----
const CardHeader = ({ title, subtitle, action, className = "", children }) => (
  <div className={["st-card__header", className].filter(Boolean).join(" ")}>
    {(title || subtitle) && (
      <div className="st-card__header-text">
        {title    && <h3 className="st-card__title">{title}</h3>}
        {subtitle && <p  className="st-card__subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
    {action && <div className="st-card__header-action">{action}</div>}
  </div>
);

// ---- Card.Body ----
const CardBody = ({ children, className = "", style = {} }) => (
  <div className={["st-card__body", className].filter(Boolean).join(" ")} style={style}>
    {children}
  </div>
);

// ---- Card.Footer ----
const CardFooter = ({ children, className = "", style = {} }) => (
  <div className={["st-card__footer", className].filter(Boolean).join(" ")} style={style}>
    {children}
  </div>
);

// Attach sub-components
Card.Image  = CardImage;
Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Footer = CardFooter;

Card.propTypes = {
  children:  PropTypes.node,
  variant:   PropTypes.oneOf(["default", "outlined", "flat"]),
  padding:   PropTypes.oneOf(["none", "sm", "md", "lg"]),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  style:     PropTypes.object,
};

CardHeader.propTypes = {
  title:    PropTypes.node,
  subtitle: PropTypes.node,
  action:   PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
