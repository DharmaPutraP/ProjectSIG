import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { KECAMATAN, TIPE_RUMAH } from "../utils/constants";
import { useEffect, useState } from "react";
import { getUniqueValues } from "../utils/api";
import { ToggleSlider } from "react-toggle-slider";

const FilterList = ({ filters, setFilters, toggle }) => {
  const [uniqueValues, setUniqueValues] = useState({
    kecamatan: [],
    tipe: [],
  });
  useEffect(() => {
    // Panggil API untuk mendapatkan nilai unik
    const fetchUniqueValues = async () => {
      try {
        const kecamatanResponse = await getUniqueValues("kecamatan");
        const tipeResponse = await getUniqueValues("tipe");

        setUniqueValues({
          kecamatan: kecamatanResponse.data,
          tipe: tipeResponse.data,
        });
      } catch (error) {
        console.error("Error fetching unique values:", error);
      }
    };

    fetchUniqueValues();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col border-2 p-4 border-green-500">
        <div className="font-semibold mb-3 ">
          Filter List
          <span className="flex float-right font-normal">
            <p className="me-1">Table</p>
            <ToggleSlider onToggle={() => toggle()} />
            <p className="ms-1">List</p>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:w-[700px]">
          <FormInput
            type="text"
            labelText="Nama Perumahan"
            name="nama_perumahan"
            value={filters.nama_perumahan}
            onChange={handleChange}
            placeholder="Search..."
          />
          <FormSelect
            labelText="Kecamatan"
            name="kecamatan"
            value={filters.kecamatan}
            onChange={handleChange}
            options={uniqueValues.kecamatan}
          />
          <FormSelect
            labelText="Tipe"
            name="tipe"
            value={filters.tipe}
            onChange={handleChange}
            options={uniqueValues.tipe}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterList;
