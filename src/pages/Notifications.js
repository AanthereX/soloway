import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { labels } from "../configs/Labels";
import { getNotifications, getAllNotifications } from "../store/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { FaExternalLinkAlt } from "react-icons/fa";
import Header from "../components/Header";
import { NotificationNotFound } from "../components/NotificationNotFound";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import moment from "moment";

const Notifications = () => {
  const [notification, setNotification] = useState([]);
  const [notificationAll, setNotificationAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [allNotificationCount, setAllNotificationCount] = useState("");
  const [notificationCount, setNotificationCount] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = JSON.parse(localStorage.getItem("user"))?.role;
  const user = JSON.parse(localStorage.getItem("user"));
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const hourFormat = JSON.parse(localStorage.getItem("detail"))?.hourFormat;
  // const [deviceType, setDeviceType] = useState(
  //   isMobile ? "Mobile" : isDesktop ? "Desktop" : "Tablet"
  // )
  useEffect(() => {
    if (
      ["user", "client", "contributor"].includes(userType) ||
      user?.socialType === "google"
    ) {
      handleGetNotification();
    }
  }, []);

  useEffect(() => {
    userType === "admin" && handleGetAllNotification();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    if (userType === "admin") {
      const getAllNotification = setTimeout(() => {
        getAllNotifications(
          (res) => {
            setLoading(false);
            setNotificationAll(res?.data);
            setAllNotificationCount(res?.totalNotification);
          },
          { page: 1 }
        );
      }, 1000);
      return () => clearTimeout(getAllNotification);
    }
  }, [userType]);

  const handleGetNotification = () => {
    setLoading(true);
    getNotifications((res) => {
      setLoading(false);
      setNotification(res?.data?.notification);
      setNotificationCount(res?.data?.total);
    });
  };
  const handleGetAllNotification = () => {
    setLoading(true);
    getAllNotifications(
      (res) => {
        setLoading(false);
        setNotificationAll(res?.data);
        setAllNotificationCount(res?.totalNotification);
      },
      { page }
    );
  };

  // function formatDate(createdAt) {
  //   const date = new Date(createdAt);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   let hours = date.getHours();
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const ampm = hours >= 12 ? "pm" : "am";
  //   if (hours > 12) {
  //     hours -= 12;
  //   }
  //   const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  //   return formattedDate;
  // }

  return (
    <Fragment>
      <div className="notification_container">
        {loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <ClipLoader className="spinner-css" color={"#BF642B"} />
          </div>
        ) : !loading &&
          notification?.length < 1 &&
          notificationAll?.length < 1 ? (
          <NotificationNotFound />
        ) : (
          <div className={`bg-c_101010 text-c_fff min-h-screen px-5`}>
            <Header
              title={labels.notifications}
              notificationCount={notificationCount}
              allNotificationCount={allNotificationCount}
              loadingNotification={loading}
            />
            {userType === "admin" ? (
              <div className="flex flex-col">
                {notificationAll?.map((item) => (
                  <div
                    key={item?.id}
                    className="container w-full flex flex-col mb-4"
                  >
                    <div className="grid grid-cols-12 bg-c_fff/5 text-c_000 rounded-lg px-2 py-1 mx-4">
                      <div className="col-span-12 md:col-span-8 py-2 md:py-0 p-6">
                        <div className="flex flex-col items-start justify-center py-2">
                          <p className="text-c_fff text-base md:text-xl generalSansMedium font-medium">
                            {item?.title}
                          </p>
                          <div className="my-1">
                            <p className="text-c_fff inline-flex items-center gap-x-10 text-xs break-words  w-full md:text-sm font-thin">
                              {item?.body}

                              <p className="flex md:flex-row flex-col items-center justify-start gap-x-2">
                                <span className="text-c_fff text-xs md:text-sm generalSansMedium font-thin">
                                  {labels.sendTo}
                                </span>
                                <div className="flex md:flex-row flex-col items-center justify-start md:gap-x-2 gap-y-4">
                                  {/* <img
                                      src={`${
                                        item?.user?.picture
                                          ? item?.user?.picture
                                          : defaultAvatar
                                      }`}
                                      alt="senderimage"
                                      className="h-8 w-8 rounded-full"
                                    /> */}
                                  <span className="text-c_BF642B text-xs md:text-sm rounded-full generalSansMedium font-medium">
                                    {`${
                                      (item?.user?.fullName).length > 29
                                        ? (item?.user?.fullName).slice(0, 30)
                                        : item?.user?.fullName
                                    }`}
                                  </span>
                                </div>
                              </p>
                            </p>
                          </div>
                          {item?.type === "Budget" ? (
                            //   <Link
                            // to={{  pathname:`${item?.data?.budgetUrl}`,state: {type: }}}

                            //   >
                            <span
                              onClick={() =>
                                navigate(`${item?.data?.budgetUrl?.split("https://portal.solowaydesigns.com")?.[1]}`, {
                                  state: item?.data?.tab,
                                })
                              }
                              className="text-c_B2B2B2 inline-flex items-center justify-start gap-x-2 cursor-pointer generalSansRegular font-normal hover:underline hover:text-c_BF642B hover:generalSansBold  md:text-sm "
                            >
                              <FaExternalLinkAlt
                                size={14}
                                className="text-c_B2B2B22 hover:text-c_BF642B"
                              />
                              {labels?.clickHereSeeBudget}
                            </span>
                          ) : // </Link>
                          null}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-4 px-2 flex justify-start md:justify-end">
                        <div className="my-auto">
                          {item?.type === "Project File" || item?.data?.file ? (
                            <a href={`${item?.data?.file}`} target="_black">
                              <span className="text-c_B2B2B2 inline-flex items-center justify-start gap-x-2 cursor-pointer generalSansRegular font-normal hover:underline hover:text-c_BF642B hover:generalSansBold  md:text-sm ">
                                <FaExternalLinkAlt
                                  size={14}
                                  className="text-c_B2B2B22 hover:text-c_BF642B"
                                />
                                {labels?.seeAttachment}
                              </span>
                            </a>
                          ) : null}
                        </div>
                        <div className="flex items-center col-span-2">
                          <p className="text-[10px] md:text-sm text-c_fff/80 tracking-widest font-thin uppercase flex mx-4 py-2">
                            {moment(item?.createdAt).format(
                              dateFormat || "YYYY/MM/DD"
                            )}
                          </p>
                          <p className="text-[10px] md:text-sm text-c_fff/80 tracking-widest font-thin uppercase flex py-2">
                            {moment(item?.createdAt).format(
                              hourFormat === 24 ? "H.mm A" : "h.mm A"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : userType === "client" ||
              userType === "user" ||
              userType === "contributor" ||
              user?.socialType === "google" ? (
              <div className="flex flex-col">
                {notification?.length >= 1 &&
                  notification?.map((item) => (
                    <div
                      key={item?.id}
                      className="container w-full flex flex-col mb-4"
                    >
                      <div className="grid grid-cols-12 bg-c_fff/5 text-c_000 rounded-lg px-2 py-2 mx-4">
                        <div className="col-span-12 md:col-span-8 py-2 md:py-0 p-6">
                          <div className="flex flex-col items-start justify-center">
                            <p className="text-c_fff text-base break-words w-[16ch] md:w-[40ch] md:text-xl font-medium">
                              {item?.title}
                            </p>
                            <p className="text-c_fff inline-flex items-center gap-x-10 text-xs break-words w-[24ch] md:w-[60ch] md:text-sm font-thin">
                              {item?.body}
                              {item?.type === "Project File" ? (
                                <p className="flex md:flex-row flex-col items-center justify-start gap-x-2">
                                  <span className="text-c_fff text-xs md:text-sm generalSansMedium font-thin">
                                    {labels.sendTo}
                                  </span>
                                  <div className="flex md:flex-row flex-col items-center justify-start md:gap-x-2 gap-y-4">
                                    {/* <img
                                      src={`${
                                        item?.user?.picture
                                          ? item?.user?.picture
                                          : defaultAvatar
                                      }`}
                                      alt="senderimage"
                                      className="h-8 w-8 rounded-full"
                                    /> */}
                                    <span className="text-c_BF642B text-xs md:text-sm rounded-full generalSansMedium font-medium">
                                      {`${
                                        (item?.user?.fullName).length > 29
                                          ? (item?.user?.fullName).slice(0, 30)
                                          : item?.user?.fullName
                                      }`}
                                    </span>
                                  </div>
                                </p>
                              ) : null}
                            </p>
                            {item?.type === "Budget" ? (
                              <span
                                // href={item?.data?.budgetUrl}
                                onClick={() =>
                                  navigate(`${item?.data?.budgetUrl?.split("https://portal.solowaydesigns.com")?.[1]}`, {
                                    state: item?.data?.tab,
                                  })
                                }
                              >
                                <span className="text-c_B2B2B2 inline-flex items-center justify-start gap-x-2 cursor-pointer generalSansRegular font-normal hover:underline hover:text-c_BF642B hover:generalSansBold  md:text-sm ">
                                  <FaExternalLinkAlt
                                    size={14}
                                    className="text-c_B2B2B22 hover:text-c_BF642B"
                                  />
                                  {labels?.clickHereSeeBudget}
                                </span>
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="md:ml-0 ml-4 col-span-12 md:col-span-4 flex justify-start md:justify-end flex-wrap">
                          {/* {(userType === "client" && item?.type === "budget") ||
                          (userType === "client" && item?.type === "Budget") ? (
                            <div className="flex items-center justify-start gap-x-4 mr-4 px-2 md:px-0 col-span-2">
                              {!item?.data?.isActive ? null : (
                                <>
                                  <Button
                                    label={labels.deny}
                                    onClick={() =>
                                      handleChangeStatusDeny(
                                        item?.data?.budgetId
                                      )
                                    }
                                    disabled={
                                      !item?.data?.isActive ? true : false
                                    }
                                    className={`${
                                      !item?.data?.isActive
                                        ? "opacity-80"
                                        : "opacity-100"
                                    } text-c_FF5C5A bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                                  />
                                  <Button
                                    label={labels.approve}
                                    onClick={() =>
                                      handleChangeStatusApprove(
                                        item?.data?.budgetId
                                      )
                                    }
                                    disabled={
                                      !item?.data?.isActive ? true : false
                                    }
                                    className={`${
                                      !item?.data?.isActive
                                        ? "opacity-80"
                                        : "opacity-100"
                                    } text-c_0AA81A bg-c_101010 px-4 py-1 rounded-[8px] text-sm font-normal capitalize`}
                                  />
                                </>
                              )}
                            </div>
                          ) : null} */}
                          <div className="my-auto">
                            {item?.type === "Project File" ||
                            item?.data?.file ? (
                              <a href={`${item?.data?.file}`} target="_black">
                                <span className="text-c_B2B2B2 inline-flex items-center justify-start gap-x-2 cursor-pointer generalSansRegular font-normal hover:underline hover:text-c_BF642B hover:generalSansBold  md:text-sm ">
                                  <FaExternalLinkAlt
                                    size={14}
                                    className="text-c_B2B2B22 hover:text-c_BF642B"
                                  />
                                  {labels?.seeAttachment}
                                </span>
                              </a>
                            ) : null}
                          </div>
                          <div className="flex items-center col-span-2 md:ml-4">
                            <p className="text-[10px] md:text-sm text-c_fff/80 tracking-widest font-thin uppercase flex mx-2 py-2">
                            {moment(item?.createdAt).format(
                              dateFormat || "YYYY/MM/DD"
                            )}
                            </p>
                            <p className="text-[10px] md:text-sm text-c_fff/80 tracking-widest font-thin uppercase flex  py-2">
                            {moment(item?.createdAt).format(
                              hourFormat === 24 ? "H.mm A" : "h.mm A"
                            )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
        {userType === "admin" ? (
          <Pagination
            pageCount={Math.ceil(allNotificationCount) / 10}
            onPageChange={(event) => {
              setPage(event?.selected + 1);
            }}
          />
        ) : null}
      </div>
    </Fragment>
  );
};

export default Notifications;
