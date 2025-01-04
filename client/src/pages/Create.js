import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPerumahan } from "../utils/api";
import { toast } from "react-toastify";
import { FormInput, FormSelect, SubmitBtn, InputLogin } from "../components";

const Create = () => {
  const [formData, setFormData] = useState({
    nama_perumahan: "",
    alamat: "",
    tipe: "",
    luas_tanah: "",
    harga: "",
    isAvailable: "Available",
    y: "",
    x: "",
    kecamatan: "",
    nomor_hp: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Save the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to include file and other fields
    console.log("Form Data State:", formData);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    console.log(form);

    try {
      await createPerumahan(form);
      toast.success("Perumahan Berhasil Dibuat!");
      navigate("/detail");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal Membuat Perumahan.");
    }
  };

  const option = ["Available", "Sold"];
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tambahkan Perumahan
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 sm:gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center border py-5 border-green-500"
      >
        <FormInput
          type="text"
          labelText="Nama Perumahan"
          name="nama_perumahan"
          placeholder="Nama Perumahan"
          value={formData.nama_perumahan}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="text"
          labelText="Alamat"
          name="alamat"
          placeholder="Alamat"
          value={formData.alamat}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6 sm:col-span-2 sm:w-11/12"
        />
        <FormInput
          type="number"
          labelText="Tipe"
          name="tipe"
          placeholder="Tipe"
          value={formData.tipe}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="number"
          labelText="Luas Tanah"
          name="luas_tanah"
          placeholder="Luas Tanah"
          value={formData.luas_tanah}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="number"
          labelText="Harga"
          name="harga"
          placeholder="Harga"
          value={formData.harga}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="text"
          labelText="Kecamatan"
          name="kecamatan"
          placeholder="Kecamatan"
          value={formData.kecamatan}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="text"
          labelText="Nomor HP"
          name="nomor_hp"
          placeholder="Nomor HP (62821...)"
          value={formData.nomor_hp}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormSelect
          name="isAvailable"
          labelText="Apakah Tersedia?"
          value={formData.isAvailable}
          onChange={handleChange}
          options={option}
          defaults={false}
          className="w-5/6"
        />
        <FormInput
          type="number"
          labelText="Koordinat Y"
          name="y"
          placeholder="Koordinat Y"
          value={formData.y}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        <FormInput
          type="number"
          labelText="Koordinat X"
          name="x"
          placeholder="Koordinat X"
          value={formData.x}
          onChange={handleChange}
          required
          icon={false}
          className="w-5/6"
        />
        {/* <FormInput
          type="file"
          labelText="Gambar Perumahan"
          name="image"
          onChange={handleFileChange}
          required
          icon={false}
          className="w-5/6"
        /> */}
        <InputLogin
          type="file"
          labelText="Gambar Perumahan"
          name="image"
          onChange={handleFileChange}
          required
          className="w-5/6"
        />
        <SubmitBtn className="w-5/6 sm:w-2/6 sm:col-end-4 sm:col-span-2" />
      </form>
    </>
  );
};

export default Create;
