import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const PlainLayout = ({ children, containerClassName = "", ...rest }) => {
  return (
    <main className={clsx("min-h-screen", containerClassName)} {...rest}>
      {children}
    </main>
  );
};

PlainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
};

export default PlainLayout;
