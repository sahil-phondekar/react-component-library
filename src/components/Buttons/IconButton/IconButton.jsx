import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const sizeClasses = {
  small: {
    button: "p-1.5",
    icon: "16px",
  },
  medium: {
    button: "p-2",
    icon: "20px",
  },
  large: {
    button: "p-3",
    icon: "24px",
  },
};

/**
 * A transparent icon-only button component
 *
 * @param {Object} props - Component props
 * @param {string|React.ElementType} props.icon - SVG path data or icon component
 * @param {string} [props.className] - Additional CSS classes
 * @param {"small"|"medium"|"large"} [props.size="medium"] - Button size
 * @param {string} [props.color="currentColor"] - Icon color
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {function} [props.onClick] - Click handler
 * @param {string} props.ariaLabel - Accessibility label (required)
 * @returns {JSX.Element} IconButton component
 */
const IconButton = ({
  icon,
  className = "",
  size = "medium",
  color = "currentColor",
  disabled = false,
  onClick,
  ariaLabel,
  ...props
}) => {
  const sizeConfig = sizeClasses[size] || sizeClasses.medium;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center",
        "bg-transparent",
        "focus:outline-none",
        sizeConfig.button,
        {
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": !disabled,
        },
        className,
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {typeof icon === "string" ? (
        <SvgIcon svg={icon} size={sizeConfig.icon} color={color} />
      ) : (
        React.createElement(icon, {
          className: clsx(
            "text-current",
            `w-[${sizeConfig.icon}] h-[${sizeConfig.icon}]`,
          ),
        })
      )}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired, // Required for accessibility
};

IconButton.defaultProps = {
  className: "",
  size: "medium",
  color: "currentColor",
  disabled: false,
};

export default IconButton;
