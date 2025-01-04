import DataTable from "react-data-table-component";
import { columnsTabel } from "../utils/constants";

const DataTableComponent = ({ data, role, handleDelete }) => {
  const customStyles = {
    table: {
      minHeight: "auto",
    },
    tableWrapper: {
      style: {
        maxHeight: "250px", // Adjust this based on your row height (~50px * 5 rows)
        overflowY: "auto", // Enable scrolling for the table body
      },
    },
    rows: {
      style: {
        minHeight: "50px", // Overriding row height
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#202124",
      },
    },
  };

  const columns = columnsTabel(role, handleDelete);

  return (
    <div className="mt-10 border-2 border-sky-300">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
        fixedHeader
        fixedHeaderScrollHeight="320px"
      />
    </div>
  );
};

export default DataTableComponent;
