"use client";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";

export default function LocationDisplay({
    name,
    lat,
    lon,
    width = "100%",
    height = "100%",
}: {
    name: string;
    lat: number;
    lon: number;
    width?: string;
    height?: string;
}) {
    return (
        <div style={{ width }}>
            <MapContainer
                style={{ width, height }}
                center={[lat, lon]}
                zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
            <div className="w-full flex items-center bg-zinc-900 rounded-b-lg p-2 text-sm">
                {name}
            </div>
        </div>
    );
}
