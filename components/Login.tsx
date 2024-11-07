"use client";
import React from "react";
import Card from "./Card";
import Input from "./Input";
import { useLoginQuery } from "@/hooks/useLoginQuery";
import Button from "./Button";

export default function Login() {
  const {
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    isSubmitting,
  } = useLoginQuery();
  return (
    <div className="w-full sm:w-3/4 lg:w-1/2">
      <Card>
        <section className="p-5 space-y-6 sm:p-10 w-full">
          <div className="space-y-1">
            <h2 className="text-[#434854] text-2xl font-semibold">Login</h2>
            <p className="text-[#737373] text-sm">
              Kindly enter your details to log in
            </p>
          </div>
          <form className="space-y-4 w-full">
            <Input
              label="Email Address"
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
            <Input
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password ? (
              <b className="text-xs text-red-500">{errors.password}</b>
            ) : null}
            <Button
              loading={isSubmitting}
              label="Login"
              onClick={handleSubmit}
              styles="bg-[#0A74DC]  w-full"
            />
            <p className="text-sm text-[#0A74DC] text-center cursor-pointer">
              Forgot your password?
            </p>
            <div className="space-x-1 justify-center flex items-center cursor-pointer">
              <p className="text-[#B0B9C8] text-xs underline">Privacy Policy</p>
              <p className="text-xs text-[#bac2cf]">and</p>
              <p className="text-[#B0B9C8] text-xs underline">
                {" "}
                Terms of services
              </p>
            </div>
          </form>
        </section>
      </Card>
    </div>
  );
}
