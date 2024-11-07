"use client";

import Details from "@/components/Details";
import TableData from "@/components/TableData";
import React from "react";
import useUsers from "@/hooks/useUsers";
import Button from "@/components/Button";
import AddUser from "@/components/AddUser";
import { DeleteUser } from "@/components/DeleteUser";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function page() {
  const {
    users,
    modal,
    handleModal,
    setStatus,
    status,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    userSearch,
    inputText,
    setInputText,
  } = useUsers();

  return (
    <div className="p-5 sm:p-10">
      {modal && (
        <AddUser
          handleModal={handleModal}
          submitHandler={handleSubmit}
          setStatus={setStatus}
          modal={modal}
          status={status}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}

      <p
        onClick={handleModal}
        className="bg-[#0A74DC] flex items-center space-x-3 w-max py-3 cursor-pointer text-white px-7 rounded"
      >
        Add User <PlusIcon className="size-5 text-white ml-4" />
      </p>
      <TableData
        dropdown={["manage users"]}
        loading={users.isLoading}
        title="users"
        data={userSearch}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
}
