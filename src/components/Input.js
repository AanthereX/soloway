import React from "react";

const Input = React.forwardRef(({type,prefix,defaultChecked,onFocus,min,className, error, onChange, errorText, value,placeholder, ...props}, ref) => {
  return (
        <React.Fragment>
          <input
            className={`w-full bg-c_212020 rounded text-base outline-none  text-c_595959 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${className} ${error && "border border-red-600"}`}
            onChange={onChange}
            value={value}
            {...props}
            ref={ref}
            type={type}
            onFocus={onFocus}
            placeholder={placeholder}
            min={min}
            defaultChecked={defaultChecked}
            prefix={prefix}
          />
          {error && <span className='text-red-500 text-xs block'>{errorText}</span>}
        </React.Fragment>
      );
})

export default Input;
