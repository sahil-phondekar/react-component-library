import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const SelectField = ({
  name,
  label,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  selectClassName = "",
  labelClassName = "",
  errorClassName = "",
  wrapperClassName = "",
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={clsx("relative mb-6", wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block text-sm font-medium mb-2",
            {
              "text-gray-700": !disabled,
              "text-gray-400": disabled,
            },
            labelClassName,
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            disabled={disabled}
            className={clsx(
              "block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
              {
                "border-red-500": error,
                "border-gray-300": !error,
                "bg-gray-100 text-gray-500": disabled,
              },
              selectClassName,
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && (
        <p className={clsx("mt-1 text-sm text-red-600", errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};

SelectField.propTypes = {
  /** Name of the select field */
  name: PropTypes.string.isRequired,
  /** Field label */
  label: PropTypes.string,
  /** Array of select options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ),
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Class for the wrapper div */
  className: PropTypes.string,
  /** Class for the select element */
  selectClassName: PropTypes.string,
  /** Class for the label element */
  labelClassName: PropTypes.string,
  /** Class for the error message */
  errorClassName: PropTypes.string,
  /** Class for the outermost wrapper */
  wrapperClassName: PropTypes.string,
};

export default SelectField;
