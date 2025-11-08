"use client";

import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, sessionsData, classesData } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Session = {
  id: number;
  classId: number;
  date: string;
  time: string;
  tutor: string;
  lesson: string;
  attendance: string;
};

const columns = [
  {
    header: "Class Code",
    accessor: "classCode",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Time",
    accessor: "time",
    className: "hidden md:table-cell",
  },
  {
    header: "Tutor",
    accessor: "tutor",
    className: "hidden md:table-cell",
  },
  {
    header: "Lesson",
    accessor: "lesson",
    className: "hidden md:table-cell",
  },
  {
    header: "Attendance",
    accessor: "attendance",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SessionListPage = () => {
  const renderRow = (item: Session) => {
    const cls = classesData.find((c) => c.id === item.classId);
    const classCode = cls ? cls.code : `Class #${item.classId}`;

    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="p-4 font-medium text-gray-800">{classCode}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td className="hidden md:table-cell">{item.time}</td>
        <td className="hidden md:table-cell">{item.tutor}</td>
        <td className="hidden md:table-cell">{item.lesson}</td>

        {/* Kolom Attendance */}
{/* Kolom Attendance - Mode Read-Only */}
<td className="p-2 justify-start">
  {/* Tentukan warna badge berdasarkan nilai item.attendance */}
  {item.attendance === "Present" && (
    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
      Present
    </span>
  )}
  {item.attendance === "Absent" && (
    <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
      Absent
    </span>
  )}
  {item.attendance === "Reschedule" && (
    <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
      Reschedule
    </span>
  )}
</td>

        {/* Kolom Action */}
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/sessions/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/view.png" alt="View" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <>
                {/* <Link href={`/list/sessions/${item.id}/edit`}>
                  <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                    <Image src="/edit.png" alt="Edit" width={16} height={16} />
                  </button>
                </Link>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                  <Image src="/delete.png" alt="Delete" width={16} height={16} />
                </button> */}
                <FormModal table="session" type="update" data={item}/>
                <FormModal table="session" type="delete" id={item.id}/>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Sessions</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="Add" width={14} height={14} />
              // </button>
              <FormModal table="session" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={sessionsData} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SessionListPage;
