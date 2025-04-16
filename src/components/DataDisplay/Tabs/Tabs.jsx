import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A customizable tabs component with horizontal and vertical layouts
 *
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects {label, content}
 * @param {number} [props.defaultIndex=0] - Default active tab index
 * @param {"horizontal"|"vertical"} [props.direction="horizontal"] - Tab direction
 * @param {string} [props.className] - Additional className(s) for container
 * @param {string} [props.tabClassName] - Additional className(s) for tab buttons
 * @param {string} [props.activeTabClassName] - Additional className(s) for active tab
 * @param {string} [props.contentClassName] - Additional className(s) for content area
 * @param {boolean} [props.fullWidth] - Whether tabs should take full width
 * @param {string} [props.activeColor="blue"] - Color for active tab indicator
 * @returns {JSX.Element} Tabs component
 */
const Tabs = ({
  tabs,
  defaultIndex = 0,
  direction = "horizontal",
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  fullWidth = false,
  activeColor = "blue",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const isVertical = direction === "vertical";

  // Color variants for active tab
  const colorVariants = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      border: "border-blue-500",
    },
    green: {
      bg: "bg-green-500",
      text: "text-green-500",
      border: "border-green-500",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-500",
      border: "border-purple-500",
    },
    // Add more colors as needed
  };

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
              "px-4 py-2 rounded-lg text-sm font-medium focus:outline-none",
              "transition-colors duration-200",
              "relative",
              activeIndex === index
                ? clsx(
                    colorVariants[activeColor].text,
                    "font-semibold",
                    activeTabClassName,
                  )
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
                  colorVariants[activeColor].bg,
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={clsx("flex-1", isVertical ? "ml-4" : "", contentClassName)}
      >
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            id={`tabpanel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            className={clsx(
              "p-4 bg-white rounded-lg shadow",
              activeIndex !== index && "hidden",
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
  activeColor: PropTypes.oneOf(["blue", "green", "purple"]),
};

Tabs.defaultProps = {
  defaultIndex: 0,
  direction: "horizontal",
  className: "",
  tabClassName: "",
  activeTabClassName: "",
  contentClassName: "",
  fullWidth: false,
  activeColor: "blue",
};

export default Tabs;
