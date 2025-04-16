import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

/**
 * A customizable empty state component with SVG icon support
 *
 * @param {Object} props - Component props
 * @param {string} [props.title="No Data Available"] - Title text
 * @param {string} [props.description="There is no content to display."] - Description text
 * @param {string|React.ReactNode} [props.icon] - SVG path data or icon component
 * @param {string} [props.buttonText="Retry"] - Action button text
 * @param {Function} [props.onButtonClick] - Button click handler
 * @param {string} [props.className] - Additional className(s) for container
 * @param {"sm"|"md"|"lg"} [props.iconSize="lg"] - Icon size
 * @param {"primary"|"secondary"|"danger"} [props.buttonVariant="primary"] - Button style
 * @param {boolean} [props.compact] - Compact layout with less padding
 * @param {string} [props.iconColor="text-gray-400"] - Icon color class
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({
  title = "No Data Available",
  description = "There is no content to display.",
  icon,
  buttonText = "Retry",
  onButtonClick = null,
  className = "",
  iconSize = "lg",
  buttonVariant = "primary",
  compact = false,
  iconColor = "text-gray-400",
}) => {
  const iconSizes = {
    sm: "48px",
    md: "64px",
    lg: "80px",
  };

  const buttonVariantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        "w-full mx-auto",
        compact ? "p-4" : "p-8",
        "space-y-3",
        className,
      )}
    >
      {icon && (
        <div className={clsx("mb-4", iconColor)}>
          {typeof icon === "string" ? (
            <SvgIcon
              svg={icon}
              size={iconSizes[iconSize]}
              className="mx-auto"
            />
          ) : (
            <div
              className={clsx("flex items-center justify-center", {
                "text-3xl": iconSize === "sm",
                "text-4xl": iconSize === "md",
                "text-5xl": iconSize === "lg",
              })}
            >
              {icon}
            </div>
          )}
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

      {description && (
        <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      )}

      {onButtonClick && (
        <button
          onClick={onButtonClick}
          className={clsx(
            "mt-4 px-4 py-2 rounded-md",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            buttonVariantClasses[buttonVariant],
          )}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  className: PropTypes.string,
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),
  buttonVariant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  compact: PropTypes.bool,
  iconColor: PropTypes.string,
};

EmptyState.defaultProps = {
  title: "No Data Available",
  description: "There is no content to display.",
  buttonText: "Retry",
  className: "",
  iconSize: "lg",
  buttonVariant: "primary",
  compact: false,
  iconColor: "text-gray-400",
};

export default EmptyState;
