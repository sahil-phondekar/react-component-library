import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const RadioGroupField = ({
  name,
  label,
  options = [],
  required = false,
  disabled = false,
  className = "",
  radioClassName = "",
  labelClassName = "",
  errorClassName = "",
  wrapperClassName = "",
  optionWrapperClassName = "",
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
        <legend
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
        </legend>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={clsx("space-y-3", className)}>
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx("flex items-center", optionWrapperClassName)}
              >
                <input
                  {...field}
                  type="radio"
                  id={`${name}-${option.value}`}
                  value={option.value}
                  disabled={disabled}
                  className={clsx(
                    "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300",
                    {
                      "border-red-500": error,
                      "text-gray-400": disabled,
                    },
                    radioClassName,
                  )}
                  checked={field.value === option.value}
                  {...props}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className={clsx("ml-3 block text-sm", {
                    "text-gray-700": !disabled,
                    "text-gray-400": disabled,
                  })}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
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

RadioGroupField.propTypes = {
  /** Name of the radio group */
  name: PropTypes.string.isRequired,
  /** Group label */
  label: PropTypes.string,
  /** Array of radio options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  /** Whether selection is required */
  required: PropTypes.bool,
  /** Whether the group is disabled */
  disabled: PropTypes.bool,
  /** Class for the options container */
  className: PropTypes.string,
  /** Class for individual radio inputs */
  radioClassName: PropTypes.string,
  /** Class for the group label */
  labelClassName: PropTypes.string,
  /** Class for error message */
  errorClassName: PropTypes.string,
  /** Class for the outermost wrapper */
  wrapperClassName: PropTypes.string,
  /** Class for individual option wrappers */
  optionWrapperClassName: PropTypes.string,
};

export default RadioGroupField;
