import React, { useState, useEffect } from "react";
import FilterList from "../components/FilterList";
import DataTableComponent from "../components/DataTableComponents";
import Map from "../components/Map";
import { getAll } from "../utils/api";

const Home = () => {
  const [filters, setFilters] = useState({
    nama_perumahan: "",
    kecamatan: "",
    tipe: "",
    harga: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ambil data dari server
    const fetchData = async () => {
      try {
        const response = await getAll();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (!filters.nama_perumahan ||
        item.nama_perumahan
          .toLowerCase()
          .includes(filters.nama_perumahan.toLowerCase())) &&
      (!filters.kecamatan || item.kecamatan === filters.kecamatan) &&
      (!filters.tipe || item.tipe === parseInt(filters.tipe)) &&
      (!filters.harga || item.harga <= filters.harga)
    );
  });

  return (
    <>
      <FilterList filters={filters} setFilters={setFilters} />
      <DataTableComponent data={filteredData} />
      <Map
        locations={filteredData.map((d) => ({
          latitude: d.x,
          longitude: d.y,
          name: d.nama_perumahan,
          address: d.alamat,
          id: d.id,
        }))}
      />
    </>
  );
};
export default Home;
