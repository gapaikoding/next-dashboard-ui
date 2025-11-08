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
  lessonsData,
} from "@/lib/data";
import Image from "next/image";

type Lesson = {
  id: number;
  name: string;
  stepId: number;
  stepName: string;
  gradeId: number;
  gradeName: string;
  subjectId: number;
  subjectName: string;
  brandId: number;
  brandName: string;
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
    accessor: "stepName",
  },
  {
    header: "Lesson",
    accessor: "name",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const LessonListPage = () => {
  // 🔗 Gabungkan relasi antar data (brand → subject → grade → step → lesson)
  const lessonsWithAllRelations: Lesson[] = lessonsData.map((lesson) => {
    const step = stepsData.find((s) => s.id === lesson.stepId);
    const grade = gradesData.find((g) => g.id === step?.gradeId);
    const subject = subjectsData.find((sub) => sub.id === grade?.subjectId);
    const brand = brandsData.find((b) => b.id === subject?.brandId);

    return {
      id: lesson.id,
      name: lesson.name,
      stepId: step?.id || 0,
      stepName: step?.name || "Unknown Step",
      gradeId: grade?.id || 0,
      gradeName: grade?.name || "Unknown Grade",
      subjectId: subject?.id || 0,
      subjectName: subject?.name || "Unknown Subject",
      brandId: brand?.id || 0,
      brandName: brand?.name || "Unknown Brand",
    };
  });

  const renderRow = (item: Lesson) => (
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
      <td className="p-4">{item.stepName}</td>

      {/* Lesson */}
      <td className="p-4">{item.name}</td>

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

              {/* Nanti bisa diganti dengan FormModal */}
            <FormModal table="lesson" type="update" data={item}/>
            <FormModal table="lesson" type="delete" id={item.id}/>
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
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
              <FormModal table="lesson" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={lessonsWithAllRelations}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default LessonListPage;
