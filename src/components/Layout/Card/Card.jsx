import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Card = ({
  children,
  className = "",
  rounded = "md",
  hover = false,
  ...rest
}) => {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  return (
    <div
      className={clsx(
        "bg-white shadow-md",
        "transition-all duration-200",
        roundedClasses[rounded],
        {
          "hover:shadow-lg hover:-translate-y-0.5": hover,
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
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "2xl", "3xl"]),
  hover: PropTypes.bool,
};

export default Card;
