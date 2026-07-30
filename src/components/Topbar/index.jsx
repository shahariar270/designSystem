"use client";

import PropTypes from "prop-types";
import { Icon } from "../Icon";

/**
 * Topbar — sticky header row. Shows a menu button under 768px to toggle the
 * sidebar. Put breadcrumb/title in `children`, actions in `right`.
 *
 * @example
 * <Topbar onMenuClick={openSidebar} right={<Button>New</Button>}>
 *   <Breadcrumb />
 * </Topbar>
 */
export const Topbar = ({ children, right, onMenuClick }) => {
  return (
    <header className="st-topbar">
      {onMenuClick && (
        <button
          type="button"
          className="st-topbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Icon name="menu" size={22} />
        </button>
      )}
      <div className="st-topbar__left">{children}</div>
      {right && <div className="st-topbar__right">{right}</div>}
    </header>
  );
};

Topbar.propTypes = {
  children: PropTypes.node,
  right: PropTypes.node,
  onMenuClick: PropTypes.func,
};

export default Topbar;
