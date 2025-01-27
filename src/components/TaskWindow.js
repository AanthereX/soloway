import React from "react";
import { labels } from "../configs/Labels";
import Button from "./Button";
import moment from "moment";
// import defaultAvatar from "../assets/Images/defaultAvatar.png";
// import AvatarGroup from "@atlaskit/avatar-group";
const TaskWindow = ({ taskDetails, setTab, role }) => {
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  return (
    <React.Fragment>
      <div className="flex flex-col pt-4 pb-2 px-5">
        <div className="flex items-center justify-between">
          <p className="inline-flex gap-x-3 text-[20px] text-c_fff/90">
            {labels.tasks}{" "}
            {role === "client" || role === "contributor" ? null : (
              <div className="px-2 flex justify-center items-center w-8  bg-c_fff/10 rounded-md">
                <span className=" text-c_fff  text-[12px]">
                  {taskDetails?.projectDetails?.totalTasks}
                </span>
              </div>
            )}
          </p>
          <Button
            onClick={() => setTab("Tasks")}
            label={labels.seeAll}
            className={`flex items-center bg-transparent text-sm text-c_fff border border-c_fff/20 px-4 py-1.5 rounded`}
          />
        </div>
        {taskDetails?.task?.length ? (
          taskDetails?.task?.map((task) => (
            <div
              className="grid grid-cols-3 mt-2 items-center gap-x-2 even:bg-c_fff/5 px-2 py-2 rounded"
              key={task?.id}
            >
              <div className="col-span-1">
                {task?.title?.length > 17
                  ? task?.title?.substring(0, 25) + "..."
                  : task?.title}
              </div>
              {/* <div className="col-span-1 mx-auto">
                <AvatarGroup
                  maxCount={2}
                  size="small"
                  appearance="stack"
                  data={task?.responsibles?.map((item) => {
                    return {
                      src: item?.user?.picture || defaultAvatar,
                      name: item?.user?.fullName,
                    };
                  })}
                />
              </div> */}
              <div className="col-span-1 mx-auto">
                <td className="text-[14px] text-c_fff">
                  <p
                    className={`px-1.5 py-1 md:text-[14px] text-[12px] ${
                      task?.status === "Not Started"
                        ? "bg-c_FFFFFF33/20 text-c_DADADA"
                        : task?.status === "In Progress"
                        ? "bg-c_7379FF33/20 text-c_7379FF"
                        : task?.status === "On Hold"
                        ? "bg-c_5792EF33 text-c_5792EF"
                        : task?.status === "Delayed"
                        ? "bg-[#D4690633] text-c_D46906"
                        : task?.status === "In Review"
                        ? "bg-c_D9C40B33/20 text-c_D9C40B"
                        : task?.status === "Rejected"
                        ? "bg-[#5F300533] text-c_CE7F36"
                        : task?.status === "Needs Revision"
                        ? "bg-c_96349233 text-c_D61ECE"
                        : task?.status === "Canceled"
                        ? "bg-[#FF5C5A33] text-c_FF5C5A"
                        : task?.status === "Approved"
                        ? "bg-[#1CFF3233] text-c_1CFF32"
                        : task?.status === "Completed"
                        ? "bg-[#0AA81A33] text-c_0AA81A"
                        : task?.status === "Awaiting Feedback"
                        ? "bg-[#F5DE0E33] text-c_F5DE0E"
                        : task?.status === "Ordered"
                        ? "bg-[#0C4FBA33] text-c_D1FF97"
                        : task?.status === "Postponed"
                        ? "bg-[#7D7D7D33] text-c_A8A8A8"
                        : task?.status === "Waiting For Approval"
                        ? "bg-[#F5DE0E33] text-c_F5DE0E"
                        : task?.status === "Delivered"
                        ? "bg-[#27A48633] text-c_27A486"
                        : task?.status === "Installed"
                        ? "bg-c_43FFD233/20 text-c_43FFD2"
                        : task?.status === "Scheduled"
                        ? "bg-c_D1FF973/20 text-c_D1FF97"
                        : task?.status === "In Route"
                        ? "bg-c_B173FF33/20 text-c_B173FF"
                        : task?.status === "Tentative Delivery"
                        ? "bg-c_FA833F33/20 text-c_FA833F"
                        : task?.status === "Tentative Install"
                        ? "bg-c_FF9E5833/20 text-c_FF9E58"
                        : null
                    } w-fit rounded-[4px] capitalize`}
                  >
                    {task?.status}
                  </p>
                </td>
                {/* <span className="text-xs bg-c_7379FF/20 text-c_7379FF py-1 px-2 rounded">
                {task?.status}
              </span> */}
              </div>
              <div className="col-span-1 mx-auto">
                <span className="text-sm text-c_fff/30">
                  {moment(task?.dueDate)?.format(dateFormat || "YYYY/MM/DD")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center py-[7rem] text-lg ">
            No Task Available
          </span>
        )}
      </div>
    </React.Fragment>
  );
};

export default TaskWindow;
