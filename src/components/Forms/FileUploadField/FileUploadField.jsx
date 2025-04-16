import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

const FileUploadField = ({
  name,
  label,
  required = false,
  disabled = false,
  accept,
  multiple = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  wrapperClassName = "",
  fileInfoClassName = "",
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
        render={({ field: { value, onChange, ...field } }) => (
          <div className={className}>
            <input
              {...field}
              id={name}
              type="file"
              onChange={(e) => onChange(e.target.files)}
              disabled={disabled}
              accept={accept}
              multiple={multiple}
              className={clsx(
                "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100",
                {
                  "border-red-500": error,
                  "border-gray-300": !error,
                  "opacity-50 cursor-not-allowed": disabled,
                },
                inputClassName,
              )}
              {...props}
            />

            {value && value.length > 0 && (
              <div className={clsx("mt-2 text-sm", fileInfoClassName)}>
                <p className="text-gray-700">
                  Selected {multiple ? "files" : "file"}:{" "}
                  {Array.from(value)
                    .map((file) => file.name)
                    .join(", ")}
                </p>
                {multiple && (
                  <p className="text-gray-500 text-xs mt-1">
                    {value.length} {value.length === 1 ? "file" : "files"}{" "}
                    selected
                  </p>
                )}
              </div>
            )}
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

FileUploadField.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Label text */
  label: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept: PropTypes.string,
  /** Allow multiple file selection */
  multiple: PropTypes.bool,
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
  /** Class for the file info display */
  fileInfoClassName: PropTypes.string,
};

export default FileUploadField;
