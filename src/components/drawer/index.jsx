"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Drawer — off-canvas panel that slides from an edge.
 *
 * @example
 * <Drawer isOpen={open} onClose={close} title="Filters" position="right">…</Drawer>
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  position = "right",
  showClose = true,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`st-drawer-overlay ${isOpen ? "st-drawer-overlay--show" : ""}`}
        onClick={onClose}
      />

      <aside
        className={`st-drawer st-drawer--${position} ${isOpen ? "st-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={typeof title === "string" ? title : "Drawer"}
      >
        {(title || showClose) && (
          <div className="st-drawer__header">
            {title && <h2 className="st-drawer__title">{title}</h2>}
            {showClose && (
              <button
                type="button"
                className="st-drawer__close"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="st-drawer__body">{children}</div>
      </aside>
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.node,
  position: PropTypes.oneOf(["left", "right"]),
  showClose: PropTypes.bool,
};

export default Drawer;
