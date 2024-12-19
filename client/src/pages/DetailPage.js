import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyData } from "../utils/dummyData"; // Gunakan data dummy

const DetailPage = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [house, setHouse] = useState(null);

  useEffect(() => {
    // Cari data berdasarkan ID
    const selectedHouse = dummyData.find((item) => item.id === parseInt(id));
    setHouse(selectedHouse);
  }, [id]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{house.nama_perumahan}</h1>
      <p>
        <b>Alamat:</b> {house.alamat}
      </p>
      <p>
        <b>Tipe:</b> {house.tipe}
      </p>
      <p>
        <b>Luas Tanah:</b> {house.luas_tanah}
      </p>
      <p>
        <b>Kecamatan:</b> {house.kecamatan}
      </p>
      <p>
        <b>No. Telp:</b> {house.nomor_hp}
      </p>
      <img src={house.gambar} alt={house.nama_perumahan} width={300} />
    </div>
  );
};

export default DetailPage;
