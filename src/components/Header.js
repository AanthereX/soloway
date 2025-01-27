import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { labels } from "../configs/Labels";
import Button from "./Button";
import NotificationIcon from "./NotificationIcon";
import FolderIcon from "./FolderIcon";
import UserIcon from "./UserIcon";
import { BackArrow } from "./BackArrow";
import { addUser } from "../store/actions";
import {
  validateEmailAddress,
  validateText,
  validateLength,
  validateOnlySpace,
  checkInternetConnection,
  colourStyles,
  membersOptions,
  projectOptions,
  UserOptions,
  kFormatter,
} from "../utils/validate";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";
import Input from "./Input";
import TextArea from "./TextArea";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  addProjectApiMethod,
  getUserRelatedProjectMethod,
  getUserTypeApiMethod,
} from "../store/actions/projectActions";

const Header = ({
  handleProject,
  title,
  btnLabel,
  handleGetUsers,
  tab,
  handleUpdateUser,
  notificationCount,
  allNotificationCount,
  loadingNotification,
}) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [membersData, setMembersData] = useState([]);
  const [contributorData, setContributorData] = useState([]);
  const { loading } = useSelector((state) => state.User?.updateuser);
  const [loader, setLoader] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plusIcon = <FiPlus />;
  const ref = useRef();
  const startDateRef = useRef();

  const [projectvalues, setProjectValues] = useState({
    projectName: "",
    startDate: "",
    dueDate: "",
    clientName: [],
    members: "",
    description: "",
    contributor: [],
    status: [],
  });
  const [projectError, setProjectError] = useState({
    projectName: null,
    startDate: null,
    dueDate: null,
    clientName: null,
    members: null,
    description: null,
    status: null,
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    role: null,
  });

  useEffect(() => {
    getUserTypeApiMethod(
      (res) => {
        setContributorData(res?.data);
      },
      { role: "contributor", search: projectvalues?.contributor }
    );
    getUserTypeApiMethod(
      (res) => {
        setMembersData(res?.data);
      },
      { role: "client", search: projectvalues?.members }
    );
  }, []);

  const options = membersData?.map((item) => {
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

  const handleAddUser = useCallback(async () => {
    if (!values.email) {
      const textError = validateText(values?.email);
      setErrors((prevState) => ({
        ...prevState,
        email: textError,
      }));
    }
    if (values.email) {
      const emailError = validateEmailAddress(values?.email);
      setErrors((prevState) => ({
        ...prevState,
        email: emailError,
      }));
      if (emailError) return;
    }
    if (!values.firstName) {
      const textError = validateText(values?.firstName);
      setErrors((prevState) => ({
        ...prevState,
        firstName: textError,
      }));
    }
    if (values.firstName) {
      const textError = validateLength(values?.firstName);
      setErrors((prevState) => ({
        ...prevState,
        firstName: textError,
      }));
      if (textError) return;
    }
    if (values.firstName) {
      const textError = validateOnlySpace(values?.firstName);
      setErrors((prevState) => ({
        ...prevState,
        firstName: textError,
      }));
      if (textError) return;
    }
    if (!values.lastName) {
      const textError = validateText(values?.lastName);
      setErrors((prevState) => ({
        ...prevState,
        lastName: textError,
      }));
    }
    if (values.lastName) {
      const textError = validateLength(values?.lastName);
      setErrors((prevState) => ({
        ...prevState,
        lastName: textError,
      }));
      if (textError) return;
    }
    if (values.lastName) {
      const textError = validateOnlySpace(values?.lastName);
      setErrors((prevState) => ({
        ...prevState,
        lastName: textError,
      }));
      if (textError) return;
    }
    if (!values.userName) {
      const textError = validateText(values.userName);
      setErrors((prevState) => ({
        ...prevState,
        userName: textError,
      }));
    }
    if (values.userName) {
      const textError = validateLength(values?.userName);
      setErrors((prevState) => ({
        ...prevState,
        userName: textError,
      }));
      if (textError) return;
    }
    if (values.userName) {
      const textError = validateOnlySpace(values?.userName);
      setErrors((prevState) => ({
        ...prevState,
        userName: textError,
      }));
      if (textError) return;
    }
    if (!selectedOption) {
      toast.error(labels.selectroleplease);
    }
    if (
      values.email &&
      validateEmailAddress(values.email) === null &&
      values.firstName &&
      values.lastName &&
      values.userName &&
      selectedOption
    ) {
      if (Boolean(checkInternetConnection())) {
        const params = {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          role: selectedOption.title.toLocaleLowerCase(),
        };
        setLoader(true);
        dispatch(
          addUser(params, async () => {
            setLoader(false);
            setShowAddUserModal(false);
            handleGetUsers();
            setValues({
              email: "",
              lastName: "",
              userName: "",
              firstName: "",
            });
          })
        );
      }
    }
  }, [values, selectedOption, setErrors, dispatch]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropDown(false);
  };
  // const clientOptions = (inputValue = "", callback = () => {}) => {
  //   setTimeout(() => {
  //     getUserTypeApiMethod(
  //       (res) => {
  //         callback(
  //           res?.data?.map((item) => {
  //             return {
  //               ...item,
  //               label: item?.fullName,
  //               id: item?.id,
  //             };
  //           })
  //         );
  //       },
  //       { role: "client", search: inputValue }
  //     );
  //   }, 1000);
  // };
  // const membersOptions = (inputValue = "", callback = () => {}) => {
  //   setTimeout(() => {
  //     getUserTypeApiMethod(
  //       (res) => {
  //         // setProjectValues((prev) => ({ ...prev, members: res?.data }));
  //         callback(
  //           res?.data?.map((item) => {
  //             return {
  //               ...item,
  //               label: item?.fullName,
  //               id: item?.id,
  //             };
  //           })
  //         );
  //       },
  //       { role: "user", search: inputValue }
  //     );
  //   }, 1000);
  // };
  const addProjectFunc = useCallback(async () => {
    if (!projectvalues.projectName) {
      const textError = validateText(values.projectName);
      setProjectError((prevState) => ({
        ...prevState,
        projectName: textError,
      }));
    }
    if (!projectvalues.description) {
      const textError = validateText(values.description);
      setProjectError((prevState) => ({
        ...prevState,
        description: textError,
      }));
    }
    if (!projectvalues.startDate) {
      const textError = validateText(values.startDate);
      setProjectError((prevState) => ({
        ...prevState,
        startDate: textError,
      }));
    }
    if (!projectvalues.dueDate) {
      const textError = validateText(values.dueDate);
      setProjectError((prevState) => ({
        ...prevState,
        dueDate: textError,
      }));
    }
    if (!projectvalues.clientName?.length) {
      const textError = validateText(values.clientName?.length);
      setProjectError((prevState) => ({
        ...prevState,
        clientName: textError,
      }));
    }
    // if (!projectvalues.members?.id) {
    //   const textError = validateText(projectvalues.members?.id);
    //   setProjectError((prevState) => ({
    //     ...prevState,
    //     members: textError,
    //   }));
    // }
    if (!projectvalues.status?.id) {
      const textError = validateText(projectvalues.status?.id);
      setProjectError((prevState) => ({
        ...prevState,
        status: textError,
      }));
    }
    if (projectvalues?.dueDate < projectvalues?.startDate) {
      return toast.error(labels.dateError);
    }
    if (
      projectvalues.projectName &&
      projectvalues.description &&
      projectvalues.startDate &&
      projectvalues.dueDate &&
      projectvalues.clientName &&
      // projectvalues.members &&
      projectvalues.status?.id
    ) {
      if (Boolean(checkInternetConnection())) {
        const payload = {
          name: projectvalues?.projectName,
          description: projectvalues?.description,
          startDate: projectvalues?.startDate,
          dueDate: projectvalues?.dueDate,
          clientIds: projectvalues?.clientName?.map((item) => item?.value),
          contributorIds: projectvalues?.contributor?.map(
            (item) => item?.value
          ),
          // projectMembers: projectvalues.members?.map((item) => item?.value),
          projectOwner: projectvalues?.members?.label,
          status: projectvalues?.status?.id,
        };
        setLoader(true);
        // return
        dispatch(
          addProjectApiMethod(payload, () => {
            setLoader(false);
            handleProject();
            dispatch(getUserRelatedProjectMethod());
            setShowAddProjectModal(false);
            setProjectError({});
            setProjectValues({
              projectName: "",
              startDate: "",
              dueDate: "",
              clientName: [],
              members: "",
              description: "",
              contributor: [],
              status: [],
            });
          })
        );
      }
    }
  }, [projectvalues, dispatch, setProjectError]);

  return (
    <React.Fragment>
      <div className={"my-8"}>
        <div
          className={`${
            window.location.pathname === "/notification" ? "py-6 px-4" : ""
          } flex items-center justify-between`}
        >
          <div
            className={`flex items-center gap-x-4 md:text-2xl text-xl ${
              (tab === "ChangePassword" || tab === "ChangeEmail") &&
              "md:my-[2.1rem] py-1.5 md:py-0"
            }`}
          >
            {window.location.pathname === "/notification" ? (
              <BackArrow
                width={32}
                height={32}
                stroke={"#fff"}
                className={`cursor-pointer`}
                onClick={() => navigate(-1)}
              />
            ) : null}
            {window.location.pathname === "/project" ? (
              <FolderIcon
                color="#BF642B"
                fill={
                  window.location.pathname === "/project"
                    ? "#BF642B30"
                    : "#00000030"
                }
                width={24}
                height={24}
              />
            ) : window.location.pathname === "/notification" ? (
              <NotificationIcon color="#BF642B" width={24} height={24} />
            ) : window.location.pathname === "/user" ? (
              <UserIcon color="#BF642B" width={24} height={24} />
            ) : window.location.pathname === "/profile" || "/project/:id" ? (
              <BackArrow
                width={32}
                height={32}
                stroke={"#fff"}
                onClick={() => navigate(-1)}
                className={"cursor-pointer"}
              />
            ) : null}
            {title}
            {window.location.pathname === "/notification" &&
              (!loadingNotification ? (
                <span className="text-c_fff md:text-[22px] text-[18px]">
                  {`( ${kFormatter(
                    notificationCount || allNotificationCount
                  )} )`}
                </span>
              ) : null)}
          </div>
          {user?.role === "user" &&
          window.location.pathname === "/user" ? null : (window.location
              .pathname === "/project" && ["client","contributor"].includes(user?.role)) ||
            (user?.socialType === "google" &&
              window.location.pathname === "/user") ? null : (
            <Button
              onClick={() => {
                window.location.pathname === "/user"
                  ? setShowAddUserModal(true)
                  : window.location.pathname === "/project"
                  ? setShowAddProjectModal(true)
                  : window.location.pathname === "/profile"
                  ? handleUpdateUser()
                  : setShowAddUserModal(false);
              }}
              loading={
                window.location.pathname === "/profile" ? loading : false
              }
              className={`${
                window.location.pathname === "/notification"
                  ? "hidden"
                  : "block"
              } ${
                (tab === "ChangePassword" || tab === "ChangeEmail") && "hidden"
              } flex items-center gap-x-2 text-c_fff text-sm md:text-base capitalize bg-c_BF642B border-0 py-1.5 px-3 md:px-6 my-8 rounded`}
              label={btnLabel}
              icon={window.location.pathname === "/profile" ? null : plusIcon}
            ></Button>
          )}
        </div>
      </div>

      {/* add user modal */}
      {showAddUserModal && (
        <div className="relative">
          <div className="fixed inset-0 bg-c_000/50 md:bg-opacity-75 bg-opacity-100 transition-opacity"></div>
          <div className={"fixed inset-0 overflow-hidden z-[99]"}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex min-h-screen flex-col overflow-y-hidden bg-c_272727 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-lg font-thin leading-6 text-c_fff"
                        id="slide-over-title"
                      >
                        {labels.addNewUser}
                      </h2>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* content */}
                      <div className="flex flex-col">
                        <div className="">
                          <div className="grid grid-cols-2 gap-x-4">
                            <div className="relative col-span-1">
                              <Input
                                placeholder={labels.firstName}
                                type="text"
                                value={values.firstName}
                                id="firstName"
                                name="firstName"
                                onChange={(e) => {
                                  setErrors((prevState) => ({
                                    ...prevState,
                                    firstName: null,
                                  }));
                                  setValues((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value,
                                  }));
                                }}
                                error={errors.firstName}
                                errorText={errors.firstName}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                            <div className="relative col-span-1">
                              <Input
                                placeholder={labels.lastName}
                                type="text"
                                id="lastName"
                                value={values.lastName}
                                name="lastName"
                                onChange={(e) => {
                                  setErrors((prevState) => ({
                                    ...prevState,
                                    lastName: null,
                                  }));
                                  setValues((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value,
                                  }));
                                }}
                                error={errors.lastName}
                                errorText={errors.lastName}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                          </div>
                          <Input
                            placeholder={labels.userName}
                            type="userName"
                            id="userName"
                            value={values.userName}
                            name="userName"
                            onChange={(e) => {
                              setErrors((prevState) => ({
                                ...prevState,
                                userName: null,
                              }));
                              setValues((prevState) => ({
                                ...prevState,
                                userName: e.target.value,
                              }));
                            }}
                            error={errors.userName}
                            errorText={errors.userName}
                            className="w-full bg-c_272727 mt-4 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <Input
                            placeholder={labels.email}
                            type="email"
                            id="email"
                            value={values.email}
                            name="email"
                            onChange={(e) => {
                              setErrors((prevState) => ({
                                ...prevState,
                                email: null,
                              }));
                              setValues((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }));
                            }}
                            error={errors.email}
                            errorText={errors.email}
                            className="w-full bg-c_272727 mt-4 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <div className="mt-4">
                            <div
                              onClick={() => {
                                setShowDropDown(!showDropDown);
                              }}
                              className="flex justify-between items-center gap-x-1.5 rounded-lg bg-c_272727 border border-c_595959 px-3.5 py-2 text-base text-c_B2B2B2 cursor-pointer"
                            >
                              <button type="button" id="menu-button">
                                {selectedOption
                                  ? selectedOption.title
                                  : labels.role}
                              </button>
                              <svg
                                className="-mr-1 h-5 w-5 text-c_595959"
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
                                className="relative mt-2 w-full text-c_fff  origin-top-right rounded-md border-b-[1px] border-r-[1px] border-l-[1px] border-c_fff/20 bg-c_272727 select-none"
                                role="menu"
                              >
                                <div className="py-1" role="none">
                                  {UserOptions?.map((option) => (
                                    <a
                                      key={option.id}
                                      className="text-c_fff block px-4 py-2 text-sm select-none cursor-pointer"
                                      role="menuitem"
                                      tabIndex="-1"
                                      onClick={() => handleOptionClick(option)}
                                      value={projectvalues.status}
                                      onChange={(e) => {
                                        setProjectValues((prevState) => ({
                                          ...prevState,
                                          status: e.target.value,
                                        }));
                                      }}
                                    >
                                      {option.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full absolute left-0 px-6 bottom-0 flex items-center justify-between">
                          <Button
                            onClick={() => {
                              setShowAddUserModal(false);
                              setErrors(() => ({
                                email: null,
                                lastName: null,
                                userName: null,
                                firstName: null,
                              }));
                              setSelectedOption(false);
                            }}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>
                          <Button
                            label={labels.sendInvite}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_BF642B border-0 py-1 px-4 rounded"
                            onClick={handleAddUser}
                            disabled={loader}
                          ></Button>
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
      )}
      {/* add user modal ends */}

      {/* add project modal */}
      {showAddProjectModal && (
        <div className="relative">
          <div className="fixed inset-0 bg-c_000/50 md:bg-opacity-75 bg-opacity-100 transition-opacity"></div>
          <div className="fixed inset-0 overflow-hidden z-[99]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex min-h-screen flex-col overflow-y-hidden bg-c_272727 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-lg font-thin leading-6 text-c_fff"
                        id="slide-over-title"
                      >
                        {labels.addNewProject}
                      </h2>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* content */}
                      <div className="">
                        <Input
                          placeholder={labels.projectName}
                          value={projectvalues.projectName}
                          type="text"
                          id="projectName"
                          name="projectName"
                          className="w-full bg-c_272727 mt-4 rounded-lg text-base outline-none border border-c_595959 text-c_595959 placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                          error={projectError.projectName}
                          errorText={projectError.projectName}
                        />
                        <div className="grid grid-cols-2 my-4 gap-x-4">
                          <div className="relative col-span-1">
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
                          <div className="relative col-span-1">
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
                          options={options}
                          className="basic-multi-select mt-2"
                          placeholder={labels.clientName}
                          styles={colourStyles}
                          value={projectvalues.clientName}
                          name="clientName"
                          onChange={(e) => {
                            setProjectError((prevState) => ({
                              ...prevState,
                              clientName: null,
                            }));
                            setProjectValues((prevState) => ({
                              ...prevState,
                              clientName: e,
                            }));
                          }}
                          error={projectError.clientName}
                          errorText={projectError.clientName}
                        />

                        <CustomSelect
                          isMulti
                          options={contributorOptions}
                          className="basic-multi-select mt-2"
                          placeholder={labels.contributor}
                          styles={colourStyles}
                          value={projectvalues.contributor}
                          name="contributor"
                          onChange={(e) => {
                            setProjectError((prevState) => ({
                              ...prevState,
                              contributor: null,
                            }));
                            setProjectValues((prevState) => ({
                              ...prevState,
                              contributor: e,
                            }));
                          }}
                        />

                        {/* <CustomAsyncSelect
                          className="basic-single text-white"
                          cacheOptions
                          loadOptions={clientOptions}
                          styles={colourStyles}
                          placeholder={labels.clientName}
                          value={projectvalues.clientName}
                          onChange={(e) => {
                            setProjectError((prevState) => ({
                              ...prevState,
                              clientName: null,
                            }));
                            setProjectValues((prevState) => ({
                              ...prevState,
                              clientName: e,
                            }));
                          }}
                          error={projectError.clientName}
                          errorText={projectError.clientName}
                        /> */}
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
                          error={projectError.members}
                          errorText={projectError.members}
                        />
                        {/* <CustomSelect
                          isMulti
                          options={options}
                          className="basic-multi-select mt-2"
                          placeholder={labels.addMembers}
                          styles={colourStyles}
                          value={projectvalues.members}
                          name="members"
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
                          error={projectError.members}
                          errorText={projectError.members}
                        />
                         */}
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

                        <div className="mt-4">
                          <CustomSelect
                            className="basic-select  border border-c_595959"
                            styles={colourStyles}
                            options={projectOptions}
                            value={projectvalues.status}
                            placeholder="Status"
                            onChange={(e) => {
                              setProjectError((prevState) => ({
                                ...prevState,
                                status: null,
                              }));
                              setProjectValues((prevState) => ({
                                ...prevState,
                                status: e,
                              }));
                            }}
                            error={projectError.status}
                            errorText={projectError.status}
                          />
                        </div>
                        <div className="w-full absolute left-0 px-6 bottom-0 flex items-center justify-between">
                          <Button
                            onClick={() => {
                              setShowAddProjectModal(false);
                            }}
                            className="flex items-center text-c_fff text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>

                          <Button
                            onClick={addProjectFunc}
                            disabled={
                              loader ||
                              projectError.projectName ||
                              projectError.startDate ||
                              projectError.dueDate ||
                              projectError.description ||
                              projectError.status
                            }
                            label={labels.create}
                            className="flex items-center text-c_fff text-base capitalize bg-c_BF642B border-0 py-1 px-4 rounded"
                          ></Button>
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
      )}

      {/* add project modal ends */}
    </React.Fragment>
  );
};

export default Header;
