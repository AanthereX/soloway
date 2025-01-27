import React, { Fragment, useCallback, useEffect, useState } from "react";
import { labels } from "../configs/Labels";
import Input from "./Input";
import TextArea from "./TextArea";
import CustomSelect from "./CustomSelect";
import ToggleBtn from "./ToggleBtn";
import { useParams } from "react-router";
import Button from "./Button";
import { getProjectClientApiMethod, updateTaskApiMethod } from "../store/actions/projectActions";
import { membersOptions, typeOptions, validateText } from "../utils/validate";
import { useDispatch } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";

const ShowEditTaskModal = ({
  setShowEditTaskModal,
  colourStyles,
  taskOptions,
  taskData,
  handleAllTask,
  loading,
  setLoading,
  options,
  contributorOptions,
  role,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(taskData, "taskData");
  const [clientsData, setClientsData] = useState([]);
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const [editTaskValues, setEditTaskValues] = useState({
    taskName: "",
    startDate: "",
    dueDate: "",
    members: [],
    contributor: [],
    clients: [],
    description: "",
    client: "",
    status: "",
    type: "",
    clientSeeStatus: true,
    isContributorCanSee: true,
  });
  const [errors, setErrors] = useState({
    taskName: null,
    startDate: null,
    dueDate: null,
    members: null,
    clients: null,
    description: null,
    status: null,
  });

  
  // const clients = taskData?.responsibles?.filter((item) => item?.user?.role === 'client');
  // console.log(clients)
  // console.log(taskData,"taskData")
  useEffect(() => {
    setEditTaskValues({
      taskName: taskData?.title,
      startDate: taskData?.startDate,
    dueDate: moment(taskData?.dueDate)?.format('YYYY-MM-DD'),
    clients: (taskData?.responsibles?.filter(client => {
      return client?.user?.role === "client";
    }) || []).map((item) => {
      return {
        ...item,
        label: item?.user?.fullName,
        value: item?.user?.id,
      };
    }),
    members: (taskData?.responsibles?.filter(member => {
      return member?.user?.role === "user";
    }) || []).map((item) => {
      return {
        ...item,
        label: item?.user?.fullName,
        value: item?.user?.id,
      };
    }),
      contributor: taskData?.taskContributors?.map((item) => {
        return {
          ...item,
          label: item?.user?.fullName,
          value: item?.user?.id,
        };
      }),
      description: taskData?.description,
      status: { id: taskData?.status?.trim(), label: taskData?.status },
      type: { value: taskData?.type, label: taskData?.type },
      clientSeeStatus: taskData?.isClientCanSee,
      isContributorCanSee: taskData?.isContributorCanSee,
      client:  { id: taskData?.taskOwner, label: taskData?.taskOwner } || "",
    });

    getProjectClientApiMethod(params?.id,
      (res) => {
        setClientsData(res);
      },
    );
  }, []);

  const clientOptions = clientsData?.map((item) => {
    return {
      value: item?.user?.id,
      label: item?.user?.fullName,
    };
  });
  const editTaskFunc = useCallback(async () => {
    if (!editTaskValues.taskName) {
      const textError = validateText(editTaskValues.taskName);
      setErrors((prevState) => ({
        ...prevState,
        taskName: textError,
      }));
    }
    if (!editTaskValues.startDate) {
      const textError = validateText(editTaskValues.startDate);
      setErrors((prevState) => ({
        ...prevState,
        startDate: textError,
      }));
    }
    if (!editTaskValues.dueDate) {
      const textError = validateText(editTaskValues.dueDate);
      setErrors((prevState) => ({
        ...prevState,
        dueDate: textError,
      }));
    }
    if (!editTaskValues.clients?.length) {
      const textError = validateText(editTaskValues.clients);
      setErrors((prevState) => ({
        ...prevState,
        clients: textError,
      }));
    }
    if (!editTaskValues.description) {
      const textError = validateText(editTaskValues.description);
      setErrors((prevState) => ({
        ...prevState,
        description: textError,
      }));
    }
    if (!editTaskValues.status) {
      const textError = validateText(editTaskValues.status?.length);
      setErrors((prevState) => ({
        ...prevState,
        status: textError,
      }));
    }
    if (editTaskValues.dueDate < editTaskValues.startDate) {
      return toast.error(labels.dateError);
    }
    if (
      editTaskValues.taskName &&
      editTaskValues.startDate &&
      editTaskValues.dueDate &&
      editTaskValues.clients &&
      editTaskValues.description &&
      editTaskValues.status
    ) {
      const taskParams = {
        title: editTaskValues.taskName,
        startDate: editTaskValues.startDate,
        dueDate: editTaskValues.dueDate,
        responsible: editTaskValues.members?.map((item) => item?.value) || [],
        client: editTaskValues.clients?.map((item) => item?.value),
        contributor: editTaskValues.contributor?.map((item) => item?.value),
        description: editTaskValues.description,
        status: editTaskValues?.status?.id,
        isClientCanSee: editTaskValues?.clientSeeStatus,
        isContributorCanSee: editTaskValues?.isContributorCanSee,
        projectId: params?.id,
        type: editTaskValues?.type?.value,
        taskOwner: editTaskValues?.client?.label,
      };
      // console.log(taskParams,"taskParams");
      // return
      setLoading(true);
      await dispatch(updateTaskApiMethod(taskData?.id, taskParams));
      setShowEditTaskModal(false);
      await handleAllTask();
      setLoading(false);
      setErrors({
        taskName: null,
        startDate: null,
        dueDate: null,
        members: null,
        description: null,
        status: null,
      });
    }
  }, [editTaskValues, setErrors, dispatch]);
  return (
    <Fragment>
      <div className="relative">
        <div
          onClick={() => setShowEditTaskModal(false)}
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
                      {labels.editTask}
                    </h2>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="max-h-[35rem] overflow-y-auto px-2">
                    {/* content */}
                    <div className="flex flex-col">
                      <div>
                        <Input
                          placeholder={labels.taskName}
                          value={editTaskValues?.taskName}
                          type="text"
                          id="taskName"
                          name="taskName"
                          className="w-full bg-c_272727 mb-3 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          onChange={(e) => {
                            setErrors((prevState) => ({
                              ...prevState,
                              taskName: null,
                            }));
                            setEditTaskValues((prevState) => ({
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
                              type="date"
                              id="startDate"
                              name="startDate"
                              className="w-full bg-c_272727 rounded-lg mb-1 text-base outline-none border border-c_595959 text-white cursor-pointer placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              value={editTaskValues.startDate}
                              onChange={(e) => {
                                setErrors((prevState) => ({
                                  ...prevState,
                                  startDate: null,
                                }));
                                setEditTaskValues((prevState) => ({
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
                              type="date"
                              id="dueDate"
                              name="dueDate"
                              className="w-full bg-c_272727 rounded-lg mb-1 text-base outline-none border border-c_595959 text-white cursor-pointer placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              value={editTaskValues.dueDate}
                              error={errors.dueDate}
                              errorText={errors.dueDate}
                              onChange={(e) => {
                                setErrors((prevState) => ({
                                  ...prevState,
                                  dueDate: null,
                                }));
                                setEditTaskValues((prevState) => ({
                                  ...prevState,
                                  dueDate: e.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <CustomSelect
                          isMulti
                          options={options}
                          className="basic-multi-select mt-2"
                          placeholder={labels.addMembers}
                          styles={colourStyles}
                          value={editTaskValues.members}
                          name="members"
                          onChange={(e) => {
                            setEditTaskValues((prevState) => ({
                              ...prevState,
                              members: e,
                            }));
                          }}
                        />
                           <CustomSelect
                                  isMulti
                                  options={clientOptions}
                                  className="basic-multi-select mt-3"
                                  placeholder={labels.addClient}
                                  styles={colourStyles}
                                  value={editTaskValues.clients}
                                  name="clients"
                                  onChange={(e) => {
                                    setErrors((prevState) => ({
                                      ...prevState,
                                      clients: null,
                                    }));
                                    setEditTaskValues((prevState) => ({
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
                                  value={editTaskValues.contributor}
                                  name="contributor"
                                  onChange={(e) => {
                                    setEditTaskValues((prevState) => ({
                                      ...prevState,
                                      contributor: e,
                                    }));
                                  }}
                                />
                        <div>
                          <CustomSelect
                            className="basic-select mb-1 "
                            styles={colourStyles}
                            options={membersOptions}
                            value={editTaskValues?.client}
                            placeholder={labels.projectMember}
                            onChange={(e) => {
                              setEditTaskValues((prevState) => ({
                                ...prevState,
                                client: e,
                              }));
                            }}
                          />
                        </div>
                        <div className="mt-2">
                          <CustomSelect
                            className="basic-select mb-1 "
                            styles={colourStyles}
                            options={typeOptions}
                            value={editTaskValues?.type}
                            placeholder="Type"
                            onChange={(e) => {
                              setEditTaskValues((prevState) => ({
                                ...prevState,
                                type: e,
                              }));
                            }}
                          />
                        </div>
                        <div className="mt-1">
                            <CustomSelect
                              className="basic-select mb-1 "
                              styles={colourStyles}
                              options={taskOptions}
                              value={editTaskValues.status}
                              placeholder="Status"
                              error={errors.status}
                              errorText={errors.status}
                              onChange={(e) => {
                                setErrors((prevState) => ({
                                  ...prevState,
                                  status: null,
                                }));
                                setEditTaskValues((prevState) => ({
                                  ...prevState,
                                  status: e,
                                }));
                              }}
                            />
                          </div>
                        <TextArea
                          className="w-full bg-c_272727 mt-2 rounded-lg text-white outline-none border border-c_595959  placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          placeholder={labels.description}
                          type="textarea"
                          value={editTaskValues.description}
                          error={errors.description}
                          errorText={errors.description}
                          onChange={(e) => {
                            setErrors((prevState) => ({
                              ...prevState,
                              description: null,
                            }));
                            setEditTaskValues((prevState) => ({
                              ...prevState,
                              description: e.target.value,
                            }));
                          }}
                        />
                        <div className="mt-4">
                        
                          {role === "client" ? (
                            ""
                          ) : (
                            <>
                              <div className="w-full mt-3 flex items-center justify-between">
                                <p className="text-base text-c_fff/40">
                                  {labels.canTheClientSeeTheTask}
                                </p>
                                <ToggleBtn
                                  value={editTaskValues.clientSeeStatus}
                                  defaultChecked={taskData?.isClientCanSee}
                                  onChange={(e) => {
                                    setEditTaskValues((prevState) => ({
                                      ...prevState,
                                      clientSeeStatus:
                                        !editTaskValues?.clientSeeStatus,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="w-full mt-3 flex items-center justify-between">
                                <p className="text-base text-c_fff/40">
                                  {labels.canTheContributorSeeTheTask}
                                </p>
                                <ToggleBtn
                                  defaultChecked={taskData?.isContributorCanSee}
                                  value={editTaskValues.isContributorCanSee}
                                  onChange={(e) => {
                                    setEditTaskValues((prevState) => ({
                                      ...prevState,
                                      isContributorCanSee:
                                        !editTaskValues?.isContributorCanSee,
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
                            setShowEditTaskModal(false);
                          }}
                          className="flex items-center gap-x-2 text-white text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                          label={labels.cancel}
                        ></Button>
                        <Button
                          onClick={editTaskFunc}
                          disabled={loading}
                          label={labels.save}
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
    </Fragment>
  );
};

export default ShowEditTaskModal;
