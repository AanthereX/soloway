import React from "react";
import PropTypes from "prop-types";

const ToolTip = ({ title, children, position, containerClass, theme, ...props }) => {
  return (
    <div className={`tooltip ${containerClass} `} {...props} >
      {children}
      <div
        className={`tooltiptext ${
          theme === "dark" ? `dark` : `dark`
        } tooltip-${position}`}
      >
        {title}
        <span className="arrow"></span>
      </div>
    </div>
  );
};

ToolTip.defaultProps = {
  title: "sample",
  children: React.createElement("div"),
  position: "bottom",
  containerClass: "",
  theme: "dark",
};

ToolTip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  position: PropTypes.string,
  containerClass: PropTypes.string,
  theme: PropTypes.string,
};
export default ToolTip;
