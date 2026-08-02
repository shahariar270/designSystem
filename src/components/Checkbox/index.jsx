"use client";

import { useEffect, useId, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Checkbox — labeled checkbox built on a native `<input type="checkbox">`
 * for full keyboard/screen-reader support, with an `indeterminate` visual state.
 *
 * @example
 * <Checkbox label="Accept terms" checked={v} onChange={e => set(e.target.checked)} />
 */
export const Checkbox = ({
  label,
  checked,
  indeterminate = false,
  onChange,
  helperText,
  error,
  disabled = false,
  id,
  className = "",
  ...rest
}) => {
  const autoId = useId();
  const fieldId = id || autoId;
  const inputRef = useRef(null);
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;

  // `indeterminate` has no JSX/HTML attribute equivalent — it's DOM-property-only.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const classes = [
    "st-checkbox",
    hasError && "st-checkbox--error",
    disabled && "st-checkbox--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <label className="st-checkbox__row" htmlFor={fieldId}>
        <input
          ref={inputRef}
          type="checkbox"
          id={fieldId}
          className="st-checkbox__input"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? `${fieldId}-msg` : undefined}
          {...rest}
        />
        <span className="st-checkbox__box" aria-hidden="true" />
        {label && <span className="st-checkbox__label">{label}</span>}
      </label>

      {message && (
        <span className="st-checkbox__message" id={`${fieldId}-msg`}>
          {message}
        </span>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.node,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  helperText: PropTypes.node,
  error: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
