'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
  // Use type assertion to fix TypeScript error
  const DefaultIcon = L.Icon.Default as any;
  // @ts-ignore
  delete DefaultIcon.prototype._getIconUrl;
  
  DefaultIcon.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

export default function PropertyMap({ address, coordinates }: PropertyMapProps) {
  useEffect(() => {
    fixLeafletIcons();
    
    // Create a custom burgundy marker icon
    const customIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    // Apply custom styling to Leaflet elements
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background-color: #111111;
        color: white;
        border: 1px solid #8B0000;
      }
      .leaflet-popup-tip {
        background-color: #8B0000;
      }
      .property-popup-link {
        color: #8B0000;
        font-weight: bold;
        text-decoration: none;
      }
      .property-popup-link:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <MapContainer 
      center={[coordinates.lat, coordinates.lng] as [number, number]} 
      zoom={15} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[coordinates.lat, coordinates.lng] as [number, number]}
        icon={new L.Icon({
          iconUrl: '/images/markers/burgundy-marker.svg',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        })}
      >
        <Popup>
          <div className="font-medium">
            <p className="text-white">{address}</p>
            <p className="text-sm mt-1 text-burgundy font-bold">Terra Legacy Property</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
