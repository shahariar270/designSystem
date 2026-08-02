"use client";

import PropTypes from "prop-types";
import { Icon } from "../Icon";

/**
 * Sidebar — fixed navigation rail; slides off-canvas under 768px.
 *
 * @example
 * <Sidebar
 *   logo="Acme"
 *   items={[{ key: "home", label: "Home", icon: "menu", href: "/" }]}
 *   activeKey="home"
 *   open={open}
 *   onClose={close}
 * />
 */
export const Sidebar = ({ logo, items = [], activeKey, footer, open = false, onClose }) => {
  return (
    <>
      <div
        className={`st-sidebar-overlay ${open ? "st-sidebar-overlay--show" : ""}`}
        onClick={onClose}
      />

      <aside className={`st-sidebar ${open ? "st-sidebar--open" : ""}`}>
        {logo && <div className="st-sidebar__logo">{logo}</div>}

        <ul className="st-sidebar__menu">
          {items.map((item) => {
            const isActive = item.key === activeKey;
            const className = `st-sidebar__item ${isActive ? "st-sidebar__item--active" : ""}`;
            const inner = (
              <>
                {item.icon && <Icon name={item.icon} size={18} />}
                <span>{item.label}</span>
              </>
            );

            return (
              <li key={item.key}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={className}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={className}
                    onClick={item.onClick}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {footer && <div className="st-sidebar__footer">{footer}</div>}
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  logo: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      icon: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  activeKey: PropTypes.string,
  footer: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
