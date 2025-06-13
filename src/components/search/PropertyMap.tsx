'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

interface PropertyMapProps {
  properties: Array<{
    id: string;
    title: string;
    location: string;
    price: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }>;
}

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
  // Use proper type assertion
  const DefaultIcon = L.Icon.Default as unknown as {
    prototype: { _getIconUrl?: unknown };
    mergeOptions: (options: Record<string, string>) => void;
  };
  // We need to delete this internal property for Leaflet to work correctly
  delete DefaultIcon.prototype._getIconUrl;
  
  DefaultIcon.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

export default function PropertyMap({ properties }: PropertyMapProps) {
  useEffect(() => {
    fixLeafletIcons();
    
    // Apply custom styling to Leaflet elements for Terra Legacy colors
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
      .leaflet-container a {
        color: #8B0000;
      }
      .property-popup-link {
        color: #8B0000 !important;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Calculate center of the map based on all property coordinates
  const calculateMapCenter = () => {
    if (properties.length === 0) {
      return [26.7056, -80.0364] as [number, number]; // Default to Palm Beach, Florida
    }
    
    const totalLat = properties.reduce((sum, property) => sum + property.coordinates.lat, 0);
    const totalLng = properties.reduce((sum, property) => sum + property.coordinates.lng, 0);
    
    return [
      totalLat / properties.length,
      totalLng / properties.length
    ] as [number, number];
  };

  return (
    <MapContainer 
      center={calculateMapCenter()} 
      zoom={12} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker 
          key={property.id} 
          position={[property.coordinates.lat, property.coordinates.lng] as [number, number]}
          icon={new L.Icon({
            iconUrl: '/images/markers/burgundy-marker.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          })}
        >
          <Popup>
            <div className="font-medium p-1">
              <Link href={`/property-details/${property.id}`} className="property-popup-link hover:underline">
                {property.title}
              </Link>
              <p className="text-sm mt-1 text-white">{property.location}</p>
              <p className="text-sm font-bold mt-1 text-burgundy">{property.price}</p>
              <Link 
                href={`/property-details/${property.id}`} 
                className="bg-burgundy text-white text-xs px-2 py-1 rounded mt-2 inline-block hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
