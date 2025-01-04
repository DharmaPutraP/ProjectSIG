import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../utils/api";
import Map from "../components/Map";

const DetailPage = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [perumahan, setPerumahan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    latitude: -0.5,
    longitude: 101.45,
    zoom: 13,
  });

  useEffect(() => {
    const fetchPerumahan = async () => {
      try {
        const response = await getById(id);
        setPerumahan(response.data);
        setMapCenter({
          latitude: response.data.x,
          longitude: response.data.y,
          zoom: 16, // Adjust zoom level for details view
        });
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
  const RupiahFormatter = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Map
        style="h-[20rem]"
        locations={{
          id: perumahan._id,
          latitude: perumahan.x,
          longitude: perumahan.y,
          name: perumahan.nama_perumahan,
          address: perumahan.alamat,
          kecamatan: perumahan.kecamatan,
        }}
        mapCenter={mapCenter}
      />
      <div className="pt-10 flex flex-col sm:flex-row justify-between items-center w-full">
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${perumahan.kecamatan}/${perumahan.nama_perumahan}.jpg`}
          alt={perumahan.nama_perumahan}
          width={350}
        />
        <div>
          <table className="text-left text-sm mt-5 sm:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="w-2/5 sm:w-1/5 font-bold">Nama Perumahan</td>
                <td>:</td>
                <td className="ps-5 w-full">{perumahan.nama_perumahan}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Alamat</td>
                <td>:</td>
                <td className="ps-5">{perumahan.alamat}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Tipe</td>
                <td>:</td>
                <td className="ps-5">{perumahan.tipe}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Luas Tanah</td>
                <td>:</td>
                <td className="ps-5">{perumahan.luas_tanah}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Harga</td>
                <td>:</td>
                <td className="ps-5">{RupiahFormatter(perumahan.harga)}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Tersedia</td>
                <td>:</td>
                <td className="ps-5">{perumahan.isAvailable}</td>
              </tr>
              <tr className="h-[2rem]">
                <td className="font-bold">Nomor Hp</td>
                <td>:</td>
                <td className="ps-5">
                  <a
                    href={`https://api.whatsapp.com/send/?phone=${perumahan.nomor_hp}`}
                    className="text-green-500 flex"
                  >
                    <img
                      src={`${process.env.REACT_APP_MARKERICON_URI}/whatsappIcon.png`}
                      width={18}
                      className="me-1"
                    />
                    {perumahan.nomor_hp}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
