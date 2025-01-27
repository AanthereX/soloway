import React, { useEffect, useState, Fragment, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiMenuFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import NotificationIcon from "./NotificationIcon";
import UserIcon from "./UserIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarNestedDropdown from "./sidebarNestedDropdown";
import { getUserRelatedProjectMethod } from "../store/actions/projectActions";
import Button from "./Button";
import { useSelector } from "react-redux";
import { getSingleUser, logOutAction } from "../store/actions";
import { useDispatch } from "react-redux";
import { checkInternetConnection, kFormatter } from "../utils/validate";
import { updatedData } from "../store/actions";
import defaultAvatar from "../assets/Images/defaultAvatar.png";

const Sidebar = ({ children }) => {
  const userType = useSelector(
    (state) => state?.User?.user?.payload?.data?.role
  );
  const relatedUserProject = useSelector(
    (state) => state?.User?.projectRelatedUser?.payload?.data
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const isAdmin = user?.role ? user?.role.includes("admin") : null;

  const updatedDataFromEdit = useSelector(
    (state) => state.User?.sidebarUserDetails
  );

  const navigation = [
    { name: "Projects", href: "/project", current: false },
    { name: "Users", href: "/user", current: false },
    { name: "Notifications", href: "/notification", current: false },
    {
      name: "Email Notifications",
      href: "/email-notification",
      current: false,
    },
  ];

  useEffect(() => {
    getSingleUser(userId, (res) => {
      if (res?.user?.userDetail.length) {
        localStorage.setItem(
          "detail",
          JSON.stringify(res?.user?.userDetail[0])
        );
      }
      dispatch(updatedData(res));
      setUserDetails(res);
    });
  }, []);
  useEffect(() => {
    setMenuItems(
      relatedUserProject?.map((item) => {
        return {
          ...item,
          isOpen: false,
        };
      })
    );
  }, [relatedUserProject]);

  useEffect(() => {
    dispatch(getUserRelatedProjectMethod());
  }, []);

  const handleLogOut = async () => {
    if (Boolean(checkInternetConnection())) {
      await logOutAction("/login");
    }
  };

  const handleClickMenuItem = (nestItem) => {
    setMenuItems((prev) =>
      prev?.map((item) => {
        if (item?.id === nestItem?.id) {
          return {
            ...item,
            isOpen: !item?.isOpen,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <React.Fragment>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-2 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <p className="text-c_fff/60">X</p>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-hidden bg-c_1B1B1B">
                    <div
                      className="flex cursor-pointer h-20 shrink-0 items-center px-5 border-b-[1px] border-c_595959"
                      onClick={() => navigate("/project")}
                    >
                      <img
                        className="h-8 w-8 mt-2"
                        src="/images/solowayLogo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7 mt-4">
                        <li>
                          <ul className="-mx-2 space-y-1 px-7">
                            {navigation
                              .filter((item) =>
                                user?.role === "admin"
                                  ? item
                                  : item?.name !== "Email Notifications" ||
                                    user?.role === "user" ||
                                    user?.role === "client" ||
                                    user?.role === "contributor"
                                  ? item?.name !== "Email Notifications"
                                  : item || user?.socialType === "google"
                                  ? item
                                  : item?.name !== "Users"
                              )
                              ?.map((item, index) => (
                                <li key={index}>
                                  <Link
                                    to={item.href}
                                    onClick={() => {
                                      const updated = {
                                        ...updatedDataFromEdit,
                                      };
                                      updated.payload.unReadNotification = 0;
                                      dispatch(updatedData(updated.payload));
                                    }}
                                    className={`relative flex items-center gap-x-3 mb-4 py-3 px-5 text-base leading-6 rounded ${
                                      window.location.pathname === item.href
                                        ? "bg-c_fff/5"
                                        : "bg-transparent"
                                    } ${
                                      item.name === "Users" &&
                                      userType === "user"
                                        ? "hidden"
                                        : "block"
                                    } `}
                                  >
                                    {item.name === "Users" ? (
                                      <UserIcon
                                        color={
                                          window.location.pathname === item.href
                                            ? "#BF642B"
                                            : "#ffffff60"
                                        }
                                        width={20}
                                        height={20}
                                        onClick={() => navigate("/user")}
                                      />
                                    ) : item.name === "Projects" ? (
                                      <>
                                        <SidebarNestedDropdown
                                          menuItems={menuItems}
                                          role={user?.role}
                                          handleClickMenuItem={
                                            handleClickMenuItem
                                          }
                                        />
                                      </>
                                    ) : (
                                      <NotificationIcon
                                        color={
                                          window.location.pathname === item.href
                                            ? "#BF642B"
                                            : "#ffffff60"
                                        }
                                        width={20}
                                        height={20}
                                        onClick={() =>
                                          navigate("/notification")
                                        }
                                      />
                                    )}
                                    {item.name === "Projects" ? null : (
                                      <button
                                        onClick={() => {
                                          navigate(item.href);
                                        }}
                                        className={`${
                                          window.location.pathname === item.href
                                            ? "text-c_fff"
                                            : "text-c_fff/60"
                                        }`}
                                      >
                                        {item?.name}
                                      </button>
                                    )}
                                    {!isAdmin &&
                                    item.href === "/notification" &&
                                    window.location.pathname !==
                                      "/notification" ? (
                                      <>
                                        {updatedDataFromEdit?.payload
                                          ?.unReadNotification >= 1 && (
                                          <span className="ml-auto px-1.5 rounded bg-c_595959 text-c_DADADA">
                                            {kFormatter(
                                              updatedDataFromEdit?.payload
                                                ?.unReadNotification
                                            )}
                                          </span>
                                        )}
                                      </>
                                    ) : null}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        <li
                          className={`mt-auto border-t-[1px] ${
                            window.location.pathname === "/profile"
                              ? "border-l-4 border-l-c_BF642B"
                              : "border-t-[1px] border-c_595959"
                          } border-c_595959 px-4 py-0`}
                          onClick={() => navigate("/profile")}
                        >
                          <div
                            className={
                              "grid grid-cols-6 cursor-pointer gap-x-1 py-3 text-c_fff hover:text-white text-base font-semibold leading-6 rounded-full"
                            }
                          >
                            <div className="col-span-1 flex items-center">
                              <img
                                className="h-[32px] w-[32px]  rounded-full object-cover"
                                src={`${
                                  updatedDataFromEdit?.payload?.user?.picture
                                    ? updatedDataFromEdit?.payload?.user
                                        ?.picture
                                    : defaultAvatar
                                }`}
                                alt="userImg"
                              ></img>
                            </div>
                            <div className="col-span-5">
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start justify-between">
                                  <p className="text-[14px] font-normal text-c_fff/80">
                                    {updatedDataFromEdit?.payload?.fullName
                                      ?.length > 20
                                      ? updatedDataFromEdit?.payload?.user?.fullName?.substring(
                                          0,
                                          20
                                        ) + "..."
                                      : updatedDataFromEdit?.payload?.user
                                          ?.fullName}
                                  </p>
                                  <p className="text-[10px] text-c_fff/50 capitalize">
                                    {updatedDataFromEdit?.payload?.user?.role}
                                  </p>
                                </div>
                                <Button
                                  icon={
                                    <IoMdLogOut className="text-c_fff/60 text-xl" />
                                  }
                                  onClick={handleLogOut}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[19rem] lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-hidden bg-c_1B1B1B text-c_fff">
            <div
              className="flex cursor-pointer h-20 shrink-0 items-center px-5 border-b-[1px] border-c_595959"
              onClick={() => navigate("/project")}
            >
              <img
                className="h-8 w-8 mt-2"
                src="/images/solowayLogo.svg"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7 mt-4">
                <li>
                  <ul className="-mx-2 space-y-1 px-10">
                    {navigation
                      .filter((item) =>
                        user?.role === "admin"
                          ? item
                          : item?.name !== "Email Notifications" ||
                            user?.role === "user" ||
                            user?.role === "client" ||
                            user?.role === "contributor"
                          ? item?.name !== "Email Notifications" &&
                            item?.name !== "Users"
                          : item || user?.socialType === "google"
                          ? item
                          : item?.name !== "Users"
                      )
                      ?.map((item, index) => (
                        <li key={index} className="">
                          <Link
                            to={item.href}
                            onClick={() => {
                              const updated = { ...updatedDataFromEdit };
                              updated.payload.unReadNotification = 0;
                              dispatch(updatedData(updated.payload));
                            }}
                            className={`relative  flex items-center gap-x-3 mb-4 py-3 px-5 text-base leading-6 rounded ${
                              window.location.pathname === item.href
                                ? "bg-c_fff/5"
                                : "bg-transparent"
                            } ${
                              item.name === "Users" && userType === "user"
                                ? "hidden"
                                : "block"
                            } `}
                          >
                            {item.name === "Users" ? (
                              <UserIcon
                                color={
                                  window.location.pathname === item.href
                                    ? "#BF642B"
                                    : "#ffffff60"
                                }
                                width={20}
                                height={20}
                                onClick={() => navigate("/user")}
                              />
                            ) : item.name === "Projects" ? (
                              <>
                                <SidebarNestedDropdown
                                 role={user?.role}
                                  menuItems={menuItems}
                                  handleClickMenuItem={handleClickMenuItem}
                                />
                              </>
                            ) : (
                              <NotificationIcon
                                color={
                                  window.location.pathname === item.href
                                    ? "#BF642B"
                                    : "#ffffff60"
                                }
                                width={20}
                                height={20}
                                onClick={() => navigate("/notification")}
                              />
                            )}
                            {item.name === "Projects" ? null : (
                              <button
                                onClick={() => {
                                  navigate(item.href);
                                }}
                                className={`${
                                  window.location.pathname === item.href
                                    ? "text-c_fff"
                                    : "text-c_fff/60"
                                }`}
                              >
                                {item?.name}
                              </button>
                            )}
                            {!isAdmin &&
                            item.href === "/notification" &&
                            window.location.pathname !== "/notification" ? (
                              <>
                                {updatedDataFromEdit?.payload
                                  ?.unReadNotification >= 1 && (
                                  <span className="ml-auto px-1.5 rounded bg-c_595959 text-c_DADADA">
                                    {kFormatter(
                                      updatedDataFromEdit?.payload
                                        ?.unReadNotification
                                    )}
                                  </span>
                                )}
                              </>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li
                  className={`mt-auto border-t-[1px] ${
                    window.location.pathname === "/profile"
                      ? "border-l-4 border-l-c_BF642B"
                      : "border-t-[1px] border-c_595959"
                  } border-c_595959 px-4 py-0`}
                >
                  <div
                    className={
                      "grid grid-cols-6 cursor-pointer gap-x-1 py-3 text-c_fff hover:text-white text-base font-semibold leading-6 rounded-full"
                    }
                  >
                    <div
                      className="col-span-1 flex items-center"
                      onClick={() => navigate("/profile")}
                    >
                      <img
                        className="h-[32px] w-[32px]  rounded-full object-cover"
                        src={`${
                          updatedDataFromEdit?.payload?.user?.picture
                            ? updatedDataFromEdit?.payload?.user?.picture
                            : defaultAvatar
                        }`}
                        alt="userImg"
                      ></img>
                    </div>
                    <div className="col-span-5">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex flex-col items-start justify-between"
                          onClick={() => navigate("/profile")}
                        >
                          <p className="text-[14px] font-normal text-c_fff/80 capitalize">
                            {updatedDataFromEdit?.payload?.user?.fullName
                              ?.length > 20
                              ? updatedDataFromEdit?.payload?.user?.fullName?.substring(
                                  0,
                                  22
                                ) + "..."
                              : updatedDataFromEdit?.payload?.user?.fullName}
                          </p>
                          <p className="text-[10px] text-c_fff/50 capitalize">
                            {updatedDataFromEdit?.payload?.user?.role}
                          </p>
                        </div>
                        <Button
                          icon={
                            <IoMdLogOut className="text-c_fff/60 text-xl" />
                          }
                          onClick={handleLogOut}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-[19rem]">
          <div className="sticky top-0 z-40 flex bg-c_101010 shrink-0 items-center gap-x-4">
            <button
              type={"button"}
              className="px-1.5 pb-1 mx-2 mt-4 text-c_fff/60 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <RiMenuFill className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="bg-c_101010 overflow-x-hidden md:min-h-screen">
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
