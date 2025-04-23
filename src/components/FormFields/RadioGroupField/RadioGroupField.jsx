import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const RadioGroupField = ({
  label,
  name,
  options,
  register,
  errorMessage,
  outerContainerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  optionLabelClassName = "",
  errorClassName = "",
}) => {
  return (
    <div className={clsx("mb-4", outerContainerClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block mb-1 font-medium text-gray-700 text-sm",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      <div className={clsx("space-y-2 space-x-2", inputContainerClassName)}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              "inline-flex items-center space-x-2 text-gray-700",
              optionLabelClassName,
            )}
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              value={option.value}
              {...register(name, { required: "This field is required" })}
              className={clsx(
                "h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500",
                { "border-red-500 focus:ring-red-500": errorMessage },
                inputClassName,
              )}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {errorMessage && (
        <p className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

RadioGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  register: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  optionLabelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default RadioGroupField;
