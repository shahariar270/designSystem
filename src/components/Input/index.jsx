"use client";

import { useId } from "react";
import PropTypes from "prop-types";

/**
 * Input — text field with label, helper/error text, and error state.
 * Set `multiline` to render a textarea.
 *
 * @example
 * <Input label="Email" value={v} onChange={e => set(e.target.value)} error={err} />
 */
export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  multiline = false,
  rows = 4,
  id,
  className = "",
  ...rest
}) => {
  const autoId = useId();
  const fieldId = id || autoId;
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;

  const groupClasses = [
    "st-input-group",
    hasError && "st-input-group--error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldProps = {
    id: fieldId,
    className: "st-input-group__field",
    value,
    onChange,
    placeholder,
    disabled,
    required,
    "aria-invalid": hasError || undefined,
    "aria-describedby": message ? `${fieldId}-msg` : undefined,
    ...rest,
  };

  return (
    <div className={groupClasses}>
      {label && (
        <label className="st-input-group__label" htmlFor={fieldId}>
          {label}
          {required && <span className="st-input-group__required">*</span>}
        </label>
      )}

      {multiline ? (
        <textarea rows={rows} {...fieldProps} />
      ) : (
        <input type={type} {...fieldProps} />
      )}

      {message && (
        <span className="st-input-group__message" id={`${fieldId}-msg`}>
          {message}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.node,
  error: PropTypes.node,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
