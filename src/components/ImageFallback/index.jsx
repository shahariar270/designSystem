"use client";

import PropTypes from "prop-types";

/**
 * ImageFallback — placeholder shown when an image is unavailable.
 * Keeps the layout slot intact (same size + rounding as a real photo)
 * rather than collapsing the grid or showing a broken image icon.
 *
 * @example
 * {product.image ? <img src={product.image} alt={product.name} /> : <ImageFallback />}
 */
export const ImageFallback = ({
  size = "md",  // "sm" | "md" | "lg" | "full"
  className = "",
  style = {},
}) => {
  const classes = [
    "st-img-fallback",
    `st-img-fallback--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} aria-hidden="true">
      <svg
        className="st-img-fallback__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
};

ImageFallback.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "full"]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ImageFallback;
