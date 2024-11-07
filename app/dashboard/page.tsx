"use client";
import DashboardCard from "@/components/DashboardCard";
import React from "react";
import TableData from "@/components/TableData";
import useUsers from "@/hooks/useUsers";

export default function page() {
  const {
    users,
    activeUsers,
    inactiveUsers,
    inputText,
    setInputText,
    userSearch,
    user,
  } = useUsers();
  return (
    <div>
      <div className="flex space-x-2 flex-wrap">
        <DashboardCard
          number={users.data?.length ?? 0}
          title="Total Users"
          color="#A9C1FF"
        />
        <DashboardCard
          number={activeUsers?.length ?? 0}
          title="Total Active Users"
          color="#A9FFE0"
        />
        <DashboardCard
          number={inactiveUsers?.length ?? 0}
          title="Total Inactive Users"
          color="#FFA9EC"
        />
      </div>
      <TableData
        dropdown={user?.role === "admin" ? ["manage users"] : ['']}
        loading={users.isLoading}
        title="users"
        data={userSearch}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
}
