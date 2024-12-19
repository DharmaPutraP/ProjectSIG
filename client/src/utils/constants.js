import { Link } from "react-router-dom";
export const NAMA_PERUMAHAN = [
  "Perumahan A",
  "Perumahan B",
  "Perumahan C",
  "Perumahan D",
];

export const KECAMATAN = [
  "Pekanbaru Kota",
  "Tampan",
  "Sukajadi",
  "Marpoyan Damai",
  "Rumbai",
];

export const TIPE_RUMAH = [36, 45, 54, 60];

export const columnsTabel = [
  {
    name: "Nama Perumahan",
    selector: (row) => row.nama_perumahan,
    sortable: true,
    filterable: true,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Tipe",
    selector: (row) => row.tipe,
    sortable: true,
    filterable: true,
  },
  {
    name: "Luas Tanah",
    selector: (row) => row.luas_tanah,
    sortable: true,
    filterable: true,
  },
  {
    name: "Kecamatan",
    selector: (row) => row.kecamatan,
    sortable: true,
    filterable: true,
  },
  {
    name: "No. Telp",
    selector: (row) => row.nomor_hp,
  },
  {
    name: "Detail",
    cell: (row) => (
      <Link to={`/detail/${row.id}`}>
        <button className="btn">Detail</button>
      </Link>
    ),
  },
];
