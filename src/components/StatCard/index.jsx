"use client";

import PropTypes from "prop-types";

/**
 * StatCard — KPI / metric display card for dashboards.
 *
 * @example
 * <StatCard label="Total Revenue" value="$48,200" sublabel="+12% this month" variant="primary" trend="up" />
 */
export const StatCard = ({
  label,
  value,
  sublabel,
  icon = null,
  trend = null,        // "up" | "down" | null
  trendValue = null,   // e.g. "+12%"
  variant = "default", // "default" | "primary" | "success" | "warning" | "danger"
  loading = false,
  className = "",
  style = {},
}) => {
  const classes = [
    "st-stat-card",
    `st-stat-card--${variant}`,
    loading && "st-stat-card--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return (
      <div className={classes} style={style} aria-busy="true">
        <div className="st-stat-card__skeleton st-stat-card__skeleton--label" />
        <div className="st-stat-card__skeleton st-stat-card__skeleton--value" />
        <div className="st-stat-card__skeleton st-stat-card__skeleton--sub" />
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      <div className="st-stat-card__header">
        <span className="st-stat-card__label">{label}</span>
        {icon && <span className="st-stat-card__icon" aria-hidden="true">{icon}</span>}
      </div>

      <div className="st-stat-card__value">{value}</div>

      {(sublabel || trend) && (
        <div className="st-stat-card__footer">
          {trend && trendValue && (
            <span className={`st-stat-card__trend st-stat-card__trend--${trend}`}>
              <span className="st-stat-card__trend-arrow" aria-hidden="true">
                {trend === "up" ? "↑" : "↓"}
              </span>
              {trendValue}
            </span>
          )}
          {sublabel && (
            <span className="st-stat-card__sublabel">{sublabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  sublabel: PropTypes.node,
  icon: PropTypes.node,
  trend: PropTypes.oneOf(["up", "down"]),
  trendValue: PropTypes.string,
  variant: PropTypes.oneOf(["default", "primary", "success", "warning", "danger"]),
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default StatCard;
