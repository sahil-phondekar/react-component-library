import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const SelectField = ({
  label,
  id,
  options,
  register,
  errorMessage,
  outerContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  optionLabelClassName = "",
  errorClassName = "",
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
      <select
        id={id}
        className={clsx(
          "w-full px-3 py-2 border rounded-lg bg-white focus:outline-none text-sm",
          {
            "border-red-500 focus:ring-red-500": errorMessage,
            "border-gray-300 focus:ring-blue-500": !errorMessage,
          },
          inputClassName,
        )}
        {...register}
        {...rest}
      >
        <option value="" className={optionLabelClassName}>
          Select an option
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value} className={optionLabelClassName}>
            {label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  register: PropTypes.any,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  optionLabelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default SelectField;
