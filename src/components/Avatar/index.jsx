"use client";

import { useState } from "react";
import PropTypes from "prop-types";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

/**
 * Avatar — user/entity image with graceful initials fallback.
 * Falls back to initials (or a generic mark) when `src` is absent or fails to load,
 * so it never renders a broken image — good for SEO and slow/blocked network conditions.
 *
 * @example
 * <Avatar src="/jane.jpg" name="Jane Doe" size="md" />
 * <Avatar name="Ada Lovelace" status="online" />
 */
export const Avatar = ({
  src,
  name,
  alt,
  size = "md",
  shape = "circle",
  status,
  className = "",
  ...rest
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(src) && !imgError;
  const initials = getInitials(name);

  const classes = [
    "st-avatar",
    `st-avatar--${size}`,
    `st-avatar--${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {showImage ? (
        <img
          className="st-avatar__img"
          src={src}
          alt={alt || name || "Avatar"}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="st-avatar__initials" aria-hidden={!name}>
          {initials || "?"}
        </span>
      )}
      {status && (
        <span
          className={`st-avatar__status st-avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  shape: PropTypes.oneOf(["circle", "square"]),
  status: PropTypes.oneOf(["online", "offline", "away", "busy"]),
  className: PropTypes.string,
};

export default Avatar;
