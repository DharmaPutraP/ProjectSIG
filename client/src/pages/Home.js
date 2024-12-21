import React, { useState, useEffect } from "react";
import FilterList from "../components/FilterList";
import DataTableComponent from "../components/DataTableComponents";
import Map from "../components/Map";
import { getAll } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parseUrlParams = () => {
    const urlParams = new URLSearchParams(location.search);
    return {
      nama_perumahan: urlParams.get("nama_perumahan") || "",
      kecamatan: urlParams.get("kecamatan") || "",
      tipe: urlParams.get("tipe") || "",
      harga: urlParams.get("harga") || "",
    };
  };
  const [filters, setFilters] = useState(parseUrlParams());

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

  useEffect(() => {
    // Update URL with the current filter values
    const queryParams = new URLSearchParams(filters);
    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [filters, navigate]);

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
          id: d._id,
          kecamatan: d.kecamatan,
        }))}
      />
    </>
  );
};
export default Home;
