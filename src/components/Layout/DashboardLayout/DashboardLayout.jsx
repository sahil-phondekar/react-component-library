import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const DashboardLayout = ({
  children,
  sidebarContent,
  sidebarTitle = "Menu",
  collapsible = true,
  sidebarWidth = "w-64",
  collapsedSidebarWidth = "w-20",
  className = "",
  containerClassName = "",
  mobileBreakpoint = 768,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
      if (window.innerWidth >= mobileBreakpoint) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  const toggleSidebar = () => {
    if (collapsible && !isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={clsx("flex h-screen relative", containerClassName)}>
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className={clsx(
            "fixed z-30 p-2 rounded-full shadow-lg",
            "focus:outline-none transition-transform duration-300",
            "top-4 left-4",
            isSidebarOpen ? "transform translate-x-56" : "",
          )}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <span className="block w-5 h-5">✕</span>
          ) : (
            <span className="block w-5 h-5">☰</span>
          )}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white shadow-md transition-all duration-300 ease-in-out",
          "flex flex-col h-full fixed md:relative z-20",
          isMobile
            ? clsx(
                "transform transition-transform duration-300",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                sidebarWidth,
              )
            : isCollapsed
              ? collapsedSidebarWidth
              : sidebarWidth,
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {(!isCollapsed || isMobile) && (
            <h2 className="text-xl font-semibold text-gray-800">
              {sidebarTitle}
            </h2>
          )}
          {collapsible && !isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <span className="block w-6 h-6">→</span>
              ) : (
                <span className="block w-6 h-6">←</span>
              )}
            </button>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main Content */}
      <main
        className={clsx(
          "flex-1 overflow-y-auto transition-all duration-300",
          isMobile && isSidebarOpen ? "ml-0" : "",
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarContent: PropTypes.node.isRequired,
  sidebarTitle: PropTypes.string,
  collapsible: PropTypes.bool,
  sidebarWidth: PropTypes.string,
  collapsedSidebarWidth: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  mobileBreakpoint: PropTypes.number,
};

DashboardLayout.defaultProps = {
  sidebarTitle: "Menu",
  collapsible: true,
  sidebarWidth: "w-64",
  collapsedSidebarWidth: "w-20",
  className: "",
  containerClassName: "",
  mobileBreakpoint: 768,
};

export default DashboardLayout;
