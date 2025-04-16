import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const PlainLayout = ({ children, className, ...rest }) => {
  return (
    <main className={clsx("min-h-screen", className)} {...rest}>
      {children}
    </main>
  );
};

PlainLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PlainLayout.defaultProps = {
  className: "",
};

export default PlainLayout;
