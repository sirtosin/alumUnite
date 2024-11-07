"use client";
import React, { useState } from "react";
import ModalCard from "./Modal";
import Button from "./Button";
import Input from "./Input";
interface Props {
  handleModal: () => void;
  submitHandler: () => void;
  setStatus: (e:string) => void;
  modal: boolean;
  status: string;
  values: any;
  handleBlur: (e:any) => void;
  handleChange: (e:any) => void;
  errors: any;
  isSubmitting: boolean;
}
export default function AddUser({
  handleModal,
  modal,
  submitHandler,
  setStatus,
  status,
  values,
  handleBlur,
  handleChange,
  errors,
  isSubmitting,
}: Props) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">Add User</h2>
      <hr className=" my-2 h-0.5" />

      <Input
        label="full name"
        placeholder="john doe"
        name="name"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {errors.name ? (
        <b className="text-xs text-red-500">{errors.name}</b>
      ) : null}
      <Input
        label="email address"
        placeholder="john@doe.com"
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {errors.email ? (
        <b className="text-xs text-red-500">{errors.email}</b>
      ) : null}
      <div className="font-semibold capitalize flex flex-col space-y-1 w-full my-2">
        <label htmlFor="role" className="text-sm font-medium">
          User Role
        </label>
        <select
          className={`p-2 outline-none rounded w-full ${
            true
              ? "border-[1px] border-[#2550C0] "
              : "border-[1px] border-gray-300 text-sm text-[#979797]"
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.role}
          name="role"
        >
          <option value="">Select User Role</option>
          {["user", "admin", "guest"].map((item: any) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      {errors.role ? (
        <b className="text-xs text-red-500">{errors.role}</b>
      ) : null}
      <div className="font-semibold capitalize flex flex-col space-y-1 w-full my-2">
        <label htmlFor="status" className="text-sm font-medium">
          status
        </label>
        <div className="flex items-center justify-between">
          <p
            onClick={() => setStatus("active")}
            className={`rounded font-semibold p-2 w-1/2 flex items-center justify-center mx-2  capitalize cursor-pointer ${
              status === "active"
                ? "bg-[#25c037] text-white"
                : "border-[#eeeeef] border-2 text-[#eeeeef]"
            }`}
          >
            active
          </p>
          <p
            onClick={() => setStatus("inactive")}
            className={`rounded  p-2 w-1/2 flex items-center justify-center mx-2 font-semibold capitalize cursor-pointer ${
              status === "inactive"
                ? "bg-[#c02a25] text-white"
                : "border-[#eeeeef] border-2 text-[#eeeeef]"
            }`}
          >
            inactive
          </p>
        </div>
      </div>
      <Input
        label="profile upload"
        name="profile"
        type="file"
      />
      <Button
        onClick={submitHandler}
        label={"Save"}
        styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
        loading={isSubmitting}
      />
    </ModalCard>
  );
}
