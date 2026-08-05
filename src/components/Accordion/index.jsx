"use client";

import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Accordion — expandable / collapsible sections.
 * Supports single or multiple open panels at once.
 *
 * @example
 * <Accordion
 *   items={[
 *     { id: '1', title: 'What is VireoKit?', content: 'A React component library...' },
 *     { id: '2', title: 'How do I install?', content: 'npm install vireokit' },
 *   ]}
 * />
 */
export const Accordion = ({
  items = [],
  multiple  = false,   // allow multiple panels open simultaneously
  defaultOpen = [],    // array of IDs open by default
  className = "",
  style = {},
}) => {
  const [open, setOpen] = useState(new Set(defaultOpen));

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className={["st-accordion", className].filter(Boolean).join(" ")}
      style={style}
    >
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div
            key={item.id}
            className={["st-accordion__item", isOpen && "st-accordion__item--open"]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Trigger */}
            <button
              type="button"
              className="st-accordion__trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`st-acc-panel-${item.id}`}
              id={`st-acc-trigger-${item.id}`}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className="st-accordion__icon" aria-hidden="true">{item.icon}</span>
              )}
              <span className="st-accordion__title">{item.title}</span>
              <span className="st-accordion__chevron" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                </svg>
              </span>
            </button>

            {/* Panel */}
            <div
              id={`st-acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`st-acc-trigger-${item.id}`}
              className="st-accordion__panel"
              hidden={!isOpen}
            >
              <div className="st-accordion__content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id:       PropTypes.string.isRequired,
      title:    PropTypes.node.isRequired,
      content:  PropTypes.node.isRequired,
      icon:     PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  multiple:    PropTypes.bool,
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  className:   PropTypes.string,
  style:       PropTypes.object,
};

export default Accordion;
