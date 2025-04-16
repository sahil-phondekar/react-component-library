import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A customizable modal dialog component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler function
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.className] - Additional className(s) for modal content
 * @param {string} [props.size="md"] - Modal size (sm, md, lg)
 * @param {boolean} [props.closeOnOverlayClick=true] - Whether clicking outside closes modal
 * @param {boolean} [props.showCloseButton=true] - Whether to show close button
 * @param {string} [props.overlayClassName] - Additional className(s) for overlay
 * @returns {JSX.Element} Modal component
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  overlayClassName = "",
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-opacity duration-300",
        {
          "opacity-0 pointer-events-none": !isOpen,
          "opacity-100": isOpen,
        },
        overlayClassName,
      )}
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx("fixed inset-0 bg-black/50 transition-opacity", {
          "opacity-0": !isOpen,
          "opacity-100": isOpen,
        })}
        aria-hidden="true"
      />

      <div
        className={clsx(
          "relative bg-white rounded-lg shadow-xl w-full mx-4 p-6",
          "transform transition-all duration-300",
          {
            "opacity-0 translate-y-4": !isOpen,
            "opacity-100 translate-y-0": isOpen,
          },
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        {title && (
          <h2 className="text-xl font-semibold mb-4 pr-6" id="modal-title">
            {title}
          </h2>
        )}

        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  overlayClassName: PropTypes.string,
};

Modal.defaultProps = {
  className: "",
  size: "md",
  closeOnOverlayClick: true,
  showCloseButton: true,
  overlayClassName: "",
};

export default Modal;
