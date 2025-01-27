import React, { Fragment } from "react";
import { labels } from "../configs/Labels";
import { DeleteProjectApiMethod } from "../store/actions/projectActions";
import { useNavigate } from "react-router";
import AvatarGroup from "@atlaskit/avatar-group";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import ClipLoader from "react-spinners/ClipLoader";
import { kFormatter } from "../utils/validate";
import DeleteProjectModal from "./DeleteProjectModal";
import moment from "moment";

const InProgressProject = ({
  inProgressProject,
  handleProject,
  setTab,
  apiHit,
  role,
  loading,
  setSearch,
}) => {
  const navigate = useNavigate();
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;

  const deleteProjectFunc = async (id) => {
    await DeleteProjectApiMethod(id, () => {
      setSearch("");
      handleProject("in_progress");
      setTab("InProgress");
    });
  };

  return (
    <Fragment>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader className="spinner-css" color={"#BF642B"} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-responsive w-full overflow-auto">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 md:pl-4 pl-0 md:pr-4 pr-0 text-left text-sm uppercase text-white sm:pl-0"
                >
                  <div className="flex items-center gap-x-4 pl-4">
                    <div className="font-normal text-c_fff/60">
                      {labels.projectName}
                    </div>

                    {/* <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div> */}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="font-normal text-c_fff/60">
                      {labels.client}
                    </div>

                    {/* <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div> */}
                  </div>
                </th>
                {/* <th
            scope="col"
            className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
          >
            <div className="flex items-center gap-x-4">
              <div className="font-normal text-c_fff/60">{labels.assignee}</div>
            </div>
          </th> */}
                <th
                  scope="col"
                  className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="font-normal text-c_fff/60">
                      {labels.comments}
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="font-normal text-c_fff/60">
                      {labels.status}
                    </div>

                    {/* <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div> */}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="font-normal text-c_fff/60">
                      {labels.estimatedCompletion}
                    </div>

                    {/* <div className="flex flex-col items-center">
                <AiFillCaretUp className="text-[10px]" />
                <AiFillCaretDown className="text-[10px]" />
              </div> */}
                  </div>
                </th>
                {role === "admin" ? (
                  <th
                    scope="col"
                    className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                  >
                    <div className="flex items-center gap-x-4">
                      <div className="font-normal text-c_fff/60">
                        {labels.actions}
                      </div>
                    </div>
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody className="w-full">
              {apiHit &&
                inProgressProject?.map((project, index) => (
                  <tr className="odd:bg-c_1C1C1C !rounded-md" key={index}>
                    <td
                      onClick={() => navigate(`/project-detail/${project?.id}`)}
                      className="px-4 py-3.5 cursor-pointer text-sm text-c_fff !rounded-tl-md !rounded-bl-md"
                    >
                      {project?.name?.length > 50
                        ? project?.name?.substring(0, 40) + "..."
                        : project?.name}
                    </td>

                    <td className="px-3 py-3.5 text-sm text-c_fff">
                      <AvatarGroup
                        maxCount={4}
                        appearance="stack"
                        data={project?.projectClients?.map((item) => {
                          return {
                            src: item?.user?.picture || defaultAvatar,
                            name: item?.user?.fullName,
                          };
                        })}
                      />
                      {/* {project?.client?.fullName?.length > 20
                        ? project?.client?.fullName?.substring(0, 20) + "..."
                        : project?.client?.fullName} */}
                    </td>

                    {/* <td className="px-2.5 py-3.5 cursor-pointer text-sm text-c_fff flex items-center justify-start">
              <AvatarGroup
                    maxCount={4}
                      appearance="stack"
                      data={project?.members?.map((item) => {
                        return {
                          src: item?.user?.picture || defaultAvatar,
                          name: item?.user?.fullName
                        };
                      })}
                    />
                   
              </td> */}

                    <td className="px-3 md:px-0 text-sm">
                      <p className="flex items-center gap-x-2 text-c_fff/80">
                        <img
                          src="/images/commentIcon.svg"
                          alt="commentIcon"
                          className="h-6 w-6"
                        />
                        {kFormatter(project?.commentCount)}
                      </p>
                    </td>

                    <td className="px-3 md:px-0 md:text-sm text-[12px]">
                      <p
                        className={
                          "px-2 py-1 bg-c_7379FF/20 md:w-fit w-[84px] text-c_7379FF rounded-md"
                        }
                      >
                        {project?.status === "in_progress" ? "In Progress" : ""}
                      </p>
                    </td>

                    <td className="px-3 md:px-0 text-sm">
                      <p className="text-c_fff/80">
                        {moment(project?.dueDate).format(
                          dateFormat || project?.dueDate
                        )}
                      </p>
                    </td>
                    {role === "admin" ? (
                      <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                        <div className="flex items-center gap-x-2">
                          <img
                            onClick={() => deleteProjectFunc(project?.id)}
                            src="/images/deleteIcon.svg"
                            alt="deleteIcon"
                            className="w-6 h-6 cursor-pointer text-c_fff/10"
                          />
                        </div>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default InProgressProject;
