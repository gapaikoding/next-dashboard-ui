// import FormModal from "@/components/FormModal";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, brandsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Brand = {
  id: number;
  name: string;
};

const columns = [
  {
    header: "Brand Name",
    accessor: "name",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const BrandListPage = () => {
  const renderRow = (item: Brand) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      {/* <td className="hidden md:table-cell">{item.subjects.join(", ")}</td> */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (

          //   <Link href={`/list/brands/${item.id}`}>
          //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
          //   <Image src="/view.png" alt="" width={16} height={16} />
          //   </button>
          // </Link>
          //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          //       <Image src="/delete.png" alt="" width={16} height={16} />
          //   </button>
            <>
              <FormModal table="brand" type="update" data={item} />
              <FormModal table="brand" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Brands</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && 
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                //     <Image src="/plus.png" alt="" width={14} height={14} />
                // </button>
            <FormModal table="brand" type="create" />
            }
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={brandsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default BrandListPage;
