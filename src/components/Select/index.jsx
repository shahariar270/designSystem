"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Select — accessible custom dropdown (no external dependency).
 *
 * @example
 * <Select
 *   options={[{ label: "One", value: 1 }, { label: "Two", value: 2 }]}
 *   value={val}
 *   onChange={setVal}
 *   placeholder="Choose…"
 * />
 */
export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);

  const selected = options.find((o) => o.value === value) || null;

  // close on outside click
  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const commit = (option) => {
    onChange?.(option.value, option);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && activeIndex >= 0) commit(options[activeIndex]);
        else setOpen((v) => !v);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={["st-select", className].filter(Boolean).join(" ")} ref={rootRef}>
      <button
        type="button"
        className={`st-select__control ${open ? "st-select__control--open" : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className="st-select__placeholder">{placeholder}</span>
        )}
        <span className="st-select__arrow" aria-hidden="true" />
      </button>

      {open && (
        <ul className="st-select__menu" role="listbox">
          {options.length === 0 && (
            <li className="st-select__option st-select__option--empty">No options</li>
          )}
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={[
                  "st-select__option",
                  isActive && "st-select__option--active",
                  isSelected && "st-select__option--selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
