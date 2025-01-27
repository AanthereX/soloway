import React from "react";

export const ChangeViewGrid = ({...props}) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49967 3.33398H4.16634C3.7061 3.33398 3.33301 3.70708 3.33301 4.16732V7.50065C3.33301 7.96089 3.7061 8.33398 4.16634 8.33398H7.49967C7.95991 8.33398 8.33301 7.96089 8.33301 7.50065V4.16732C8.33301 3.70708 7.95991 3.33398 7.49967 3.33398Z"
        stroke={props.color}
        strokeOpacity="0.6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.833 3.33398H12.4997C12.0394 3.33398 11.6663 3.70708 11.6663 4.16732V7.50065C11.6663 7.96089 12.0394 8.33398 12.4997 8.33398H15.833C16.2932 8.33398 16.6663 7.96089 16.6663 7.50065V4.16732C16.6663 3.70708 16.2932 3.33398 15.833 3.33398Z"
        stroke={props.color}
        strokeOpacity="0.6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49967 11.6673H4.16634C3.7061 11.6673 3.33301 12.0404 3.33301 12.5007V15.834C3.33301 16.2942 3.7061 16.6673 4.16634 16.6673H7.49967C7.95991 16.6673 8.33301 16.2942 8.33301 15.834V12.5007C8.33301 12.0404 7.95991 11.6673 7.49967 11.6673Z"
        stroke={props.color}
        strokeOpacity="0.6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.833 11.6673H12.4997C12.0394 11.6673 11.6663 12.0404 11.6663 12.5007V15.834C11.6663 16.2942 12.0394 16.6673 12.4997 16.6673H15.833C16.2932 16.6673 16.6663 16.2942 16.6663 15.834V12.5007C16.6663 12.0404 16.2932 11.6673 15.833 11.6673Z"
        stroke={props.color}
        strokeOpacity="0.6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
