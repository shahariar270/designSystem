"use client";

import { useId } from "react";
import PropTypes from "prop-types";

/**
 * NumberInput — integer/float input with increment/decrement buttons.
 *
 * @example
 * <NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={99} />
 */
export const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step       = 1,
  disabled   = false,
  helperText,
  error,
  id,
  className  = "",
  style      = {},
  ...rest
}) => {
  const autoId  = useId();
  const fieldId = id || autoId;
  const hasError = Boolean(error);
  const message  = hasError ? error : helperText;

  const increment = () => {
    const next = Number(value || 0) + step;
    if (max !== undefined && next > max) return;
    onChange?.(next);
  };

  const decrement = () => {
    const next = Number(value || 0) - step;
    if (min !== undefined && next < min) return;
    onChange?.(next);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    if (v === "" || v === "-") { onChange?.(v); return; }
    const n = Number(v);
    if (!isNaN(n)) onChange?.(n);
  };

  const classes = [
    "st-number-input",
    hasError  && "st-number-input--error",
    disabled  && "st-number-input--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {label && (
        <label htmlFor={fieldId} className="st-number-input__label">{label}</label>
      )}
      <div className="st-number-input__field">
        <button
          type="button"
          className="st-number-input__btn st-number-input__btn--dec"
          onClick={decrement}
          disabled={disabled || (min !== undefined && Number(value) <= min)}
          tabIndex={-1}
          aria-label="Decrease"
        >−</button>

        <input
          id={fieldId}
          type="number"
          className="st-number-input__input"
          value={value ?? ""}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? `${fieldId}-msg` : undefined}
          {...rest}
        />

        <button
          type="button"
          className="st-number-input__btn st-number-input__btn--inc"
          onClick={increment}
          disabled={disabled || (max !== undefined && Number(value) >= max)}
          tabIndex={-1}
          aria-label="Increase"
        >+</button>
      </div>

      {message && (
        <span
          id={`${fieldId}-msg`}
          className={`st-number-input__message${hasError ? " st-number-input__message--error" : ""}`}
        >
          {message}
        </span>
      )}
    </div>
  );
};

NumberInput.propTypes = {
  label:     PropTypes.node,
  value:     PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange:  PropTypes.func,
  min:       PropTypes.number,
  max:       PropTypes.number,
  step:      PropTypes.number,
  disabled:  PropTypes.bool,
  helperText: PropTypes.node,
  error:     PropTypes.node,
  id:        PropTypes.string,
  className: PropTypes.string,
  style:     PropTypes.object,
};

export default NumberInput;
