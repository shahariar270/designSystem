"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * DropdownMenu — trigger + floating item list with keyboard navigation.
 *
 * @example
 * <DropdownMenu
 *   trigger={<Button variant="secondary">Actions ▾</Button>}
 *   items={[
 *     { label: 'Edit',   onClick: handleEdit },
 *     { label: 'Duplicate', onClick: handleDup },
 *     { type: 'separator' },
 *     { label: 'Delete', onClick: handleDelete, variant: 'danger' },
 *   ]}
 * />
 */
export const DropdownMenu = ({
  trigger,
  items = [],
  align = "left",    // "left" | "right"
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const focusIndex = useRef(-1);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const actionItems = items.filter((i) => i.type !== "separator");

  const handleKeyDown = (e) => {
    if (!open) return;
    const buttons = containerRef.current?.querySelectorAll(".st-dropdown__item:not([disabled])");
    if (!buttons?.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusIndex.current = Math.min(focusIndex.current + 1, buttons.length - 1);
      buttons[focusIndex.current]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusIndex.current = Math.max(focusIndex.current - 1, 0);
      buttons[focusIndex.current]?.focus();
    }
  };

  return (
    <div
      className={["st-dropdown", className].filter(Boolean).join(" ")}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <div
        className="st-dropdown__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          className={["st-dropdown__menu", `st-dropdown__menu--${align}`].join(" ")}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="st-dropdown__separator" role="separator" />;
            }
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={[
                  "st-dropdown__item",
                  item.variant && `st-dropdown__item--${item.variant}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.icon && <span className="st-dropdown__item-icon" aria-hidden="true">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type:     PropTypes.oneOf(["separator"]),
      label:    PropTypes.node,
      icon:     PropTypes.node,
      onClick:  PropTypes.func,
      disabled: PropTypes.bool,
      variant:  PropTypes.oneOf(["danger", "warning"]),
    })
  ),
  align:    PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
};

export default DropdownMenu;
