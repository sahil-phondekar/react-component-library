import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const DashboardLayout = ({
  children,
  containerClassName = "",
  sidebarClassName = "",
  sidebarHeader = "Menu",
  sidebarHeaderCollapsed = "M",
  sidebarHeaderClassName = "",
  sidebarCollapsedIcon = <span className="block w-6 h-6">&gt;</span>,
  sidebarOpenIcon = <span className="block w-6 h-6">&lt;</span>,
  sidebarContent,
  sidebarContentClassName = "",
  isSidebarCollapsed = false,
  setIsSidebarCollapsed = () => {},
  mainContentClassName = "",
  collapsible = true,
  sidebarWidth = "w-64",
  collapsedSidebarWidth = "w-20",
  mobileBreakpoint = 768,
}) => {
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
      setIsSidebarCollapsed(!isSidebarCollapsed);
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
          {isSidebarOpen ? <>{sidebarOpenIcon}</> : <>{sidebarCollapsedIcon}</>}
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
            : isSidebarCollapsed
              ? collapsedSidebarWidth
              : sidebarWidth,
          sidebarClassName,
        )}
      >
        {/* Sidebar Header */}
        <div
          className={clsx(
            "p-4 flex items-center justify-between",
            sidebarHeaderClassName,
          )}
        >
          {isSidebarCollapsed ? (
            <>{sidebarHeaderCollapsed}</>
          ) : (
            <>{sidebarHeader}</>
          )}
          {collapsible && !isMobile && (
            <button
              onClick={toggleSidebar}
              className={clsx(
                "fixed z-30 p-2 rounded-full shadow-lg",
                "focus:outline-none transition-transform duration-300",
                "top-4",
                isSidebarCollapsed ? "left-16" : "left-4",
                !isSidebarCollapsed ? "transform translate-x-56" : "",
              )}
              aria-label="Toggle sidebar"
            >
              {!isSidebarCollapsed ? (
                <>{sidebarOpenIcon}</>
              ) : (
                <>{sidebarCollapsedIcon}</>
              )}
            </button>
          )}
        </div>

        {/* Sidebar Content */}
        <div
          className={clsx("flex-1 overflow-y-auto", sidebarContentClassName)}
        >
          {sidebarContent}
        </div>
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
          mainContentClassName,
        )}
      >
        {children}
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
  sidebarClassName: PropTypes.string,
  sidebarHeader: PropTypes.node,
  sidebarHeaderCollapsed: PropTypes.node,
  sidebarHeaderClassName: PropTypes.string,
  sidebarCollapsedIcon: PropTypes.node,
  sidebarOpenIcon: PropTypes.node,
  sidebarContent: PropTypes.node.isRequired,
  sidebarContentClassName: PropTypes.string,
  isSidebarCollapsed: PropTypes.bool,
  setIsSidebarCollapsed: PropTypes.func,
  mainContentClassName: PropTypes.string,
  collapsible: PropTypes.bool,
  sidebarWidth: PropTypes.string,
  collapsedSidebarWidth: PropTypes.string,
  mobileBreakpoint: PropTypes.number,
};

export default DashboardLayout;
