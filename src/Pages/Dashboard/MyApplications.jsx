import React from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import useAuth from "../../Hooks/useAuth"

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: applications = [] } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  return <div>MyApplications</div>;
};

export default MyApplications;
