"use client";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import classNames from "classnames";
import ArrowDown from "@/icons/ArrowDown";
import ArrowUp from "@/icons/ArrowUp";
import { useStateContext } from "@/context/context";
import Dropdown from "./dropdown";
import { SquareIcon } from "@/icons/ManageUser";

export function Products({ data, dropdown }) {
  const [products, setProducts] = useState([]);
  const { setEdit, setEditData } = useStateContext();

  const productsData = useMemo(
    () =>
      products?.length > 0
        ? products?.map((product) => {
            if (product?.created_at) {
              let newDate = new Date(product?.created_at).toDateString();
              product.created_at = newDate;
            }
            if (product?.createdAt) {
              let newDate = new Date(product?.createdAt).toDateString();
              product.createdAt = newDate;
            }
            if (product?.endDate) {
              let newDate = new Date(product?.endDate).toDateString();
              product.endDate = newDate;
            }
            if (product?.startDate) {
              let newDate = new Date(product?.startDate).toDateString();
              product.startDate = newDate;
            }
            if (product?.electionDate) {
              let newDate = new Date(product?.electionDate).toDateString();
              product.electionDate = newDate;
            }
            if (product?.phoneNumber) {
              let phoneNumber = product?.phoneNumber?.replace("+234", "0");
              product.phoneNumber = phoneNumber;
            }
            if (product?.dateCreated) {
              let newDate = new Date(product?.dateCreated).toDateString();
              product.dateCreated = newDate;
            }
            return product;
          })
        : [],
    [products]
  );

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => {
              return key !== "id";
            })
            .map((key) => {
              if (key === "createdAt") {
                return {
                  Header: "date",
                  accessor: key,
                  Cell: ({ value }) =>
                    value.length >= 20 ? `${value.slice(0, 20)}...` : value,
                };
              }
              if (key === "profile") {
                return {
                  Header: "profile",
                  accessor: key,
                  Cell: ({ value }) =>
                    value && (
                      <>
                        <img
                          src={value}
                          alt={value}
                          className="rounded-full object-cover size-10"
                        />
                      </>
                    ),
                };
              }
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [...columns]);
  };
  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    if (data?.length > 0) {
      setProducts(data);
    } else {
      setProducts([]);
    }
  }, [data]);

  const isEven = (idx) => idx % 2 === 0;
  return (
    <>
      <div className="w-full">
        <table
          className="w-full overflow-auto scrollbar-hide"
          {...getTableProps()}
        >
          <thead className="capitalize border-spacing-3 border-gray-50 bg-[#fefefefe]">
            {headerGroups?.map((headerGroup, index) => (
              <tr key={index} {...headerGroup?.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column, index) => (
                  <>
                    <th
                      key={index}
                      className="py-1 px-3 lg:py-2 lg:px-5 capitalize text-[#A4A7B7] font-medium text-[]"
                      {...column?.getHeaderProps(
                        column?.getSortByToggleProps()
                      )}
                    >
                      <p className="flex items-center space-x-2">
                        {column?.render("Header")}
                        {column?.isSorted ? (
                          column?.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          ""
                        )}
                      </p>
                    </th>
                  </>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className=" text-xs" {...getTableBodyProps()}>
            {rows?.map((row, idx) => {
              prepareRow(row);

              return (
                <tr
                  key={idx}
                  {...row?.getRowProps()}
                  className={` hover:bg-white border-y-[1px]  ${
                    isEven(idx)
                      ? " cursor-pointer text-xs"
                      : " cursor-pointer text-xs"
                  }`}
                >
                  {row?.cells?.map((cell, idx) => (
                    <>
                      <td
                        key={idx}
                        className={classNames(
                          "font-medium  text-[#031434] p-3",
                          {
                            "bg-green-500  text-white rounded-full w-[100px] flex items-center justify-center mt-5 h-[25px] p-3":
                              cell.value === "active",
                            "bg-[#FF170A]  text-white rounded-full w-[100px] flex items-center justify-center mt-5 h-[25px]  p-3":
                              cell.value === "inactive",
                          }
                        )}
                        {...cell?.getCellProps()}
                      >
                        {cell?.render("Cell")}
                      </td>
                    </>
                  ))}
                  <td className="cursor-pointer">
                    {dropdown?.length > 0 ? (
                      <Dropdown
                        title={<SquareIcon />}
                        subtitle={dropdown}
                        data={row?.original}
                      />
                    ) : (
                      <Dropdown
                        title={
                          <span
                            style={{
                              background: color,
                            }}
                            className="capitalize flex items-center rounded p-2 text-white space-x-2"
                          >
                            <p className="font-semibold">{action}</p>
                            <p>
                              <ArrowView color="#fff" />
                            </p>
                          </span>
                        }
                        action={action}
                        // subtitle={['']}
                        data={row?.original}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
