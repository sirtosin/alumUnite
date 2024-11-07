"use client";
import Details from "@/components/Details";
import useUsers from "@/hooks/useUsers";
import Link from "next/link";
import React from "react";

export default function page() {
  const { editData } = useUsers();
  return (
    <div>
      <Link
        className="text-gray-500 cursor-pointer font-medium my-10 capitalize"
        href="/dashboard/users"
      >
        back to users
      </Link>
      <Details data={editData} />
    </div>
  );
}
