import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../utils/api";

const DetailPage = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [perumahan, setPerumahan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerumahan = async () => {
      try {
        const response = await getById(id);
        setPerumahan(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerumahan();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{perumahan.nama_perumahan}</h1>
      <p>
        <b>Alamat:</b> {perumahan.alamat}
      </p>
      <p>
        <b>Tipe:</b> {perumahan.tipe}
      </p>
      <p>
        <b>Luas Tanah:</b> {perumahan.luas_tanah}
      </p>
      <p>
        <b>Kecamatan:</b> {perumahan.kecamatan}
      </p>
      <p>
        <b>No. Telp:</b> {perumahan.nomor_hp}
      </p>
      <img src={perumahan.gambar} alt={perumahan.nama_perumahan} width={300} />
    </div>
  );
};

export default DetailPage;
