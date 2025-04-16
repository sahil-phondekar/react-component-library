import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Predefined class maps for better Tailwind purging
const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

const weightClasses = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

/**
 * A flexible text component with customizable typography
 *
 * @param {Object} props - Component props
 * @param {string|React.ElementType} [props.as="p"] - HTML element or component to render
 * @param {string} [props.size="base"] - Text size (xs-9xl)
 * @param {string} [props.weight="normal"] - Font weight
 * @param {string} [props.color="text-gray-900"] - Text color class
 * @param {string} [props.className] - Additional className(s)
 * @param {boolean} [props.truncate=false] - Whether to truncate text with ellipsis
 * @param {React.ReactNode} props.children - Content to display
 * @returns {JSX.Element} Text component
 */
const Text = ({
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "text-gray-900",
  className = "",
  truncate = false,
  children,
  ...props
}) => {
  return (
    <Component
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        color,
        {
          truncate: truncate,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  weight: PropTypes.oneOf(Object.keys(weightClasses)),
  color: PropTypes.string,
  className: PropTypes.string,
  truncate: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  as: "p",
  size: "base",
  weight: "normal",
  color: "text-gray-900",
  className: "",
  truncate: false,
};

export default Text;
