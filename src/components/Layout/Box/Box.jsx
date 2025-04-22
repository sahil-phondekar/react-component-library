import React from "react";
import PropTypes from "prop-types";

const Box = ({ children, className = "", as: Component = "div", ...rest }) => {
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Box;
