import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const TextareaField = ({
  name,
  label,
  placeholder = "",
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  textareaClassName = "",
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
          <textarea
            {...field}
            id={name}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              "block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
              {
                "border-red-500": error,
                "border-gray-300": !error,
                "bg-gray-100 text-gray-500": disabled,
              },
              textareaClassName,
            )}
            {...props}
          />
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

TextareaField.propTypes = {
  /** Name of the textarea field */
  name: PropTypes.string.isRequired,
  /** Field label */
  label: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Number of visible rows */
  rows: PropTypes.number,
  /** Class for the wrapper div */
  className: PropTypes.string,
  /** Class for the textarea element */
  textareaClassName: PropTypes.string,
  /** Class for the label element */
  labelClassName: PropTypes.string,
  /** Class for the error message */
  errorClassName: PropTypes.string,
  /** Class for the outermost wrapper */
  wrapperClassName: PropTypes.string,
};

TextareaField.defaultProps = {
  placeholder: "",
  required: false,
  disabled: false,
  rows: 4,
  className: "",
  textareaClassName: "",
  labelClassName: "",
  errorClassName: "",
  wrapperClassName: "",
};

export default TextareaField;
