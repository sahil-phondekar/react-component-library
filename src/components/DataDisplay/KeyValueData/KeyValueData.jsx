import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const KeyValueData = ({
  data,
  title,
  className,
  gridStyle = "sm:grid-cols-1 md:grid-cols-3",
  keyValueContainerStyle = "",
  keyStyle = "text-sm font-medium text-gray-600",
  valueStyle = "text-sm text-gray-900 break-all",
  titleStyle = "text-lg font-semibold mb-4",
}) => {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className={clsx("bg-white p-4 rounded-lg shadow-sm", className)}>
      {title && <h2 className={clsx(titleStyle)}>{title}</h2>}

      <dl className={clsx("grid", gridStyle)}>
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className={clsx("break-inside-avoid mb-2", keyValueContainerStyle)}
          >
            <dt className={clsx(keyStyle)}>{key}</dt>
            <dd className={clsx(valueStyle)}>
              {value === null || value === undefined ? "-" : String(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

KeyValueData.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  gridStyle: PropTypes.string,
  keyStyle: PropTypes.string,
  valueStyle: PropTypes.string,
  titleStyle: PropTypes.string,
};

export default KeyValueData;
