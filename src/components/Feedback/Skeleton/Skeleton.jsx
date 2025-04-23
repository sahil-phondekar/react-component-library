import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Skeleton = ({
  width = "w-full",
  height = "h-6",
  borderRadius = "rounded-md",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "bg-gray-200",
        "animate-pulse",
        width, // Width class
        height, // Height class
        borderRadius, // Border radius class
        className, // Merges any extra classes
      )}
    />
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
};

export default Skeleton;
