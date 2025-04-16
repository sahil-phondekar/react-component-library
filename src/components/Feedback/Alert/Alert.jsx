import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

/**
 * A customizable alert component with SVG icon support
 *
 * @param {Object} props - Component props
 * @param {string|React.ReactNode} props.message - Alert message content
 * @param {"info"|"success"|"error"|"warning"} [props.type="info"] - Alert type
 * @param {Function} props.onClose - Close handler function
 * @param {string} [props.className] - Additional className(s)
 * @param {boolean} [props.dismissible=true] - Whether alert can be dismissed
 * @param {string|React.ElementType} [props.icon] - SVG path or icon component
 * @param {string} [props.iconSize="20px"] - Size for SVG icons
 * @returns {JSX.Element} Alert component
 */
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
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Checkmark
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Exclamation
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-200",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", // Triangle exclamation
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Info circle
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

Alert.defaultProps = {
  type: "info",
  className: "",
  dismissible: true,
  iconSize: "20px",
};

export default Alert;
