import React, { useState } from "react";
import { BackArrow } from "./BackArrow";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteProjectApiMethod,
  projectStatusChangeMethod,
} from "../store/actions/projectActions";
import DotMenuIcon from "./DotMenuIcon";
import MenuDropDown from "./Menu";

const ProjectDetailHeader = ({ title, btnLabel, handleProjectDetails }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const navigate = useNavigate();
  const params = useParams();
  const [ProjectOptions, setProjectOptions] = useState([
    { id: "complete", title: "Completed" },
    { id: "in_progress", title: "In Progress" },
    { id: "blocked", title: "Blocked" },
  ]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropDown(false);
    projectStatusChangeMethod(params?.id, { status: option?.id }, () => {
      handleProjectDetails();
    });
  };

  const handleDeleteProject = () => {
    DeleteProjectApiMethod(params?.id, async () => {
      await navigate("/project");
    });
  };
  return (
    <React.Fragment>
      <div className={role === "client" || role === "contributor" ? "flex items-center justify-between md:my-0 py-8" : "flex items-center justify-between md:my-0 "}>
        <div className="flex items-center gap-x-2 md:gap-x-4 md:text-2xl text-xl">
          <BackArrow
            width={32}
            height={32}
            stroke={"#fff"}
            onClick={() => navigate(-1)}
            className={"cursor-pointer"}
          />
          <p className="text-c_fff md:text-[22px] text-[16px]">{title}</p>
          {role === "client" || role === "contributor"  ? null : 
          <div className="relative">
            <div
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
              className={`flex md:w-fit w-[100px] items-center justify-between md:gap-x-2 gap-x-1 ${
                btnLabel === "in_progress"
                  ? "text-c_7379FF bg-c_7379FF/20"
                  : btnLabel === "complete"
                  ? "bg-c_0AA81A/20 text-c_0AA81A"
                  : "text-c_FF5C5A bg-c_FF5C5A/20"
              } capitalize border-0 py-1 px-3 md:px-6 md:my-8 my-5 rounded`}
            >
              <button
                type="button"
                id="menu-button"
                className="flex capitalize md:text-[16px] text-[10px]"
              >
                {selectedOption
                  ? selectedOption?.title
                  : btnLabel === "complete"
                  ? "Completed"
                  : btnLabel === "in_progress"
                  ? "In Progress"
                  : "Blocked"}
              </button>
              <div>
                <svg
                  className={`-mr-1 h-4 w-4 cursor-pointer ${
                    btnLabel === "in_progress"
                      ? "text-c_7379FF"
                      : btnLabel === "complete"
                      ? " text-c_0AA81A"
                      : "text-c_FF5C5A"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {showDropDown && (
              <div
                class={`absolute top-16 left-0 mt-2 w-[120px] bg-c_212121 origin-top-right rounded-md select-none shadow-2xl`}
                role="menu"
              >
                <div className={`py-1`} role="none">
                  {ProjectOptions?.map((option, index) => (
                    <a
                      key={option.id}
                      className={`text-c_fff block px-4 py-2 text-sm select-none cursor-pointer`}
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div> }
        </div>
        <div className="md:pl-0 pl-2">
          {role === "client" || role === "contributor" ? null : (
            <MenuDropDown
              options={[{ label: "Delete" }]}
              onClick={handleDeleteProject}
            >
              <DotMenuIcon
                width={40}
                height={40}
                stroke={"#fff"}
                fill={"none"}
              />
            </MenuDropDown>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetailHeader;
