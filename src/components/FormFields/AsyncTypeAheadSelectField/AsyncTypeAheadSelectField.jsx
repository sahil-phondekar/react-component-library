import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import clsx from "clsx";

const AsyncTypeAheadSelectField = ({
  label,
  id,
  loadOptions,
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

      <AsyncSelect
        isClearable
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        placeholder={placeholder}
        className={clsx(
          "react-select-container",
          { "border-red-500": errorMessage },
          selectClassName,
        )}
        onChange={(selected) => selected?.value}
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

AsyncTypeAheadSelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  control: PropTypes.any,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AsyncTypeAheadSelectField;
