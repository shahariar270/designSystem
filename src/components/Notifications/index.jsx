"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

const ICONS = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

/**
 * NotificationProvider — toast host + `useNotification()` hook.
 *
 * @example
 * const { showNotification } = useNotification();
 * showNotification({ type: "success", title: "Saved", message: "All good" });
 */
export const NotificationProvider = ({ children, duration = 3000 }) => {
  const [toasts, setToasts] = useState([]);

  const removeNotification = useCallback((id) => {
    setToasts((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    ({ type = "info", message, title, duration: d } = {}) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message, title }]);
      const timeout = d ?? duration;
      if (timeout > 0) {
        setTimeout(() => removeNotification(id), timeout);
      }
      return id;
    },
    [duration, removeNotification]
  );

  const value = useMemo(
    () => ({ showNotification, removeNotification }),
    [showNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="st-toast-wrapper">
        {toasts.map((n) => (
          <div
            key={n.id}
            className={`st-toast st-toast--${n.type}`}
            role="alert"
          >
            <span className="st-toast__icon" aria-hidden="true">
              {ICONS[n.type] || ICONS.info}
            </span>
            <div className="st-toast__body">
              {n.title && <div className="st-toast__title">{n.title}</div>}
              {n.message && <div className="st-toast__message">{n.message}</div>}
            </div>
            <button
              type="button"
              className="st-toast__close"
              onClick={() => removeNotification(n.id)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
  duration: PropTypes.number,
};
