import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Leaflet is required for certain customizations
import { Link } from "react-router-dom";

const zoomLevel = 13;

const Map = ({ locations, style = "h-screen" }) => {
  const markerIcon = new L.Icon({
    iconUrl: `${process.env.REACT_APP_MARKERICON_URI}/icon_rumah.png`,
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  const locationArray = Array.isArray(locations) ? locations : [locations];
  const center = Array.isArray(locations)
    ? [0.51044, 101.438309]
    : [locations.latitude, locations.longitude];

  return (
    <MapContainer center={center} zoom={zoomLevel} className={`mt-10 ${style}`}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationArray.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          center={center}
          icon={markerIcon}
        >
          <Popup>
            <b>{location.name}</b>
            <p>{location.address}</p>
            <img
              src={`${process.env.REACT_APP_MARKERICON_URI}/${location.kecamatan}/${location.name}.jpg`}
              alt="Gambar"
              width={100}
            />
            <p>
              <Link to={`/detail/${location.id}`}>
                <button className="btn">Detail</button>
              </Link>
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
