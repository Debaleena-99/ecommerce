import React, { useState, useMemo } from "react";
import Modal from "@/components/ui/Modal"; // Import your modal component here
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { advancedTable } from "../../constant/table-data";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../table/react-tables/GlobalFilter";
import DeleteAdmin from "./DeleteAdmin";
import Button from "@/components/ui/Button";

const COLUMNS = [
  {

    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Branch Name",
    accessor: "customer",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={row?.cell?.value.image}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value.name}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "date",
    accessor: "date",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "quantity",
    accessor: "quantity",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "amount",
    accessor: "amount",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row?.cell?.value === "Active"
                ? "text-success-600 bg-success-500"
                : ""
              } 
            ${row?.cell?.value === "Inactive"
                ? "text-danger-600 bg-danger-500"
                : ""
              }
          `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: ({ row }) => {
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      // Handle delete button click
      const handleDeleteClick = () => {
        // alert('hii');
        setIsDeleteModalOpen(true);
      };

      // Handle confirm delete in modal
      const handleConfirmDelete = () => {
        // Perform deletion logic here

        // Close the modal
        setIsDeleteModalOpen(false);
      };

      // Handle cancel delete in modal
      const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
      };

      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button className="action-btn" type="button" onClick={handleDeleteClick}>
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip>
          {/* Delete confirmation modal */}
          {isDeleteModalOpen && (
            <DeleteAdmin
              title="Confirm Deletion"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            >
              <p className="text-red-600">Are you sure you want to delete this item?</p>
            </DeleteAdmin>
          )}
        </div>
      );
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const Index = ({ title = "Admin Details" }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => advancedTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
    // useRowSelect,

    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

      // // Handle delete button click
      // const handleDeleteClick = () => {
      //   // alert('hii');
      //   setIsAddNewModalOpen(true);
      // };

      // // Handle confirm delete in modal
      // const handleConfirmDelete = () => {
      //   // Perform deletion logic here

      //   // Close the modal
      //   setIsAddNewModalOpen(false);
      // };

      // // Handle cancel delete in modal
      // const handleCancelDelete = () => {
      //   setIsAddNewModalOpen(false);
      // };
      
      


      // const handleNewButtonClick = () => {
      //   setIsNewModalOpen(true);
      // };
    
      // // Handle close modal
      // const handleCloseModal = () => {
      //   setIsNewModalOpen(false);
      // };

  return (
    <>
      {/* <button class="flex justify-items-end btn mb-2 transition duration-700 bg-sky-900 hover:bg-cyan-700 text-white ease-in-out ..." type="button">
        <Icon icon="heroicons:plus" className="w-7 h-6" />Add  New</button> */}
      {/* <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          ADMIN
        </h4>
        <div
          className=" md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse"
        >
          
          <Button
            icon="heroicons-outline:plus"
            text="Add New Admin"
            className="btn-dark bg-sky-900 dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg" onClick={handleNewButtonClick}
            
          />
        </div>
      </div> */}
      
      <Card>

        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-sky-900 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
      {/* {isNewModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AddPatient/>
        </Modal>
      )} */}
    </>
  );
};

export default Index;
