import React from "react";
import useAuth from "../Hooks/useAuth";
import Forbidden from "../Pages/Forbidden";
import useRole from "../Hooks/useRole";
import LoadingPage from "../Pages/LoadingPage";

const ModeratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <LoadingPage></LoadingPage>;

  if (role !== "moderator" && role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default ModeratorRoute;
