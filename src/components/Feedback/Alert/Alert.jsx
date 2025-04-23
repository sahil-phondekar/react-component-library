import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const Alert = ({
  message,
  type = "info",
  onClose,
  className = "",
  dismissible = true,
  icon,
  iconSize = "20px",
}) => {
  // Type styles mapping
  const typeStyles = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-200",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>`,
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></svg>`,
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-200",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    },
  };

  return (
    <div
      role="alert"
      className={clsx(
        "p-4 rounded-lg shadow-sm mb-4 flex items-start",
        "border border-solid",
        typeStyles[type].bg,
        typeStyles[type].text,
        typeStyles[type].border,
        className,
      )}
    >
      {/* Icon section - uses SvgIcon for path strings or renders component */}
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {typeof icon === "string" ? (
          <SvgIcon
            svg={icon || typeStyles[type].icon}
            size={iconSize}
            className="text-current"
          />
        ) : icon ? (
          React.createElement(icon, {
            className: clsx("text-current", `w-[${iconSize}] h-[${iconSize}]`),
          })
        ) : (
          <SvgIcon
            svg={typeStyles[type].icon}
            size={iconSize}
            className="text-current"
          />
        )}
      </div>

      {/* Message content */}
      <div className="flex-1">{message}</div>

      {/* Close button */}
      {dismissible && (
        <button
          onClick={onClose}
          className="ml-4 text-lg font-semibold text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(["info", "success", "error", "warning"]),
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  iconSize: PropTypes.string,
};

export default Alert;
