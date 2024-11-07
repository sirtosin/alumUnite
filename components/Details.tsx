
import React from "react";

export default function Details({ data }: any) {
  return (
    <div key={data.id} className="p-5 sm:p-10">
      <section className="flex flex-col-reverse space-y-5 sm:space-y-0 sm:flex-row sm:space-x-6">
        <div className="mt-5 sm:mt-0">
          <img
            className="rounded-lg w-[300px] object-cover h-[300px]"
            src={data?.profile}
            alt=""
          />
        </div>
        <div>
          <div>
            <h2 className="text-2xl capitalize font-semibold mb-5">{data?.name}</h2>
            <p className="text-[#303B54]">email: {data?.email}</p>
            <p className="text-[#303B54]">role: {data?.role}</p>
            <p className="text-[#303B54]">status: {data?.status}</p>
          </div>
        </div>
      </section>
    </div>
  );
}



