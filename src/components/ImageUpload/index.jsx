"use client";

import { useRef, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * ImageUpload — click or drag-and-drop image upload zone.
 * Shows a preview of the selected image and a remove button.
 *
 * @example
 * <ImageUpload
 *   label="Product Image"
 *   previewSrc={imageUrl}
 *   onFileSelect={(file) => handleUpload(file)}
 *   onRemove={() => setImageUrl(null)}
 * />
 */
export const ImageUpload = ({
  label = "",
  previewSrc,
  onFileSelect,
  onRemove,
  accept = "image/*",
  maxSizeMb = null,
  disabled = false,
  placeholder = "Click or drag to upload an image",
  className = "",
  style = {},
}) => {
  const fileInputRef = useRef(null);
  const hasImage = Boolean(previewSrc);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
        console.warn(`[ImageUpload] File exceeds ${maxSizeMb} MB limit.`);
        return;
      }
      onFileSelect?.(file);
    },
    [onFileSelect, maxSizeMb]
  );

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleChange = (e) => {
    handleFile(e.target.files?.[0]);
    // Reset so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const classes = [
    "st-image-upload",
    hasImage && "st-image-upload--has-image",
    disabled && "st-image-upload--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {label && <span className="st-image-upload__label">{label}</span>}

      <div
        className="st-image-upload__zone"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label || "Upload image"}
        aria-disabled={disabled}
      >
        {hasImage ? (
          <img
            src={previewSrc}
            alt="Upload preview"
            className="st-image-upload__preview"
          />
        ) : (
          <div className="st-image-upload__placeholder">
            <svg
              className="st-image-upload__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="st-image-upload__placeholder-text">{placeholder}</span>
            {maxSizeMb && (
              <span className="st-image-upload__hint">Max {maxSizeMb} MB</span>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="st-image-upload__input"
          onChange={handleChange}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {hasImage && onRemove && (
        <button
          type="button"
          className="st-image-upload__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove image"
        >
          ✕ Remove
        </button>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.node,
  previewSrc: PropTypes.string,
  onFileSelect: PropTypes.func,
  onRemove: PropTypes.func,
  accept: PropTypes.string,
  maxSizeMb: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ImageUpload;
