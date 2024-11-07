"use client";
import TableData from "@/components/TableData";
import React from "react";
import useUsers from "@/hooks/useUsers";
import { DeleteUser } from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";

export default function page() {
  const {
    users,
    edit,
    editData,
    setEdit,
    deleteUsers,
    table,
    changeUserStatus,
    status,
    setStatus,
    inputText,
    setInputText,
    userSearch,
  } = useUsers();

  return (
    <div className="p-5 sm:p-10">
      {edit && table === "delete" && (
        <DeleteUser
          handleModal={() => setEdit(false)}
          modal={edit}
          editData={editData}
          handleSubmit={deleteUsers}
          loading={false}
        />
      )}
      {edit && table === "status" && (
        <EditUser
          handleModal={() => setEdit(false)}
          modal={edit}
          status={status}
          setStatus={setStatus}
          editData={editData}
          submitHandler={changeUserStatus}
        />
      )}
      <TableData
        dropdown={["delete users", "change status",'view user']}
        loading={users.isLoading}
        title="manage users"
        data={userSearch}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
}
