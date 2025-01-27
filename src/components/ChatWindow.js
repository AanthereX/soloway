import React, { Fragment, useEffect, useRef, useState } from "react";
import { labels } from "../configs/Labels";
import Input from "./Input";
import { useParams } from "react-router";
import { Firebase } from "../utils/Firebase";
import { serverTimestamp } from "firebase/database";
import {
  addImageAttachmentApiMethod,
  projectCommentApiMethod,
  projectDiscussionEmailApiMethod,
  sendNotificationApiMethod,
} from "../store/actions/projectActions";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "./Button";
import MyChatBox from "./MyChatBox";
import MemberChatBox from "./MemberChatBox";
import { useDispatch } from "react-redux";

const ChatWindow = ({ setTab, role }) => {
  const params = useParams();
  const { id } = params;
  const messagesEndRef = useRef();
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [type, setType] = useState("text");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    Firebase.getProjectMessages(id, setMessages);
  }, [id]);
  const onSendMessage =
    (_message = null, _image = null, type = "text") =>
    async () => {
      if (!!_message || !!_image) {
        let params = {
          user,
          ...(_message ? { message: _message } : {}),
          ...(image ? { image: _image } : {}),
          timestamp: serverTimestamp().valueOf(),
          pId: id,
          type: type === "text" ? "text" : "image",
        };
        Firebase.sendProjectMessage(params);
        scrollToBottom();
        setMessage(null);
        setImage(null);
        setType("text");
        await projectCommentApiMethod(id);
        const payload = {
          project: id,
          message: _message,
          fullName: user?.fullName,
          type: "discussion",
        };
        await dispatch(sendNotificationApiMethod(payload));
        const discussionEmailPayload = {
          projectId: id,
          userName: user?.fullName,
        };
        await dispatch(projectDiscussionEmailApiMethod(discussionEmailPayload));
      }
    };
  function scrollToBottom() {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  }
  const handleUpload = () => {
    fileRef?.current?.click();
  };
  const handleOnChange = (setState) => (event) => {
    setState(event?.target?.value);
  };
  const handleAttachments = (e) => {
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData?.append("file", file);
    setLoading(true);
    addImageAttachmentApiMethod(formData, (res) => {
      setLoading(false);
      setImage(res?.data?.data);
      setType("image");
    });
  };
  return (
    <React.Fragment>
      <div className="flex flex-col pt-4 pb-2 ">
        <div className="flex items-center justify-between mb-4 px-5">
          <p className="inline-flex gap-x-3 text-[20px] text-c_fff/90">
            {labels.discussion}{" "}
            <div className="px-2 flex justify-center items-center w-8 bg-c_fff/10 rounded-md">
              <span className=" text-c_fff text-[12px]">
                {messages?.length}
              </span>
            </div>
          </p>
          {role === "client" || role === "contributor" ? null : (
            <Button
              onClick={() => setTab("Discussion")}
              label={labels.seeAll}
              className={`flex items-center bg-transparent text-sm text-c_fff border border-c_fff/20 px-4 py-1.5 rounded`}
            />
          )}
        </div>
        <div className="h-[11rem] overflow-y-auto px-5">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader
                className="spinner-css h-10 w-10"
                color={"#BF642B"}
                size={10}
              />
            </div>
          ) : (
            <div>
              {" "}
              {messages?.map((item) => {
                return user?.id === item?.user?.id ? (
                  <MyChatBox item={item} />
                ) : (
                  <MemberChatBox item={item} />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      {
        role === "client" || role === "contributor" ? null : (
          <div className="grid grid-cols-8 py-2 mt-4 px-4 bg-c_fff/10">
            <div className="col-span-7 flex items-center gap-x-2 justify-start">
              {image ? (
                <img src={image} className="h-10 w-10 object-cover" />
              ) : null}
              {/* </Fragment> */}
              <button onClick={handleUpload}>
                <img
                  src="/images/attachmentClipIcon.svg"
                  alt="clipIcon"
                  className="!h-5 !w-5"
                />
                <Input
                  type="file"
                  id="file"
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => handleAttachments(e)}
                  className="w-full py-3 hidden absolute top-0 left-0 bg-c_fff/5 opacity-0"
                />
              </button>

              {/* <button>
            <img
              src="/images/smileyFaceIcon.svg"
              alt="smileyfaceIcon"
              className="!h-5 !w-5"
            />
          </button> */}
              <Input
                type="text"
                className="text-sm bg-transparent outline-none text-c_fff/70 w-full font-normal placeholder:text-c_fff/40 placeholder:capitalize"
                placeholder={labels.comment}
                value={message || ""}
                onChange={handleOnChange(setMessage)}
              />
            </div>
            <div className="col-span-1 flex items-center gap-x-2 justify-end">
              <button
                onClick={onSendMessage(message, image, type)}
                type="submit"
              >
                <img
                  src="/images/sendIcon.svg"
                  alt="sendIcon"
                  className="!h-5 !w-5"
                />
              </button>
            </div>
          </div>
        )
        // </div>
      }
    </React.Fragment>
  );
};

export default ChatWindow;
