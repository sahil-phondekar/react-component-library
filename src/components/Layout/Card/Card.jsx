import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A flexible card component with multiple styling options
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional className(s)
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Card size (padding)
 * @param {"flat"|"raised"|"outline"} [props.variant="raised"] - Card style variant
 * @param {"none"|"sm"|"md"|"lg"} [props.rounded="md"] - Border radius
 * @param {boolean} [props.hoverable] - Whether card has hover effect
 * @param {Object} [props.rest] - Additional props to spread onto the div
 * @returns {JSX.Element} Card component
 */
const Card = ({
  children,
  className = "",
  size = "md",
  variant = "raised",
  rounded = "md",
  hoverable = false,
  ...rest
}) => {
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const variantClasses = {
    flat: "shadow-none",
    raised: "shadow-md",
    outline: "border shadow-none",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  return (
    <div
      className={clsx(
        "bg-white ",
        "transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        roundedClasses[rounded],
        {
          "hover:shadow-lg hover:-translate-y-0.5": hoverable,
          "hover:border-gray-300": hoverable && variant === "outline",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["flat", "raised", "outline"]),
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  hoverable: PropTypes.bool,
};

Card.defaultProps = {
  className: "",
  size: "md",
  variant: "raised",
  rounded: "md",
  hoverable: false,
};

export default Card;
