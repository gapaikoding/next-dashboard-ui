import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, brandsData, subjectsData, packagesData } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Package = {
  id: number;
  name: string;
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
    header: "Subject Name",
    accessor: "subjectName",
  },
  {
    header: "Package Name",
    accessor: "name",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const PackageListPage = () => {
  // 🔗 Gabungkan data package dengan subject dan brand-nya
  const packagesWithSubjectAndBrand: Package[] = packagesData.flatMap(
    (pkgGroup) => {
      const subject = subjectsData.find((s) => s.id === pkgGroup.subjectId);
      const brand = brandsData.find((b) => b.id === subject?.brandId);

      return pkgGroup.packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        subjectId: subject?.id || 0,
        subjectName: subject?.name || "Unknown Subject",
        brandId: brand?.id || 0,
        brandName: brand?.name || "Unknown Brand",
      }));
    }
  );

  const renderRow = (item: Package) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Brand */}
      <td className="hidden md:table-cell">{item.brandName}</td>

      {/* Subject */}
      <td className="p-4">{item.subjectName}</td>

      {/* Package */}
      <td className="p-4">{item.name}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* EDIT */}
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/edit.png" alt="edit" width={16} height={16} />
              </button>

              {/* DELETE */}
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                <Image src="/delete.png" alt="delete" width={16} height={16} />
              </button>

              {/* (Nanti bisa diganti FormModal) */}
            <FormModal table="package" type="update" data={item}/>
            <FormModal table="package" type="delete" id={item.id}/>
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
        <h1 className="hidden md:block text-lg font-semibold">All Packages</h1>
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
              <FormModal table="package" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={packagesWithSubjectAndBrand}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default PackageListPage;
