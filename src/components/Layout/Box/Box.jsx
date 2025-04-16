import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A flexible Box component for layout composition
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional className(s)
 * @param {React.ReactNode} props.children - Content to render inside box
 * @param {string} [props.as="div"] - HTML element or component to render as
 * @param {boolean} [props.center] - Whether to center children
 * @param {boolean} [props.fullWidth] - Whether box should take full width
 * @param {Object} [props.rest] - Additional props to spread onto the element
 * @returns {JSX.Element} Box component
 */
const Box = ({
  className = "",
  children,
  as: Component = "div",
  center = false,
  fullWidth = false,
  ...rest
}) => {
  return (
    <Component
      className={clsx(
        {
          "flex items-center justify-center": center,
          "w-full": fullWidth,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  center: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Box.defaultProps = {
  className: "",
  as: "div",
  center: false,
  fullWidth: false,
};

export default Box;
