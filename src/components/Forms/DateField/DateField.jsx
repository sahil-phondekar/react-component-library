import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

const DateField = ({
  name,
  label,
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  wrapperClassName = "",
  showTimeSelect = false,
  dateFormat = "MMMM d, yyyy",
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
            "block text-sm font-medium mb-1",
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
          <DatePicker
            {...field}
            id={name}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            disabled={disabled}
            showTimeSelect={showTimeSelect}
            dateFormat={dateFormat}
            className={clsx(
              "form-input block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
              {
                "border-red-500": error,
                "border-gray-300": !error,
                "bg-gray-100 text-gray-500": disabled,
              },
              inputClassName,
            )}
            wrapperClassName="block w-full"
            calendarClassName="shadow-lg"
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

DateField.propTypes = {
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Label text */
  label: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Show time selection */
  showTimeSelect: PropTypes.bool,
  /** Date format string */
  dateFormat: PropTypes.string,
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

export default DateField;
