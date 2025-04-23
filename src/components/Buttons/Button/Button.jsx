import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "../../Icons";

const defaultVariantStyles = {
  primary: {
    base: "bg-blue-600 text-white",
    hover: "hover:bg-blue-700",
    focus: "focus:ring-blue-500",
    active: "active:bg-blue-800",
  },
  secondary: {
    base: "bg-gray-200 text-gray-800",
    hover: "hover:bg-gray-300",
    focus: "focus:ring-gray-500",
    active: "active:bg-gray-400",
  },
  transparent: {
    base: "bg-transparent text-blue-600 border border-blue-600",
    hover: "hover:bg-blue-50",
    focus: "focus:ring-blue-500",
    active: "active:bg-blue-100",
  },
  danger: {
    base: "bg-red-600 text-white",
    hover: "hover:bg-red-700",
    focus: "focus:ring-red-500",
    active: "active:bg-red-800",
  },
};

const sizeStyles = {
  small: {
    button: "py-1.5 px-3 text-sm",
    icon: "16px",
  },
  medium: {
    button: "py-2.5 px-5 text-base",
    icon: "20px",
  },
  large: {
    button: "py-3 px-6 text-lg",
    icon: "24px",
  },
};

const Button = ({
  variant = "primary",
  size = "medium",
  icon,
  label,
  className = "",
  disabled = false,
  fullWidth = false,
  customColors = {},
  children,
  onClick,
  ...props
}) => {
  const variantStyle =
    typeof variant === "string" && !defaultVariantStyles[variant]
      ? {}
      : { ...defaultVariantStyles[variant] };

  const colors = {
    base: customColors.base || variantStyle.base || "",
    hover: customColors.hover || variantStyle.hover || "",
    focus: customColors.focus || variantStyle.focus || "",
    active: customColors.active || variantStyle.active || "",
  };

  const sizeConfig = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-md font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        colors.base,
        !disabled && colors.hover,
        colors.focus,
        !disabled && colors.active,
        sizeConfig.button,
        {
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed": disabled,
          "space-x-2": icon && (label || children),
          border:
            variant === "transparent" && !customColors.base?.includes("border"),
        },
        className,
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon && (
        <>
          {typeof icon === "string" ? (
            <SvgIcon
              svg={icon}
              size={sizeConfig.icon}
              className={clsx({
                "mr-2": label || children,
                "text-current": variant === "transparent",
                "text-white": variant === "primary" || variant === "danger",
              })}
            />
          ) : (
            React.createElement(icon, {
              className: clsx(
                size === "small" ? "h-4 w-4" : "h-5 w-5",
                label || children ? "mr-2" : "",
                {
                  "text-current": variant === "transparent",
                  "text-white": variant === "primary" || variant === "danger",
                },
              ),
            })
          )}
        </>
      )}
      {children || label}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "transparent", "danger"]),
    PropTypes.string,
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  customColors: PropTypes.shape({
    base: PropTypes.string,
    hover: PropTypes.string,
    focus: PropTypes.string,
    active: PropTypes.string,
  }),
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
