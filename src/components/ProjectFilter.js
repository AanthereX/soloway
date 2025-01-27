import React, { useState } from "react";
import { labels } from "../configs/Labels";
import SearchBar from "./SearchBar";
import { BiChevronDown } from "react-icons/bi";
import Button from "./Button";
import Input from "./Input";
import CustomAsyncSelect from "./CustomAsyncSelect";
import { getUserTypeApiMethod } from "../store/actions/projectActions";
import { colourStyles } from "../utils/validate";

const ProjectFilter = ({ handleProject }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [responsible, setResponsible] = useState("");
  const [client, setClient] = useState("");

  const projectOptions = [
    { id: "complete", label: "Completed" },
    { id: "in_progress", label: "In Progress" },
    { id: "blocked", label: "Blocked" },
  ];
  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
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
    handleProject(selectedCheckbox, startDate, responsible, client);
  };
  const clearAllFilter = () => {
    setSelectedCheckbox(null);
    setStartDate(null);
    setResponsible("");
    setClient("");
    handleProject();
  };
  const closeFilter = () => {
    setShowDropDown(false);
    setSelectedCheckbox(null);
    setStartDate(null);
    setResponsible("");
    setClient("");
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
  const clientOptions = (inputValue = "", callback = () => {}) => {
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
        { role: "client", search: inputValue }
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
        <p className={`text-c_fff text-sm select-none`}>{labels.filter}</p>

        {showDropDown && (
          <div
            className="absolute md:right-5 right-5 md:top-28 top-36 z-[99] mt-40 px-4 w-10/12 md:w-1/5 origin-top-right rounded-md bg-c_212121 border border-c_fff/30 select-none shadow-2xl cursor-default"
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
              <div className="flex flex-col items-between my-4">
                <div className="flex items-center justify-between my-2">
                  <p className="text-base text-c_9B9B9B px-3">
                    {labels.status}
                  </p>
                  <BiChevronDown className="!text-2xl mr-3 text-c_fff/60" />
                </div>
                <div>
                  {projectOptions?.map((item, index) => {
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
                          className="!accent-c_BF642B !h-4 !w-4 text-c_fff bg-c_2C2C2C border border-c_fff/30"
                        />
                        <p className="text-c_9B9B9B capitalize text-sm">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center justify-between  border-b-[1px] border-c_fff/30">
                <CustomAsyncSelect
                  className="basic-select filter-select text-white w-full pb-3"
                  cacheOptions
                  loadOptions={clientOptions}
                  styles={colourStyles}
                  placeholder={labels.client}
                  value={client?.client}
                  onChange={(e) => {
                    setClient((prevState) => ({
                      ...prevState,
                      client: e,
                    }));
                  }}
                />
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
                <Input
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={labels.startDate}
                  type={isFocused ? "date" : "text"}
                  id="date"
                  name="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e?.target?.value)}
                  className="w-full bg-c_212020 text-base outline-none mt-4 text-white  px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
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
                    !selectedCheckbox && !startDate && !responsible && !client
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

export default ProjectFilter;
