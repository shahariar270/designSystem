"use client";

import PropTypes from "prop-types";

/**
 * Progress — linear progress bar for file uploads, task completion, loading.
 *
 * @example
 * <Progress value={65} label="Uploading..." showValue />
 * <Progress value={null} />  // indeterminate
 */
export const Progress = ({
  value,                   // 0–100, null = indeterminate
  max          = 100,
  label,
  showValue    = false,
  size         = "md",     // "sm" | "md" | "lg"
  variant      = "primary",// "primary"|"success"|"warning"|"error"
  animated     = true,
  className    = "",
  style        = {},
}) => {
  const isIndeterminate = value === null || value === undefined;
  const pct = isIndeterminate ? null : Math.min(100, Math.max(0, (value / max) * 100));

  const classes = ["st-progress", `st-progress--${size}`, `st-progress--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {(label || showValue) && (
        <div className="st-progress__meta">
          {label    && <span className="st-progress__label">{label}</span>}
          {showValue && !isIndeterminate && (
            <span className="st-progress__value">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className="st-progress__track"
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={[
            "st-progress__fill",
            isIndeterminate && "st-progress__fill--indeterminate",
            animated && !isIndeterminate && "st-progress__fill--animated",
          ]
            .filter(Boolean)
            .join(" ")}
          style={isIndeterminate ? {} : { width: `${pct}%`, "--prog-width": `${pct}%` }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = {
  value:     PropTypes.number,
  max:       PropTypes.number,
  label:     PropTypes.node,
  showValue: PropTypes.bool,
  size:      PropTypes.oneOf(["sm","md","lg"]),
  variant:   PropTypes.oneOf(["primary","success","warning","error"]),
  animated:  PropTypes.bool,
  className: PropTypes.string,
  style:     PropTypes.object,
};

export default Progress;
