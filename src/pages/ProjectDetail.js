import React, { useEffect, useState } from "react";
import { labels } from "../configs/Labels";
import ProjectDetailHeader from "../components/ProjectDetailHeader";
import Overview from "../components/Overview";
import Task from "../components/Task";
import Files from "../components/Files";
import Timeline from "../components/Timeline";
import ActivityHistory from "../components/ActivityHistory";
import Budgets from "../components/Budgets";
import { ProjectDetailsApiMethod } from "../store/actions/projectActions";
import { useParams, useLocation } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import Discussion from "../components/Discussion";

const ProjectDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.role;
  const [tab, setTab] = useState("Overview");
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location?.state) {
      setTab("Budgets");
    }
  }, [location?.state]);

  useEffect(() => {
    handleProjectDetails();
  }, [params]);

  const handleProjectDetails = () => {
    setLoading(true);
    ProjectDetailsApiMethod(params?.id, (res) => {
      setLoading(false);
      setProjectDetail(res);
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader className="spinner-css" color={"#BF642B"} />
        </div>
      ) : (
        <div className="bg-c_101010 text-c_fff min-h-screen px-5">
          <div className="flex flex-col">
            <ProjectDetailHeader
              title={projectDetail?.projectDetails?.name}
              btnLabel={projectDetail?.projectDetails?.status}
              handleProjectDetails={handleProjectDetails}
            />

            {/* tabination for projects page containing four tabs starts here */}

            <div className="md:grid md:grid-cols-5 bg-transparent text-c_fff md:my-0 my-5">
              <div className="md:col-span-5 md:gap-x-8 md:flex md:items-center justify-start col-span-5 flex overflow-x-auto scrollbar-hide">
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Overview"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  } `}
                  onClick={() => {
                    setTab("Overview"), handleProjectDetails();
                  }}
                >
                  <p className="w-fit md:text-base px-4">{labels.overview}</p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Tasks"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  } }`}
                  onClick={() => setTab("Tasks")}
                >
                  <p className="w-fit md:text-base px-4">{labels.tasks}</p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Files"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  }`}
                  onClick={() => setTab("Files")}
                >
                  <p className="w-fit md:text-base px-4">{labels.files}</p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Timeline"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  }`}
                  onClick={() => setTab("Timeline")}
                >
                  <p className="w-fit md:text-base px-4">{labels.timeline}</p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Activity History"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  }`}
                  onClick={() => setTab("Activity History")}
                >
                  <p className="w-fit md:text-base px-4">
                    {labels.activityHistory}
                  </p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Budgets"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  }`}
                  onClick={() => setTab("Budgets")}
                >
                  <p className="w-fit text-base px-4">{labels.budgets}</p>
                </button>
                <button
                  className={`pb-2 mb-2 ${
                    tab === "Discussion"
                      ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                      : "text-c_fff/40"
                  }`}
                  onClick={() => setTab("Discussion")}
                >
                  <p className="w-fit text-base px-4">{labels.discussion}</p>
                </button>
              </div>
              <div className="col-span-5">
                {tab === "Overview" ? (
                  <Overview
                    projectDetail={projectDetail}
                    handleProjectDetails={handleProjectDetails}
                    setTab={setTab}
                  />
                ) : tab === "Tasks" ? (
                  <Task setTab={setTab} />
                ) : tab === "Files" ? (
                  <Files />
                ) : tab === "Timeline" ? (
                  <Timeline />
                ) : tab === "Activity History" ? (
                  <ActivityHistory />
                ) : tab === "Budgets" ? (
                  <Budgets role={user} />
                ) : tab === "Discussion" ? (
                  <Discussion setTab={setTab} />
                ) : null}
              </div>
            </div>

            {/* tabination for projects page containing four tabs ends here */}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
