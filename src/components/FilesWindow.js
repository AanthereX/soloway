import React from "react";
import Button from "./Button";
import { labels } from "../configs/Labels";
import { FiPlus } from "react-icons/fi";
import moment from "moment";
import MenuDropDown from "./Menu";
import { deleteFileApiMethod } from "../store/actions/projectActions";

const FilesWindow = ({ fileDetails, handleProjectDetails, setTab }) => {
  const plusIcon = <FiPlus />;

  const handleDeleteFile = (id) => {
    deleteFileApiMethod(id, async () => {
      await handleProjectDetails();
    });
  };
  return (
    <React.Fragment>
      <div className="flex flex-col pt-4 pb-2 px-5">
        <div className="flex items-center justify-between">
          <div className="flex justify-start md:gap-x-3 gap-x-0 text-[20px] text-c_fff/90">
            <p className="w-[10ch] md:w-full">{labels.linksAndFiles}</p>{" "}
            <div className="flex justify-center items-center px-1 md:px-2 md:w-8 w-8 h-8 my-auto bg-c_fff/10 rounded-md">
              <span className="text-c_fff text-[12px]">
                {fileDetails?.projectDetails?.totalFiles}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setTab("Files")}
            label={labels.addNew}
            className={`flex items-center gap-x-0.5 md:gap-x-2 bg-transparent text-[13px] md:text-sm text-c_fff border border-c_fff/20 px-4 py-1.5 rounded`}
            icon={plusIcon}
          />
        </div>

        {fileDetails?.files?.length ? (
          fileDetails?.files?.map((item) => (
            <div
              key={item?.id}
              className="grid grid-cols-12 mt-4 pb-4 items-center border-b-[1px] border-c_fff/10"
            >
              <div className="col-span-1">
                <a href={item?.fileUrl} target="_blank">
                  <img
                    src={
                      item?.fileType === "pdf"
                        ? "/images/pdfFileIcon.svg"
                        : item?.fileType === "jpeg"
                        ? "/images/jpeg.png"
                        : item?.fileType === "mov"
                        ? "/images/mov.png"
                        : item?.fileType === "doc"
                        ? "/images/docFileIcon.svg"
                        : item?.fileType === "mp4"
                        ? "/images/mp4.svg"
                        : "/images/linkIcon.svg"
                    }
                    alt="fileImage"
                    className="h-10 w-10"
                  />
                </a>
              </div>
              <div className="col-span-11 flex items-center justify-between pl-4">
                <div>
                  <p
                    className={`text-base font-medium ${
                      item.fileType === "link"
                        ? "text-[#5792EF] underline"
                        : "text-c_fff/80"
                    }`}
                  >
                    {item?.fileName?.length > 30
                      ? item?.fileName?.substring(0, 40) + "..."
                      : item?.fileName + "." + item?.fileType}
                  </p>
                  {item?.id === 4 ? null : (
                    <div className="flex items-center justify-start gap-x-2">
                      <p className="text-[14px] text-c_fff/40 font-normal">
                        {item?.fileType !== "url"
                          ? (item?.fileSize / 1024 ** 2).toFixed(2) + " MB"
                          : "URL"}
                      </p>
                      <p className="w-[2px] h-[2px] bg-c_fff/10"></p>
                      <p className="text-[14px] text-c_fff/40 font-normal">
                        {moment(item?.createdAt).fromNow()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end items-end ">
                  <MenuDropDown
                    options={[{ label: "Delete" }]}
                    onClick={() => handleDeleteFile(item?.id)}
                  >
                    <img
                      src="/images/inlineDot.svg"
                      alt="dotInline"
                      className="w-6 h-6"
                    />
                  </MenuDropDown>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center py-[7rem] text-lg ">
            No Data Available
          </span>
        )}

        {/* <div className="mt-4 mb-2">{files}</div> */}
      </div>
    </React.Fragment>
  );
};

export default FilesWindow;
