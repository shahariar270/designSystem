"use client";

import PropTypes from "prop-types";

/**
 * BarChart — pure CSS/JSX vertical bar chart. No external deps.
 *
 * Single series:
 * @example
 * <BarChart data={[{ label: 'Jan', value: 1200 }, { label: 'Feb', value: 800 }]} height={180} />
 *
 * Multi-series:
 * @example
 * <BarChart
 *   data={[{ label: 'Jan', income: 1200, expense: 800 }]}
 *   series={[
 *     { key: 'income', color: 'var(--color-success)', label: 'Income' },
 *     { key: 'expense', color: 'var(--color-error)', label: 'Expense' },
 *   ]}
 * />
 */
export const BarChart = ({
  data = [],
  series,
  height = 180,
  showValues = true,
  showLegend = true,
  animated = true,
  className = "",
  style = {},
}) => {
  const keys = series ? series.map((s) => s.key) : ["value"];
  const max = Math.max(1, ...data.flatMap((d) => keys.map((k) => d[k] || 0)));

  const defaultColors = [
    "var(--color-primary)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-error)",
    "var(--color-info)",
  ];

  const getColor = (key, index) => {
    if (series) {
      const s = series.find((s) => s.key === key);
      return s?.color || defaultColors[index % defaultColors.length];
    }
    return "var(--color-primary)";
  };

  const classes = [
    "st-barchart",
    animated && "st-barchart--animated",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={{ ...style, "--chart-height": `${height}px` }}>
      {/* Legend */}
      {showLegend && series && series.length > 1 && (
        <div className="st-barchart__legend" role="list">
          {series.map((s, i) => (
            <span className="st-barchart__legend-item" key={s.key} role="listitem">
              <span
                className="st-barchart__legend-dot"
                style={{ background: s.color || defaultColors[i % defaultColors.length] }}
                aria-hidden="true"
              />
              {s.label || s.key}
            </span>
          ))}
        </div>
      )}

      {/* Chart body */}
      <div className="st-barchart__body" style={{ height }}>
        {data.map((d, i) => (
          <div className="st-barchart__group" key={i}>
            <div className="st-barchart__bar-set">
              {keys.map((key, ki) => {
                const pct = ((d[key] || 0) / max) * 100;
                return (
                  <div
                    key={key}
                    className="st-barchart__bar"
                    style={{
                      height: `${pct}%`,
                      background: getColor(key, ki),
                      "--bar-height": `${pct}%`,
                    }}
                    role="img"
                    aria-label={`${d.label}: ${d[key] || 0}`}
                  >
                    {showValues && (
                      <span className="st-barchart__value">{d[key] || 0}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="st-barchart__label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      color: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  height: PropTypes.number,
  showValues: PropTypes.bool,
  showLegend: PropTypes.bool,
  animated: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default BarChart;
