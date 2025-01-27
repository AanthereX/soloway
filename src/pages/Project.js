import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { labels } from "../configs/Labels";
import AllProject from "../components/AllProject";
import InProgressProject from "../components/InProgressProject";
import BlockedProject from "../components/BlockedProject";
import CompletedProject from "../components/CompletedProject";
import { ChangeViewGrid } from "../components/ChangeViewGrid";
import { ChangeViewList } from "../components/ChangeViewList";
import KanbanView from "../components/KanbanView";
import { getAllProjectMethod } from "../store/actions/projectActions";
import { useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import ProjectFilter from "../components/ProjectFilter";
import NoSearchFound from "../components/NoSearchFound";
import NoDataAvailable from "../components/NoDataAvailable";

const Project = () => {
  const [changeView, setChangeView] = useState("List");
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const [apiHit, setApiHit] = useState(false);
  const [search, setSearch] = useState("");
  const [projectcount, setProjectCount] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))?.role;

  useEffect(() => {
    handleProject();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      getAllProjectMethod(
        (res) => {
          setLoading(false);
          setProjects(res?.data?.data);
          setProjectCount(res?.data?.totalProjects);
        },
        { page: 1, ...(search ? { search } : {}) }
      );
    }, 1000);
    return () => clearTimeout(getData);
  }, [search]);

  const handleProject = (
    status = null,
    startDate = null,
    responsible = null,
    client = null
  ) => {
    setLoading(true);
    getAllProjectMethod(
      (res) => {
        setLoading(false);
        setApiHit(true);
        setProjects(res?.data?.data);
        setProjectCount(res?.data?.totalProjects);
      },
      {
        ...(startDate ? { startDate } : {}),
        ...(status ? { status } : {}),
        ...(responsible ? { projectMember: responsible?.responsible?.id } : {}),
        ...(client ? { clientId: client?.client?.id } : {}),
        page,
      }
    );
  };

  return (
    <React.Fragment>
      <div className="bg-c_101010 text-c_fff min-h-screen px-5">
        <Header
          title={`${labels.project}`}
          btnLabel={labels.newProject}
          handleProject={handleProject}
        />

        <div className="flex flex-col">
          {/* tabination for projects page containing four tabs starts here */}

          <div className="w-full md:gap-x-8 md:flex md:items-center justify-start col-span-5 flex overflow-x-auto scrollbar-hide">
            <button
              className={`pb-2  ${
                tab === "All"
                  ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                  : "text-c_fff/40"
              } `}
              onClick={() => {
                setTab("All");
                handleProject();
              }}
            >
              <p className="w-fit md:text-base text-[14px] md:px-4 px-3">
                {labels.all}
              </p>
            </button>
            <button
              className={`pb-2  ${
                tab === "InProgress"
                  ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                  : "text-c_fff/40"
              } }`}
              onClick={() => {
                handleProject("in_progress");
                setTab("InProgress");
              }}
            >
              <p className="w-fit md:text-base text-[14px] md:px-4 px-3">
                {labels.inProgress}
              </p>
            </button>
            <button
              className={`pb-2  ${
                tab === "Blocked"
                  ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                  : "text-c_fff/40"
              }`}
              onClick={() => {
                setTab("Blocked");
                handleProject("blocked");
              }}
            >
              <p className="w-fit md:text-base text-[14px] md:px-4 px-3">
                {labels.Blocked}
              </p>
            </button>
            <button
              className={`pb-2  ${
                tab === "Complete"
                  ? "text-c_BF642B font-semibold border-b-[1px] border-c_BF642B"
                  : "text-c_fff/40"
              }`}
              onClick={() => {
                setTab("Complete");
                handleProject("complete");
              }}
            >
              <p className="w-fit md:text-base text-[14px] md:px-4 px-3">
                {labels.completed}
              </p>
            </button>
          </div>
          <div className="w-full overflow-x-hidden">
            <div className="flex items-center justify-between my-8">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex items-center gap-x-4 md:pl-0 pl-4">
                <div className="md:flex md:flex-row flex-col items-center justify-between md:gap-x-4">
                  <p className="md:text-sm md:block hidden text-[12px] text-c_fff/80 md:mb-0 mb-2">
                    {labels.changeView}
                  </p>
                  <div className="grid grid-cols-2 border border-c_fff/30 rounded md:mb-0 mb-2">
                    <div
                      className={`col-span-1 ${
                        changeView === "List" ? "bg-c_fff/20" : "bg-transparent"
                      } cursor-pointer`}
                    >
                      <button
                        onClick={() => setChangeView("List")}
                        className="px-3 py-2 flex items-center justify-center"
                      >
                        <ChangeViewList
                          width="20"
                          height="20"
                          color={changeView === "List" ? "#fff" : "#ffffff60"}
                        />
                      </button>
                    </div>
                    <div
                      className={`col-span-1 ${
                        changeView === "Grid" ? "bg-c_fff/20" : "bg-transparent"
                      } cursor-pointer`}
                    >
                      <button
                        onClick={() => setChangeView("Grid")}
                        className="px-3 py-2 flex items-center justify-center"
                      >
                        <ChangeViewGrid
                          width="20"
                          height="20"
                          color={changeView === "Grid" ? "#fff" : "#ffffff60"}
                        />
                      </button>
                    </div>
                  </div>
                  <ProjectFilter handleProject={handleProject} />
                </div>
              </div>
            </div>

            {changeView === "List" ? (
              tab === "All" ? (
                <>
                  <AllProject
                    projects={projects}
                    handleProject={handleProject}
                    role={user}
                    loading={loading}
                    setSearch={setSearch}
                  />
                  <div className="mt-8">
                    {search && projects?.length <= 0 ? (
                      <NoSearchFound entity={labels.project} />
                    ) : (
                      <>
                        {projects?.length ? (
                          <Pagination
                            pageCount={Math.ceil(projectcount) / 10}
                            onPageChange={(event) => {
                              setPage(event?.selected + 1);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-8">
                    {apiHit && projects?.length <= 0 ? (
                      <NoDataAvailable entity={labels.project} />
                    ) : null}
                  </div>
                </>
              ) : tab === "InProgress" ? (
                <>
                  <InProgressProject
                    setSearch={setSearch}
                    loading={loading}
                    role={user}
                    inProgressProject={projects}
                    handleProject={handleProject}
                    setTab={setTab}
                    apiHit={apiHit}
                  />
                  <div className="mt-8">
                    {search && projects?.length <= 0 ? (
                      <NoSearchFound entity={labels.project} />
                    ) : (
                      <>
                        <Pagination
                          pageCount={Math.ceil(projectcount) / 10}
                          onPageChange={(event) => {
                            setPage(event?.selected + 1);
                          }}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : tab === "Blocked" ? (
                <>
                  <BlockedProject
                    setSearch={setSearch}
                    loading={loading}
                    role={user}
                    blockedProject={projects}
                    handleProject={handleProject}
                    apiHit={apiHit}
                  />
                  <div className="mt-8">
                    {search && projects?.length <= 0 ? (
                      <NoSearchFound entity={labels.project} />
                    ) : (
                      <>
                        <Pagination
                          pageCount={Math.ceil(projectcount) / 10}
                          onPageChange={(event) => {
                            setPage(event?.selected + 1);
                          }}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : tab === "Complete" ? (
                <>
                  <CompletedProject
                    setSearch={setSearch}
                    loading={loading}
                    role={user}
                    completedProject={projects}
                    handleProject={handleProject}
                    apiHit={apiHit}
                  />
                  <div className="mt-8">
                    {search && projects?.length <= 0 ? (
                      <NoSearchFound entity={labels.project} />
                    ) : (
                      <>
                        <Pagination
                          pageCount={Math.ceil(projectcount) / 10}
                          onPageChange={(event) => {
                            setPage(event?.selected + 1);
                          }}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : null
            ) : (
              <KanbanView projects={projects} />
            )}
          </div>

          {/* tabination for projects page containing four tabs ends here */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Project;
