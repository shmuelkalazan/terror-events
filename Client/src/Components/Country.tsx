import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

interface Country {
  _id: string;
  name: string;
  eventsCount: number;
  average: number;
  lat: number;
  long: number;
}

function CountryMap() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5432/api/countries/');
        const data = await response.json();
        setAllCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: '90vh', width: '100%' }}
        center={[34, 32]} // מיקום ברירת המחדל
        zoom={2} // זום ברירת מחדל
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* הוספת מרקרים דינמיים */}
        {allCountries.map((country) => (
          <Marker
            key={country._id}
            position={[country.lat, country.long]}
            icon={
              new L.Icon({
                iconUrl: MarkerIcon,
                iconRetinaUrl: MarkerIcon,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow,
                shadowSize: [41, 41],
              })
            }
          >
            {/* הצגת מידע בחלונית פופ-אפ */}
            <Popup>
              <div>
                <h3>{country.name}</h3>
                <p>Events Count: {country.eventsCount}</p>
                <p>Average: {country.average}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CountryMap;
