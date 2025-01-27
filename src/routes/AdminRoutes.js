import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Project from "../pages/Project";
import Profile from "../pages/Profile";
import ProjectDetail from "../pages/ProjectDetail";
import User from "../pages/User";
import Sidebar from "../components/Sidebar";
import Notifications from "../pages/Notifications";
import EmailNotifications from "../pages/EmailNotifications";
import BudgetDetails from "../components/BudgetDetails";

const AdminRoutes = () => {
  const Dashboard = () => (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
  return (
    <React.Fragment>
      <Routes>
        <Route element={<Dashboard />}>
          <Route
          // element={
          //   <ProtectedRoutes role={"admin"} redirectLink={"/project"} />
          // }
          >
            <Route path="/" element={<Navigate to="/project" replace />} />
            <Route path="*" element={<Navigate to="/project" replace />} />
            <Route path="/login" element={<Navigate to="/project" replace />} />
            {/* <Route path="/signup" element={<Navigate to="/project" replace />} /> */}
            <Route path="/project" element={<Project />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project-detail/:id" element={<ProjectDetail />} />
            <Route path="/budget-details/:id" element={<BudgetDetails />} />
            <Route path="/user" element={<User />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/email-notification" element={<EmailNotifications />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AdminRoutes;
