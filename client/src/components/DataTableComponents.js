import DataTable from "react-data-table-component";
import { columnsTabel } from "../utils/constants";

const DataTableComponent = ({ data }) => {
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // Overriding row height
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

  return (
    <div className="mt-10 border-2 border-sky-300">
      <DataTable
        columns={columnsTabel}
        data={data}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default DataTableComponent;
