import React, { useState,Fragment } from "react";
import FolderIcon from "./FolderIcon";
import { Link, useParams } from "react-router-dom";
import { labels } from "../configs/Labels";
const SidebarNestedDropdown = ({
  menuItems = [],
  handleClickMenuItem = () => {},
  role
}) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const params = useParams();
  console.log(role,"role")
  return (
    <div>
    <Fragment>
      <div
        className="flex space-x-4 cursor-pointer items-center"
        onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
      >
        {window.location.pathname === "/project" ||
        window.location.pathname === `/project-detail/${params?.id}` ? (
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
        ) : (
          <FolderIcon
            color="#ffffff60"
            fill={
              window.location.pathname === "/project" ? "#BF642B30" : "#1B1B1B"
            }
            width={24}
            height={24}
          />
        )}
        <span
          className={`${
            window.location.pathname === "/project" ||
            window.location.pathname === `/project-detail/${params?.id}`
              ? "text-c_fff"
              : "text-c_fff/60 "
          }`}
        >
          {role === "admin" || role === "user" ? labels.clientList  : labels.project} {menuItems?.length ? <span className=" text-white  text-[12px] bg-[#7D7D7D33] mx-2 px-2 py-1 rounded-sm">{menuItems?.length}</span> : null}
        </span>
        {!isMainMenuOpen ? (
          <img
            src="/images/rightOutlineArrow.svg"
            alt="rightoutlinearrow"
            className="w-4 h-4"
          />
        ) : (
          <img
            src="/images/upArrow.svg"
            alt="rightoutlinearrow"
            className=" text-c_BF642B"
          />
        )}
      </div>
      <div className="max-h-[20rem] overflow-y-auto">
      {isMainMenuOpen &&
        menuItems?.map((item, index) => {
          return (
            <div>
              <div
                className={`flex items-center cursor-pointer text-c_B2B2B2 gap-x-2.5 py-2 text-sm`}
                onClick={() => {
                  handleClickMenuItem(item);
                }}
              >
                {!item?.isOpen ? (
                  <img
                    src="/images/rightOutlineArrow.svg"
                    alt="rightoutlinearrow"
                    className="w-4 h-4"
                  />
                ) : (
                  <img
                    src="/images/downArrow.svg"
                    alt="rightoutlinearrow"
                    className="w-4 h-4"
                  />
                )}
                <div className="flex space-x-2 items-center">
                  <img src="/images/singleFolderIcon.svg" className="w-4 h-4" />
                  <span>
                    {item?.fullName?.length > 15
                      ? item?.fullName?.substring(0, 20) + "..."
                      : item?.fullName}
                  </span>
                </div>
              </div>
              {item?.isOpen && (
                <div className="max-h-[10rem] overflow-y-auto mx-2">
                  {item?.projectClients?.map((project) => {
                    return (
                      <Link to={`/project-detail/${project?.projects?.id}`}>
                        <div>
                          <span
                            className={`flex cursor-pointer text-c_B2B2B2 items-center gap-x-2.5 py-2 text-sm ms-10`}
                          >
                            {project?.projects?.name?.length > 15
                              ? project?.projects?.name
                              ?.slice(0, 17) + "... "
                              : project?.projects?.name
                            }
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
           
          );
        })}
        </div>
    </Fragment>
    </div>
  );
};

export default SidebarNestedDropdown;
