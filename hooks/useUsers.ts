"use client";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useStateContext } from "@/context/context";
import { addUserTable } from "@/redux/userTableSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { User, userTableType } from "@/typings";
import { useFormik } from "formik";
import * as yup from "yup";
import { Toast } from "@/components/Toast";
import { v4 as uuidv4 } from "uuid";

export default function useUsers() {
  const { setEdit, edit, editData, table } = useStateContext();
  const [inputText, setInputText] = useState("");
  const deferedValue = useDeferredValue(inputText);
  const user: User = useAppSelector((state) => state?.user?.user);
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/200/300");
  const [status, setStatus] = useState("active");
  const handleModal = () => setModal((prev) => !prev);
  const dispatch = useAppDispatch();
  const userTable = useAppSelector((state) => state.userTable.userTable);

  const validationSchema = yup.object().shape({
    email: yup.string().label("email").required().email(),
    name: yup.string().label("name").required(),
    role: yup.string().label("role").required(),
  });
  const defaultValue = {
    email: "",
    name: "",
    role: "",
  };

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();
    mutate();
  };
  const fetchUsers = async () => {
    const resp = await dispatch(addUserTable(userTable));
    return resp?.payload;
  };

  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnReconnect: true,
    retry: 5,
    retryDelay: 100,
    staleTime: 5000,
    refetchOnMount: true,
    refetchInterval: 9000, // 2 minutes
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    onSuccess: (data) => {
      console.log("data", data);
    },

    onError: (error: any) => console.error(error),
  });
  const userSearch = useMemo(
    () =>
      deferedValue
        ? users?.data?.filter(
            (item: userTableType) =>
              item?.name
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.email
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim()) ||
              item?.role
                ?.toLowerCase()
                ?.includes(deferedValue?.toLowerCase()?.trim())
          )
        : users?.data,
    [deferedValue, users?.data]
  );
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
  const generateRandomImage = () => {
    const randomWidth = Math.floor(Math.random() * 500) + 200; // Random width between 200 and 700
    const randomHeight = Math.floor(Math.random() * 500) + 200; // Random height between 200 and 700
    setImageUrl(`https://picsum.photos/${randomWidth}/${randomHeight}`);
  };
  const payload: userTableType = {
    name: values.name,
    email: values.email,
    role: values.role,
    status: status,
    profile: imageUrl,
    id: uuidv4(),
  };
  const addUser = () => {
    setSubmitting(true);

    return [...userTable, payload];
  };
  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: (userdata) => {
      Toast({ title: "User Added Successfully", error: false });
      dispatch(addUserTable(userdata));
      console.log("userdata", userdata);
      handleModal();
      setSubmitting(false);
      handleReset(payload);
    },
    onError: (error: any) => {
      console.log("there was an error", error);
    },
  });
  const activeUsers = users.data?.filter(
    (user: userTableType) => user.status === "active"
  );
  const inactiveUsers = users.data?.filter(
    (user: userTableType) => user.status === "inactive"
  );
  const deleteUsers = async (user: userTableType) => {
    const dataItem = users.data?.filter(
      (item: userTableType) => item.id !== user.id
    );
    const resp = await dispatch(addUserTable(dataItem));
    Toast({ title: "User Deleted Successfully", error: false });
    setEdit(false);
  };
  const changeUserStatus = async (user: userTableType) => {
    const editedUser = userTable.map((obj) =>
      obj?.id === user.id ? { ...obj, status: status } : obj
    );
    Toast({ title: "Status Changed Successfully", error: false });
    dispatch(addUserTable(editedUser));
    setEdit(false);
  };
  useEffect(() => {
    generateRandomImage();
  }, []);
  return {
    users,
    table,
    setEdit,
    edit,
    editData,
    activeUsers,
    inactiveUsers,
    handleModal,
    modal,
    status,
    setStatus,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    deleteUsers,
    changeUserStatus,
    inputText,
    setInputText,
    userSearch,
    user,
  };
}
