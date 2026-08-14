"use client";

import PropTypes from "prop-types";

/**
 * Stepper — step-by-step progress indicator for multi-step forms and onboarding.
 *
 * @example
 * <Stepper
 *   steps={['Account', 'Profile', 'Review']}
 *   currentStep={1}
 *   orientation="horizontal"
 * />
 */
export const Stepper = ({
  steps        = [],
  currentStep  = 0,     // 0-indexed
  orientation  = "horizontal",  // "horizontal" | "vertical"
  variant      = "default",     // "default" | "minimal"
  className    = "",
  style        = {},
}) => {
  const classes = [
    "st-stepper",
    `st-stepper--${orientation}`,
    `st-stepper--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={classes} style={style} aria-label="Progress steps">
      {steps.map((step, i) => {
        const label   = typeof step === "string" ? step : step.label;
        const desc    = typeof step === "object" ? step.description : undefined;
        const isDone  = i < currentStep;
        const isActive = i === currentStep;

        const itemClass = [
          "st-stepper__step",
          isDone   && "st-stepper__step--done",
          isActive && "st-stepper__step--active",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={i} className={itemClass} aria-current={isActive ? "step" : undefined}>
            <div className="st-stepper__indicator">
              {isDone ? (
                <svg className="st-stepper__check" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" clipRule="evenodd"/>
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div className="st-stepper__body">
              <span className="st-stepper__label">{label}</span>
              {desc && <span className="st-stepper__desc">{desc}</span>}
            </div>
            {i < steps.length - 1 && (
              <div className={["st-stepper__connector", isDone && "st-stepper__connector--done"].filter(Boolean).join(" ")} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ label: PropTypes.node.isRequired, description: PropTypes.node }),
    ])
  ),
  currentStep:  PropTypes.number,
  orientation:  PropTypes.oneOf(["horizontal","vertical"]),
  variant:      PropTypes.oneOf(["default","minimal"]),
  className:    PropTypes.string,
  style:        PropTypes.object,
};

export default Stepper;
