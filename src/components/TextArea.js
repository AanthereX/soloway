import React from "react";

const TextArea = ({ className, error, onChange, errorText , value, ...props }) => {
  return (
    <React.Fragment>
      <textarea 
        className={`w-full bg-c_212020 rounded text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${className} ${error && "border border-red-600"}`}
        onChange={onChange}
        value={value}
        {...props}
        type="textarea"
        rows="4" cols="50"
        maxLength={255}
      />
      {error && <span className='text-red-500 block text-xs'>{errorText}</span>}
    </React.Fragment>
  );
};

export default TextArea;
