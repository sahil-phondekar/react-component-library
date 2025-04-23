import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const SvgIcon = ({
  svg,
  className = "",
  size = "24px",
  color = "currentColor",
  viewBox = "0 0 24 24",
  ...props
}) => {
  const isPathOnly = !svg.startsWith("<svg");

  return isPathOnly ? (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={svg} />
    </svg>
  ) : (
    <div
      className={clsx("inline-flex", className)}
      style={{ width: size, height: size, color }}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};

SvgIcon.propTypes = {
  svg: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  viewBox: PropTypes.string,
};

export default SvgIcon;
