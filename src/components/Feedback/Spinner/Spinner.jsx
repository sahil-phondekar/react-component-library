import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A reusable loading spinner component with customizable size and color
 *
 * @param {Object} props - Component props
 * @param {string} [props.size="w-8 h-8"] - Tailwind classes for width and height (e.g., "w-6 h-6")
 * @param {string} [props.color="border-blue-500"] - Tailwind class for border color (e.g., "border-red-500")
 * @param {string} [props.className] - Additional classes to merge
 * @returns {JSX.Element} Animated spinning loader
 */
const Spinner = ({
  size = "w-8 h-8",
  color = "border-blue-500",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "animate-spin", // Spin animation
        "border-t-2", // Top border thickness
        "border-solid", // Border style
        "rounded-full", // Circular shape
        color, // Customizable color
        size, // Customizable size
        className, // Additional classes
      )}
      role="status" // Accessibility attribute
      aria-label="Loading" // Screen reader text
    />
  );
};

Spinner.propTypes = {
  /** Tailwind classes for width and height (e.g., "w-6 h-6") */
  size: PropTypes.string,
  /** Tailwind class for border color (e.g., "border-red-500") */
  color: PropTypes.string,
  /** Additional classes to merge */
  className: PropTypes.string,
};

Spinner.defaultProps = {
  size: "w-8 h-8",
  color: "border-blue-500",
  className: "",
};

export default Spinner;
