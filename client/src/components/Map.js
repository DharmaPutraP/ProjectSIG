import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Leaflet is required for certain customizations
import { Link } from "react-router-dom";

// Set up a default center for the map
const center = [51.505, -0.09]; // Example: Latitude and Longitude of London
const zoomLevel = 13;

const Map = ({ locations }) => {
  const center = [0.51044, 101.438309];
  const markerIcon = new L.Icon({
    iconUrl: "iconMarker.png", // Path from the public folder
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      className="mt-10 h-screen"
    >
      {/* TileLayer to render map tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          center={center}
          icon={markerIcon}
        >
          <Popup>
            <b>{location.name}</b>
            <p>{location.address}</p>
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
