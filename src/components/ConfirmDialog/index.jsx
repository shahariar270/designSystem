"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * ConfirmDialog — "Are you sure?" modal for destructive actions.
 * Traps focus, closes on Escape, calls onConfirm or onCancel.
 *
 * @example
 * <ConfirmDialog
 *   open={showConfirm}
 *   title="Delete product?"
 *   description="This action cannot be undone."
 *   confirmLabel="Delete"
 *   variant="danger"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowConfirm(false)}
 * />
 */
export const ConfirmDialog = ({
  open = false,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel  = "Cancel",
  variant      = "danger",   // "danger" | "warning" | "primary"
  loading      = false,
  onConfirm,
  onCancel,
}) => {
  const confirmRef = useRef(null);

  // Focus confirm button when opened
  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onCancel?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="st-confirm-overlay"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel?.(); }}
    >
      <div
        className="st-confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="st-confirm-title"
        aria-describedby={description ? "st-confirm-desc" : undefined}
      >
        <div className="st-confirm__header">
          <p id="st-confirm-title" className="st-confirm__title">{title}</p>
        </div>

        {description && (
          <p id="st-confirm-desc" className="st-confirm__desc">{description}</p>
        )}

        <div className="st-confirm__actions">
          <button
            type="button"
            className="st-confirm__cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            className={`st-confirm__confirm st-confirm__confirm--${variant}`}
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading}
          >
            {loading && <span className="st-confirm__spinner" aria-hidden="true" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  open:         PropTypes.bool,
  title:        PropTypes.node.isRequired,
  description:  PropTypes.node,
  confirmLabel: PropTypes.node,
  cancelLabel:  PropTypes.node,
  variant:      PropTypes.oneOf(["danger", "warning", "primary"]),
  loading:      PropTypes.bool,
  onConfirm:    PropTypes.func,
  onCancel:     PropTypes.func,
};

export default ConfirmDialog;
