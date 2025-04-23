import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

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
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>`,
    },
    error: {
      bg: "bg-red-500",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></svg>`,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
    },
    info: {
      bg: "bg-blue-500",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
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

export default Toast;
