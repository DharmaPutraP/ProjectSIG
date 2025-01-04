import { Link } from "react-router-dom";

export const KECAMATAN = [
  "Bukit Raya",
  "Pekanbaru Kota",
  "Tampan",
  "Tenayan Raya",
  "Sail",
  "Sukajadi",
  "Payung Sekaki",
  "Senapelan",
  "Lima Puluh",
  "Rumbai",
  "Rumbai Pesisir",
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
    name: "Kecamatan",
    selector: (row) => row.kecamatan,
    sortable: true,
    filterable: true,
  },
  {
    name: "Harga",
    sortable: true,
    selector: (row) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.harga);
    },
  },
  {
    name: "Detail",
    cell: (row) => (
      <Link to={`/detail/${row._id}`}>
        <button className="btn">Detail</button>
      </Link>
    ),
  },
];
