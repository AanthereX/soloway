import React from "react";
import Input from "./Input";

const ToggleBtn = ({ value, onChange,checked, defaultChecked, onClick = () => {} }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <Input
        type="checkbox"
        defaultChecked={defaultChecked}
        value={value}
        checked={checked}
        onClick={onClick}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-c_fff/60 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-c_0AA81A"></div>
    </label>
  );
};

export default ToggleBtn;
