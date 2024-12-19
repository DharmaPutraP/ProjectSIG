import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { KECAMATAN, TIPE_RUMAH } from "../utils/constants";

const FilterList = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col border-2 p-4 border-green-500">
        <div className="font-semibold mb-3 text-center">Filter List</div>
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:w-[700px]">
          <FormInput
            type="text"
            labelText="Nama Perumahan"
            name="nama_perumahan"
            value={filters.name}
            onChange={handleChange}
            placeholder="Search..."
          />
          <FormSelect
            labelText="Kecamatan"
            name="kecamatan"
            value={filters.kecamatan}
            onChange={handleChange}
            options={KECAMATAN}
          />
          <FormSelect
            labelText="Tipe"
            name="tipe"
            value={filters.tipe}
            onChange={handleChange}
            options={TIPE_RUMAH}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterList;
