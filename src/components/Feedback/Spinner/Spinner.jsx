import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Spinner;
