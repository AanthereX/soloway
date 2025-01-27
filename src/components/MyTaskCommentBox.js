import moment from "moment";
import React from "react";
import defaultAvatar from "../assets/Images/defaultAvatar.png";

const MyTaskCommentBox = ({ item }) => {
  const hourFormat = JSON.parse(localStorage.getItem("detail"))?.hourFormat;
  return (
    <div className="flex justify-start space-x-3 overflow-y-auto">
      <div key={item?.messageId} className="grid grid-cols-12 mb-4 px-4 my-2">
        <div className="md:col-span-1 col-span-2 px-1">
          <img
            src={item?.user?.picture || defaultAvatar}
            alt="senderImage"
            className="!h-8 !w-8 rounded-full object-cover"
          />
        </div>
        <div className="md:col-span-11 col-span-10 bg-c_fff/5 rounded-md px-4 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-base text-c_fff font-medium">
              {item?.user?.fullName}
            </p>
            <p className="text-c_fff/40 text-[14px] font-normal">
              {`${moment(item?.timestamp).format("MMM DD")} at ${moment(
                item?.timestamp
              ).format(hourFormat === 24 ? "H.mm A" : "h.mm A" || "h.mm A")} `}
            </p>
          </div>
          <p className="text-sm text-c_fff my-4">{item?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MyTaskCommentBox;
