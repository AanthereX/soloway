import React from "react";
import Select from "react-select";


const CustomSelect = ({
  className,
  error,
  onChange,
  errorText,
  value,
  placeholder,
  options,
  styles,
  defaultValue,
  ...props
}) => {
  // console.log(error,"errorerror")
  return (
    <React.Fragment>
      <Select
        className={`basic-select rounded text-white  border border-c_595959 outline-none mt-2  ${className} ${error && "border border-red-600"}`}
        options={options}
        styles={styles}
        placeholder={placeholder}
        isClearable

        {...props}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
      {error && <span className="text-red-500 block text-xs">{errorText}</span>}
    </React.Fragment>
  );
};

export default CustomSelect;
