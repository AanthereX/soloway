import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { labels } from "../configs/Labels";
import Input from "./Input";
import CustomAsyncSelect from "./CustomAsyncSelect";
import TextArea from "./TextArea";
import CustomSelect from "./CustomSelect";
import Button from "./Button";
import { useDispatch } from "react-redux";
import {
  checkInternetConnection,
  membersOptions,
  validateText,
} from "../utils/validate";
import Select from "react-select";
import {
  getUserRelatedProjectMethod,
  getUserTypeApiMethod,
  updateProjectApiMethod,
} from "../store/actions/projectActions";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const ShowEditProjectModal = ({
  setEditProjectModal,
  colourStyles,
  projectDetail,
  handleProjectDetails,
}) => {
  // console.log(projectDetail, "projectDetail");
  const dispatch = useDispatch();
  const ref = useRef();
  const startDateRef = useRef();
  const params = useParams();
  const [contributorData, setContributorData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectvalues, setProjectValues] = useState({
    projectName: "",
    startDate: "",
    dueDate: "",
    budgeAmount: "",
    budgetDescription: "",
    members: [],
    client: [],
    contributor: [],
    description: "",
  });

  const [projectError, setProjectError] = useState({
    projectName: null,
    startDate: null,
    dueDate: null,
    members: null,
    client: null,
    description: null,
    budgetDescription: null,
    budgeAmount: null,
  });

  useEffect(() => {
    getUserTypeApiMethod(
      (res) => {
        setClientData(res?.data);
      },
      { role: "client", search: projectvalues?.client }
    );
    getUserTypeApiMethod(
      (res) => {
        setContributorData(res?.data);
      },
      { role: "contributor", search: projectvalues?.contributor }
    );
  }, []);
  const clientOptions = clientData?.map((item) => {
    return {
      value: item?.id,
      label: item?.fullName,
    };
  });
  const contributorOptions = contributorData?.map((item) => {
    return {
      value: item?.id,
      label: item?.fullName,
    };
  });
  // console.log(membersData,"membersData")
  useEffect(() => {
    setProjectValues({
      projectName: projectDetail?.projectDetails?.name,
      startDate: projectDetail?.projectDetails?.startDate,
      dueDate: projectDetail?.projectDetails?.dueDate,
      // members: [
      //   {
      //     value: projectDetail?.projectDetails?.projectOwner,
      //     label: projectDetail?.projectDetails?.projectOwner,
      //   },
      // ],
      members: { value: projectDetail?.projectDetails?.projectOwner, label: projectDetail?.projectDetails?.projectOwner },
      client: projectDetail?.projectDetails?.projectClients?.map((item) => {
        return {
          label: item?.user?.fullName,
          value: item?.user?.id,
        };
      }),
      contributor: projectDetail?.projectDetails?.projectContributor?.map((item) => {
        return {
          label: item?.user?.fullName,
          value: item?.user?.id,
        };
      }),
      description: projectDetail?.projectDetails?.description,
      budgetAmount: projectDetail?.projectDetails?.budgeAmount,
      budgetDescription: projectDetail?.projectDetails?.budgetDescription,
    });
  }, [projectDetail?.projectDetails]);

  const handleEditProject = useCallback(async () => {
    if (!projectvalues.projectName) {
      const textError = validateText(projectvalues.projectName);
      setProjectError((prevState) => ({
        ...prevState,
        projectName: textError,
      }));
    }
    if (!projectvalues.startDate) {
      const textError = validateText(projectvalues.startDate);
      setProjectError((prevState) => ({
        ...prevState,
        startDate: textError,
      }));
    }
    if (!projectvalues.dueDate) {
      const textError = validateText(projectvalues.dueDate);
      setProjectError((prevState) => ({
        ...prevState,
        dueDate: textError,
      }));
    }
    if (!projectvalues.members) {
      const textError = validateText(projectvalues.members);
      setProjectError((prevState) => ({
        ...prevState,
        members: textError,
      }));
    }
    if (!projectvalues.client?.length) {
      const textError = validateText(projectvalues.client?.length);
      setProjectError((prevState) => ({
        ...prevState,
        client: textError,
      }));
    }
    if (!projectvalues.description) {
      const textError = validateText(projectvalues.description);
      setProjectError((prevState) => ({
        ...prevState,
        description: textError,
      }));
    }
    if (projectvalues?.dueDate < projectvalues?.startDate) {
      return toast.error(labels.dateError);
    }
    if (
      projectvalues.projectName &&
      projectvalues.startDate &&
      projectvalues.dueDate &&
      projectvalues.description &&
      projectvalues.client?.length &&
      projectvalues.members 
    ) {
    if (Boolean(checkInternetConnection())) {
      const formData = new FormData();
      formData.append("name", projectvalues.projectName);
      formData.append("startDate", projectvalues.startDate);
      formData.append("dueDate", projectvalues.dueDate);
      formData.append("description", projectvalues.description);
      formData.append("projectOwner", projectvalues.members?.label);
      formData.append("clientIds", projectvalues.client?.map(item => [item?.value]));
      if(projectvalues.contributor?.length){
        formData.append("contributorIds", projectvalues.contributor?.map(item => item?.value));
      }
      setLoading(true);
      await dispatch(
        updateProjectApiMethod(params?.id, formData, async () => {
          setLoading(false);
          await setEditProjectModal(false);
          await handleProjectDetails();
          await dispatch(getUserRelatedProjectMethod());
        })
      );
    }
  }
  }, [projectvalues, setProjectError, dispatch]);

  return (
    <Fragment>
      <div className="relative">
        <div
          onClick={() => setEditProjectModal(false)}
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
                      {labels.editProject}
                    </h2>
                  </div>
                  <div className="relative mt-6  flex-1 px-4 sm:px-6 ">
                    {/* content */}
                    <div className="pl-2">
                      <div className="flex flex-col ">
                        <div className="pr-4">
                          <Input
                            placeholder={labels.projectName}
                            value={projectvalues?.projectName}
                            type="text"
                            id="taskName"
                            name="taskName"
                            className="w-full bg-c_272727 mb-3 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => {
                              setProjectError((prevState) => ({
                                ...prevState,
                                projectName: null,
                              }));
                              setProjectValues((prevState) => ({
                                ...prevState,
                                projectName: e.target.value,
                              }));
                            }}
                            error={projectError?.projectName}
                            errorText={projectError.projectName}
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
                                min={new Date().toISOString().split("T")[0]}
                                value={projectvalues.startDate}
                                onChange={(e) => {
                                  setProjectError((prevState) => ({
                                    ...prevState,
                                    startDate: null,
                                  }));
                                  setProjectValues((prevState) => ({
                                    ...prevState,
                                    startDate: e.target.value,
                                  }));
                                }}
                                error={projectError.startDate}
                                errorText={projectError.startDate}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                            <div className="flex flex-col">
                              <Input
                                onFocus={() => (ref.current.type = "date")}
                                placeholder={labels.dueDate}
                                ref={ref}
                                type="text"
                                id="dueDate"
                                name="dueDate"
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={projectvalues.dueDate}
                                onChange={(e) => {
                                  setProjectError((prevState) => ({
                                    ...prevState,
                                    dueDate: null,
                                  }));
                                  setProjectValues((prevState) => ({
                                    ...prevState,
                                    dueDate: e.target.value,
                                  }));
                                }}
                                error={projectError.dueDate}
                                errorText={projectError.dueDate}
                              />
                            </div>
                          </div>

                          <CustomSelect
                            isMulti
                            options={clientOptions}
                            className="basic-multi-select mt-3"
                            placeholder={labels.clientName}
                            styles={colourStyles}
                            onChange={(e) => {
                              setProjectError((prevState) => ({
                                ...prevState,
                                client: null,
                              }));
                              setProjectValues((prev) => ({
                                ...prev,
                                client: e,
                              }));
                            
                            }}
                            value={projectvalues.client}
                            name="client"
                            error={projectError.client}
                            errorText={projectError.client}
                          />
                          <CustomSelect
                            isMulti
                            options={contributorOptions}
                            className="basic-multi-select mt-3"
                            placeholder={labels.contributor}
                            styles={colourStyles}
                            onChange={(e) =>
                              setProjectValues((prev) => ({
                                ...prev,
                                contributor: e,
                              }))
                            }
                            value={projectvalues.contributor}
                            name="contributor"
                          />
                          <Select
                            options={membersOptions}
                            placeholder={labels.addMembers}
                            className="basic-select mt-2"
                            value={projectvalues.members}
                            name="members"
                            styles={colourStyles}
                            onChange={(e) => {
                              setProjectError((prevState) => ({
                                ...prevState,
                                members: null,
                              }));
                              setProjectValues((prevState) => ({
                                ...prevState,
                                members: e,
                              }));
                            }}
                          />

                          <TextArea
                            className="w-full bg-c_272727 mt-4 rounded-lg text-white outline-none border border-c_595959  placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder={labels.description}
                            type="textarea"
                            value={projectvalues.description}
                            onChange={(e) => {
                              setProjectError((prevState) => ({
                                ...prevState,
                                description: null,
                              }));
                              setProjectValues((prevState) => ({
                                ...prevState,
                                description: e.target.value,
                              }));
                            }}
                            error={projectError.description}
                            errorText={projectError.description}
                          />
                       
                        </div>

                        <div className="w-full mt-6  absolute left-0  px-6 bottom-[-1rem] flex items-center justify-between">
                          <Button
                            onClick={() => setEditProjectModal(false)}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>
                          <Button
                            onClick={handleEditProject}
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

export default ShowEditProjectModal;
