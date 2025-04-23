import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Tooltip = ({
  children,
  text,
  position = "top",
  className = "",
  tooltipClass = "",
  delay = 200,
  disabled = false,
  arrowSize = "5px",
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const positionClasses = {
    top: {
      tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      arrow: `top-full left-1/2 -translate-x-1/2 border-t-gray-800`,
      arrowStyle: {
        borderWidth: `${arrowSize} ${arrowSize} 0`,
        marginLeft: `-${arrowSize}`,
      },
    },
    bottom: {
      tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
      arrow: `bottom-full left-1/2 -translate-x-1/2 border-b-gray-800`,
      arrowStyle: {
        borderWidth: `0 ${arrowSize} ${arrowSize}`,
        marginLeft: `-${arrowSize}`,
      },
    },
    left: {
      tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
      arrow: `left-full top-1/2 -translate-y-1/2 border-l-gray-800`,
      arrowStyle: {
        borderWidth: `${arrowSize} 0 ${arrowSize} ${arrowSize}`,
        marginTop: `-${arrowSize}`,
      },
    },
    right: {
      tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
      arrow: `right-full top-1/2 -translate-y-1/2 border-r-gray-800`,
      arrowStyle: {
        borderWidth: `${arrowSize} ${arrowSize} ${arrowSize} 0`,
        marginTop: `-${arrowSize}`,
      },
    },
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setVisible(true), delay));
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setVisible(false), delay));
  };

  const handleFocus = () => {
    if (disabled) return;
    clearTimeout(timeoutId);
    setVisible(true);
  };

  const handleBlur = () => {
    clearTimeout(timeoutId);
    setVisible(false);
  };

  return (
    <div
      className={clsx("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tooltip"
    >
      {React.cloneElement(React.Children.only(children), {
        onFocus: handleFocus,
        onBlur: handleBlur,
        tabIndex: disabled ? undefined : 0,
      })}

      {visible && !disabled && (
        <div
          className={clsx(
            "absolute z-50 whitespace-nowrap",
            "bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-lg",
            "transform transition-opacity duration-150",
            visible ? "opacity-100" : "opacity-0",
            positionClasses[position].tooltip,
            tooltipClass,
          )}
          role="tooltip"
        >
          {text}
          <div
            className={clsx(
              "absolute border-transparent border-solid",
              positionClasses[position].arrow,
            )}
            style={positionClasses[position].arrowStyle}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
  tooltipClass: PropTypes.string,
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  arrowSize: PropTypes.string,
};

export default Tooltip;
