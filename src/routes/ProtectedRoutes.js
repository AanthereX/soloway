import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProtectedRoutes = ({ role, redirectLink }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader loading={!user} color={"white"} />
      </div>
    );
  }
  return user?.role === role ? (
    <>
      <Outlet />
    </>
  ) : user ? (
    <>
      <Navigate to={"/project"} state={{ from: location }} />
    </>
  ) : (
    <>
      <Navigate to={"/login"} state={{ from: location }} replace />
    </>
  );
};

export default ProtectedRoutes;
