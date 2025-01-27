import React from "react";
import Button from "./Button";
import { labels } from "../configs/Labels";
import moment from "moment";

const ActivityHistoryWindow = ({ activityDetails, setTab }) => {
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  return (
    <React.Fragment>
      <div className="flex flex-col pt-4 pb-2 px-5">
        <div className="flex items-center justify-between">
          <p className="inline-flex gap-x-3 text-[20px] text-c_fff/90">
            {labels.lastUpdates}{" "}
            <div className="px-2 flex justify-center items-center w-8  bg-c_fff/10 rounded-md">
            <span className=" text-c_fff text-[12px]">
              {activityDetails?.projectDetails?.totalActivities}
            </span></div>
          </p>
          <Button
            onClick={() => setTab("Activity History")}
            label={labels.seeAll}
            className={`flex items-center bg-transparent text-sm text-c_fff border border-c_fff/20 px-4 py-1.5 rounded`}
          />
        </div>
        {activityDetails?.activities?.length ? (
          activityDetails?.activities?.map((activity) => {
            return (
              <div
                className="grid grid-cols-4 mt-3 items-center gap-x-2 even:bg-c_fff/5 px-3 py-3 rounded"
                key={activity?.id}
              >
                <p className="col-span-4 inline-flex justify-between items-center">
                  {activity?.description?.length > 30 ? activity?.description?.substring(0,38) + "..." : activity?.description }{" "}
                  <span className="text-sm text-c_fff/30">
                    {moment(activity?.createdAt).format(dateFormat || "YYYY/MM/DD")}
                  </span>{" "}
                </p>
              </div>
            );
          })
        ) : (
          <span className="text-center py-[7rem] text-lg ">
            No Data Available
          </span>
        )}
        {/* <div className="mt-4 mb-2">{activities}</div> */}
      </div>
    </React.Fragment>
  );
};

export default ActivityHistoryWindow;
