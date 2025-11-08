"use client";

import { useState } from "react";
import { classesData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type ClassItem = {
  id: number;
  code: string;
  brandName: string;
  subjectName: string;
  gradeName: string;
  stepName: string;
  packageName: string;
};

const ClassesListPage = () => {
  const [search, setSearch] = useState("");

  const filteredData = classesData.filter((cls) =>
    [cls.code, cls.brandName, cls.subjectName, cls.gradeName, cls.stepName, cls.packageName]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderRow = (item: ClassItem, index: number) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3 font-semibold">{item.code}</td>
      <td className="px-4 py-3 hidden md:table-cell">{item.brandName}</td>
      <td className="px-4 py-3">{item.subjectName}</td>
      <td className="px-4 py-3 hidden md:table-cell">{item.gradeName}</td>
      <td className="px-4 py-3">{item.stepName}</td>
      <td className="px-4 py-3">{item.packageName}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* VIEW */}
          {/* <Link href={`/list/classes/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="view" width={16} height={16} />
            </button>
          </Link> */}

          {/* EDIT */}
          {/* {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/edit.png" alt="edit" width={16} height={16} />
            </button>
          )} */}

          {/* DELETE */}
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="delete" width={16} height={16} />
            // </button>
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ACTION ICONS */}
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="add" width={14} height={14} />
              // </button>
              <FormModal table="class" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Class Code</th>
              <th className="px-4 py-3 hidden md:table-cell">Brand</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3 hidden md:table-cell">Grade</th>
              <th className="px-4 py-3">Step</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, i) => renderRow(item, i))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER (PAGINATION PLACEHOLDER) */}
      <div className="flex justify-end mt-4 text-sm text-gray-500">
        Showing {filteredData.length} entries
      </div>
    </div>
  );
};

export default ClassesListPage;
