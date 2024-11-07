"use client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/Toast";
import { useAppDispatch } from "../redux/hook";
import { login } from "../redux/userSlice";
import { addUserTable } from "../redux/userTableSlice";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { sampledata } from "@/constant";
import { v4 as uuidv4 } from "uuid";

export const useLoginQuery = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const defaultValue = {
    email: "",
    password: "",
    role: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().label("email").required().email(),
    role: yup.string().label("role").required(),
    password: yup
      .string()
      .label("password")
      .required()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase, one lowercase, a number and a special character"
      ),
  });
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: (values: any) => {
      submitHandler();
    },
    validateOnMount: false,
  });

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutate();
  };

  const payload: any = {
    email: values.email?.trim(),
    password: values.password?.trim(),
    role: values.role,
  };
  useEffect(() => {
    // Prefetch the dashboard page
    navigate.prefetch("/dashboard");
  }, [navigate]);

  const loginFunc = () => {
    return payload;
  };
  const { mutate } = useMutation({
    mutationFn: loginFunc,
    onSuccess: (data) => {
      Toast({ title: "Login Successful", error: false });
      dispatch(
        login({
          email: payload.email,
          role: payload.role,
          status: "active",
          profile: "https://picsum.photos/200/300",
          id: uuidv4(),
          name: payload.email.split("@")[0],
        })
      );
      dispatch(addUserTable(sampledata));
      setSubmitting(false);
      handleReset(payload);
      navigate.push("/dashboard");
    },
    onError: (error: any) => {
      console.log("there was an error", error);
    },
  });
  return {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
  };
};
