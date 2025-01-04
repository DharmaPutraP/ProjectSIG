import { useNavigate } from "react-router-dom";

const CardList = ({
  id,
  nama,
  alamat,
  gambar,
  longitude,
  latitude,
  onCardClick,
}) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/detail/${id}`);
  };
  const handleSingleClick = () => {
    onCardClick(latitude, longitude); // Update the map center
  };
  const cutAddress = (address, limit = 5) => {
    // Split the address by spaces into words
    const words = address.split(" ");

    // If the address has more words than the limit, truncate and add ellipsis
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return address;
  };
  return (
    <>
      <div
        className="w-full flex items-center justify-center border p-[1rem] shadow-md rounded-md mb-2 cursor-pointer"
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${gambar}`}
          className="rounded-md w-[6rem] h-[5rem]"
        />
        <div className="ms-2">
          <p className="text-sm">{nama}</p>
          <p className="text-xs text-gray-500">{cutAddress(`${alamat}`)}</p>
        </div>
      </div>
    </>
  );
};
export default CardList;
