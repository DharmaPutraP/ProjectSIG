import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById, updatePerumahan } from "../utils/api";
import { toast } from "react-toastify";
import { FormInput, FormSelect, SubmitBtn, InputLogin } from "../components";
import { KECAMATAN } from "../utils/constants";

const Edit = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
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

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getById(id); // Fetch by ID
        setFormData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
        navigate("/detail");
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getById(id); // Fetch existing data
        const data = response.data;
        setFormData({ ...data, image: null });
        setPreviewUrl(`${process.env.REACT_APP_IMAGE_URL}${data.imgUrl}`); // Set existing image as preview
      } catch (error) {
        toast.error("Failed to fetch data");
        navigate("/detail");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Hanya JPG");
        return;
      }

      // Update formData state
      setFormData({ ...formData, image: file });

      // Generate a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await updatePerumahan(id, form); // API call to update
      toast.success("Perumahan updated successfully!");
      navigate("/detail");
    } catch (error) {
      toast.error(error);
    }
  };

  const options = ["Available", "Sold"];
  return (
    <div className="sm:h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Perumahan</h1>
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
          className="w-5/6"
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
        <FormSelect
          name="kecamatan"
          labelText="Kecamatan"
          value={formData.kecamatan}
          onChange={handleChange}
          options={KECAMATAN}
          defaults={false}
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
          options={options}
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
        <InputLogin
          type="file"
          labelText="Gambar Perumahan"
          name="image"
          onChange={handleFileChange}
          className="w-5/6"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-md w-2/6 object-cover"
          />
        )}
        <SubmitBtn className="w-4/6 sm:w-2/6 sm:col-end-4 sm:col-span-2" />
      </form>
    </div>
  );
};
export default Edit;
