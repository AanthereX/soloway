import React from "react";
import AsyncSelect from "react-select/async";


const CustomAsyncSelect = ({
  className,
  error,
  onChange,
  errorText,
  value,
  placeholder,
  loadOptions,
  styles,
  ...props
}) => {
  return (
    <React.Fragment>
      <AsyncSelect
        className={`basic-select rounded text-white mt-2  ${className} ${error && "border border-red-600"}`}
        cacheOptions
        // isMulti
        loadOptions={loadOptions}
        styles={styles}
        placeholder={placeholder}
        isClearable
        {...props}
        onChange={onChange}
        value={value}
       
      />
      {error && <span className="text-red-500 block text-xs">{errorText}</span>}
    </React.Fragment>
  );
};

export default CustomAsyncSelect;
