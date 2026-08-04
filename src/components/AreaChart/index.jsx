"use client";

import PropTypes from "prop-types";

/**
 * AreaChart — pure SVG area chart. No external charting library.
 * Accepts date strings (DD/MM/YYYY or YYYY-MM-DD) or plain numbers as x-axis.
 *
 * @example
 * <AreaChart
 *   data={[{ date: '01/06/2026', value: 45 }, { date: '02/06/2026', value: 70 }]}
 *   color="var(--color-primary)"
 * />
 */
export const AreaChart = ({
  data = [],
  color = "var(--color-primary)",
  dateFormat = "DD/MM/YYYY", // "DD/MM/YYYY" | "YYYY-MM-DD" | "MM/YYYY"
  showDots = true,
  showValues = true,
  showGrid = true,
  className = "",
  style = {},
}) => {
  const W = 600;
  const H = 280;
  const PAD = { top: 30, right: 20, bottom: 40, left: 44 };

  const parseDate = (str) => {
    if (dateFormat === "YYYY-MM-DD") {
      return new Date(str).getTime();
    }
    if (dateFormat === "DD/MM/YYYY") {
      const [d, m, y] = str.split("/").map(Number);
      return new Date(y, m - 1, d).getTime();
    }
    if (dateFormat === "MM/YYYY") {
      const [m, y] = str.split("/").map(Number);
      return new Date(y, m - 1, 1).getTime();
    }
    return Number(str) || 0;
  };

  const formatLabel = (d) => {
    if (dateFormat === "DD/MM/YYYY") {
      const parts = d.date.split("/");
      return `${parts[0]}/${parts[1]}`;
    }
    if (dateFormat === "YYYY-MM-DD") {
      return d.date.slice(5); // MM-DD
    }
    return d.date;
  };

  if (!data.length) {
    return (
      <div className={["st-areachart st-areachart--empty", className].filter(Boolean).join(" ")}>
        <span className="st-areachart__empty-text">No data available</span>
      </div>
    );
  }

  const processed = data
    .map((d) => ({ ...d, ts: parseDate(d.date) }))
    .sort((a, b) => a.ts - b.ts);

  const xs = processed.map((d) => d.ts);
  const ys = processed.map((d) => d.value);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys) * 1.12;

  const xRange = maxX - minX || 1;
  const yRange = maxY || 1;
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toSvg = (d) => ({
    x: PAD.left + ((d.ts - minX) / xRange) * chartW,
    y: PAD.top + (1 - d.value / yRange) * chartH,
    ...d,
  });

  const pts = processed.map(toSvg);
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${PAD.top + chartH} L ${pts[0].x} ${PAD.top + chartH} Z`;
  const gridRatios = [0, 0.25, 0.5, 0.75, 1];
  const gradId = `ag-grad-${Math.random().toString(36).slice(2, 7)}`;

  const classes = ["st-areachart", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="st-areachart__svg"
        aria-label="Area chart"
        role="img"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {showGrid &&
          gridRatios.map((ratio, i) => {
            const yPos = PAD.top + ratio * chartH;
            const gridVal = Math.round(maxY * (1 - ratio));
            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  y1={yPos}
                  x2={W - PAD.right}
                  y2={yPos}
                  className="st-areachart__grid-line"
                />
                <text
                  x={PAD.left - 8}
                  y={yPos + 4}
                  textAnchor="end"
                  className="st-areachart__axis-label"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

        {/* Filled area */}
        <path d={areaPath} fill={`url(#${gradId})`} />

        {/* Line stroke */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="st-areachart__line"
        />

        {/* Dots + labels */}
        {pts.map((p, i) => (
          <g key={i}>
            {showDots && (
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill={color}
                className="st-areachart__dot"
              />
            )}
            {showValues && (
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                className="st-areachart__value-label"
              >
                {p.value}
              </text>
            )}
            <text
              x={p.x}
              y={PAD.top + chartH + 18}
              textAnchor="middle"
              className="st-areachart__x-label"
            >
              {formatLabel(p)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

AreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  color: PropTypes.string,
  dateFormat: PropTypes.oneOf(["DD/MM/YYYY", "YYYY-MM-DD", "MM/YYYY"]),
  showDots: PropTypes.bool,
  showValues: PropTypes.bool,
  showGrid: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default AreaChart;
