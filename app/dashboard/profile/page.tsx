"use client";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/typings";

const Profile = () => {
  const user: User = useAppSelector((state) => state.user.user);
  return (
    <>
      <h2 className=" font-semibold my-3 text-xl p-5">Profile</h2>
      <section className="flex items-center justify-center space-y-3 flex-col">
        <div className="ring-2 ring-[#2550C0] rounded-full bg-[#ECF1FE] flex items-center justify-center relative size-10">
          <Image src='/profile.png' width={20} height={20} className="" alt="profile" />
        </div>
      </section>
      <section className="m-5 flex items-center flex-col space-y-3 sm:space-y-0">
        <aside className="w-full sm:w-1/2 p-5">
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Name: </p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Email Address: </p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">status: </p>
            <p className="font-medium">{user?.status}</p>
          </div>
          <hr className="my-5 bg-[#7E7E7E] h-[1px]" />
          <div className="flex flex-col pointer-events-none ">
            <p className="text-[#7E7E7E] text-sm">Role: </p>
            <p className="font-medium">{user?.role}</p>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Profile;
