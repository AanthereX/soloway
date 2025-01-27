import React, { useState } from "react";
import { labels } from "../configs/Labels";
import TaskWindow from "./TaskWindow";
import ActivityHistoryWindow from "./ActivityHistoryWindow";
import ChatWindow from "./ChatWindow";
import FilesWindow from "./FilesWindow";
import ShowEditProjectModal from "./ShowEditProjectModal";
import { colourStyles } from "../utils/validate";
// import AvatarGroup from "@atlaskit/avatar-group";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import Esthela from "../assets/Images/esthela.png";
import Marc from "../assets/Images/marc.png";
import ToolTip from "./ToolTip";
import moment from "moment";
const Overview = ({ projectDetail, handleProjectDetails, setTab }) => {
  const [editProjectModal, setEditProjectModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))?.role;
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  
  // const [members, setMembers] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  // console.log(projectDetail,"projectDetail")
  // const membersOptions = (inputValue = "", callback = () => {}) => {
  //   setTimeout(() => {
  //     getUserTypeApiMethod(
  //       (res) => {
  //         console.log(res,"item")

  //         callback(
  //           res?.data?.map((item) => {
  //             return {
  //               ...item,
  //               label: item?.fullName,
  //               value: item?.id,
  //             };
  //           })
  //         );
  //       },
  //       { role: "user", search: inputValue }
  //     );
  //   }, 1000);
  // };

  // useEffect(() => {
  //   setOpenModal(true)
  //   if (projectDetail?.projectDetails?.members?.length) {
  //     setMembers(
  //       projectDetail?.projectDetails?.members?.map((item) => {
  //         return {
  //           src: item?.user?.picture || defaultAvatar,
  //           name: item?.user?.fullName,
  //         };
  //       })
  //     );
  //   }
  // }, [projectDetail?.projectDetails?.members]);

  return (
    <React.Fragment>
      <div className="grid grid-cols-6 gap-y-4 py-8">
        <div className="col-span-6 rounded-md pt-4 pb-2 px-5 bg-c_1F1F1F">
          <div className="flex items-center justify-between">
            <p className="text-base text-c_fff/90 font-medium">
              {labels.details}
            </p>
            {user === "admin" || user === "user" ? (
              <button
                onClick={() => setEditProjectModal(true)}
                className={`flex items-center justify-between gap-x-2 bg-transparent border border-c_fff/30 py-1 px-2.5 rounded`}
              >
                <img
                  src="/images/editIcon.svg"
                  alt="editIcon"
                  className="w-4 h-4"
                />
                <p className="text-[14px] text-c_fff">{labels.edit}</p>
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-6 my-3.5">
            <div className="flex flex-col gap-y-4 md:col-span-6 col-span-6 mt-4 md:mt-0">
              <div className="project-desc">
                <div className="flex item-center bg-transparent">
                  <p className="text-base text-c_fff/80 md:mb-4">
                    {projectDetail?.projectDetails?.description}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-c_fff/5"></div>
                <div className="grid grid-cols-4 md:mt-4 gap-2">
                  <div className="flex flex-col md:col-span-1 col-span-2">
                    <p className="text-[13px] text-c_fff/60 md:mb-2 my-2">
                      {labels.teamMembers}
                    </p>

                    {/* <div className="">
                      <AvatarGroup
                        maxCount={4}
                        appearance="stack"
                        data={members}
                      />
                    </div> */}

                    <div className="cursor-pointer">
                      <ToolTip
                        title={projectDetail?.projectDetails?.projectOwner}
                        containerclassName="mt-1"
                      >
                        {projectDetail?.projectDetails?.projectOwner ===
                        "Esthela and Marc" ? (
                          <div className="gap-1 flex flex-col">
                            <img
                              className="rounded-lg h-10 w-full object-cover"
                              src={Marc}
                            />
                            <img
                              className="rounded-lg h-10 w-full object-cover"
                              src={Esthela}
                            />
                          </div>
                        ) : (
                          <img
                            className="rounded-lg h-10 w-32 object-cover"
                            src={
                              projectDetail?.projectDetails?.projectOwner ===
                              "Esthela"
                                ? Marc
                                : Esthela || defaultAvatar
                            }
                          />
                        )}
                      </ToolTip>
                    </div>
                  </div>
                  <div className="flex flex-col md:col-span-1 col-span-2">
                    <p className="text-[13px] text-c_fff/60 md:mb-2 my-2">
                      {labels.currentEstimatedBudgets}
                    </p>
                    <div className="md:flex flex-col gap-1">
                      <p className="text-[16px] font-medium text-c_fff/90">{`${
                        projectDetail?.projectDetails?.budget[0]?.amount || "0"
                      }`}</p>
                      <p className="text-[16px] font-medium text-c_fff/90">{`${
                        projectDetail?.projectDetails?.budget[0]?.measurement ||
                        ""
                      }`}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:col-span-1 col-span-2">
                    <p className="text-[13px] text-c_fff/60 md:mb-2 my-2">
                      {labels.startDate}
                    </p>
                    <p className="text-[16px] font-medium text-c_fff/90">
                      {moment
                        .utc(projectDetail?.projectDetails?.startDate)
                        .format(dateFormat || "YYYY/MM/DD")}
                    </p>
                  </div>
                  <div className="flex flex-col md:col-span-1 col-span-2">
                    <p className="text-[13px] text-c_fff/60 md:mb-2 my-2">
                      {labels.estimatedCompletion}
                    </p>
                    <p className="text-[16px] font-medium text-c_fff/90">
                      {moment
                        .utc(projectDetail?.projectDetails?.dueDate)
                        ?.format(dateFormat || "YYYY/MM/DD")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-y-4 md:gap-x-4 mb-8">
        <div className="md:col-span-3 col-span-6 bg-c_1F1F1F rounded-md h-[20rem] overflow-y-auto">
          <TaskWindow taskDetails={projectDetail} setTab={setTab} role={user} />
        </div>
        <div className="md:col-span-3 col-span-6 bg-c_1F1F1F rounded-md h-[20rem] overflow-y-auto">
          <ActivityHistoryWindow
            activityDetails={projectDetail}
            setTab={setTab}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-y-4 md:gap-x-4 mb-8">
        <div className="md:col-span-3 col-span-6 bg-c_1F1F1F rounded-md ">
          <ChatWindow setTab={setTab} role={user} />
        </div>
        <div className="md:col-span-3 col-span-6 bg-c_1F1F1F rounded-md h-[20rem] overflow-y-auto">
          <FilesWindow fileDetails={projectDetail} setTab={setTab} />
        </div>
      </div>
      {editProjectModal && (
        <ShowEditProjectModal
          handleProjectDetails={handleProjectDetails}
          projectDetail={projectDetail}
          colourStyles={colourStyles}
          setEditProjectModal={setEditProjectModal}
        />
      )}
    </React.Fragment>
  );
};

export default Overview;
