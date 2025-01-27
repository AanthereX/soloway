import React, { useEffect, useState } from "react";
import { labels } from "../configs/Labels";
import { emailChangeStatus, getAllEmailNotifications } from "../store/actions";
import ToggleBtn from "../components/ToggleBtn";
import { BackArrow } from "../components/BackArrow";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const emailArray = [
  {
    label: "Project reminder assign email",
    key: "projectReminder",
  },
  {
    label: "Project status update  email",
    key: "projectStatusUpdate",
  },
  {
    label: "Project budget creation  email",
    key: "budgetCreation",
  },
  {
    label: "Project task status update  email",
    key: "taskChangeStatus",
  },
  {
    label: "Project deadline email",
    key: "taskDeadline",
  },
  {
    label: "Project task create email",
    key: "taskCreation",
  },
];

const EmailNotifications = () => {
  const [notificationData, setNotificationData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    handleGetNotifications();
  }, []);

  const handleGetNotifications = () => {
    setLoading(true);
    getAllEmailNotifications((res) => {
      setNotificationData(res);
      setLoading(false);
    });
  };
  // console.log(notificationData, "notificationData");

  const handleEmailStatus = (data) => {
    const payload = {
      ...notificationData,
      [data.key]: !notificationData[data.key],
    };
    delete payload.createdAt;
    delete payload.id
    // console.log(payload,"payload");
    // return
    // setNotificationData((prev) => ({...prev , [data.key] : !notificationData[data.key]}))
    emailChangeStatus(
      payload,
      async () => {
        await handleGetNotifications();
      },setLoading
    );
  };

  return (
    <React.Fragment>
      <div className="bg-c_101010 text-c_fff min-h-screen px-5">
        <div className="flex flex-col my-[7rem]">
          <div className="flex gap-4">
            <BackArrow
              width={32}
              height={32}
              stroke={"#fff"}
              className={`cursor-pointer`}
              onClick={() => navigate(-1)}
            />
            <span className="text-xl">{labels.emailNotifications}</span>
          </div>
          {/* {loading ? (
            <div className="min-h-screen flex justify-center items-center">
              <ClipLoader className="spinner-css" color={"#BF642B"} />
            </div>
          ) : ( */}
            <div className="overflow-x-auto py-3">
              <table className="table-responsive w-full overflow-auto">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm uppercase text-white sm:pl-0"
                    >
                      <div className="flex items-center gap-x-4 pl-4">
                        <div className="font-normal text-c_fff/60">
                          {labels.name}
                        </div>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 pr-4 text-left text-sm uppercase text-white"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="font-normal text-c_fff/60">
                          {labels.status}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <React.Fragment>
                    {emailArray?.map((arrayItem) => (
                      <tr className="odd:bg-c_1C1C1C !rounded-md">
                        <td className="px-4 py-4 text-sm text-c_fff !rounded-tl-md !rounded-bl-md">
                          {arrayItem.label}
                        </td>
                        <td className="px-3 py-4 text-sm text-c_fff">
                          <ToggleBtn
                            defaultChecked={notificationData[arrayItem.key]}
                            value={notificationData[arrayItem.key]}
                            onClick={() => handleEmailStatus(arrayItem)}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                </tbody>
              </table>
            </div>
           {/* )}  */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmailNotifications;
