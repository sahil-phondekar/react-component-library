import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import IconButton from "../IconButton";

const ActionButtonList = ({
  actions,
  position = "left",
  menuIcon,
  menuIconClassName = "",
  menuClassName = "",
  containerClassName = "",
  actionClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "right-full top-0 mr-2";
      case "right":
        return "left-full top-0 ml-2";
      case "top":
        return "bottom-full left-0 mb-2";
      case "bottom":
        return "top-full left-0 mt-2";
      default:
        return "right-full top-0 ml-2";
    }
  };

  return (
    <>
      <IconButton
        size="large"
        className={clsx("!p-0", menuIconClassName)}
        ariaLabel="Open Actions"
        icon={menuIcon}
        onClick={toggleMenu}
      />
      <div
        className={clsx("relative rounded-md", containerClassName)}
        ref={menuRef}
      >
        {isOpen && (
          <div
            className={clsx(
              "absolute z-10",
              getPositionClasses(),
              "w-48 rounded-md shadow-lg bg-white",
              menuClassName,
            )}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full flex items-center px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100",
                  actionClassName,
                )}
              >
                <span className="mr-3">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

ActionButtonList.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ).isRequired,
  position: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  menuIcon: PropTypes.node.isRequired,
  menuIconClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  actionClassName: PropTypes.string,
};

export default ActionButtonList;
