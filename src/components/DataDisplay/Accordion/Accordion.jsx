import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

/**
 * AccordionItem component with SVG icon support
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Accordion item title
 * @param {React.ReactNode|string} props.content - Accordion content
 * @param {boolean} props.isOpen - Whether item is open
 * @param {Function} props.onToggle - Toggle handler
 * @param {string} [props.className] - Additional className(s)
 * @param {string} [props.titleClassName] - Additional className(s) for title button
 * @param {string} [props.contentClassName] - Additional className(s) for content
 * @param {string|React.ElementType} [props.iconOpen] - SVG path or component for open state
 * @param {string|React.ElementType} [props.iconClosed] - SVG path or component for closed state
 * @param {string} [props.iconSize="16px"] - Size for SVG icons
 * @returns {JSX.Element} AccordionItem component
 */
const AccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
  className = "",
  titleClassName = "",
  contentClassName = "",
  iconOpen = "M19 9l-7 7-7-7",
  iconClosed = "M9 5l7 7-7 7",
  iconSize = "16px",
}) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={clsx("border-b border-gray-200", className)}>
      <button
        className={clsx(
          "w-full text-left px-4 py-3 font-medium",
          "flex justify-between items-center",
          "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
          titleClassName,
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, "-")}`}
      >
        <span>{title}</span>
        <span className="text-gray-500 ml-2">
          {typeof iconOpen === "string" && typeof iconClosed === "string" ? (
            <SvgIcon
              svg={isOpen ? iconOpen : iconClosed}
              size={iconSize}
              className="text-current"
            />
          ) : isOpen ? (
            React.createElement(iconOpen, {
              className: `w-[${iconSize}] h-[${iconSize}] text-current`,
            })
          ) : (
            React.createElement(iconClosed, {
              className: `w-[${iconSize}] h-[${iconSize}] text-current`,
            })
          )}
        </span>
      </button>
      <div
        id={`accordion-content-${title.replace(/\s+/g, "-")}`}
        ref={contentRef}
        className={clsx(
          "overflow-hidden transition-all duration-300",
          contentClassName,
        )}
        style={{ height: `${contentHeight}px` }}
      >
        <div className="px-4 py-3 text-sm text-gray-700">
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion component with SVG icon support
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of accordion items
 * @param {boolean} [props.allowMultiple=false] - Allow multiple items open
 * @param {boolean} [props.defaultOpenFirst=false] - Open first item by default
 * @param {string} [props.className] - Additional className(s)
 * @param {string} [props.itemClassName] - Additional className(s) for all items
 * @param {string} [props.titleClassName] - Additional className(s) for all titles
 * @param {string} [props.contentClassName] - Additional className(s) for all contents
 * @param {string|React.ElementType} [props.iconOpen] - SVG path or component for open state
 * @param {string|React.ElementType} [props.iconClosed] - SVG path or component for closed state
 * @param {string} [props.iconSize="16px"] - Size for SVG icons
 * @returns {JSX.Element} Accordion component
 */
const Accordion = ({
  items = [],
  allowMultiple = false,
  defaultOpenFirst = false,
  className = "",
  itemClassName = "",
  titleClassName = "",
  contentClassName = "",
  iconOpen,
  iconClosed,
  iconSize = "16px",
}) => {
  const [openIndexes, setOpenIndexes] = useState(
    defaultOpenFirst && items.length > 0 ? [0] : [],
  );

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setOpenIndexes((prev) => (prev[0] === index ? [] : [index]));
    }
  };

  return (
    <div className={clsx("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
          className={itemClassName}
          titleClassName={titleClassName}
          contentClassName={contentClassName}
          iconOpen={iconOpen}
          iconClosed={iconClosed}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
        .isRequired,
    }),
  ).isRequired,
  allowMultiple: PropTypes.bool,
  defaultOpenFirst: PropTypes.bool,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  iconOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconClosed: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconSize: PropTypes.string,
};

Accordion.defaultProps = {
  allowMultiple: false,
  defaultOpenFirst: false,
  className: "",
  itemClassName: "",
  titleClassName: "",
  contentClassName: "",
  iconSize: "16px",
};

export default Accordion;
