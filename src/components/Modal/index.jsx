"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Modal — centered dialog with overlay.
 *
 * @example
 * <Modal isOpen={open} onClose={close} title="Confirm" size="md">…</Modal>
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  showClose = true,
}) => {
  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="st-modal-overlay"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={`st-modal st-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="st-modal__header">
            {title && <h2 className="st-modal__title">{title}</h2>}
            {showClose && (
              <button
                type="button"
                className="st-modal__close"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>
            )}
          </div>
        )}

        <div className="st-modal__content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  closeOnOverlay: PropTypes.bool,
  showClose: PropTypes.bool,
};

export default Modal;
