import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const FileUploadField = ({
  label,
  id,
  accept,
  register,
  errorMessage,
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
      <input
        id={id}
        type="file"
        accept={accept}
        className={clsx(
          "w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
          {
            "text-red-600": errorMessage,
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

FileUploadField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  accept: PropTypes.string,
  register: PropTypes.any,
  errorMessage: PropTypes.string,
  outerContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default FileUploadField;
