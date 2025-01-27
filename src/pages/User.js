import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { labels } from "../configs/Labels";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { classNames } from "../utils/classNames";
import { TiTimes, TiTick } from "react-icons/ti";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  changeActive,
} from "../store/actions";
import Pagination from "../components/Pagination";
import NoSearchFound from "../components/NoSearchFound";
import ClipLoader from "react-spinners/ClipLoader";
import {
  validateEmailAddress,
  validateText,
  validateLength,
  validateOnlySpace,
  checkInternetConnection,
} from "../utils/validate";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import DeleteUserModal from "../components/DeleteUserModal";
import PasswordInput from "../components/PasswordInput";

const User = () => {
  const dispatch = useDispatch();
  const [usercount, setUserCount] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [updatedSelectedOption, setUpdatedSelectedOption] = useState(null);
  const [personId, setPersonId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const tickIcon = <TiTick />;
  const crossIcon = <TiTimes />;
  const [prevVal, setPrevVal] = useState({
    role: "",
  });

  const [tableFilter, setTableFilter] = useState({
    orderBy: null,
    columnName: null,
  });

  const [updatedValues, setUpdatedValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    newPassword: "",
  });
  const [updatedErrors, setUpdatedErrors] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    role: null,
  });

  const updatedUserOptions = [
    { id: 1, title: "User" },
    { id: 2, title: "Client" },
    { id: 3, title: "Contributor" },
  ];

  useEffect(() => {
    handleGetUsers(tableFilter?.orderBy, tableFilter?.columnName);
  }, [page, tableFilter]);

  const handleGetUsers = (keyValue = null, key = null) => {
    setLoading(true);
    getAllUsers(
      (res) => {
        setLoading(false);
        setUsers(res?.user);
        setUserCount(res?.totalUsers);
      },
      { page, ...(keyValue ? { keyValue, key } : {}) }
    );
  };

  useEffect(() => {
    if (selectedUser) {
      setUpdatedValues((prev) => ({
        ...prev,
        firstName: `${
          selectedUser?.fullName.split(" ")[0]
            ? selectedUser?.fullName.split(" ")[0]
            : ""
        }`,
        lastName: `${
          selectedUser?.fullName.split(" ")[1]
            ? selectedUser?.fullName.split(" ")[1]
            : ""
        }`,
        userName: `${selectedUser?.userName || ""}`,
        role: `${selectedUser?.role}`,
        email: `${selectedUser?.email}`,
      }));
    }
  }, [selectedUser]);

  useEffect(() => {
    setLoading(true);
    const getUserData = setTimeout(() => {
      getAllUsers(
        (res) => {
          setLoading(false);
          setUsers(res?.user);
          setUserCount(res?.totalUsers);
        },
        { page: 1, search }
      );
    }, 1000);
    return () => clearTimeout(getUserData);
  }, [search]);

  const handleOptionClick = (option) => {
    setUpdatedSelectedOption(option);
    setShowDropDown(false);
  };

  const handleEditUserCheck = useCallback(
    async (id) => {
      if (!updatedValues.email && selectedUser?.email) {
        const textError = validateText(
          updatedValues?.email || selectedUser?.email
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          email: textError,
        }));
      }
      if (updatedValues?.email || selectedUser?.email) {
        const emailError = validateEmailAddress(
          updatedValues?.email || selectedUser?.email
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          email: emailError,
        }));
        if (emailError) return;
      }
      if (!updatedValues?.firstName && selectedUser?.fullName) {
        const textError = validateText(
          updatedValues?.firstName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          firstName: textError,
        }));
      }
      if (updatedValues?.firstName || selectedUser?.fullName) {
        const textError = validateLength(
          updatedValues?.firstName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          firstName: textError,
        }));
        if (textError) return;
      }
      if (updatedValues?.firstName || selectedUser?.fullName) {
        const textError = validateOnlySpace(
          updatedValues?.firstName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          firstName: textError,
        }));
        if (textError) return;
      }
      if (!updatedValues?.lastName && selectedUser?.fullName) {
        const textError = validateText(
          updatedValues?.lastName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          lastName: textError,
        }));
      }
      if (updatedValues?.lastName || selectedUser?.fullName) {
        const textError = validateLength(
          updatedValues?.lastName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          lastName: textError,
        }));
        if (textError) return;
      }
      if (updatedValues?.lastName || selectedUser?.fullName) {
        const textError = validateOnlySpace(
          updatedValues?.lastName || selectedUser?.fullName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          lastName: textError,
        }));
        if (textError) return;
      }
      if (!updatedValues?.userName && selectedUser?.userName) {
        const textError = validateText(
          updatedValues.userName || selectedUser?.userName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
      }
      if (updatedValues?.userName || selectedUser?.userName) {
        const textError = validateLength(
          updatedValues?.userName || selectedUser?.userName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
        if (textError) return;
      }
      if (updatedValues?.userName || selectedUser?.userName) {
        const textError = validateOnlySpace(
          updatedValues?.userName || selectedUser?.userName
        );
        setUpdatedErrors((prevState) => ({
          ...prevState,
          userName: textError,
        }));
        if (textError) return;
      }
      if (!updatedSelectedOption && !selectedUser?.role) {
        toast.error(labels.selectdifferentrole);
      }
      if (
        (updatedValues?.email || selectedUser?.email) &&
        validateEmailAddress(updatedValues?.email) === null &&
        (updatedValues?.firstName || selectedUser?.fullName) &&
        (updatedValues?.lastName || selectedUser?.fullName) &&
        (updatedValues?.userName || selectedUser?.userName) &&
        (updatedSelectedOption || selectedUser?.role)
      ) {
        setLoading(true);
        if (Boolean(checkInternetConnection())) {
          const params = {
            ...(updatedValues.newPassword
              ? {
                  password: updatedValues.newPassword,
                  firstName:
                    updatedValues?.firstName ||
                    selectedUser?.fullName.split(" ")[0],
                  lastName:
                    updatedValues?.lastName ||
                    selectedUser?.fullName.split(" ")[1],
                  userName: updatedValues?.userName || selectedUser?.userName,
                  email: updatedValues?.email || selectedUser?.email,
                  role:
                    updatedSelectedOption?.title?.toLocaleLowerCase() ||
                    selectedUser?.role,
                  id,
                }
              : {
                  firstName:
                    updatedValues?.firstName ||
                    selectedUser?.fullName.split(" ")[0],
                  lastName:
                    updatedValues?.lastName ||
                    selectedUser?.fullName.split(" ")[1],
                  userName: updatedValues?.userName || selectedUser?.userName,
                  email: updatedValues?.email || selectedUser?.email,
                  role:
                    updatedSelectedOption?.title?.toLocaleLowerCase() ||
                    selectedUser?.role,
                  id,
                }),
          };

          dispatch(
            updateUser(
              params,
              async () => {
                setShowModal(false);
                await handleGetUsers(
                  tableFilter?.orderBy,
                  tableFilter?.columnName
                );
                await setLoading(false);
              },
              setLoading
            )
          );
        }
      }
    },
    [updatedValues, updatedSelectedOption, setUpdatedErrors, dispatch]
  );

  const handleEditUser = (id) => {
    setShowModal(true);
    setPersonId(id);
  };

  const handleChangeActiveAccepted = useCallback(
    (personId) => {
      setLoading(true);
      changeActive(personId, { isActive: true }, () => {
        handleGetUsers();
      });
      setLoading(false);
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <div className="bg-c_101010 text-c_fff min-h-screen px-5">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Header
              title={`${labels.user}s`}
              btnLabel={labels.newUser}
              handleGetUsers={handleGetUsers}
            />
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            {search && users?.length <= 0 ? (
              <NoSearchFound entity={labels.users} />
            ) : (
              <>
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
                            className="py-3.5 pl-4 pr-4 text-left text-sm uppercase text-white sm:pl-0"
                          >
                            <div className="flex items-center gap-x-4 pl-4">
                              <div className="font-normal text-c_fff/60">
                                {labels.name}
                              </div>

                              <div className="flex flex-col items-center cursor-pointer">
                                <AiFillCaretUp
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "ASC",
                                      columnName: "fullName",
                                    });
                                  }}
                                />
                                <AiFillCaretDown
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "DESC",
                                      columnName: "fullName",
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
                          >
                            <div className="flex items-center gap-x-4">
                              <div className="font-normal text-c_fff/60">
                                {labels.user}
                              </div>

                              <div className="flex flex-col items-center cursor-pointer">
                                <AiFillCaretUp
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "ASC",
                                      columnName: "userName",
                                    });
                                  }}
                                />
                                <AiFillCaretDown
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "DESC",
                                      columnName: "userName",
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
                          >
                            <div className="flex items-center gap-x-4">
                              <div className="font-normal text-c_fff/60">
                                {labels.email}
                              </div>

                              <div className="flex flex-col items-center cursor-pointer">
                                <AiFillCaretUp
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "ASC",
                                      columnName: "email",
                                    });
                                  }}
                                />
                                <AiFillCaretDown
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "DESC",
                                      columnName: "email",
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                          {user?.role === "admin" && (
                            <th
                              scope="col"
                              className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
                            >
                              <div className="flex items-center gap-x-4">
                                <div className="font-normal text-c_fff/60">
                                  {labels.status}
                                </div>

                                {/* <div className="flex flex-col items-center cursor-pointer">
                                <AiFillCaretUp
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "ASC",
                                      columnName: "email",
                                    });
                                  }}
                                />
                                <AiFillCaretDown
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "DESC",
                                      columnName: "email",
                                    });
                                  }}
                                />
                              </div> */}
                              </div>
                            </th>
                          )}
                          <th
                            scope="col"
                            className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                          >
                            <div className="flex items-center gap-x-4">
                              <div className="font-normal text-c_fff/60">
                                {labels.role}
                              </div>

                              <div className="flex flex-col items-center cursor-pointer">
                                <AiFillCaretUp
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "ASC",
                                      columnName: "role",
                                    });
                                  }}
                                />
                                <AiFillCaretDown
                                  className="text-[10px]"
                                  onClick={() => {
                                    setTableFilter({
                                      orderBy: "DESC",
                                      columnName: "role",
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                          {user?.role === "user" ||
                          user?.socialType === "google" ? null : (
                            <th
                              scope="col"
                              className="px-3 md:px-0 py-3.5 text-left text-sm uppercase text-white"
                            >
                              <div className="flex items-center gap-x-4">
                                <div className="font-normal text-c_fff/60">
                                  {labels.actions}
                                </div>

                                {/* <div className="flex flex-col items-center">
                              <AiFillCaretUp className="text-[10px]" />
                              <AiFillCaretDown className="text-[10px]" />
                            </div> */}
                              </div>
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {users?.map((person) => (
                          <React.Fragment>
                            <tr
                              className="odd:bg-c_1C1C1C !rounded-md"
                              key={person?.id}
                            >
                              <td className="px-4 py-4 text-sm text-c_fff !rounded-tl-md !rounded-bl-md">
                                {person?.fullName}
                              </td>
                              <td className="px-3 py-4 text-sm text-c_fff">
                                {person?.userName}
                              </td>
                              <td className="px-3 py-4 text-sm text-c_fff">
                                {person?.email}
                              </td>
                              {user?.role === "admin" && (
                                <td className="px-3 py-4 text-sm text-c_fff">
                                  <div className="flex items-center justify-start">
                                    {person?.isActive ? (
                                      <Button
                                        label={"Accepted"}
                                        className={`cursor-default text-c_0AA81A py-1 rounded-[8px] text-sm font-normal capitaliz`}
                                      />
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          handleChangeActiveAccepted(person?.id)
                                        }
                                        icon={tickIcon}
                                        className={`bg-c_2C2C2C text-c_0AA81A px-4 py-1 rounded-[8px] text-[20px] font-normal capitaliz`}
                                      />
                                    )}
                                  </div>
                                </td>
                              )}
                              <td className="px-3 md:px-0 text-sm">
                                <p
                                  className={classNames(
                                    person?.role === "user"
                                      ? "px-2 py-1 bg-c_BF642B/20 w-fit text-c_BF642B rounded-sm capitalize"
                                      : person?.role === "contributor"
                                      ? "px-2 py-1 bg-c_5792EF/20 w-fit text-c_5792EF rounded-sm capitalize"
                                      : "px-2 py-1 bg-c_0AA81A/20 w-fit text-c_0AA81A rounded-sm capitalize"
                                  )}
                                >
                                  {person.role}
                                </p>
                              </td>
                              {user?.role === "user" ||
                              user?.socialType === "google" ? null : (
                                <td className="px-3 md:px-0 text-sm !rounded-tr-md !rounded-br-md">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      onClick={() => {
                                        setSelectedUser(person);
                                        handleEditUser(person?.id);
                                      }}
                                      src="/images/editIcon.svg"
                                      alt="editIcon"
                                      className="w-6 h-6 cursor-pointer text-c_fff"
                                    />
                                    <img
                                      onClick={() => {
                                        setOpen(true);
                                        setUserId(person?.id);
                                      }}
                                      src="/images/deleteIcon.svg"
                                      alt="deleteIcon"
                                      className="w-6 h-6 cursor-pointer text-c_fff/10"
                                    />
                                  </div>
                                </td>
                              )}
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <Pagination
                  pageCount={Math.ceil(usercount) / 10}
                  onPageChange={(event) => {
                    setPage(event?.selected + 1);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* user edit modal starts */}

      {showModal && (
        <div className="relative">
          <div className="fixed inset-0 bg-c_000/50 bg-opacity-75 transition-opacity"></div>
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
                        {labels.editUser}
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
                                value={updatedValues?.firstName}
                                id="firstName"
                                name="firstName"
                                onChange={(e) => {
                                  setUpdatedErrors((prevState) => ({
                                    ...prevState,
                                    firstName: null,
                                  }));
                                  setUpdatedValues((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value,
                                  }));
                                }}
                                error={updatedErrors.firstName}
                                errorText={updatedErrors.firstName}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                            <div className="relative col-span-1">
                              <Input
                                placeholder={labels.lastName}
                                type="text"
                                id="lastName"
                                value={updatedValues?.lastName}
                                name="lastName"
                                onChange={(e) => {
                                  setUpdatedErrors((prevState) => ({
                                    ...prevState,
                                    lastName: null,
                                  }));
                                  setUpdatedValues((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value,
                                  }));
                                }}
                                error={updatedErrors.lastName}
                                errorText={updatedErrors.lastName}
                                className="w-full bg-c_272727 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              />
                            </div>
                          </div>
                          <Input
                            placeholder={labels.userName}
                            type="userName"
                            id="userName"
                            value={updatedValues?.userName}
                            name="userName"
                            onChange={(e) => {
                              setUpdatedErrors((prevState) => ({
                                ...prevState,
                                userName: null,
                              }));
                              setUpdatedValues((prevState) => ({
                                ...prevState,
                                userName: e.target.value,
                              }));
                            }}
                            error={updatedErrors.userName}
                            errorText={updatedErrors.userName}
                            className="w-full bg-c_272727 mt-4 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <Input
                            placeholder={labels.email}
                            type="email"
                            value={updatedValues?.email}
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setUpdatedErrors((prevState) => ({
                                ...prevState,
                                email: null,
                              }));
                              setUpdatedValues((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }));
                            }}
                            error={updatedErrors.email}
                            errorText={updatedErrors.email}
                            className="w-full bg-c_272727 mt-4 rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />

                          {selectedUser?.role === "admin" ? null : (
                            <div className="mt-4">
                              <div
                                onClick={() => {
                                  setShowDropDown(!showDropDown);
                                }}
                                className="flex justify-between items-center gap-x-1.5 rounded-lg bg-c_272727 border border-c_595959 px-3.5 py-2 text-base text-c_B2B2B2 cursor-pointer"
                              >
                                <button
                                  type="button"
                                  id="menu-button"
                                  className="capitalize"
                                >
                                  {updatedSelectedOption?.title ||
                                    selectedUser?.role}
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
                                  className="relative mt-2 w-full origin-top-right rounded-md border-b-[1px] border-r-[1px] border-l-[1px] border-c_fff/20 bg-c_272727 select-none"
                                  role="menu"
                                >
                                  <div className="py-1" role="none">
                                    {updatedUserOptions?.map((option) => (
                                      <a
                                        key={option?.id}
                                        className="text-c_fff block px-4 py-2 text-sm select-none cursor-pointer"
                                        role="menuitem"
                                        tabIndex="-1"
                                        onClick={() =>
                                          handleOptionClick(option)
                                        }
                                        value={
                                          updatedUserOptions?.title ||
                                          prevVal?.role
                                        }
                                        onChange={(e) => {
                                          setUpdatedValues((prevState) => ({
                                            ...prevState,
                                            role: e.target.value,
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
                          )}
                          <div className="relative pt-3">
                            <PasswordInput
                              placeholder={labels.newPassword}
                              id="newPassword"
                              value={updatedValues?.newPassword}
                              name="newPassword"
                              onChange={(e) => {
                                setUpdatedValues((prevState) => ({
                                  ...prevState,
                                  newPassword: e.target.value,
                                }));
                              }}
                              className="w-full bg-c_272727  rounded-lg text-base outline-none border border-c_595959 text-white placeholder:text-c_B2B2B2 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>

                        <div className="w-full absolute left-0 px-6 bottom-0 flex items-center justify-between">
                          <Button
                            onClick={() => {
                              setUpdatedErrors(() => ({
                                email: null,
                                lastName: null,
                                userName: null,
                                firstName: null,
                              }));
                              setShowModal(false);
                            }}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_272727 border border-c_595959 py-1 px-3 rounded"
                            label={labels.cancel}
                          ></Button>
                          <Button
                            label={labels.updateUser}
                            className="flex items-center gap-x-2 text-white text-base capitalize bg-c_BF642B border-0 py-1 px-4 rounded"
                            onClick={() => handleEditUserCheck(personId)}
                            disabled={loading}
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
      {/* user edit modal ends */}
      <DeleteUserModal
        open={open}
        setOpen={() => setOpen(!open)}
        handleGetUsers={handleGetUsers}
        setSearch={setSearch}
        userId={userId}
      />
    </React.Fragment>
  );
};

export default User;
