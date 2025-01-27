import React, { useState } from "react";
import { labels } from "../configs/Labels";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Input from "./Input";
import CustomAsyncSelect from "./CustomAsyncSelect";
import { getUserTypeApiMethod } from "../store/actions/projectActions";
import { colourStyles } from "../utils/validate";

const Filter = ({ taskOptions, search, setSearch, handleAllTask }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [dueDate, setDueDate] = useState({
    isChecked: false,
    valueWhenChecked: "",
  });
  const [responsible, setResponsible] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };
  const handleCheckboxDueDate = (event) => {
    const { checked } = event.target;
    const valueWhenChecked = checked ? "upcomming" : "";
    setDueDate({
      isChecked: checked,
      valueWhenChecked,
    });
  };
  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setShowDropDown(!showDropDown);
  };
  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  const saveFilterFunc = () => {
    setShowDropDown(false);
    handleAllTask(
      search,
      selectedCheckbox,
      dueDate?.valueWhenChecked,
      responsible
    );
  };
  const clearAllFilter = () => {
    setShowDropDown(false);
    setSelectedCheckbox(null);
    setSearch("");
    setDueDate({ isChecked: false, valueWhenChecked: "" });
    setResponsible("");
    handleAllTask();
  };
  const closeFilter = () => {
    setShowDropDown(false);
    setSelectedCheckbox(null);
    setSearch("");
    setDueDate({ isChecked: false, valueWhenChecked: "" });
    setResponsible("");
  };

  const membersOptions = (inputValue = "", callback = () => {}) => {
    setTimeout(() => {
      getUserTypeApiMethod(
        (res) => {
          callback(
            res?.data?.map((item) => {
              return {
                ...item,
                label: item?.fullName,
                id: item?.id,
              };
            })
          );
        },
        { role: "user", search: inputValue }
      );
    }, 1000);
  };
  return (
    <React.Fragment>
      <div
        onClick={handleDropdownClick}
        className="flex items-center justify-center gap-x-2 rounded-[4px] border border-c_fff/30 px-5 py-2 cursor-pointer"
      >
        <img
          src="/images/filterIcon.svg"
          alt="filterIcon"
          className="h-4 w-4 text-c_fff/60"
        />
        <p className={`text-c_fff text-sm select-none `}>{labels.filter}</p>

        {showDropDown && (
          <div
            className="absolute md:top-16 top-[180px] z-[99] mt-40 md:right-48 right-[32px] px-4 md:w-fit w-10/12 origin-top-center rounded-md bg-c_212121 border border-c_fff/30 select-none cursor-default"
            onClick={handleChildClick}
          >
            <div className="py-1" role="none">
              <div className="flex justify-between items-center">
                <p className="text-base text-c_fff my-2.5">{`${labels.filter}s`}</p>
                <img
                  src="/images/crossIcon.svg"
                  onClick={closeFilter}
                  className="cursor-pointer"
                />
              </div>

              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex flex-col items-between my-4">
                <CustomAsyncSelect
                  className="basic-select filter-select text-white w-full"
                  cacheOptions
                  loadOptions={membersOptions}
                  styles={colourStyles}
                  placeholder={labels.responsible}
                  value={responsible?.responsible}
                  onChange={(e) => {
                    setResponsible((prevState) => ({
                      ...prevState,
                      responsible: e,
                    }));
                  }}
                />
                <div className="flex items-center justify-between my-4">
                  <p className="text-base text-c_9B9B9B px-3">
                    {labels.status}
                  </p>
                  {/* <BiChevronDown className="!text-2xl mr-3 text-c_fff/60" /> */}
                </div>
                <div className="h-[10rem] overflow-y-auto">
                  {taskOptions?.map((item, index) => {
                    return (
                      <div
                        className="bg-c_fff/5 px-3 py-2.5 flex items-center justify-start gap-x-4"
                        key={`${index}`}
                      >
                        <Input
                          id={`status-${index}`}
                          type="checkbox"
                          checked={selectedCheckbox === item.id}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="!accent-c_fff/70 !h-4 !w-4 text-c_fff bg-c_2C2C2C border border-c_fff/30"
                        />
                        <p className="text-c_9B9B9B capitalize text-sm">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex w-full px-3 py-1 items-center border-b-[1px] border-c_fff/30">
                <Input
                  type="checkbox"
                  id="date"
                  name="date"
                  checked={dueDate?.isChecked}
                  onChange={(e) => handleCheckboxDueDate(e)}
                  className="!accent-c_fff/70 !h-4 !w-4 text-c_fff bg-c_2C2C2C border border-c_fff/30"
                />
                <span className="text-base text-c_9B9B9B px-3">
                  {labels.dueDate}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 mb-3">
                <Button
                  onClick={clearAllFilter}
                  label={labels.clearAll}
                  className="flex items-center gap-x-2 text-white text-base capitalize bg-transparent py-1 px-3"
                ></Button>
                <Button
                  onClick={saveFilterFunc}
                  label={labels.saveFilters}
                  className="flex items-center gap-x-2 text-base capitalize text-c_BF642B py-1 px-4"
                  disabled={
                    !search && !selectedCheckbox && !dueDate && !responsible
                  }
                ></Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Filter;
