import React from "react";

const FolderIcon = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 4.8198C6 4.34312 6.33646 3.93271 6.80388 3.83922L8.2795 3.5441C8.42469 3.51506 8.57451 3.51863 8.71815 3.55454L10.2313 3.93282C10.4071 3.97678 10.5677 4.0677 10.6959 4.19586L11.2071 4.70711C11.3946 4.89464 11.649 5 11.9142 5H16.105C16.6145 5 17.0426 5.38314 17.0988 5.88957L17.4877 9.38957C17.4959 9.46296 17.4959 9.53704 17.4877 9.61043L17.0988 13.1104C17.0426 13.6169 16.6145 14 16.105 14H7C6.44771 14 6 13.5523 6 13V4.8198Z"
        fill={props.color}
        fillOpacity="0.3"
      />
      <path
        d="M3 8.11803C3 7.73926 3.214 7.393 3.55279 7.22361L3.78885 7.10557C3.92771 7.03615 4.08082 7 4.23607 7H5C5.55228 7 6 7.44772 6 8V11.401C6 11.4668 6.0065 11.5325 6.01942 11.5971L6.34985 13.2493C6.43846 13.6923 6.81311 14.0209 7.26391 14.0509L12.8987 14.4266C13.4885 14.4659 13.9157 15.0056 13.8185 15.5888L13.6461 16.6233C13.5628 17.1233 13.1185 17.4818 12.6122 17.4577L3.95243 17.0454C3.41925 17.02 3 16.5803 3 16.0465V8.11803Z"
        fill={props.color}
        fillOpacity="0.3"
      />
      <path
        d="M14.1667 14.1663V15.833C14.1667 16.275 13.9911 16.699 13.6785 17.0115C13.366 17.3241 12.942 17.4997 12.5 17.4997H4.16667C3.72464 17.4997 3.30072 17.3241 2.98816 17.0115C2.67559 16.699 2.5 16.275 2.5 15.833V8.33301C2.5 7.89098 2.67559 7.46706 2.98816 7.1545C3.30072 6.84194 3.72464 6.66634 4.16667 6.66634H5.83333M7.5 3.33301H10L11.6667 4.99967H15.8333C16.2754 4.99967 16.6993 5.17527 17.0118 5.48783C17.3244 5.80039 17.5 6.22431 17.5 6.66634V12.4997C17.5 12.9417 17.3244 13.3656 17.0118 13.6782C16.6993 13.9907 16.2754 14.1663 15.8333 14.1663H7.5C7.05797 14.1663 6.63405 13.9907 6.32149 13.6782C6.00893 13.3656 5.83333 12.9417 5.83333 12.4997V4.99967C5.83333 4.55765 6.00893 4.13372 6.32149 3.82116C6.63405 3.5086 7.05797 3.33301 7.5 3.33301Z"
        stroke={props.color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FolderIcon;
