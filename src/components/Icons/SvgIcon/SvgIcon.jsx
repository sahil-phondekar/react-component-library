import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * SVG Icon Component
 *
 * @param {Object} props - Component props
 * @param {string} props.svg - SVG path data or full SVG code
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.size="24px"] - Width and height of the icon
 * @param {string} [props.color="currentColor"] - Icon color
 * @param {string} [props.viewBox="0 0 24 24"] - SVG viewBox
 * @returns {JSX.Element} SVG Icon
 */
const SvgIcon = ({
  svg,
  className = "",
  size = "24px",
  color = "currentColor",
  viewBox = "0 0 24 24",
  ...props
}) => {
  // Check if the input is just path data or full SVG code
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
