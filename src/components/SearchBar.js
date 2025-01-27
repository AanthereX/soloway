import React from "react";
import { labels } from "../configs/Labels";
import Input from "./Input";

const SearchBar = ({ value, onChange }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img
            src="/images/searchIcon.svg"
            alt="searchicon"
            className="h-4 w-4 select-none"
          />
        </div>
        <Input
          type="search"
          id="default-search"
          className="block w-32 md:w-72 p-2.5 pl-10 text-sm text-c_B2B2B2 rounded-lg bg-c_fff/10 placeholder:text-c_B2B2B2 placeholder:text-sm focus:outline-none"
          placeholder={labels.search}
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
