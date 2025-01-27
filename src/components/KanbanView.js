import React from "react";
import { labels } from "../configs/Labels";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import AvatarGroup from "@atlaskit/avatar-group";
import { useNavigate } from "react-router-dom";
import { kFormatter } from "../utils/validate";
import moment from "moment";
const KanbanView = ({ projects }) => {
  const navigate = useNavigate();
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-x-4">
        <div
          className={`col-span-12 md:col-span-4 ${
            !projects?.filter((item) => item?.status === "in_progress").length
              ? "mb-4"
              : ""
          }`}
        >
          <p className="bg-c_212121 flex items-center justify-start text-[14px] pl-2 py-2 border-t-2 rounded-tl-sm rounded-tr-sm border-t-c_7379FF">
            {labels.inProgress}
          </p>
          {projects
            ?.filter((item) => item?.status === "in_progress")
            ?.map((inProgressProject) => (
              <React.Fragment>
                <div
                  onClick={() =>
                    navigate(`/project-detail/${inProgressProject?.id}`)
                  }
                  key={inProgressProject?.id}
                  className="bg-c_212121 py-4 px-3 cursor-pointer rounded-[4px] flex flex-col items-start justify-center my-4"
                >
                  <p className="text-base">{inProgressProject?.name}</p>
                  <p className="text-[11px] text-c_fff/40 mb-4">
                    {inProgressProject?.client?.fullName}
                  </p>
                  <div className="w-full grid grid-cols-3">
                    <div className="col-span-2 flex items-center justify-start gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/commentIcon.svg"
                          alt="commentIcon"
                          className="h-5 w-5"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {kFormatter(inProgressProject?.commentCount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/calanderIcon.svg"
                          className="h-4 w-4"
                          alt="msgIcon"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {moment(inProgressProject?.dueDate).format(
                            dateFormat || inProgressProject?.dueDate
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 cursor-pointer  flex items-center justify-end">
                      <AvatarGroup
                        maxCount={4}
                        appearance="stack"
                        data={inProgressProject?.members?.map((item) => {
                          return {
                            src: item?.user?.picture || defaultAvatar,
                            name: item?.user?.fullName,
                          };
                        })}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div
          className={`col-span-12 md:col-span-4 ${
            !projects?.filter((item) => item?.status === "blocked").length
              ? "mb-4"
              : ""
          }`}
        >
          <p className="bg-c_212121 flex items-center justify-start text-[14px] pl-2 py-2 border-t-2 rounded-tl-sm rounded-tr-sm border-t-c_FF5C5A">
            {labels.blocked}
          </p>
          {projects
            ?.filter((item) => item?.status === "blocked")
            ?.map((blockedProject) => (
              <React.Fragment>
                <div
                  onClick={() =>
                    navigate(`/project-detail/${blockedProject?.id}`)
                  }
                  key={blockedProject?.id}
                  className="bg-c_212121 py-4 px-3 rounded-[4px] cursor-pointer flex flex-col items-start justify-center my-4"
                >
                  <p className="text-base">{blockedProject?.name}</p>
                  <p className="text-[11px] text-c_fff/40 mb-4">
                    {blockedProject?.client?.fullName}
                  </p>
                  <div className="w-full grid grid-cols-3">
                    <div className="col-span-2 flex items-center justify-start gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/commentIcon.svg"
                          alt="commentIcon"
                          className="h-5 w-5"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {kFormatter(blockedProject?.commentCount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/calanderIcon.svg"
                          className="h-4 w-4"
                          alt="msgIcon"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {moment(blockedProject?.dueDate).format(
                            dateFormat || blockedProject?.dueDate
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      {blockedProject?.members?.map((item) => {
                        return (
                          <>
                            <img
                              src={item?.user?.picture || defaultAvatar}
                              alt="assigneeImage"
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            {item?.length > 3 ? (
                              <a
                                className="flex items-center justify-center h-8 w-8 text-xs font-medium text-white bg-c_212020 border-2 border-c_2C2C2C rounded-full hover:bg-gray-600 dark:border-gray-800"
                                href="#"
                              >
                                {item?.length}
                              </a>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div
          className={`col-span-12 md:col-span-4 ${
            !projects?.filter((item) => item?.status === "complete").length
              ? "mb-4"
              : ""
          }`}
        >
          <p className="bg-c_212121 flex items-center justify-start text-[14px] pl-2 py-2 border-t-2 rounded-tl-sm rounded-tr-sm border-t-c_0AA81A">
            {labels.completed}
          </p>
          {projects
            ?.filter((item) => item?.status === "complete")
            ?.map((completedProject) => (
              <React.Fragment>
                <div
                  onClick={() =>
                    navigate(`/project-detail/${completedProject?.id}`)
                  }
                  key={completedProject?.id}
                  className="bg-c_212121 py-4 px-3 cursor-pointer rounded-[4px] flex flex-col items-start justify-center my-4"
                >
                  <p className="text-base">{completedProject?.name}</p>
                  <p className="text-[11px] text-c_fff/40 mb-4">
                    {completedProject?.client?.fullName}
                  </p>
                  <div className="w-full grid grid-cols-3">
                    <div className="col-span-2 flex items-center justify-start gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/commentIcon.svg"
                          alt="commentIcon"
                          className="h-5 w-5"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {kFormatter(completedProject?.commentCount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <img
                          src="/images/calanderIcon.svg"
                          className="h-4 w-4"
                          alt="msgIcon"
                        />
                        <p className="text-[14px] text-c_fff/60">
                          {moment(completedProject?.dueDate).format(
                            dateFormat || completedProject?.dueDate
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      {completedProject?.members?.map((item) => {
                        return (
                          <>
                            <img
                              src={item?.user?.picture || defaultAvatar}
                              alt="assigneeImage"
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            {item?.length > 3 ? (
                              <a
                                className="flex items-center justify-center h-8 w-8 text-xs font-medium text-white bg-c_212020 border-2 border-c_2C2C2C rounded-full hover:bg-gray-600 dark:border-gray-800"
                                href="#"
                              >
                                {item?.length}
                              </a>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default KanbanView;
