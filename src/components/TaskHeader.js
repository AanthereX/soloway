import React, { useState } from "react";
import { BackArrow } from "./BackArrow";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import { projectTaskStatusChangeMethod } from "../store/actions/projectActions";
import AvatarGroup from "@atlaskit/avatar-group";

const TaskHeader = ({ taskData, handleAttachments, taskOptions, setTab,role }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropDown(false);
    projectTaskStatusChangeMethod(taskData?.id, { status: option?.id }, () => {
      handleAttachments();
    });
  };
  // console.log(taskData?.status,"selectedOption?.label")
  return (
    <div className="grid grid-cols-1 px-4">
      <div className={role === "client" || role === "contributor" ? "flex items-center justify-between pt-5 pb-11" : "flex items-center justify-between"}>
        <div className="flex items-center gap-x-4">
          <BackArrow
            onClick={() => {
              setTab("Tasks");
              navigate(`/project-detail/${params?.id}`);
            }}
            stroke={"#fff"}
            width={32}
            height={32}
            className="cursor-pointer"
          />
          <p className="md:!text-[20px] !text-[16px] text-c_fff font-medium">
            {taskData?.title}
          </p>
          {role === "client" || role === "contributor" ? null : 
          <div className="relative">
            <div
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
              className={`inline-flex items-center gap-x-2 ${
                selectedOption?.label === "Not Started" ||
                taskData?.status === "Not Started"
                  ? "bg-c_FFFFFF33/20 text-c_DADADA"
                  : selectedOption?.label === "In Progress" ||
                    taskData?.status === "In Progress"
                  ? "bg-c_7379FF33/20 text-c_7379FF"
                  : selectedOption?.label === "On Hold" ||
                    taskData?.status === "On Hold"
                  ? "bg-c_5792EF33 text-c_5792EF"
                  : selectedOption?.label === "Delayed" ||
                    taskData?.status === "Delayed"
                  ? "bg-[#D4690633] text-c_D46906"
                  : selectedOption?.label === "In Review" ||
                    taskData?.status === "In Review"
                  ? "bg-c_D9C40B33/20 text-c_D9C40B"
                  : selectedOption?.label === "Rejected" ||
                    taskData?.status === "Rejected"
                  ? "bg-[#5F300533] text-c_CE7F36"
                  : selectedOption?.label === "Needs Revision" ||
                    taskData?.status === "Needs Revision"
                  ? "bg-c_96349233 text-c_D61ECE"
                  : selectedOption?.label === "Canceled" ||
                    taskData?.status === "Canceled"
                  ? "bg-[#FF5C5A33] text-c_FF5C5A"
                  : selectedOption?.label === "Approved" ||
                    taskData?.status === "Approved"
                  ? "bg-[#1CFF3233] text-c_1CFF32"
                  : selectedOption?.label === "Completed" ||
                    taskData?.status === "Completed"
                  ? "bg-[#0AA81A33] text-c_0AA81A"
                  : selectedOption?.label === "Waiting Feedback" ||
                    taskData?.status === "Waiting Feedback"
                  ? "bg-[#F5DE0E33] text-c_F5DE0E"
                  : selectedOption?.label === "Ordered" ||
                    taskData?.status === "Ordered"
                  ? "bg-[#D1FF9733] text-c_D1FF97"
                  : selectedOption?.label === "Postponed" ||
                    taskData?.status === "Postponed"
                  ? "bg-[#7D7D7D33] text-c_A8A8A8"
                  : selectedOption?.label === "Waiting For Approval" ||
                    taskData?.status === "Waiting For Approval"
                  ? "bg-[#F5DE0E33] text-c_F5DE0E"
                  : selectedOption?.label === "Delivered" ||
                    taskData?.status === "Delivered"
                  ? "bg-[#27A48633] text-c_27A486"
                  : selectedOption?.label === "Installed" ||
                    taskData?.status === "Installed"
                  ? "bg-c_43FFD233/20 text-c_43FFD2"
                  : selectedOption?.label === "Scheduled" ||
                    selectedOption?.label === "Scheduled"
                  ? "bg-c_D1FF97/20 text-c_D1FF97"
                  : selectedOption?.label === "In Route" ||
                    selectedOption?.label === "In Route"
                  ? "bg-c_B173FF33/20 text-c_B173FF"
                  : selectedOption?.label === "Tentative Delivery" ||
                    taskData?.status === "Tentative Delivery"
                  ? "bg-c_FA833F33/20 text-c_FA833F"
                  : selectedOption?.label === "Tentative Install" ||
                    taskData?.status === "Tentative Install"
                  ? "bg-c_FF9E5833/20 text-c_FF9E58"
                  : null
              } !text-[12px] md:!text-[14px] capitalize  border-0 !py-1 !px-3 mx-3 md:px-6 my-8 rounded-md`}
            >
              <button type="button" id="menu-button">
                {selectedOption ? selectedOption.label : taskData?.status}
              </button>
              <svg
                className={`-mr-1 h-4 w-4 ${
                  selectedOption?.label === "Completed" ||
                  taskData?.status === "Completed"
                    ? " text-c_0AA81A"
                    : selectedOption?.label === "In Progress" ||
                      taskData?.status === "In Progress"
                    ? " text-c_7379FF"
                    : selectedOption?.label === "Not Started" ||
                      taskData?.status === "Not Started"
                    ? " text-c_DADADA"
                    : selectedOption?.label === "On Hold" ||
                      taskData?.status === "On Hold"
                    ? " text-c_5792EF"
                    : selectedOption?.label === "Delayed" ||
                      taskData?.status === "Delayed"
                    ? "text-c_D46906"
                    : selectedOption?.label === "In Review" ||
                      taskData?.status === "In Review"
                    ? "text-c_D9C40B"
                    : selectedOption?.label === "Rejected" ||
                      taskData?.status === "Rejected"
                    ? "text-c_CE7F36"
                    : selectedOption?.label === "Scheduled" ||
                      selectedOption?.label === "Scheduled"
                    ? "text-c_D1FF97"
                    : selectedOption?.label === "Installed" ||
                      taskData?.status === "Installed"
                    ? " text-c_43FFD2"
                    : selectedOption?.label === "Needs Revision" ||
                      taskData?.status === "Needs Revision"
                    ? "text-c_D61ECE"
                    : selectedOption?.label === "Canceled" ||
                      taskData?.status === "Canceled"
                    ? "text-c_FF5C5A"
                    : selectedOption?.label === "Approved" ||
                      taskData?.status === "Approved"
                    ? "text-c_1CFF32"
                    : selectedOption?.label === "Awaiting Feedback" ||
                      taskData?.status === "Awaiting Feedback"
                    ? "text-c_F5DE0E"
                    : selectedOption?.label === "Ordered" ||
                      taskData?.status === "Ordered"
                    ? "text-c_D1FF97"
                    : selectedOption?.label === "Postponed" ||
                      taskData?.status === "Postponed"
                    ? "text-c_A8A8A8"
                    : selectedOption?.label === "Tentative Delivery" ||
                      taskData?.status === "Tentative Delivery"
                    ? "text-c_FA833F"
                    : selectedOption?.label === "Waiting For Approval" ||
                      taskData?.status === "Waiting For Approval"
                    ? "text-c_F5DE0E"
                    : selectedOption?.label === "Delivered" ||
                      taskData?.status === "Delivered"
                    ? "text-c_27A486"
                    : null
                } cursor-pointer`}
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

            {showDropDown && (
              <div
                className={`absolute top-16 left-0 mt-2 w-[180px] bg-c_212121 origin-top-right !rounded-2xl select-none`}
                role="menu"
              >
                <div
                  className={`py-1 h-[10rem] overflow-y-auto bg-[#ffffff15]`}
                  role="none"
                >
                  {taskOptions?.map((option) => (
                    <a
                      key={option.id}
                      className={` block px-4 py-2 text-sm select-none cursor-pointer`}
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div> }
        </div>
        <div className="flex items-center">
          <AvatarGroup
            maxCount={3}
            size="small"
            appearance="stack"
            data={taskData?.responsibles?.map((item) => {
              return {
                src: item?.user?.picture || defaultAvatar,
                name: item?.user?.fullName,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
