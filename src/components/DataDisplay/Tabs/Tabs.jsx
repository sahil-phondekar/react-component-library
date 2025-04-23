import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Tabs = ({
  tabs,
  defaultIndex = 0,
  direction = "horizontal",
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  fullWidth = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const isVertical = direction === "vertical";

  return (
    <div
      className={clsx("flex", isVertical ? "flex-row" : "flex-col", className)}
      role="tablist"
    >
      {/* Tab Buttons */}
      <div
        className={clsx(
          "flex",
          isVertical ? "flex-col space-y-2" : "space-x-2 mb-4",
          fullWidth && isVertical ? "w-48" : "",
          fullWidth && !isVertical ? "w-full" : "",
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={clsx(
              "px-4 py-2 text-sm font-medium focus:outline-none",
              "transition-colors duration-200",
              "relative",
              activeIndex === index
                ? clsx("font-semibold", activeTabClassName)
                : clsx("text-gray-600 hover:text-gray-900", tabClassName),
              fullWidth && "flex-1 text-center",
            )}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
          >
            {tab.label}
            {/* Active indicator */}
            {activeIndex === index && (
              <div
                className={clsx(
                  "absolute rounded-full",
                  isVertical
                    ? "left-0 top-1/2 -translate-y-1/2 w-1 h-6"
                    : "bottom-0 left-1/2 -translate-x-1/2 w-6 h-1",
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={clsx("flex-1", isVertical ? "ml-4" : "")}>
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            id={`tabpanel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            className={clsx(
              "p-4 shadow",
              activeIndex !== index && "hidden",
              contentClassName,
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }),
  ).isRequired,
  defaultIndex: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Tabs;
