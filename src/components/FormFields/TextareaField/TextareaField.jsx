import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const TextareaField = ({
  label,
  id,
  register,
  errorMessage,
  rows = 4,
  outerContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
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
      <textarea
        id={id}
        rows={rows}
        className={clsx(
          "w-full px-3 py-2 border rounded-lg resize-none focus:outline-none",
          {
            "border-red-500 focus:ring-red-500": errorMessage,
            "border-gray-300 focus:ring-blue-500": !errorMessage,
          },
          inputClassName,
        )}
        {...register}
        {...rest}
      />
      {errorMessage && (
        <p className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

TextareaField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  register: PropTypes.any,
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
  outerContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default TextareaField;
