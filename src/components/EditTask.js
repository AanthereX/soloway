/** @format */

import React, { useEffect, useRef, useState } from "react";
import TaskHeader from "./TaskHeader";
import { labels } from "../configs/Labels";
import Input from "./Input";
import MemberTaskCommentBox from "./MemberTaskCommentBox";
import MyTaskCommentBox from "./MyTaskCommentBox";
import {
  addFileAttachmentApiMethod,
  deleteAttachmentApiMethod,
  sendNotificationApiMethod,
  taskAttachmentsApiMethod,
  taskCommentEmailApiMethod,
  taskCommentReminderApiMethod,
} from "../store/actions/projectActions";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import { useDispatch } from "react-redux";
import { Firebase } from "../utils/Firebase";
import { serverTimestamp } from "firebase/database";
import moment from "moment";
import { useParams } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { checkInternetConnection } from "../utils/validate";
import MenuDropDown from "./Menu";

// const JSZip = require("jszip");
const EditTask = ({ taskId, taskOptions, setTab, role }) => {
  const [taskData, setTaskData] = useState([]);
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const hourFormat = JSON.parse(localStorage.getItem("detail"))?.hourFormat;
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    handleAttachments();
  }, []);

  useEffect(() => {
    Firebase.getProjectTaskMessages(id, taskId?.id, setMessages);
  }, [taskId?.id]);

  const handleAttachments = () => {
    setLoading(true);
    taskAttachmentsApiMethod(taskId?.id, (res) => {
      setLoading(false);
      setTaskData(res);
    });
  };
  const handleFileAttachFunc = (e) => {
    // console.log(e?.target.files[0]);
    // return
    if (Boolean(checkInternetConnection())) {
      setLoading(true);
      const formData = new FormData();
      formData?.append("taskId", taskId?.id);
      formData?.append("file", e?.target.files[0]);
      dispatch(
        addFileAttachmentApiMethod(formData, async () => {
          await handleAttachments();
          setLoading(false);
        }),
      );
      const payload = {
        project: id,
        message: "Upload Document",
        fullName: user?.fullName,
        type: "file",
      };
      dispatch(sendNotificationApiMethod(payload));
    }
  };

  const handleUpload = () => {
    fileRef?.current?.click();
  };
  const handleOnChange = (setState) => (event) => {
    setState(event?.target?.value);
  };
  const onSendMessage = (_message) => async () => {
    if (!!_message) {
      let params = {
        user,
        message: _message,
        timestamp: serverTimestamp().valueOf(),
        pId: id,
        tId: taskId?.id,
      };
      Firebase.sendProjectTaskMessage(params);
      setMessage("");
      const payload = {
        task: taskId?.id,
        project: id,
        message: _message,
        fullName: user?.fullName,
        type: "comment",
      };
      await dispatch(sendNotificationApiMethod(payload));
      const taskEmailpayload = {
        projectId: id,
        taskId: taskId?.id,
        userName: user?.fullName,
      };
      await dispatch(taskCommentEmailApiMethod(taskEmailpayload));
      await dispatch(taskCommentReminderApiMethod(taskId?.id));
    }
  };
  // console.log(taskData, "taskdata");
  // const downloadIcon = (
  //   <img
  //     src="/images/downloadIcon.svg"
  //     alt="downloadIcon"
  //     className="w-5 h-5"
  //   />
  // );

  const uploadIcon = (
    <img src='/images/uploadIcon.svg' alt='uploadIcon' className='w-5 h-5' />
  );
  const handleDeleteFile = (id) => {
    deleteAttachmentApiMethod(id, async () => {
      await handleAttachments();
    });
  };
  // const handleDownloadAllFiles = () => {
  //   const zip = require("jszip")();

  //   let files = taskData;
  //   for (let file = 0; file < taskData?.length; file++) {
  //     zip.file(files[file].fileName, files[file]);
  //   }
  //   zip.generateAsync({type: "blob"}).then(content => {
  //     saveAs(content, "example.zip");
  //   });

  // };
  // console.log(taskData,"taskData")
  return (
    <div className='grid grid-cols-2 my-8 rounded-md bg-c_212121'>
      <div className='col-span-2 md:col-span-1 uploadFileSection min-h-screen relative'>
        <TaskHeader
          taskData={taskId}
          handleAttachments={handleAttachments}
          taskOptions={taskOptions}
          setTab={setTab}
          role={role}
        />
        <div className='py-4 border-t-[1px] border-c_fff/30 border-b-[1px]'>
          <p className='text-base text-c_fff font-medium px-4 pt-6 pb-3'>
            {labels.description}
          </p>
          <p className='text-sm text-c_fff/80 font-normal px-4 pb-4'>
            {taskId?.description}
          </p>
        </div>
        {loading ? (
          <div className='min-h-screen flex justify-center items-center'>
            <ClipLoader className='spinner-css' color={"#BF642B"} />
          </div>
        ) : (
          <div className='grid grid-cols-1'>
            <p className='flex items-center justify-between text-[14px] font-medium text-c_fff mt-8 px-4'>
              {labels.attachments}
              {/* <Button
              // onClick={handleDownloadAllFiles}
              label={labels.downloadAll}
              icon={downloadIcon}
              className="flex items-center gap-x-2 text-[14px] font-medium text-c_fff"
            ></Button> */}
            </p>
            <div className='containerAllFiles h-[29rem] px-4'>
              <div className='flex flex-wrap gap-x-4 my-4 max-h-[22rem] overflow-y-auto'>
                {taskData?.map((file) => (
                  <React.Fragment>
                    <div className='file-container w-[154px] h-[154px]  mt-2 flex flex-col items-center justify-center rounded-md py-3 px-4 bg-c_212121 border-c_fff/30 border-[1px]'>
                      <MenuDropDown
                        options={[{ label: "Delete" }]}
                        className='w-32'
                        onClick={() => handleDeleteFile(file?.id)}
                      >
                        <div className='flex justify-end items-end'>
                          <button>
                            <img
                              src='/images/inlineDot.svg'
                              alt='dotInline'
                              className='w-6 h-6'
                            />
                          </button>
                        </div>
                      </MenuDropDown>
                      <a href={file?.fileUrl} target='_blank'>
                        {file?.fileType === "image/jpeg" ? (
                          <img
                            key={file?.id}
                            src={file?.fileUrl}
                            alt='file'
                            className='w-[88px] h-[88px]  object-cover'
                          />
                        ) : (
                          // <a href={file?.fileUrl} target="_blank">
                          <video
                            src={file?.fileUrl}
                            width='100%'
                            className='w-[88px] h-[88px]  object-cover'
                          >
                            Sorry, your browser doesn't support embedded videos.
                          </video>
                        )}
                      </a>
                      <p className='text-[12px] text-c_fff/60 pt-1'>{`${
                        file?.fileName?.length > 20
                          ? file?.fileName?.slice(0, 15)
                          : file.fileName
                      }`}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div
              onClick={handleUpload}
              className='absolute bottom-0  w-full flex items-center cursor-pointer justify-center gap-x-2 py-4 rounded-none md:!rounded-bl-md bg-[#ffffff15]'
            >
              <Input
                type='file'
                id='file'
                ref={fileRef}
                accept='image/jpeg,video/mp4'
                onChange={(e) => handleFileAttachFunc(e)}
                className='w-full py-3 hidden absolute top-0 left-0 bg-c_fff/5 opacity-0'
              />
              {uploadIcon}
              <p className='text-c_fff/40 italic text-[14px]'>
                {" "}
                {labels.dropfileshere}{" "}
                <span className='text-c_BF642B italic underline text-[14px]'>
                  {labels.browse}
                </span>{" "}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='col-span-2 md:col-span-1 chatRoomSection border-0 md:border-c_fff/40 md:border-l-[1px] relative'>
        <div className='flex items-center py-[27px] px-4 border-c_fff/30 border-b-[1px] justify-end gap-x-4'>
          <p className='flex flex-col text-[12px] text-c_fff/60 '>
            {labels.startDate}{" "}
            <span className='text-base text-c_fff font-medium '>
              {moment(taskId?.startDate)?.format(dateFormat || "YYYY/MM/DD") ||
                "N/A"}
            </span>{" "}
          </p>
          <p className='flex flex-col text-[12px] text-c_fff/60 '>
            {labels.finalDate}{" "}
            <span className="text-base text-c_fff font-medium ">
              {moment.utc(taskId?.dueDate)?.format(dateFormat || "YYYY/MM/DD") ||
                "N/A"}
            </span>{" "}
          </p>
        </div>
        <div className='flex flex-col mt-10'>
          {taskData?.slice(0, 1)?.map((task) => (
            <React.Fragment>
              <p
                className='flex items-center justify-between text-xs text-c_fff/60 px-4 pb-3'
                key={task?.id}
              >
                {`${user?.fullName} created this task`}{" "}
                <span className='text-xs text-c_fff/80'>{`${moment(
                  task?.task?.createdAt,
                ).format(dateFormat || "YYYY/MM/DD")} at ${moment(
                  task?.task?.createdAt,
                ).format(
                  hourFormat === 24 ? "H.mm a" : "h.mm a" || "h.mm a",
                )}`}</span>{" "}
              </p>
            </React.Fragment>
          ))}
        </div>
        <div className='chats overflow-y-auto'>
          {messages?.map((item) => {
            return user?.id === item?.user?.id ? (
              <MyTaskCommentBox item={item} />
            ) : (
              <MemberTaskCommentBox item={item} />
            );
          })}
          {/* {messages?.map((item) => {
            return (
              <div
                key={item?.messageId}
                className="grid grid-cols-12 mb-4 px-4 my-8"
                style={{
                  alignSelf:
                    user?.id === item?.user?.id ? "flex-end" : "flex-start",
                }}
              >
                <div className="col-span-1">
                  <img
                    src={item?.user?.picture || defaultAvatar}
                    alt="senderImage"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </div>
                <div className="col-span-11 bg-c_fff/5 rounded-md px-4 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-base text-c_fff font-medium">
                      {item?.user?.fullName}
                    </p>
                    <p className="text-c_fff/40 text-[14px] font-normal">
                      {`${moment(item?.timestamp).format("MMM DD")} at ${moment(
                        item?.timestamp
                      ).format("h.mm a")} `}
                    </p>
                  </div>
                  <p className="text-sm text-c_fff my-4">{item?.message}</p>
                </div>
              </div>
            );
          })} */}
        </div>

        {/* <div className="changeStatusSection my-12">
          {ProjectOptions.map((item, index) => (
            <React.Fragment>
              <div className="flex items-start justify-between px-4 my-2">
                <p className="text-xs text-c_fff/60 mb-4">
                  {` ${item.createdBy} changed the status from `}{" "}
                  <span
                    className={`${
                      item.title === "In Progress"
                        ? "text-c_7379FF"
                        : item.title === "Completed"
                        ? "text-c_0AA81A"
                        : "text-[#ffffff60]"
                    }`}
                  >{`${`${item.title}`}`}</span>
                  {` to `}
                  <br />
                  <span
                    className={`${
                      item.selected === "In Progress"
                        ? "text-c_7379FF"
                        : item.selected === "Completed"
                        ? "text-c_0AA81A"
                        : "text-[#ffffff60]"
                    }`}
                  >
                    {item.selected}
                  </span>
                </p>
                <p className="text-[12px] text-c_fff/80">{`${item.date} at ${item.time}`}</p>
              </div>
            </React.Fragment>
          ))}
        </div> */}
        <div className='grid grid-cols-8 py-[7px] px-3 bg-c_fff/10 absolute bottom-0 w-full md:mt-0 mt-8'>
          <div className='col-span-7 flex items-center gap-x-2 justify-start'>
            <Input
              type='text'
              className='text-sm bg-transparent outline-none text-c_fff/70 w-full font-normal placeholder:text-c_fff/40 placeholder:capitalize'
              placeholder={labels.comment}
              value={message}
              onChange={handleOnChange(setMessage)}
            />
          </div>
          <div className='col-span-1 flex items-center gap-x-2 justify-end'>
            <button onClick={onSendMessage(message)} type='submit'>
              <img
                src='/images/sendIcon.svg'
                alt='sendIcon'
                className='!h-5 !w-5'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
