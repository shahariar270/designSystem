"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Tab — tabbed panel with pills/underline variants.
 * Set `link` to sync the active tab with a `?tab=` query param.
 *
 * @example
 * <Tab tabs={[{ label: "One", content: <A/> }]} variant="pills" />
 */
const Tab = ({ tabs = [], link = false, variant = "pills", fullWidth = false }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!link) return;
    const params = new URLSearchParams(window.location.search);
    const tabName = params.get("tab");
    if (tabName) {
      const index = tabs.findIndex(
        (t) => t.label.toLowerCase() === tabName.toLowerCase()
      );
      if (index !== -1) setActiveTab(index);
    }
  }, [link, tabs]);

  const handleTabChange = (index) => {
    if (tabs[index]?.disabled) return;
    setActiveTab(index);
    if (!link) return;
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabs[index].label.toLowerCase());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const rootClasses = [
    "st-tab",
    `st-tab--${variant}`,
    fullWidth && "st-tab--full",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      <div className="st-tab__buttons" role="tablist">
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            className={`st-tab__button ${
              activeTab === index ? "st-tab__button--active" : ""
            }`}
            key={index}
            disabled={tab?.disabled}
            onClick={() => handleTabChange(index)}
          >
            {tab?.label}
          </button>
        ))}
      </div>

      <div className="st-tab__content" role="tabpanel">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  link: PropTypes.bool,
  variant: PropTypes.oneOf(["pills", "underline"]),
  fullWidth: PropTypes.bool,
};

export default Tab;
