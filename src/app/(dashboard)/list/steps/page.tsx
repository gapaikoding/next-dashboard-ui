// import FormModal from "@/components/FormModal";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  role,
  brandsData,
  subjectsData,
  gradesData,
  stepsData,
} from "@/lib/data";
import Image from "next/image";

type Step = {
  id: number;
  name: string;
  gradeId: number;
  gradeName: string;
  subjectId: number;
  subjectName: string;
  brandId: number;
  brandName: string;
  moduleLink?: string; // 🆕 Tambahkan field untuk Link Modul
};

const columns = [
  {
    header: "Brand",
    accessor: "brandName",
    className: "hidden md:table-cell",
  },
  {
    header: "Subject",
    accessor: "subjectName",
  },
  {
    header: "Grade",
    accessor: "gradeName",
  },
  {
    header: "Step",
    accessor: "name",
  },
  {
    header: "Link Modul", // 🆕 Kolom baru
    accessor: "moduleLink",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StepListPage = () => {
  // 🔗 Gabungkan relasi antar data (brand → subject → grade → step)
  const stepsWithAllRelations: Step[] = stepsData.map((step) => {
    const grade = gradesData.find((g) => g.id === step.gradeId);
    const subject = subjectsData.find((s) => s.id === grade?.subjectId);
    const brand = brandsData.find((b) => b.id === subject?.brandId);

    return {
      id: step.id,
      name: step.name,
      gradeId: grade?.id || 0,
      gradeName: grade?.name || "Unknown Grade",
      subjectId: subject?.id || 0,
      subjectName: subject?.name || "Unknown Subject",
      brandId: brand?.id || 0,
      brandName: brand?.name || "Unknown Brand",
      moduleLink:
        step.moduleLink ||
        "https://drive.google.com/file/d/1ABCdefGhijkLmNOPqr/view?usp=sharing", // contoh default
    };
  });

  const renderRow = (item: Step) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Brand */}
      <td className="hidden md:table-cell">{item.brandName}</td>

      {/* Subject */}
      <td className="p-4">{item.subjectName}</td>

      {/* Grade */}
      <td className="p-4">{item.gradeName}</td>

      {/* Step */}
      <td className="p-4">{item.name}</td>

      {/* 🆕 Link Modul */}
      <td className="p-4">
        {item.moduleLink ? (
          <a
            href={item.moduleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Buka Modul
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

              {/* Nanti bisa diganti FormModal */}
              <FormModal table="step" type="update" data={item} />
              <FormModal table="step" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Steps</h1>
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
              <FormModal table="step" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={stepsWithAllRelations}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StepListPage;
