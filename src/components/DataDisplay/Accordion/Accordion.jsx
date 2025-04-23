import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const AccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
  className = "",
  titleClassName = "",
  contentClassName = "",
  iconOpen = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  iconClosed = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
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
    <div className={clsx("border border-gray-200 shadow-sm", className)}>
      <button
        className={clsx(
          "w-full text-left px-4 py-3 font-medium",
          "flex justify-between items-center",
          "focus:outline-none",
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

export default Accordion;
