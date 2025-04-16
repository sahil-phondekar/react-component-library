import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A flexible divider component with multiple orientation and style options
 *
 * @param {Object} props - Component props
 * @param {"horizontal"|"vertical"} [props.orientation="horizontal"] - Divider direction
 * @param {string} [props.color="border-gray-200"] - Border color class
 * @param {string} [props.className] - Additional className(s)
 * @param {string} [props.thickness="border"] - Border thickness (border, border-2, etc.)
 * @param {React.ReactNode} [props.children] - Optional centered content
 * @returns {JSX.Element} Divider component
 */
const Divider = ({
  orientation = "horizontal",
  color = "border-gray-200",
  className = "",
  thickness = "border",
  children,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={clsx(
        "relative flex items-center",
        isHorizontal ? "w-full" : "h-full w-px",
        className,
      )}
      {...props}
    >
      {children ? (
        <>
          <div
            className={clsx(
              "flex-grow",
              thickness,
              color,
              isHorizontal ? "border-t" : "border-l",
            )}
          />
          <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
            {children}
          </span>
          <div
            className={clsx(
              "flex-grow",
              thickness,
              color,
              isHorizontal ? "border-t" : "border-l",
            )}
          />
        </>
      ) : (
        <div
          className={clsx(
            "w-full",
            thickness,
            color,
            isHorizontal ? "border-t" : "border-l",
          )}
        />
      )}
    </div>
  );
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  color: PropTypes.string,
  className: PropTypes.string,
  thickness: PropTypes.string,
  children: PropTypes.node,
};

Divider.defaultProps = {
  orientation: "horizontal",
  color: "border-gray-200",
  className: "",
  thickness: "border",
};

export default Divider;
