import React from "react";

export const BackArrow = ({width , height , stroke , className, onClick}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M10.167 16.0003H21.8337M10.167 16.0003L13.5003 19.3337M10.167 16.0003L13.5003 12.667"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="3.5"
        stroke={stroke}
        strokeOpacity="0.3"
      />
    </svg>
  );
};
