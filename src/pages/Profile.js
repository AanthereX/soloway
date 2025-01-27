import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import { labels } from "../configs/Labels";
import ChangePassword from "../components/ChangePassword";
import { getSingleUser, updatedData } from "../store/actions";
import { updateUserDetails } from "../store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import { useNavigate } from "react-router";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import { checkInternetConnection } from "../utils/validate";
import ChangeEmail from "../components/ChangeEmail";

const Profile = () => {
  const [tab, setTab] = useState("Profile");
  const [userDetails, setUserDetails] = useState([]);
  const [userSettingDetail, setUserSettingDetail] = useState([]);
  const [notificationCounter, setNotificationCounter] = useState("");
  const userImageRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fieldsEditable, setFieldsEditable] = useState(false);
  const [disableFields, setDisableFields] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const updatedDataFromEdit = useSelector(
    (state) => state.User?.sidebarUserDetails
  );
  useEffect(() => {
    getSingleUser(user?.id, (res) => {
      setUserDetails(res?.user);
      setUserSettingDetail(res?.user?.userDetail);
    });
  }, []);
  const [updatedProfileValues, setUpdatedProfileValues] = useState({
    userImage: "",
    userImageURL: "",
    fullName: "",
    userAddress: "",
    postalCode: "",
    stateName: "",
    email: "",
  });
  const [profileError, setProfileErrors] = useState({
    userImage: null,
    userImageURL: null,
    fullName: null,
    userAddress: null,
    postalCode: null,
    stateName: null,
  });

  const [updatedPreferences, setUpdatedPreferences] = useState({
    language: "",
    countryName: "",
    startOfWeek: "",
    hourFormat: "",
    dateFormat: "",
  });
  const [updatedPreferencesError, setPreferencesErrors] = useState({
    language: "",
    countryName: "",
    startOfWeek: "",
    hourFormat: "",
    dateFormat: "",
  });

  useEffect(() => {
    if (fieldsEditable) {
      setUpdatedProfileValues((prev) => ({
        ...prev,
        fullName: userDetails?.fullName,
      }));
    }
    if (fieldsEditable) {
      setUpdatedProfileValues((prev) => ({
        ...prev,
        userAddress: userSettingDetail[0]?.streetAddress,
      }));
    }
    if (fieldsEditable) {
      setUpdatedProfileValues((prev) => ({
        ...prev,
        postalCode: userSettingDetail[0]?.postalCode,
      }));
    }
    if (fieldsEditable) {
      setUpdatedProfileValues((prev) => ({
        ...prev,
        stateName: userSettingDetail[0]?.state,
      }));
    }
    if (fieldsEditable) {
      setUpdatedPreferences((prev) => ({
        ...prev,
        language: userSettingDetail[0]?.language,
      }));
    }
    if (fieldsEditable) {
      setUpdatedPreferences((prev) => ({
        ...prev,
        countryName: userSettingDetail[0]?.country,
      }));
    }
  }, [fieldsEditable, setUpdatedProfileValues]);

  const handleEditClick = () => {
    setFieldsEditable(!fieldsEditable);
    setDisableFields(!disableFields);
  };
  const handleUpdateUser = useCallback(async () => {
    if (
      updatedProfileValues?.fullName ||
      updatedProfileValues?.userImage ||
      updatedProfileValues?.stateName ||
      updatedProfileValues?.postalCode ||
      updatedProfileValues?.userAddress ||
      updatedPreferences?.language ||
      updatedPreferences?.countryName ||
      updatedPreferences?.startOfWeek ||
      updatedPreferences?.hourFormat ||
      updatedProfileValues?.dateFormat
    ) {
      const formData = new FormData();
      formData.append(
        "image",
        updatedProfileValues?.userImage || userDetails?.picture
      );
      formData.append(
        "fullName",
        updatedProfileValues?.fullName ||
          userDetails?.fullName ||
          (!userDetails?.fullName && "")
      );
      formData.append(
        "streetAddress",
        updatedProfileValues?.userAddress ||
          updatedDataFromEdit?.payload?.user?.userDetail[0]?.streetAddress ||
          (!updatedProfileValues?.userAddress && "")
      );
      formData.append(
        "postalCode",
        Number(updatedProfileValues?.postalCode) ||
          Number(
            updatedDataFromEdit?.payload?.user?.userDetail[0]?.postalCode
          ) ||
          (!updatedProfileValues?.postalCode && 0)
      );
      formData.append(
        "state",
        updatedProfileValues?.stateName ||
          updatedDataFromEdit?.payload?.user?.userDetail[0]?.state ||
          (!updatedProfileValues?.stateName && "")
      );
      formData.append(
        "startDay",
        updatedPreferences?.startOfWeek || userSettingDetail[0]?.startDay
      );
      formData.append(
        "hourFormat",
        Number(updatedPreferences?.hourFormat) ||
          Number(
            updatedDataFromEdit?.payload?.user?.userDetail[0]?.hourFormat
          ) ||
          (!updatedPreferences?.hourFormat && 24)
      );
      formData.append(
        "dateFormat",
        updatedPreferences?.dateFormat || userSettingDetail[0]?.dateFormat
      );
      formData.append(
        "language",
        updatedPreferences?.language ||
          userSettingDetail[0]?.language ||
          (!updatedPreferences?.language && "")
      );
      formData.append(
        "country",
        updatedPreferences?.countryName ||
          userSettingDetail[0]?.country ||
          (!updatedPreferences?.countryName && "")
      );
      if (Boolean(checkInternetConnection())) {
        dispatch(
          updateUserDetails(
            formData,
            setFieldsEditable,
            setDisableFields,
            (res) => {
              if (res) {
                localStorage.setItem(
                  "detail",
                  JSON.stringify(res?.data?.data?.detail)
                );
                getSingleUser(user?.id, (res) => {
                  dispatch(updatedData(res));
                });
              }
            }
          )
        );
      }
    }
  }, [
    updateUserDetails,
    updatedProfileValues,
    updatedPreferences,
    userDetails,
    updatedData,
    getSingleUser,
    dispatch,
  ]);

  return (
    <React.Fragment>
      <div className="bg-c_101010 text-c_fff min-h-screen px-5">
        <div className="flex flex-col">
          <Header
            title={`${labels.setting}s`}
            btnLabel={labels.saveChanges}
            editBtn={labels.edit}
            handleUpdateUser={handleUpdateUser}
            tab={tab}
          />

          {/* tabination for profile page containing three tabs starts here */}

          <div className="md:grid md:grid-cols-5 bg-transparent text-c_fff">
            <div className="md:col-span-5 md:gap-x-6 md:flex md:items-center justify-start col-span-5 flex overflow-auto scrollbar-hide">
              <button
                className={`pb-2 ${
                  tab === "Profile"
                    ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                    : "text-c_fff/40"
                } `}
                onClick={() => setTab("Profile")}
              >
                <p className="w-fit text-base px-4">{labels.profile}</p>
              </button>
              <button
                className={`pb-2 ${
                  tab === "Preferences"
                    ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                    : "text-c_fff/40"
                } }`}
                onClick={() => setTab("Preferences")}
              >
                <p className="w-fit text-base px-4">{labels.preferences}</p>
              </button>
              {user?.socialType === "google" ? null : (
                <>
                  <button
                    className={`pb-2 ${
                      tab === "ChangePassword"
                        ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                        : "text-c_fff/40"
                    } }`}
                    onClick={() => setTab("ChangePassword")}
                  >
                    <p className="w-fit text-base px-4">
                      {labels.changePassword}
                    </p>
                  </button>
                  <button
                    className={`pb-2 ${
                      tab === "ChangeEmail"
                        ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                        : "text-c_fff/40"
                    } }`}
                    onClick={() => setTab("ChangeEmail")}
                  >
                    <p className="w-fit text-base px-4">{labels.changeEmail}</p>
                  </button>
                </>
              )}
            </div>
            <div className="col-span-5">
              {tab === "Profile" ? (
                <div className="grid grid-cols-6 gap-y-4 py-8">
                  <div className="col-span-6 rounded-md py-4 px-5 bg-c_1F1F1F">
                    <div className="relative flex items-center justify-between pb-2">
                      <p>{labels.personalInfo}</p>
                      <button
                        className={`flex items-center justify-between gap-x-1 text-c_fff/70 bg-c_1F1F1F ${
                          fieldsEditable
                            ? "border border-c_BF642B/50"
                            : "border border-c_fff/10"
                        } rounded-md py-1 px-4`}
                        onClick={handleEditClick}
                      >
                        <img
                          src="/images/editIcon.svg"
                          alt="editIcon"
                          className="h-5 w-5"
                        />
                        {labels.edit}
                      </button>
                    </div>
                    <div className="grid grid-cols-7 my-3.5">
                      <div className="relative bg-transparent md:col-span-1 col-span-7">
                        <div className="flex flex-col md:items-center md:justify-center">
                          <img
                            className={`h-10 w-10 object-cover rounded-full ${
                              isHovered ? "opacity-[.7]" : "opacity-1"
                            }`}
                            src={`${
                              updatedProfileValues?.userImageURL ||
                              userDetails?.picture ||
                              defaultAvatar
                            }`}
                            alt="userImage"
                          />
                          <h1 className="text-sm text-c_fff/60 mt-3 capitalize">
                            {updatedDataFromEdit?.payload?.user?.fullName
                              ?.length > 20
                              ? updatedDataFromEdit?.payload?.user?.fullName?.substring(
                                  0,
                                  20
                                ) + "..."
                              : updatedDataFromEdit?.payload?.user?.fullName}
                          </h1>
                          <h1 className="text-xs text-c_fff/30 mt-1 capitalize">
                            {userDetails?.role}
                          </h1>
                        </div>
                        {fieldsEditable && user?.socialType !== "google" ? (
                          <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="absolute bg-transparent w-10 h-10 rounded-full right-1/2 top-0 translate-x-1/2"
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className={`h-4 w-4 my-3 mx-3 hidden ${
                                isHovered ? "md:block" : "hidden"
                              }`}
                            />
                            <Input
                              accept="image/*"
                              type="file"
                              ref={userImageRef}
                              onChange={(e) => {
                                if (e?.target?.files[0]) {
                                  setUpdatedProfileValues((prev) => ({
                                    ...prev,
                                    userImage: e.target?.files[0],
                                    userImageURL: URL.createObjectURL(
                                      e.target?.files[0]
                                    ),
                                  }));
                                }
                              }}
                              className="absolute opacity-0 z-99 w-12 h-12 rounded-full right-1/2 top-0 translate-x-1/2"
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-y-4 md:col-span-3 col-span-7 mt-4 md:mt-0 md:pl-4">
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            type="text"
                            disabled={disableFields}
                            placeholder={labels.updateFullName}
                            value={
                              disableFields
                                ? updatedDataFromEdit?.payload?.user?.fullName
                                : updatedProfileValues?.fullName
                            }
                            onChange={(e) => {
                              setUpdatedProfileValues((prevState) => ({
                                ...prevState,
                                fullName: e.target.value,
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] md:text-base text-sm outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 placeholder:text-sm md:placeholder:text-base md:py-2 py-1 md:px-3 md:pl-3 md:pr-8 pl-3 pr-8 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-3 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            disabled={true}
                            type="text"
                            value={userDetails?.role}
                            className="w-full bg-transparent rounded-[6px] md:text-base text-sm outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 placeholder:text-sm md:placeholder:text-base md:py-2 py-1 md:px-3 md:pl-3 md:pr-8 pl-3 pr-8 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-4 md:col-span-3 col-span-7 mt-4 md:mt-0 md:pl-4">
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={labels.yourEmail}
                            value={userDetails?.email}
                            className="w-full bg-transparent rounded-[6px] md:text-base text-sm outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 placeholder:text-sm md:placeholder:text-base md:py-2 py-1 md:px-3 md:pl-3 md:pr-8 pl-3 pr-8 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 rounded-md py-4 px-5 bg-c_1F1F1F">
                    {labels.address}
                    <div className="grid grid-cols-4 my-3.5">
                      <div className="flex flex-col gap-y-4 md:col-span-2 col-span-4 mt-4 md:mt-0">
                        <div className="relative flex flex-col gap-y-4 col-span-2 md:pr-4">
                          <Input
                            disabled={disableFields}
                            placeholder={labels.updateYourAddress}
                            value={
                              disableFields
                                ? updatedDataFromEdit?.payload?.user
                                    ?.userDetail[0]?.streetAddress
                                : updatedProfileValues?.userAddress
                            }
                            onChange={(e) => {
                              setUpdatedProfileValues((prevState) => ({
                                ...prevState,
                                userAddress: e.target.value,
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-6 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                        <div className="relative flex flex-col gap-y-4 md:col-span-2 col-span-4 md:pr-4">
                          <Input
                            disabled={disableFields}
                            type="text"
                            placeholder={labels.updateYourPostal}
                            value={
                              (disableFields &&
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.postalCode) ||
                              (updatedDataFromEdit?.payload?.user?.userDetail[0]
                                ?.postalCode === 0 &&
                                "") ||
                              updatedProfileValues?.postalCode
                            }
                            onChange={(e) => {
                              setUpdatedProfileValues((prevState) => ({
                                ...prevState,
                                postalCode: e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                ),
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-6 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2 mt-4 md:mt-0">
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            type="text"
                            disabled={disableFields}
                            placeholder={labels.updateYourState}
                            value={
                              (disableFields &&
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.state) ||
                              updatedProfileValues?.stateName ||
                              ""
                            }
                            onChange={(e) => {
                              setUpdatedProfileValues((prevState) => ({
                                ...prevState,
                                stateName: e.target.value,
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-3 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tab === "Preferences" ? (
                <div className="grid grid-cols-6 gap-y-4 py-8">
                  <div className="col-span-6 rounded-md py-4 px-5 bg-c_1F1F1F">
                    <div className="relative flex items-center justify-between pb-2">
                      <p>{labels.language}</p>
                      <button
                        className={`flex items-center justify-between gap-x-1 text-c_fff/70 bg-c_1F1F1F ${
                          fieldsEditable
                            ? "border border-c_BF642B/50"
                            : "border border-c_fff/10"
                        } rounded-md py-1 px-4`}
                        onClick={handleEditClick}
                      >
                        <img
                          src="/images/editIcon.svg"
                          alt="editIcon"
                          className="h-5 w-5"
                        />
                        {labels.edit}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 my-3.5">
                      <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2 mb-4 md:pr-4">
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            disabled={disableFields}
                            type="text"
                            placeholder={"English"}
                            value={
                              disableFields
                                ? updatedDataFromEdit?.payload?.user
                                    ?.userDetail[0]?.language
                                : updatedPreferences?.language
                            }
                            onChange={(e) => {
                              setUpdatedPreferences((prevState) => ({
                                ...prevState,
                                language: e.target.value,
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-3 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-4 col-span-4 md:col-span-2">
                        <div className="relative flex flex-col gap-y-4 col-span-2">
                          <Input
                            disabled={disableFields}
                            type="text"
                            placeholder={labels.countryName}
                            value={
                              (disableFields &&
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.country) ||
                              updatedPreferences?.countryName ||
                              ""
                            }
                            onChange={(e) => {
                              setUpdatedPreferences((prevState) => ({
                                ...prevState,
                                countryName: e.target.value,
                              }));
                            }}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button
                            className={`${
                              fieldsEditable
                                ? "absolute right-3 md:right-3 top-[7px] gap-x-2"
                                : "hidden"
                            }`}
                          >
                            <img
                              src="/images/editIcon.svg"
                              alt="editIcon"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 rounded-md p-4 bg-c_1F1F1F">
                    {labels.region}
                    <div className="mt-4">
                      <p className="text-sm text-c_fff/60">
                        {labels.startOfWeek}
                      </p>
                      <div className="grid grid-cols-4 my-3.5">
                        <div className="relative flex flex-col gap-y-4 col-span-4 md:col-span-2 mb-4 md:mb-0 md:pr-4">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"Monday"}
                            value={"Monday"}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 !text-c_fff/30 placeholder:!text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 md:right-8 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="day"
                              value={"Monday"}
                              checked={
                                updatedPreferences?.startOfWeek === "Monday" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.startDay === "Monday"
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  startOfWeek: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                        <div className="relative flex flex-col gap-y-4 col-span-4 md:col-span-2">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"Sunday"}
                            value={"Sunday"}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 !text-c_fff/30 placeholder:!text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="day"
                              value="Sunday"
                              checked={
                                updatedPreferences?.startOfWeek === "Sunday" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.startDay === "Sunday"
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  startOfWeek: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-sm text-c_fff/60">
                        {labels.hourFormat}
                      </p>
                      <div className="grid grid-cols-4 md:mt-3.5 mt-3.5">
                        <div className="relative gap-y-4 col-span-4 md:col-span-2 md:pr-4 mb-4 md:mb-4">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"24 Hours"}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 md:right-8 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="hour"
                              value={"24"}
                              checked={
                                updatedPreferences?.hourFormat === "24" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.hourFormat === 24
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  hourFormat: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                        <div className="relative flex flex-col gap-y-4 col-span-4 md:col-span-2 mb-4 md:mb-0">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"12 Hours"}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="hour"
                              value={"12"}
                              checked={
                                updatedPreferences?.hourFormat === "12" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.hourFormat === 12
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  hourFormat: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-sm text-c_fff/60">
                        {labels.dateFormat}
                      </p>
                      <div className="grid grid-cols-12 my-3.5">
                        <div className="relative md:col-span-4 col-span-12 gap-y-4 md:pr-4 mb-4 md:mb-4">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"MM/DD/YYYY"}
                            className="w-full bg-transparent  rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 md:right-8 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="date"
                              value={"MM/DD/YYYY"}
                              checked={
                                updatedPreferences?.dateFormat ===
                                  "MM/DD/YYYY" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.dateFormat === "MM/DD/YYYY"
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  dateFormat: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                        <div className="relative md:col-span-4 col-span-12 gap-y-4 md:pr-4 mb-4 md:mb-4">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"DD/MM/YYYY"}
                            className="w-full bg-transparent rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 md:right-8 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="date"
                              value={"DD/MM/YYYY"}
                              checked={
                                updatedPreferences?.dateFormat ===
                                  "DD/MM/YYYY" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.dateFormat === "DD/MM/YYYY"
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  dateFormat: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                        <div className="relative md:col-span-4 col-span-12 gap-y-4 mb-4 md:mb-4">
                          <Input
                            disabled={true}
                            type="text"
                            placeholder={"YYYY/MM/DD"}
                            className="w-full bg-transparent  rounded-[6px] text-base outline-none border border-c_fff/30 text-c_fff/30 placeholder:text-c_fff/30 py-1 pr-20 pl-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                          <button className="absolute right-4 top-[11px] gap-x-2">
                            <Input
                              type="radio"
                              name="date"
                              value={"YYYY/MM/DD"}
                              checked={
                                updatedPreferences?.dateFormat ===
                                  "YYYY/MM/DD" ||
                                updatedDataFromEdit?.payload?.user
                                  ?.userDetail[0]?.dateFormat === "YYYY/MM/DD"
                              }
                              onChange={(e) => {
                                setUpdatedPreferences((prevState) => ({
                                  ...prevState,
                                  dateFormat: e.target.value,
                                }));
                              }}
                              className="w-4 h-4 !accent-c_BF642B"
                            />
                          </button>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tab === "ChangePassword" ? (
                <ChangePassword userDetail={userDetails} />
              ) : tab === "ChangeEmail" ? (
                <ChangeEmail userDetail={userDetails} />
              ) : null}
            </div>
          </div>

          {/* tabination for profile page containing three tabs ends here */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
