"use client";

import { useId } from "react";
import PropTypes from "prop-types";

/**
 * Switch — on/off toggle built on a native checkbox for correct semantics
 * and keyboard support, styled as a sliding track + thumb.
 *
 * @example
 * <Switch label="Email notifications" checked={v} onChange={e => set(e.target.checked)} />
 */
export const Switch = ({
  label,
  checked,
  onChange,
  size = "md",
  disabled = false,
  id,
  className = "",
  ...rest
}) => {
  const autoId = useId();
  const fieldId = id || autoId;

  const classes = [
    "st-switch",
    `st-switch--${size}`,
    disabled && "st-switch--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} htmlFor={fieldId}>
      <input
        type="checkbox"
        role="switch"
        id={fieldId}
        className="st-switch__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-checked={checked}
        {...rest}
      />
      <span className="st-switch__track">
        <span className="st-switch__thumb" />
      </span>
      {label && <span className="st-switch__label">{label}</span>}
    </label>
  );
};

Switch.propTypes = {
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;
