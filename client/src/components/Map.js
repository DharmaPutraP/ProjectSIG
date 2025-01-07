import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Leaflet is required for certain customizations
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Map = ({ locations, style = "h-screen", mapCenter }) => {
  const UpdateMapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo([center.latitude, center.longitude], center.zoom, {
          duration: 1.5,
        });
      }
    }, [center, map]);
    return null;
  };

  const markerIcon = new L.Icon({
    iconUrl: `${process.env.REACT_APP_MARKERICON_URI}/icon_rumah.png`,
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer
      center={[mapCenter.latitude, mapCenter.longitude]}
      zoom={mapCenter.zoom}
      className={`mt-10 ${style}`}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Array.isArray(locations) &&
        locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <b>{location.name}</b>
              <p>{location.address}</p>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${location.kecamatan}/${location.name}.jpg`}
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
      {!Array.isArray(locations) && (
        <Marker
          position={[locations.latitude, locations.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <b>{locations.name}</b>
            <p>{locations.address}</p>
            <img
              src={`${process.env.REACT_APP_MARKERICON_URI}/${locations.kecamatan}/${locations.name}.jpg`}
              alt="Gambar"
              width={100}
            />
            <p>
              <Link to={`/detail/${locations.id}`}>
                <button className="btn">Detail</button>
              </Link>
            </p>
          </Popup>
        </Marker>
      )}
      <UpdateMapView center={mapCenter} />
    </MapContainer>
  );
};

export default Map;
