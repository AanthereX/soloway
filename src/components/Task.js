import React, {
  useCallback,
  useEffect,
  useRef,
  Fragment,
  useState,
} from "react";
import { labels } from "../configs/Labels";
import Filter from "./Filter";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import EditTask from "./EditTask";
import Input from "./Input";
import ToggleBtn from "./ToggleBtn";
import {
  DeleteTaskApiMethod,
  createTaskApiMethod,
  getAllTaskProjectMethod,
  getProjectClientApiMethod,
  getProjectUserTypeApiMethod,
  getUserTypeApiMethod,
  singleProjectMethod,
} from "../store/actions/projectActions";
import TextArea from "./TextArea";
import {
  EsthelaMarcOptions,
  checkInternetConnection,
  colourStyles,
  taskOptions,
  typeOptions,
  validateText,
} from "../utils/validate";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import NoDataAvailable from "./NoDataAvailable";
import ShowEditTaskModal from "./ShowEditTaskModal";
import ClipLoader from "react-spinners/ClipLoader";
import CustomSelect from "./CustomSelect";
import toast from "react-hot-toast";
import DeleteTaskModal from "./DeleteTaskModal";
import moment from "moment";

const Task = ({ setTab }) => {
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [taskCount, setTaskCount] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState("");
  const [taskId, setTaskId] = useState("");
  const [apiHit, setApiHit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [membersData, setMembersData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [contributorData, setContributorData] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const plusIcon = <FiPlus />;
  const ref = useRef();
  const startDateRef = useRef();

  const [taskValues, setTaskValues] = useState({
    taskName: "",
    startDate: "",
    dueDate: "",
    client: "",
    members: [],
    clients: [],
    contributor: [],
    description: "",
    status: [],
    type: "",
    clientSeeStatus: true,
    isContributorCanSee: true,
  });
  const [errors, setErrors] = useState({
    taskName: null,
    startDate: null,
    dueDate: null,
    members: null,
    description: null,
    client: null,
    status: null,
  });
  // console.log(taskValues?.client)
  useEffect(() => {
    getUserTypeApiMethod(
      (res) => {
        setMembersData(res?.data);
      },
      { role: "user", ...(search ? { search: taskValues?.members } : {}) }
    );
    getProjectClientApiMethod(params?.id, (res) => {
      setClientsData(res);
    });
    getProjectUserTypeApiMethod(
      params?.id,
      (res) => {
        setContributorData(res?.data);
      },
      {
        role: "contributor",
        ...(search ? { search: taskValues?.contributor } : {}),
      }
    );
  }, []);

  useEffect(() => {
    handleAllTask();
  }, []);

  const options = membersData?.map((item) => {
    return {
      value: item?.id,
      label: item?.fullName,
    };
  });
  const clientOptions = clientsData?.map((item) => {
    return {
      value: item?.user?.id,
      label: item?.user?.fullName,
    };
  });

  const contributorOptions = contributorData?.map((item) => {
    return {
      value: item?.user?.id,
      label: item?.user?.fullName,
    };
  });

  const handleAllTask = (
    search = null,
    status = null,
    dueDate = null,
    responsible = null
  ) => {
    setLoading(true);
    getAllTaskProjectMethod(
      params?.id,
      {
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
        ...(dueDate ? { DueDate: dueDate } : {}),
        ...(responsible ? { responsible: responsible?.responsible?.id } : {}),
        // page,
      },
      (res) => {
        setLoading(false);
        setApiHit(true);
        setTaskCount(res?.totalTask);
        setTasks(res?.data);
      }
    );
  };

  const membersOptions = (inputValue = "", callback = () => {}) => {
    setTimeout(() => {
      getUserTypeApiMethod(
        (res) => {
          setTaskValues((prev) => ({ ...prev, members: res?.data }));
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
  const createTaskFunc = useCallback(async () => {
    if (!taskValues.taskName) {
      const textError = validateText(taskValues.taskName);
      setErrors((prevState) => ({
        ...prevState,
        taskName: textError,
      }));
    }
    if (!taskValues.startDate) {
      const textError = validateText(taskValues.startDate);
      setErrors((prevState) => ({
        ...prevState,
        startDate: textError,
      }));
    }
    if (!taskValues.dueDate) {
      const textError = validateText(taskValues.dueDate);
      setErrors((prevState) => ({
        ...prevState,
        dueDate: textError,
      }));
    }
    if (!taskValues.client) {
      const textError = validateText(taskValues.client);
      setErrors((prevState) => ({
        ...prevState,
        client: textError,
      }));
    }
    if (!taskValues.members?.length) {
      const textError = validateText(taskValues.members?.length);
      setErrors((prevState) => ({
        ...prevState,
        members: textError,
      }));
    }
    if (!taskValues.clients?.length) {
      const textError = validateText(taskValues.clients?.length);
      setErrors((prevState) => ({
        ...prevState,
        clients: textError,
      }));
    }
    if (!taskValues.description) {
      const textError = validateText(taskValues.description);
      setErrors((prevState) => ({
        ...prevState,
        description: textError,
      }));
    }
    if (!taskValues.status?.id) {
      const textError = validateText(taskValues.status?.id);
      setErrors((prevState) => ({
        ...prevState,
        status: textError,
      }));
    }
    if (taskValues.dueDate < taskValues.startDate) {
      return toast.error(labels.dateError);
    }
    if (
      taskValues.taskName &&
      taskValues.startDate &&
      taskValues.dueDate &&
      taskValues.client &&
      taskValues.clients?.length &&
      // taskValues.members &&
      taskValues.description &&
      taskValues.status?.id
    ) {
      if (Boolean(checkInternetConnection())) {
        const taskParams = {
          title: taskValues.taskName,
          startDate: taskValues.startDate,
          dueDate: taskValues.dueDate,
          responsible: taskValues.members?.map((item) => item?.value),
          client: taskValues.clients?.map((item) => item?.value),
          description: taskValues.description,
          status: taskValues.status?.id,
          isClientCanSee: taskValues.clientSeeStatus,
          isContributorCanSee: taskValues.isContributorCanSee,
          projectId: params?.id,
          type: taskValues?.type?.value || "",
          taskOwner: taskValues?.client?.label,
          contributor: taskValues?.contributor?.map((item) => item?.value),
        };
        // console.log(taskParams,"taskParams");
        // return
        dispatch(
          createTaskApiMethod(taskParams, async () => {
            await handleAllTask();
            setLoading(false);
            setShowAddTaskModal(false);
            setTaskValues({
              taskName: "",
              startDate: "",
              dueDate: "",
              client: "",
              members: [],
              clients: [],
              contributor: [],
              description: "",
              status: [],
              type: "",
              clientSeeStatus: true,
              isContributorCanSee: true,
            });
            setErrors({});
          })
        );
      }
    }
  }, [taskValues, setErrors, dispatch]);
  return (
    <Fragment>
      {visibleAddTask === true ? (
        <EditTask
          taskId={taskId}
          taskOptions={taskOptions}
          loading={loading}
          setTab={setTab}
          role={role}
        />
      ) : (
        <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-4 my-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex gap-x-3 text-[20px] text-c_fff/90">
              <span className="">{labels.tasks}</span>{" "}
              {role === "client" || role === "contributor" ? null : (
                <div className="px-2 flex justify-center items-center w-8 bg-c_fff/10 rounded-md">
                  <span className=" text-c_fff text-[12px]">{taskCount}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-4 md:my-0 my-2">
              <Filter
                taskOptions={taskOptions}
                search={search}
                setSearch={setSearch}
                handleAllTask={handleAllTask}
              />
              <Button
                onClick={() => setShowAddTaskModal(true)}
                label={labels.addNewTask}
                icon={plusIcon}
                className={`flex items-center md:gap-x-2 gap-x-1 text-c_fff text-sm md:text-[14px] capitalize bg-transparent border border-c_fff/30 py-2 md:py-2 px-3 md:px-3 rounded`}
              />
            </div>
          </div>

          {showAddTaskModal && (
            <div className="relative">
              <div
                onClick={() => setShowAddTaskModal(false)}
                className="fixed inset-0 bg-c_000/50 bg-opacity-75 transition-opacity"
              ></div>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden z-9">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto relative w-screen max-w-md">
                      <div className="flex min-h-screen flex-col overflow-y-hidden bg-c_272727 py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <h2
                            className="text-lg font-thin leading-6 text-c_fff"
                            id="slide-over-title"
                          >
                            {labels.addNewTask}
                          </h2>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="max-h-[34rem] overflow-y-auto px-2">
                            {/* content */}
                            <div className="flex flex-col">
                              <div>
                                <Input
                                  placeholder={labels.taskName}
                                  value={taskValues?.taskName}
                                  type="text"
                                  id="taskName"
                                  name="taskName"
                                  className="w-full bg-c_272727 mb-3 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                  onChange={(e) => {
                                    setErrors((prevState) => ({
                                      ...prevState,
                                      taskName: null,
                                    }));
                                    setTaskValues((prevState) => ({
                                      ...prevState,
                                      taskName: e.target.value,
                                    }));
                                  }}
                                  error={errors.taskName}
                                  errorText={errors.taskName}
                                />
                                <div className="flex items-center justify-between gap-x-2 mt-1">
                                  <div className="flex flex-col">
                                    <Input
                                      placeholder={labels.startDate}
                                      onFocus={() =>
                                        (startDateRef.current.type = "date")
                                      }
                                      type="text"
                                      id="startDate"
                                      name="startDate"
                                      ref={startDateRef}
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      className="w-full bg-c_272727 rounded-lg mb-1 text-base outline-none border border-c_595959 text-white cursor-pointer placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                      value={taskValues.startDate}
                                      onChange={(e) => {
                                        setErrors((prevState) => ({
                                          ...prevState,
                                          startDate: null,
                                        }));
                                        setTaskValues((prevState) => ({
                                          ...prevState,
                                          startDate: e.target.value,
                                        }));
                                      }}
                                      error={errors.startDate}
                                      errorText={errors.startDate}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <Input
                                      placeholder={labels.dueDate}
                                      onFocus={() =>
                                        (ref.current.type = "date")
                                      }
                                      ref={ref}
                                      type="text"
                                      id="dueDate"
                                      name="dueDate"
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      className="w-full bg-c_272727 rounded-lg mb-1 text-base outline-none border border-c_595959 text-white cursor-pointer placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                      value={taskValues.dueDate}
                                      error={errors.dueDate}
                                      errorText={errors.dueDate}
                                      onChange={(e) => {
                                        setErrors((prevState) => ({
                                          ...prevState,
                                          dueDate: null,
                                        }));
                                        setTaskValues((prevState) => ({
                                          ...prevState,
                                          dueDate: e.target.value,
                                        }));
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <CustomSelect
                                    className="basic-select mb-1 "
                                    styles={colourStyles}
                                    options={EsthelaMarcOptions}
                                    value={taskValues?.client}
                                    placeholder={labels.projectMember}
                                    error={errors.client}
                                    errorText={errors.client}
                                    onChange={(e) => {
                                      setTaskValues((prevState) => ({
                                        ...prevState,
                                        client: e,
                                      }));
                                      setErrors((prevState) => ({
                                        ...prevState,
                                        client: null,
                                      }));
                                    }}
                                  />
                                </div>
                                <div className="mt-2">
                                  <CustomSelect
                                    className="basic-select mb-1 "
                                    styles={colourStyles}
                                    options={typeOptions}
                                    value={taskValues?.type}
                                    placeholder="Type"
                                    onChange={(e) => {
                                      setTaskValues((prevState) => ({
                                        ...prevState,
                                        type: e,
                                      }));
                                    }}
                                  />
                                </div>
                                <CustomSelect
                                  isMulti
                                  options={options}
                                  className="basic-multi-select mt-3"
                                  placeholder={labels.addMembers}
                                  styles={colourStyles}
                                  value={taskValues.members}
                                  name="members"
                                  
                                  onChange={(e) => {
                                    // setErrors((prevState) => ({
                                    //   ...prevState,
                                    //   members: null,
                                    // }));
                                    setTaskValues((prevState) => ({
                                      ...prevState,
                                      members: e,
                                    }));
                                  }}
                                  

                                  // error={errors.members}
                                  // errorText={errors.members}
                                />
                                <CustomSelect
                                  isMulti
                                  options={clientOptions}
                                  className="basic-multi-select mt-3"
                                  placeholder={labels.addClient}
                                  styles={colourStyles}
                                  value={taskValues.clients}
                                  name="clients"
                                  onChange={(e) => {
                                    setErrors((prevState) => ({
                                      ...prevState,
                                      clients: null,
                                    }));
                                    setTaskValues((prevState) => ({
                                      ...prevState,
                                      clients: e,
                                    }));
                                  }}
                                  error={errors.clients}
                                  errorText={errors.clients}
                                />
                                <CustomSelect
                                  isMulti
                                  options={contributorOptions}
                                  className="basic-multi-select mt-3"
                                  placeholder={labels.addContributor}
                                  styles={colourStyles}
                                  value={taskValues.contributor}
                                  name="contributor"
                                  onChange={(e) => {
                                    setTaskValues((prevState) => ({
                                      ...prevState,
                                      contributor: e,
                                    }));
                                  }}
                                />
                                <div>
                                  <CustomSelect
                                    className="basic-select mb-1 "
                                    styles={colourStyles}
                                    options={taskOptions}
                                    value={taskValues?.status}
                                    placeholder="Status"
                                    error={errors.status}
                                    errorText={errors.status}
                                    onChange={(e) => {
                                      setErrors((prevState) => ({
                                        ...prevState,
                                        status: null,
                                      }));
                                      setTaskValues((prevState) => ({
                                        ...prevState,
                                        status: e,
                                      }));
                                    }}
                                  />
                                </div>
                                <div>
                                  <TextArea
                                    className="w-full bg-c_272727 mt-2 rounded-lg text-white outline-none border border-c_595959  placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder={labels.description}
                                    type="textarea"
                                    value={taskValues.description}
                                    error={errors.description}
                                    errorText={errors.description}
                                    onChange={(e) => {
                                      setErrors((prevState) => ({
                                        ...prevState,
                                        description: null,
                                      }));
                                      setTaskValues((prevState) => ({
                                        ...prevState,
                                        description: e.target.value,
                                      }));
                                    }}
                                  />
                                  <div>
                                    {role === "client" ||
                                    role === "contributor" ? null : (
                                      <>
                                        <div className="w-full mt-3 flex items-center justify-between">
                                          <p className="text-base text-c_fff/40">
                                            {labels.canTheClientSeeTheTask}
                                          </p>
                                          <ToggleBtn
                                            defaultChecked={true}
                                            // checked={true}
                                            value={taskValues.clientSeeStatus}
                                            onChange={(e) => {
                                              setTaskValues((prevState) => ({
                                                ...prevState,
                                                clientSeeStatus:
                                                  !taskValues?.clientSeeStatus,
                                              }));
                                            }}
                                          />
                                        </div>
                                        <div className="w-full mt-3 flex items-center justify-between">
                                          <p className="text-base text-c_fff/40">
                                            {labels.canTheContributorSeeTheTask}
                                          </p>
                                          <ToggleBtn
                                            defaultChecked="true"
                                            value={
                                              taskValues.isContributorCanSee
                                            }
                                            onChange={(e) => {
                                              setTaskValues((prevState) => ({
                                                ...prevState,
                                                isContributorCanSee:
                                                  !taskValues?.isContributorCanSee,
                                              }));
                                            }}
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="w-full absolute left-0 px-6 bottom-0 flex items-center justify-between">
                                  <Button
                                    onClick={() => {
                                      setShowAddTaskModal(false);
                                      setTaskValues({});
                                      setErrors({});
                                    }}
                                    className="flex items-center gap-x-2 text-white text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                                    label={labels.cancel}
                                  ></Button>
                                  <Button
                                    onClick={createTaskFunc}
                                    disabled={loading}
                                    label={labels.create}
                                    className="flex items-center gap-x-2 text-white text-base capitalize bg-c_BF642B border-0 py-1 px-4 rounded"
                                  ></Button>
                                </div>
                              </div>
                            </div>
                            {/* content ends */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditTaskModal && (
            <ShowEditTaskModal
              taskData={taskData}
              membersOptions={membersOptions}
              colourStyles={colourStyles}
              taskOptions={taskOptions}
              setShowEditTaskModal={setShowEditTaskModal}
              handleAllTask={handleAllTask}
              loading={loading}
              setLoading={setLoading}
              options={options}
              contributorOptions={contributorOptions}
              role={role}
            />
          )}
          <div className="overflow-x-auto scrollbar-hide">
            {loading ? (
              <div className="min-h-screen flex justify-center items-center">
                <ClipLoader className="spinner-css" color={"#BF642B"} />
              </div>
            ) : (
              <table className="w-full mt-8">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5">
                      <div className="flex items-center">
                        <div className=""></div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-4 text-left text-sm capitalize text-white sm:pl-0"
                    >
                      <div className="flex items-center gap-x-4 pl-4">
                        <div className="font-medium text-[12px] text-c_fff">
                          {labels.taskTitle}
                        </div>
                      </div>
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 pr-4 text-left text-sm capitalize text-white"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="font-medium text-[12px] text-c_fff">
                          {labels.responsible}
                        </div>
                      </div>
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 pr-4 text-left text-sm capitalize text-white"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="font-medium text-[12px] md:mx-0 mx-[2rem] text-c_fff">
                          {labels.status}
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 md:px-0 py-3.5 text-left text-sm capitalize text-white"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="font-medium text-[12px] text-c_fff">
                          {labels.dueDate}
                        </div>
                      </div>
                    </th>
                    {role === "client" || role === "contributor" ? null : (
                      <th
                        scope="col"
                        className="px-3 md:px-0 py-3.5 text-left text-sm capitalize text-white"
                      >
                        <div className="flex items-center gap-x-4">
                          <div className="font-medium text-[12px] text-c_fff">
                            {labels.actions}
                          </div>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="w-full">
                  {tasks?.map((task) => (
                    <React.Fragment>
                      <tr
                        className="odd:bg-c_fff/5 even:bg-transparent rounded-md cursor-pointer overflow-x-auto"
                        key={task?.id}
                      >
                        <td>
                          <div className="pl-4 !rounded-tl-md !rounded-bl-md">
                            <p
                              className={
                                task?.type === "Interiors"
                                  ? "rounded-full !w-4 !h-4 bg-teal-500"
                                  : "rounded-full !w-4 !h-4 bg-orange-500"
                              }
                            ></p>
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              setVisibleAddTask(true);
                              setTaskId(task);
                            }}
                            className="flex gap-x-3 items-center my-4 pl-4 text-sm text-c_fff"
                          >
                            <span>
                              {task?.title?.length > 80
                                ? task?.title?.substring(0, 80) + "..."
                                : task?.title}
                            </span>
                          </div>
                        </td>

                        {/* <td className="px-3 py-4 cursor-pointer flex text-sm text-c_fff">
                          <AvatarGroup
                            maxCount={4}
                            size="small"
                            appearance="stack"
                            data={task?.responsibles?.map((item) => {
                              return {
                                src: item?.user?.picture || defaultAvatar,
                                name: item?.user?.fullName,
                              };
                            })}
                          />
                        </td> */}

                        <td className="py-4 text-[14px] text-c_fff">
                          <p
                            className={`md:px-4 px-1 py-1 w-fit md:mx-0 mx-[2rem] text-[10px] ${
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

                        <td className="py-4 text-sm text-c_fff">
                          {moment.utc(task?.dueDate).format(
                            dateFormat || "YYYY/MM/DD"
                          )}
                        </td>
                        {role === "client" || role === "contributor" ? null : (
                          <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                            <div className="flex items-center gap-x-2">
                              <img
                                onClick={() => {
                                  setShowEditTaskModal(true);
                                  setTaskData(task);
                                }}
                                src="/images/editIcon.svg"
                                alt="editIcon"
                                className="w-6 h-6 cursor-pointer text-c_fff"
                              />
                              {role === "admin" || role === "user" ? (
                                <img
                                  onClick={() => {
                                    setTaskId(task?.id), setOpen(true);
                                  }}
                                  src="/images/deleteIcon.svg"
                                  alt="deleteIcon"
                                  className="w-6 h-6 cursor-pointer text-c_fff/10"
                                />
                              ) : null}
                            </div>
                          </td>
                        )}
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-8">
            {apiHit && tasks?.length <= 0 ? (
              <NoDataAvailable entity={labels.tasks} />
            ) : null}
          </div>
        </div>
      )}

      <DeleteTaskModal
        open={open}
        setOpen={() => setOpen(!open)}
        taskId={taskId}
        handleAllTask={handleAllTask}
      />
    </Fragment>
  );
};

export default Task;
