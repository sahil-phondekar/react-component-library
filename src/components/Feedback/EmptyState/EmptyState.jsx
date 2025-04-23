import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const EmptyState = ({
  title = "No Data Available",
  description = "There is no content to display.",
  icon,
  className = "",
  iconSize = "lg",
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
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),
  compact: PropTypes.bool,
  iconColor: PropTypes.string,
};

export default EmptyState;
