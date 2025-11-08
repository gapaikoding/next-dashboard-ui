// list/results/page.tsx
"use client";

import FormModal from "@/components/FormModal";
// import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  role,
  resultsData,
  studentsData, 
  subjectsData, 
  gradesData, 
  brandsData, 
  classesData,
} from "@/lib/data";
import Image from "next/image";

// 📝 Definisikan tipe data untuk hasil yang sudah digabungkan
type Result = {
  id: number;
  studentId: number;
  studentName: string;
  brandId: number;
  brandName: string; // 💡 PROPERTI NAMA BARU
  classId: number;
  className: string; // 💡 PROPERTI NAMA BARU
  subjectId: number;
  subjectName: string;
  gradeId: number;
  gradeName: string;
  score: number;
  reportLink: string;
  certificateLink: string;
};

// 📌 Kolom Tabel untuk Halaman Hasil Ujian
const columns = [
  {
    header: "Student",
    accessor: "studentName",
  },
  // 💡 PERBAIKAN: Mengganti accessor dari 'classId' menjadi 'className'
  {
    header: "Class", // Header diubah dari 'Class ID' menjadi 'Class'
    accessor: "className",
    className: "hidden md:table-cell", 
  },
  // 💡 PERBAIKAN: Mengganti accessor dari 'brandId' menjadi 'brandName'
  {
    header: "Brand", // Header diubah dari 'Brand ID' menjadi 'Brand'
    accessor: "brandName",
    className: "hidden md:table-cell", 
  },
  {
    header: "Subject",
    accessor: "subjectName",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "gradeName",
  },
  {
    header: "Score",
    accessor: "score",
  },
  {
    header: "Report Link",
    accessor: "reportLink",
  },
  {
    header: "Certificate",
    accessor: "certificateLink",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ResultListPage = () => {
  // 🔗 Gabungkan relasi antar data
  const resultsWithAllRelations: Result[] = resultsData.map((result) => {
    // ⚠️ Asumsi data master tersedia
    const student = studentsData.find((s) => s.id === result.studentId);
    const subject = subjectsData.find((s) => s.id === result.subjectId);
    const grade = gradesData.find((g) => g.id === result.gradeId);
    const brand = brandsData.find((b) => b.id === result.brandId); // Ambil Brand
    const classroom = classesData.find((c) => c.id === result.classId); // Ambil Class

    return {
      id: result.id,
      studentId: result.studentId,
      studentName: student?.name || "Unknown Student", 
      
      // 💡 Menggunakan properti NAME dari relasi
      brandId: result.brandId,
      brandName: brand?.name || "Unknown Brand", // Menambahkan nama Brand
      classId: result.classId,
      className: classroom?.code || "Unknown Class", // Menambahkan nama Class
      subjectId: result.subjectId,
      subjectName: subject?.name || "Unknown Subject", 
      gradeId: result.gradeId,
      gradeName: grade?.name || "Unknown Grade", 
      score: result.score,
      reportLink: result.reportLink,
      certificateLink: result.certificateLink,
    };
  });

  // 🖼️ Fungsi untuk merender setiap baris tabel
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Student Name */}
      <td className="p-4 font-semibold">{item.studentName}</td>

      {/* 💡 PERBAIKAN: Menampilkan Class Name */}
      <td className="p-4 hidden md:table-cell">{item.className}</td>

      {/* 💡 PERBAIKAN: Menampilkan Brand Name */}
      <td className="p-4 hidden md:table-cell">{item.brandName}</td>

      {/* Subject */}
      <td className="p-4 hidden md:table-cell">{item.subjectName}</td>

      {/* Grade */}
      <td className="p-4">{item.gradeName}</td>

      {/* Score */}
      <td className="p-4 font-bold text-purple-800">{item.score}</td>

      {/* Report Link */}
      <td className="p-4">
        {item.reportLink ? (
          <a
            href={item.reportLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            Lihat Laporan
          </a>
        ) : (
          "-"
        )}
      </td>

      {/* Certificate Link */}
      <td className="p-4">
        {item.certificateLink ? (
          <a
            href={item.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline text-xs"
          >
            Cetak Sertifikat
          </a>
        ) : (
          "-"
        )}
      </td>

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

            <FormModal table="result" type="update" data={item}/>
            <FormModal table="result" type="delete" id={item.id}/>
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
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
              <FormModal table="result" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={resultsWithAllRelations}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ResultListPage;