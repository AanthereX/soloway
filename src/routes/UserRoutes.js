import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Project from "../pages/Project";
import Profile from "../pages/Profile";
import ProjectDetail from "../pages/ProjectDetail";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";
import PublicRoutes from "./PublicRoutes";
import Signup from "../pages/Signup";
import VerifyOTP from "../pages/VerifyOTP";
import ForgetPassword from "../pages/ForgetPassword";
import Notifications from "../pages/Notifications";
import User from "./../pages/User";
import BudgetDetails from "../components/BudgetDetails";
const user = JSON.parse(localStorage.getItem("user"));

const UserRoutes = () => {
  const Dashboard = () => (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
  return (
    <Routes>
      <Route
      // element={<ProtectedRoutes role={"user"} redirectLink={"/project"} />}
      >
        {" "}
        {user?.role === "user" ? (
          <>
            <Route path="/" element={<Navigate to="/project" replace />} />
            <Route path="/login" element={<Navigate to="/project" replace />} />
            <Route path="*" element={<Navigate to="/project" replace />} />

          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route element={<Dashboard />}>
          <Route path="/project" element={<Project />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/budget-details/:id" element={<BudgetDetails />} />
          <Route path="/user" element={<User />} />
          <Route path="/notification" element={<Notifications />} />
        </Route>
      </Route>
      <Route element={<Dashboard />}>
        <Route
          element={
            <ProtectedRoutes role={"client"} redirectLink={"/project"} />
          }
        >
          <Route path="/project" element={<Project />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/budget-details/:id" element={<BudgetDetails />} />
          <Route path="/notification" element={<Notifications />} />
        </Route>
      </Route>

      {/* <Route path="/" element={<Navigate to="/project" replace />} /> */}

      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
        redirectLink={"/project"}
      />
      {/* <Route
        path="/signup"
        element={
          <PublicRoutes redirectLink={"/project"}>
            <Signup />
          </PublicRoutes>
        }
      /> */}
      <Route path="/verify" element={<VerifyOTP />} />
      <Route
        path="/forgot-password"
        element={
          <PublicRoutes redirectLink={"/project"}>
            <ForgetPassword />
          </PublicRoutes>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
