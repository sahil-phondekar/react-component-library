import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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

const Heading = ({
  as: Component = "h1",
  size = "2xl",
  weight = "bold",
  color = "text-gray-900",
  className = "",
  children,
  ...rest
}) => {
  return (
    <Component
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        color,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

Heading.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  weight: PropTypes.oneOf(Object.keys(weightClasses)),
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Heading;
