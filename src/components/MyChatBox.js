import moment from "moment";
import React from "react";
import defaultAvatar from "../assets/Images/defaultAvatar.png";

const MyChatBox = ({ item }) => {
  return (
    <div className="flex justify-end space-x-3">
      <div className={` flex justify-end space-x-3 mb-4`} key={item?.messageId}>
        <div className=" bg-c_fff/5 rounded-md px-4 py-3 w-auto flex flex-col">
          <div className="flex items-center  justify-between">
            <p className="text-base text-c_fff font-medium text-right">
              {item?.user?.fullName}
            </p>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <p className="text-c_fff/40 text-[14px] font-normal capitalize text-right">
              {item?.user?.role}
            </p>
            <p className="w-[2px] h-[2px] bg-c_fff/10"></p>
            <p className="text-c_fff/40 text-[14px] font-normal">
              {moment(item?.timestamp).fromNow()}
            </p>
          </div>
          {item?.type === "text" ? (
            <p className="text-sm text-c_fff my-4">{item?.message}</p>
          ) : (
            <div>
              <a href={item?.image} target="_blank">
                {" "}
                <img
                  src={item?.image}
                  className="h-16 w-16 mt-2 object-cover"
                />
              </a>
              <p className="text-sm text-c_fff my-4">{item?.message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        <img
          src={item?.user?.picture || defaultAvatar}
          alt="senderImage"
          className="h-8 w-8 rounded-full object-cover"
        />
    </div>
    </div>

  );
};

export default MyChatBox;
