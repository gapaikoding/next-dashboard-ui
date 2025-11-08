"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  role,
  announcementsData,
  brandsData,
} from "@/lib/data";
import Image from "next/image";

type Announcement = {
  id: number;
  title: string;
  description: string;
  brandId: number;
  brandName: string;
  date: string;
};

// 📌 Kolom tabel (dengan penambahan kolom Description)
const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Brand",
    accessor: "brandName",
    className: "hidden md:table-cell",
  },
  {
    header: "Date Announced",
    accessor: "date",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AnnouncementListPage = () => {
  // Gabungkan relasi Brand ke setiap pengumuman
  const announcementsWithRelations: Announcement[] = announcementsData.map((announcement) => {
    const brand = brandsData.find((b) => b.id === announcement.brandId);
    return {
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
      brandId: announcement.brandId,
      brandName: brand?.name || "Unknown Brand",
      date: announcement.date,
    };
  });

  // Render tiap baris tabel
  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Title */}
      <td className="p-4 font-medium text-gray-800">{item.title}</td>

      {/* Description */}
      <td className="p-4 hidden md:table-cell text-gray-600">
        {/* Potong teks panjang agar rapi */}
        {item.description.length > 100
          ? item.description.slice(0, 100) + "..."
          : item.description}
      </td>

      {/* Brand */}
      <td className="p-4 hidden md:table-cell">{item.brandName}</td>

      {/* Date */}
      <td className="p-4">{item.date}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {/* VIEW DETAIL */}
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaYellow"
            title="Lihat Detail"
          >
            <Image src="/more.png" alt="view" width={14} height={14} />
          </button>

          {/* Tombol Admin */}
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header Atas */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
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
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Tabel Daftar */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={announcementsWithRelations}
      />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default AnnouncementListPage;
