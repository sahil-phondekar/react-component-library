import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const CheckboxField = ({
  name,
  label,
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
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
    <div className={clsx("relative", wrapperClassName)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={clsx("flex items-center", className)}>
            <input
              {...field}
              type="checkbox"
              id={name}
              disabled={disabled}
              className={clsx(
                "form-checkbox text-primary-500 focus:ring-primary-500",
                {
                  "border-red-500": error,
                  "border-gray-300": !error,
                },
                inputClassName,
              )}
              {...props}
            />
            {label && (
              <label
                htmlFor={name}
                className={clsx("ml-2", labelClassName, {
                  "text-gray-400": disabled,
                })}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
          </div>
        )}
      />
      {error && (
        <span
          className={clsx("text-sm text-red-500 mt-1 block", errorClassName)}
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Label text */
  label: PropTypes.string,
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
};

export default CheckboxField;
