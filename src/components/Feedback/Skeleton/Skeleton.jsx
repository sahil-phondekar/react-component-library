import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Loading skeleton component to indicate content is being loaded
 *
 * @param {string} [width="w-full"] - Tailwind width class (e.g., "w-1/2", "w-24")
 * @param {string} [height="h-6"] - Tailwind height class (e.g., "h-4", "h-12")
 * @param {string} [borderRadius="rounded-md"] - Tailwind border radius class
 * @param {string} [className=""] - Additional Tailwind classes to merge
 * @returns {JSX.Element} Pulse animation placeholder element
 */
const Skeleton = ({
  width = "w-full",
  height = "h-6",
  borderRadius = "rounded-md",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        // Base styles
        "bg-gray-200", // Light mode background
        "animate-pulse", // Pulse animation

        // Customizable properties
        width, // Width class
        height, // Height class
        borderRadius, // Border radius class

        // Additional classes
        className, // Merges any extra classes
      )}
    />
  );
};

// Prop type validation
Skeleton.propTypes = {
  width: PropTypes.string, // Expects Tailwind width class
  height: PropTypes.string, // Expects Tailwind height class
  borderRadius: PropTypes.string, // Expects Tailwind radius class
  className: PropTypes.string, // For additional custom styling
};

export default Skeleton;
