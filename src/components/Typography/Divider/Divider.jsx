import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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

export default Divider;
