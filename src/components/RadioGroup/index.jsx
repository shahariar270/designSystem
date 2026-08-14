"use client";

import { useId } from "react";
import PropTypes from "prop-types";

/**
 * RadioGroup — accessible group of radio buttons.
 * Built on native <input type="radio"> for full keyboard / screen-reader support.
 *
 * @example
 * <RadioGroup
 *   label="Plan"
 *   name="plan"
 *   value={selected}
 *   onChange={setSelected}
 *   options={[
 *     { value: 'free', label: 'Free' },
 *     { value: 'pro',  label: 'Pro', helperText: '$9/mo' },
 *     { value: 'enterprise', label: 'Enterprise', disabled: true },
 *   ]}
 * />
 */
export const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options = [],
  orientation = "vertical",  // "vertical" | "horizontal"
  size = "md",               // "sm" | "md" | "lg"
  error,
  helperText,
  disabled = false,
  className = "",
  ...rest
}) => {
  const groupId = useId();
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;

  const classes = [
    "st-radio-group",
    `st-radio-group--${orientation}`,
    `st-radio-group--${size}`,
    hasError && "st-radio-group--error",
    disabled && "st-radio-group--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <fieldset
      className={classes}
      aria-describedby={message ? `${groupId}-msg` : undefined}
      {...rest}
    >
      {label && <legend className="st-radio-group__legend">{label}</legend>}

      <div className="st-radio-group__options" role="radiogroup">
        {options.map((opt) => {
          const optId = `${groupId}-${opt.value}`;
          const isDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={[
                "st-radio-group__item",
                isDisabled && "st-radio-group__item--disabled",
                value === opt.value && "st-radio-group__item--checked",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                id={optId}
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange?.(opt.value)}
                disabled={isDisabled}
                className="st-radio-group__input"
                aria-invalid={hasError || undefined}
              />
              <span className="st-radio-group__circle" aria-hidden="true" />
              <span className="st-radio-group__text">
                <span className="st-radio-group__label">{opt.label}</span>
                {opt.helperText && (
                  <span className="st-radio-group__helper">{opt.helperText}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {message && (
        <span
          id={`${groupId}-msg`}
          className={`st-radio-group__message${hasError ? " st-radio-group__message--error" : ""}`}
        >
          {message}
        </span>
      )}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      helperText: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  error: PropTypes.node,
  helperText: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default RadioGroup;
