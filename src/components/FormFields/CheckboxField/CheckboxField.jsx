import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const CheckboxField = ({
  label,
  id,
  register,
  errorMessage,
  outerContainerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  ...rest
}) => {
  return (
    <div className={clsx("mb-2", outerContainerClassName)}>
      <div
        className={clsx("flex items-center space-x-2", inputContainerClassName)}
      >
        <input
          id={id}
          type="checkbox"
          className={clsx(
            "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
            inputClassName,
          )}
          {...register}
          {...rest}
        />
        <label
          htmlFor={id}
          className={clsx("text-gray-700 text-sm", labelClassName)}
        >
          {label}
        </label>
      </div>
      {errorMessage && (
        <p className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.any,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default CheckboxField;
