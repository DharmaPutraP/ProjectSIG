import { Link } from "react-router-dom";

export const KECAMATAN = [
  "Bukit Raya",
  "Lima Puluh",
  "Marpoyan Damai",
  "Payung Sekaki",
  "Pekanbaru Kota",
  "Rumbai",
  "Rumbai Pesisir",
  "Sail",
  "Sukajadi",
  "Senapelan",
  "Tampan",
  "Tenayan Raya",
];

export const TIPE_RUMAH = [36, 45, 54, 60];

export const columnsTabel = (role, handleDelete) => {
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      grow: 0,
    },
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
  ];

  if (role === "guest") {
    columns.push({
      name: "Detail",
      cell: (row) => (
        <Link to={`/detail/${row._id}`}>
          <button className="btn">Detail</button>
        </Link>
      ),
    });
  }

  // Add "Aksi" column if the user is an admin
  if (role === "admin") {
    columns.push({
      name: "Aksi",
      cell: (row) => (
        <>
          <Link to={`/admin/edit/${row._id}`}>
            <button className="btn !bg-yellow-500">Edit</button>
          </Link>
          <button
            className="btn !bg-red-500 ms-4"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </>
      ),
    });
  }
  return columns;
};
