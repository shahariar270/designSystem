"use client";

import PropTypes from "prop-types";

/**
 * ProgressList — ranked horizontal bar list for breakdowns & category displays.
 *
 * @example
 * <ProgressList
 *   items={[
 *     { label: 'Food', value: 45, displayValue: '45%', color: 'var(--color-primary)' },
 *     { label: 'Transport', value: 22, displayValue: '22%', color: 'var(--color-warning)' },
 *   ]}
 *   maxValue={100}
 * />
 */
export const ProgressList = ({
  items = [],
  maxValue,
  animated = true,
  showValues = true,
  className = "",
  style = {},
}) => {
  const max = maxValue ?? Math.max(1, ...items.map((i) => i.value));

  const defaultColors = [
    "var(--color-primary)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-error)",
    "var(--color-info)",
  ];

  const classes = [
    "st-progress-list",
    animated && "st-progress-list--animated",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={classes} style={style} role="list">
      {items.map((item, i) => {
        const pct = Math.min(100, (item.value / max) * 100);
        const barColor = item.color || defaultColors[i % defaultColors.length];

        return (
          <li className="st-progress-list__item" key={i}>
            <div className="st-progress-list__top">
              <span className="st-progress-list__label">{item.label}</span>
              {showValues && (
                <span className="st-progress-list__value">
                  {item.displayValue ?? item.value}
                </span>
              )}
            </div>
            <div
              className="st-progress-list__track"
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={max}
              aria-label={item.label}
            >
              <div
                className="st-progress-list__fill"
                style={{
                  width: `${pct}%`,
                  background: barColor,
                  "--fill-width": `${pct}%`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

ProgressList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.number.isRequired,
      displayValue: PropTypes.node,
      color: PropTypes.string,
    })
  ).isRequired,
  maxValue: PropTypes.number,
  animated: PropTypes.bool,
  showValues: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ProgressList;
