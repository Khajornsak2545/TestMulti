import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import L, { LatLngTuple } from 'leaflet'; // Change LatLngExpression to LatLngTuple
import 'leaflet/dist/leaflet.css';
import '../asset/TrashBinDashboard.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import ErrorBoundary from '../component/ErrorBoundary'; 

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
  locationLat: number;
  locationLon: number;
}

const TrashBinDashboard: React.FC = () => {
  const [bins, setBins] = useState<TrashBin[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "fillLevel" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      const data: TrashBin[] = [
        { id: "1", location: "วัดเบญจมบพิตรดุสิตวนารามราชวรวิหาร", fillLevel: 45, locationLat: 13.76659, locationLon: 100.51414 },
        { id: "2", location: "อนุสาวรีย์ชัยสมรภูมิ", fillLevel: 82, locationLat: 13.7649, locationLon: 100.5382 },
        { id: "3", location: "อนุสาวรีย์ประชาธิปไตย", fillLevel: 65, locationLat: 13.7567, locationLon: 100.5018 },
      ];
      setBins(data);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = (column: "id" | "fillLevel") => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredBins = bins.filter(bin =>
    bin.location.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBins = [...filteredBins].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = sortBy === "id" ? a.id : a.fillLevel;
    const bValue = sortBy === "id" ? b.id : b.fillLevel;
    if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
    return aValue < bValue ? -1 : 1;
  });

  const renderChart = () => (
    <LineChart key={bins.length} width={500} height={300} data={bins}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="fillLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );

  const center: [number, number] = useMemo(() => [13.7563, 100.5018], []); // Use [number, number] for type

  return (
    <div>
      <h1>Trash Bin Dashboard</h1>
      <input 
        type="text" 
        placeholder="Search by location" 
        value={search}
        onChange={handleSearch}
      />
      <div className="sort-buttons">
        <button onClick={() => handleSort("id")}>Sort by Bin ID</button>
        <button onClick={() => handleSort("fillLevel")}>Sort by Fill Level</button>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>

      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Location</th>
            <th>Fill Level (%)</th>
          </tr>
        </thead>
        <tbody>
          {sortedBins.map(bin => (
            <tr key={bin.id} className={bin.fillLevel > 80 ? 'high-fill-level' : ''}>
              <td>{bin.id}</td>
              <td>{bin.location}</td>
              <td>{bin.fillLevel}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {bins.length > 0 && (
        <div className="map-container">
          <ErrorBoundary>
            <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {bins.map(bin => (
                <Marker key={bin.id} position={[bin.locationLat, bin.locationLon]}>
                  <Popup>
                    {bin.location} - Fill Level: {bin.fillLevel}%
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
};

export default TrashBinDashboard;
