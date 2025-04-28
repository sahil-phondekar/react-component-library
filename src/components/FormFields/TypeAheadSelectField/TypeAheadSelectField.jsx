import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import clsx from "clsx";

const TypeAheadSelectField = ({
  label,
  id,
  options,
  control,
  errorMessage,
  outerContainerClassName = "",
  labelClassName = "",
  selectClassName = "",
  errorClassName = "",
  placeholder = "Select...",
  ...rest
}) => {
  return (
    <div className={clsx("mb-4", outerContainerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "block mb-1 font-medium text-gray-700 text-sm",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      <Select
        isClearable
        inputId={id}
        options={options}
        placeholder={placeholder}
        className={clsx({ "border-red-500": errorMessage }, selectClassName)}
        classNamePrefix="react-select"
        {...rest}
      />

      {errorMessage && (
        <p className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

TypeAheadSelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  control: PropTypes.any,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TypeAheadSelectField;
