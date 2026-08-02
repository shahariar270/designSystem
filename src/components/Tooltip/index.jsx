"use client";

import { cloneElement, isValidElement, useId, useState } from "react";
import PropTypes from "prop-types";

/**
 * Tooltip — hover/focus hint anchored to a single child element.
 * Wires `aria-describedby` onto the trigger itself (not a wrapper), so the
 * hint is announced by screen readers on focus, not just visible on hover.
 *
 * @example
 * <Tooltip content="Copy to clipboard"><button>Copy</button></Tooltip>
 */
export const Tooltip = ({
  children,
  content,
  placement = "top",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  if (!isValidElement(children)) return children;

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const trigger = cloneElement(children, {
    "aria-describedby": content ? tooltipId : children.props["aria-describedby"],
    onMouseEnter: (e) => {
      children.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e) => {
      children.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e) => {
      children.props.onFocus?.(e);
      show();
    },
    onBlur: (e) => {
      children.props.onBlur?.(e);
      hide();
    },
  });

  const classes = ["st-tooltip", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {trigger}
      {open && content && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`st-tooltip__bubble st-tooltip__bubble--${placement}`}
        >
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  content: PropTypes.node,
  placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
};

export default Tooltip;
