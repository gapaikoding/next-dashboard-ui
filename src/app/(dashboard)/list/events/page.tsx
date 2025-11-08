// list/events/page.tsx
"use client";

import FormModal from "@/components/FormModal";
// Import komponen umum
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  role,
  // 🔗 Impor data yang diperlukan
  eventsData,
  brandsData,
  subjectsData,
} from "@/lib/data";
import Image from "next/image";

// 📝 Definisikan tipe data untuk Event yang sudah digabungkan (dengan Nama)
type Event = {
  id: number;
  name: string;
  brandId: number;
  brandName: string; // Nama Brand
  subjectId: number;
  subjectName: string; // Nama Subject
  date: string;
  startTime: string;
  endTime: string;
};

// 📌 Kolom Tabel untuk Halaman Daftar Event
const columns = [
  {
    header: "Event Name",
    accessor: "name",
  },
  {
    header: "Brand",
    accessor: "brandName",
    className: "hidden md:table-cell",
  },
  {
    header: "Subject",
    accessor: "subjectName",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Start Time",
    accessor: "startTime",
  },
  {
    header: "End Time",
    accessor: "endTime",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const EventListPage = () => {
  // 🔗 Gabungkan relasi antar data (Event → Brand, Event → Subject)
  const eventsWithAllRelations: Event[] = eventsData.map((event) => {
    // Cari Nama Brand
    const brand = brandsData.find((b) => b.id === event.brandId);
    // Cari Nama Subject
    const subject = subjectsData.find((s) => s.id === event.subjectId);

    return {
      id: event.id,
      name: event.name,
      brandId: event.brandId,
      brandName: brand?.name || "Unknown Brand",
      subjectId: event.subjectId,
      subjectName: subject?.name || "Unknown Subject",
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
    };
  });

  // 🖼️ Fungsi untuk merender setiap baris tabel
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Event Name */}
      <td className="p-4 font-semibold">{item.name}</td>

      {/* Brand Name */}
      <td className="p-4 hidden md:table-cell">{item.brandName}</td>

      {/* Subject Name */}
      <td className="p-4 hidden md:table-cell">{item.subjectName}</td>

      {/* Date */}
      <td className="p-4">{item.date}</td>
      
      {/* Start Time */}
      <td className="p-4 font-medium text-sky-700">{item.startTime}</td>
      
      {/* End Time */}
      <td className="p-4 font-medium text-purple-400">{item.endTime}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* EDIT */}
              {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/edit.png" alt="edit" width={16} height={16} />
              </button> */}

              {/* DELETE */}
              {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                <Image src="/delete.png" alt="delete" width={16} height={16} />
              </button> */}
            <FormModal table="event" type="update" data={item}/>
            <FormModal table="event" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
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
              <FormModal table="event" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={eventsWithAllRelations}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default EventListPage;