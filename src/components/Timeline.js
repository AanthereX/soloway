import React, { useEffect, useState } from "react";
import { labels } from "../configs/Labels";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAllTaskProjectMethod } from "../store/actions/projectActions";
import { useParams } from "react-router";

const Timelines = () => {
  const [tasks, setTasks] = useState([]);
  const params = useParams();
  const startDay = JSON.parse(localStorage.getItem("detail"))?.startDay;
  useEffect(() => {
    getAllTaskProjectMethod(params?.id, { page: 1 }, (res) => {
      setTasks(
        res?.data?.map((task) => {
          return {
            ...task,
            start: task?.startDate,
            end: task?.dueDate,
          };
        })
      );
    });
  }, []);
  // console.log(tasks, "tasks");
  const calendarOptions = {
    firstDay: startDay === "Monday" ? 1 : 0,
    plugins: [timeGridPlugin, dayGridPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      end: "timeGridWeek,dayGridMonth",
    },
    events: tasks || [],
    dayMaxEvents: "3",
    selectable: true,
    eventContent: (eventData) => {
      // console.log(eventData, "eventData");
      return (
        <div>
          <div className="flex gap-x-3 items-center my-4 pl-4 text-sm text-c_fff !rounded-tl-md !rounded-bl-md">
            <span
              className={
                eventData?.event?._def?.extendedProps?.type === "Interiors"
                  ? "rounded-full w-4 h-4 bg-teal-500"
                  : "rounded-full w-4 h-4 bg-orange-500"
              }
            ></span>

            <span>
              {eventData?.event?._def?.title?.length > 30
                ? eventData?.event?._def?.title?.substring(0, 30) + "..."
                : eventData?.event?._def?.title}
            </span>
          </div>
        </div>
      );
    },
  };
  return (
    <div className="rounded-[8px] bg-[#FFFFFF12] w-full py-6 px-4 my-6">
      <div className="flex items-center justify-between">
        <p className="inline-flex gap-x-3 text-[20px] text-c_fff/90">
          {labels.timeline}{" "}
        </p>
      </div>
      <FullCalendar {...calendarOptions} themeSystem="slate" />
    </div>
  );
};

export default Timelines;
