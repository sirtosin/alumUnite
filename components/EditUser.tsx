"use client";
import React, { useState } from "react";
import ModalCard from "./Modal";
import Button from "./Button";

interface Props {
  handleModal: () => void;
  submitHandler: (e:any) => void;
  setStatus: (e: string) => void;
  modal: boolean;
  status: string;
  editData: any;
}
export default function EditUser({
  handleModal,
  modal,
  submitHandler,
  setStatus,
  editData,
  status,
}: Props) {
  return (
    <ModalCard setOpen={handleModal} open={modal}>
      <h2 className="font-bold mb-4 text-xl">Change Status</h2>
      <hr className=" my-2 h-0.5" />
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
      <Button
        onClick={() => submitHandler(editData)}
        label={"Save"}
        styles="bg-[#2550C0] w-full rounded mx-auto mt-4"
        loading={false}
      />
    </ModalCard>
  );
}
