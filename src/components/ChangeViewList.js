import React from "react";

export const ChangeViewList = ({...props}) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 10.0007H16.6663M9.99967 3.33398V16.6673M4.99967 3.33398H14.9997C15.9201 3.33398 16.6663 4.08018 16.6663 5.00065V15.0007C16.6663 15.9211 15.9201 16.6673 14.9997 16.6673H4.99967C4.0792 16.6673 3.33301 15.9211 3.33301 15.0007V5.00065C3.33301 4.08018 4.0792 3.33398 4.99967 3.33398Z"
        stroke={props.color}
        strokeOpacity="0.8"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
