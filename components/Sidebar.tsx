"use client";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "../context/context";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useAppSelector } from "../redux/hook";
import classNames from "classnames";
import { User } from "@/typings";
import { Close, Close2 } from "@/icons/Close";
import { sideBar, sideBar1 } from "@/constant/sidebar";
import { Overview } from "@/icons";
import Image from "next/image";

export default function Sidebar() {
  const { openMenu, setEdit, setOpenMenu } = useStateContext();
  const pathname = usePathname();
  const user: User = useAppSelector((state) => state?.user?.user);
  const navigate = useRouter();
  const sidebar = user?.role === 'admin'? sideBar: sideBar1
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMemo(() => {
    windowSize.width <= 1000 ? setOpenMenu(false) : setOpenMenu(true);
  }, [windowSize, pathname]);

  useLayoutEffect(() => {
    if (!user?.email) navigate.push("/");
  }, [user?.email]);

  const reset = () => {
    setEdit(false);
  };
  return (
    <div
      className={classNames("", {
        "w-[220px] flex items-center pt-5 flex-col min-h-screen bg-[#031434] z-[99999] shadow fixed top-0 left-0":
          openMenu,
        "hidden w-0 ": !openMenu,
      })}
    >
      <aside className="w-full p-4">
        <Link
          prefetch
          href="/dashboard"
          className="flex mb-10 items-center justify-center"
        >
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>

        <ul className="flex flex-col space-y-2">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? "bg-[#0A74DC] py-3 px-5 mb-10 rounded flex space-x-3 cursor-pointer items-center"
                : "flex space-x-3 py-3 px-5 mb-10 rounded items-center cursor-pointer hover:bg-[#0A74DC]"
            }
          >
            <span>
              <Overview />
            </span>
            <p className="text-white ">Overview</p>
          </Link>
          {sidebar?.map((item) => (
            <Link
              href={item?.path}
              className={
                pathname
                  ?.replace("/dashboard/", "")
                  ?.startsWith(item?.path?.replace("/dashboard/", ""))
                  ? "bg-[#0A74DC] py-3 px-5 items-center rounded flex space-x-3 cursor-pointer"
                  : "flex space-x-3 items-center cursor-pointer hover:bg-[#0A74DC] py-3 px-5 rounded"
              }
              key={item?.title}
              prefetch
              onClick={reset}
            >
              <p>{item?.icon}</p>
              <p className="text-white">{item?.title}</p>
            </Link>
          ))}
        </ul>
      </aside>
    </div>
  );
}
