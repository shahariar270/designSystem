import PropTypes from "prop-types";

/**
 * Divider — thin rule that separates content, with an optional inline label.
 * Renders a semantic `<hr>` when unlabeled, or a labeled separator group
 * otherwise — no client JS involved, so it's safe in server components.
 *
 * @example
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider>OR</Divider>
 */
export const Divider = ({
  children,
  orientation = "horizontal",
  className = "",
  ...rest
}) => {
  const classes = [
    "st-divider",
    `st-divider--${orientation}`,
    children && "st-divider--labeled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!children) {
    return (
      <hr
        className={classes}
        aria-orientation={orientation}
        {...rest}
      />
    );
  }

  return (
    <div className={classes} role="separator" aria-orientation={orientation} {...rest}>
      <span className="st-divider__line" aria-hidden="true" />
      <span className="st-divider__label">{children}</span>
      <span className="st-divider__line" aria-hidden="true" />
    </div>
  );
};

Divider.propTypes = {
  children: PropTypes.node,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  className: PropTypes.string,
};

export default Divider;
