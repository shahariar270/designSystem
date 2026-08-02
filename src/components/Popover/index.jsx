"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Popover — small floating panel anchored to a trigger.
 *
 * @example
 * <Popover label="Info" trigger="click" align="right">Panel content</Popover>
 */
export const Popover = ({
  label,
  children,
  trigger = "hover",
  align = "left",
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // For click trigger: close on outside click
  useEffect(() => {
    if (trigger !== "click" || !open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [trigger, open]);

  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        }
      : {};

  return (
    <div className="st-popover" ref={rootRef} {...hoverProps}>
      <button
        type="button"
        className="st-popover__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={trigger === "click" ? () => setOpen((v) => !v) : undefined}
      >
        {label}
      </button>

      {open && (
        <div className={`st-popover__panel st-popover__panel--${align}`} role="dialog">
          <span className="st-popover__arrow" aria-hidden="true" />
          {children}
        </div>
      )}
    </div>
  );
};

Popover.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  trigger: PropTypes.oneOf(["hover", "click"]),
  align: PropTypes.oneOf(["left", "right"]),
};

export default Popover;
