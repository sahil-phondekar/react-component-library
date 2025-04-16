import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

/**
 * A toast notification component with auto-dismiss and multiple types
 *
 * @param {Object} props - Component props
 * @param {string|React.ReactNode} props.message - Toast message content
 * @param {"info"|"success"|"error"|"warning"} [props.type="info"] - Toast type
 * @param {boolean} props.isOpen - Whether toast is visible
 * @param {Function} props.onClose - Close handler function
 * @param {number} [props.duration=3000] - Auto-dismiss duration in ms (0 for no auto-dismiss)
 * @param {string|React.ElementType} [props.icon] - Custom SVG path or icon component
 * @param {string} [props.position="bottom-right"] - Toast position
 * @param {string} [props.className] - Additional className(s)
 * @returns {JSX.Element} Toast component
 */
const Toast = ({
  message,
  type = "info",
  isOpen,
  onClose,
  duration = 3000,
  icon,
  position = "bottom-right",
  className = "",
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  // Type styles and default icons
  const typeConfig = {
    success: {
      bg: "bg-green-500",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    error: {
      bg: "bg-red-500",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    warning: {
      bg: "bg-yellow-500",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    info: {
      bg: "bg-blue-500",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  };

  // Position styles
  const positionStyles = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div
      className={clsx(
        "fixed z-50 max-w-xs w-full p-4 rounded-lg shadow-lg",
        "text-white transform transition-all duration-300",
        "flex items-start",
        typeConfig[type].bg,
        positionStyles[position],
        className,
      )}
      role="alert"
    >
      {/* Icon - uses SvgIcon for path strings or renders component */}
      <div className="flex-shrink-0 mr-3">
        {typeof icon === "string" ? (
          <SvgIcon
            svg={icon || typeConfig[type].icon}
            size="20px"
            className="text-white"
          />
        ) : icon ? (
          React.createElement(icon, {
            className: "w-5 h-5 text-white",
          })
        ) : (
          <SvgIcon
            svg={typeConfig[type].icon}
            size="20px"
            className="text-white"
          />
        )}
      </div>

      {/* Message content */}
      <div className="flex-1">{message}</div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="ml-2 text-xl font-bold text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close toast"
      >
        &times;
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(["info", "success", "error", "warning"]),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]),
  className: PropTypes.string,
};

Toast.defaultProps = {
  type: "info",
  duration: 3000,
  position: "bottom-right",
  className: "",
};

export default Toast;
