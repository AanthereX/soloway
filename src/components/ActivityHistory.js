import React, { useEffect, useState } from "react";
import { labels } from "../configs/Labels";
import SearchBar from "./SearchBar";
import { allActivitiesApiMethod } from "../store/actions/projectActions";
import defaultAvatar from "../assets/Images/defaultAvatar.png";
import moment from "moment";
import { useParams } from "react-router";
import NoDataAvailable from "./NoDataAvailable";
import ToolTip from "./ToolTip";
// import ClipLoader from "react-spinners/ClipLoader";
const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [apiHit, setApiHit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dateFormat = JSON.parse(localStorage.getItem("detail"))?.dateFormat;
  const params = useParams();

  useEffect(() => {
    // setLoading(true);
    allActivitiesApiMethod(
      params?.id,
      (res) => {
        setApiHit(true);
        setActivities(res);
        // setLoading(false)
      },
      { page: 1 }
    );
  }, []);

  useEffect(() => {
    const getData = setTimeout(() => {
      allActivitiesApiMethod(
        params?.id,
        { ...(search ? { search } : {}) },
        (res) => {
          setApiHit(true);
          setActivities(res);
        }
      );
    }, 1000);
    return () => clearTimeout(getData);
  }, [search]);

  return (
    <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-4 my-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-3 text-[20px] text-c_fff/90">
          {labels.lastUpdates}{" "}
          <div className="flex justify-center items-center px-2 md:px-2 md:w-8 w-8 h-8 my-auto bg-c_fff/10 rounded-md">
            <span className="text-c_fff text-[12px]">{activities?.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-4 pl-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <>
        {/* {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader className="spinner-css" color={"#BF642B"}   />
        </div>
      ) : ( */}
        <table className="w-full overflow-auto scrollbar-hide mt-8">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-3/5 py-3.5 pl-4 pr-4 text-left text-sm capitalize text-white sm:pl-0"
              >
                <div className="flex items-center gap-x-4 pl-4">
                  <p className="font-semibold text-[12px] text-c_fff">
                    {labels.description}
                  </p>
                </div>
              </th>
              <th
                scope="col"
                className="w-1/5 py-3.5 pr-4 text-left text-sm capitalize text-white"
              >
                <div className="flex items-center gap-x-4">
                  <p className="font-semibold text-[12px] text-c_fff">
                    {labels.updatedBY}
                  </p>
                </div>
              </th>
              <th
                scope="col"
                className="w-1/5 px-3 py-3.5 pr-4 text-left text-sm capitalize text-white"
              >
                <div className="flex items-center gap-x-4">
                  <p className="font-semibold text-[12px] text-c_fff">
                    {labels.uploadDate}
                  </p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {activities?.map((activity) => (
              <React.Fragment>
                <tr
                  className="odd:bg-c_fff/5 even:bg-transparent rounded-md"
                  key={activity?.id}
                >
                  <td className="w-3/5 gap-x-3 my-4 pl-4 text-base font-normal text-c_fff !rounded-tl-md !rounded-bl-md">
                    {activity?.description}
                  </td>
                  <ToolTip
                    theme="dark"
                    position="right"
                    title={activity?.user?.fullName}
                  >
                    <td className="w-1/5 py-4 text-sm text-c_fff cursor-pointer">
                      <img
                        src={activity?.user?.picture || defaultAvatar}
                        alt="responsiblePersonAvatar"
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    </td>
                  </ToolTip>
                  <td className="w-1/5 px-3 py-4 text-[13px] text-c_fff/80 font-normal !rounded-tr-md !rounded-br-md">
                    {moment.utc(activity.createdAt)?.format(
                      dateFormat || "YYYY/MM/DD"
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/* )} */}
      </>
      <div className="mt-8">
        {apiHit && activities?.length <= 0 ? (
          <NoDataAvailable entity={labels.activity} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
