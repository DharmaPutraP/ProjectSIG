import React, { useState, useEffect } from "react";
import FilterList from "../components/FilterList";
import DataTableComponent from "../components/DataTableComponents";
import CardList from "../components/CardList";
import Map from "../components/Map";
import { getAll } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deletePerumahan } from "../utils/api";

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user"))?.role || "guest";

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
  const [mapCenter, setMapCenter] = useState({
    latitude: 0.5,
    longitude: 101.48,
    zoom: 12,
  });

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
  }, [refreshKey]);

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

  const [view, setView] = useState("table");
  const toggleView = () => {
    setView((prevView) => (prevView === "table" ? "list" : "table"));
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah ingin menghapus?",
      text: "Kamu tidak dapat mengembalikanya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePerumahan(id);
          Swal.fire("Deleted!", "Perumahan Berhasil Dihapus.", "success");
          setRefreshKey((prevKey) => prevKey + 1);
          // Trigger a refresh or re-fetch the data
        } catch (error) {
          toast.error("Failed to delete Perumahan");
        }
      }
    });
  };
  return (
    <>
      <FilterList
        filters={filters}
        setFilters={setFilters}
        toggle={toggleView}
      />
      <div className="flex justify-center mt-4 sm:mt-0 sm:justify-end">
        {/* <p className="me-1">Table</p>
        <ToggleSlider onToggle={() => toggleView()} />
        <p className="ms-1">List</p> */}
      </div>

      {view === "list" ? (
        <div className="flex w-full h-screen mb-10">
          <div className="hidden sm:block mt-10 me-5 border-2 p-3 rounded-md border-green-300 overflow-y-auto">
            {filteredData.map((item) => (
              <CardList
                key={item._id}
                id={item._id}
                nama={item.nama_perumahan}
                alamat={item.alamat}
                gambar={item.imgUrl}
                longitude={item.y}
                latitude={item.x}
                onCardClick={
                  (latitude, longitude) =>
                    setMapCenter({ latitude, longitude, zoom: 16 }) // Zoom and center the map
                }
              />
            ))}
          </div>
          <Map
            style="w-full sm:w-5/6"
            locations={filteredData.map((d) => ({
              latitude: d.x,
              longitude: d.y,
              name: d.nama_perumahan,
              address: d.alamat,
              id: d._id,
              kecamatan: d.kecamatan,
            }))}
            mapCenter={mapCenter}
          />
        </div>
      ) : (
        <>
          <DataTableComponent
            data={filteredData}
            role={userRole}
            handleDelete={handleDelete}
          />
          <Map
            locations={filteredData.map((d) => ({
              latitude: d.x,
              longitude: d.y,
              name: d.nama_perumahan,
              address: d.alamat,
              id: d._id,
              kecamatan: d.kecamatan,
            }))}
            mapCenter={mapCenter}
          />
        </>
      )}
    </>
  );
};
export default Home;
