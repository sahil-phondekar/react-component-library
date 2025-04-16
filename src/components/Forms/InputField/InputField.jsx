import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const InputField = ({
  name,
  type = "text",
  label,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  wrapperClassName = "",
  leftIcon,
  rightIcon,
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

      <div className={clsx("relative", className)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={clsx(
                "block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
                {
                  "border-red-500": error,
                  "border-gray-300": !error,
                  "bg-gray-100 text-gray-500": disabled,
                  "pl-10": leftIcon,
                  "pr-10": rightIcon,
                },
                inputClassName,
              )}
              {...props}
            />
          )}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className={clsx("mt-1 text-sm text-red-600", errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Input type (text, email, password, etc.) */
  type: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Class for the wrapper div */
  className: PropTypes.string,
  /** Class for the input element */
  inputClassName: PropTypes.string,
  /** Class for the label element */
  labelClassName: PropTypes.string,
  /** Class for the error message */
  errorClassName: PropTypes.string,
  /** Class for the outermost wrapper */
  wrapperClassName: PropTypes.string,
  /** Icon to display on the left side */
  leftIcon: PropTypes.node,
  /** Icon to display on the right side */
  rightIcon: PropTypes.node,
};

export default InputField;
