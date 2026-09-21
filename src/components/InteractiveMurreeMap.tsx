import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Compass, 
  Mountain, 
  Hotel as HotelIcon, 
  Navigation as NavIcon, 
  ExternalLink, 
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  Wind,
  CloudSun,
  ShieldCheck,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import L from 'leaflet';
import { MAP_POINTS, BUSINESS_INFO } from '../data/travelData';
import { MapPoint } from '../types';

interface InteractiveMurreeMapProps {
  onSelectPointForTrip: (pointTitle: string) => void;
}

export const InteractiveMurreeMap: React.FC<InteractiveMurreeMapProps> = ({
  onSelectPointForTrip
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(MAP_POINTS[0]);
  const [tileMode, setTileMode] = useState<'streets' | 'topo'>('streets');
  const [activeLayer, setActiveLayer] = useState<L.TileLayer | null>(null);

  const filteredPoints = filterType === 'all'
    ? MAP_POINTS
    : MAP_POINTS.filter(p => p.type === filterType);

  // Initialize real-time Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initialization if already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [33.9500, 73.4000],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Positron - clean, soft, light aesthetic map
      const initialLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 18,
      }).addTo(map);

      setActiveLayer(initialLayer);
      mapInstanceRef.current = map;

      // Draw Scenic Murree Highway & Galiyat Pass Route Line
      const routeCoordinates: [number, number][] = [
        [33.8200, 73.3000], // Expressway Approach
        [33.8650, 73.3400], // Tret
        [33.8900, 73.3700], // Charra Pani
        [33.9070, 73.3903], // GPO Chowk Murree
        [33.9142, 73.4011], // Kashmir Point
        [33.9567, 73.4517], // Bhurban
        [33.9800, 73.4200], // Changla Gali
        [34.0298, 73.4022], // Ayubia National Park
        [34.0580, 73.4080], // Dunga Gali
        [34.0722, 73.3814], // Nathia Gali
      ];

      L.polyline(routeCoordinates, {
        color: '#b88a29',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 6',
      }).addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map tile theme
  const switchTileMode = (mode: 'streets' | 'topo') => {
    if (!mapInstanceRef.current) return;
    setTileMode(mode);

    if (activeLayer) {
      mapInstanceRef.current.removeLayer(activeLayer);
    }

    let url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    if (mode === 'topo') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    }

    const newLayer = L.tileLayer(url, {
      attribution: mode === 'topo' ? 'OpenTopoMap' : 'CARTO',
      maxZoom: 17,
    }).addTo(mapInstanceRef.current);

    setActiveLayer(newLayer);
  };

  // Add / Update Map Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    filteredPoints.forEach(point => {
      const isSelected = selectedPoint.id === point.id;
      const isHQ = point.type === 'hub';

      const customIcon = L.divIcon({
        className: 'custom-alpine-marker',
        html: `
          <div style="
            position: relative;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 5px 10px;
            background: ${isHQ ? '#183e2b' : isSelected ? '#b88a29' : '#ffffff'};
            color: ${isHQ || isSelected ? '#ffffff' : '#1a2c22'};
            border: 2px solid ${isHQ ? '#34d399' : isSelected ? '#ffffff' : '#cbd8d1'};
            border-radius: 20px;
            box-shadow: 0 4px 14px rgba(20,40,30,0.18);
            font-family: system-ui, sans-serif;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
          ">
            <span style="
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: ${isHQ ? '#34d399' : '#b88a29'};
              display: inline-block;
            "></span>
            <span>${point.title.split(' ')[0]}</span>
          </div>
        `,
        iconSize: [100, 30],
      });

      const marker = L.marker([point.realCoords.lat, point.realCoords.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          setSelectedPoint(point);
          map.flyTo([point.realCoords.lat, point.realCoords.lng], 13, { duration: 1.2 });
        });

      markersRef.current[point.id] = marker;
    });
  }, [filteredPoints, selectedPoint]);

  const handleZoom = (delta: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
    }
  };

  const handleSelectPointCard = (point: MapPoint) => {
    setSelectedPoint(point);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([point.realCoords.lat, point.realCoords.lng], 13, { duration: 1.2 });
    }
  };

  return (
    <section id="murree-map" className="py-24 bg-[#f8faf9] relative overflow-hidden border-t border-[#d8e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Compass className="w-3.5 h-3.5 text-[#c49838]" />
              <span>LIVE GEOGRAPHIC TOPOGRAPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Real-Time Murree & Galiyat Map
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light">
              Interactive high-altitude map with live GPS coordinates, altitude telemetry, and road waypoints from Murree GPO Chowk across the high ridges of the Galiyat.
            </p>
          </div>

          {/* Filter Pills & Map Controls */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white border border-[#d6e2db] shadow-xs">
              {[
                { id: 'all', label: 'All Stops' },
                { id: 'hub', label: 'MCT HQ' },
                { id: 'viewpoint', label: 'Viewpoints' },
                { id: 'hiking', label: 'Peaks & Treks' },
                { id: 'hotel', label: 'Resorts' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-[#183e2b] text-white font-semibold shadow-xs'
                      : 'text-[#475e52] hover:text-[#122319]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Topo / Street View Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-[#d6e2db] text-xs">
              <button
                onClick={() => switchTileMode('streets')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  tileMode === 'streets' ? 'bg-[#b88a29] text-white font-bold' : 'text-[#475e52]'
                }`}
              >
                Alpine Map
              </button>
              <button
                onClick={() => switchTileMode('topo')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  tileMode === 'topo' ? 'bg-[#b88a29] text-white font-bold' : 'text-[#475e52]'
                }`}
              >
                Topographic
              </button>
            </div>
          </div>
        </div>

        {/* Map Stage & Info Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Real-Time Leaflet Map Canvas (8 cols) */}
          <div className="lg:col-span-8 relative h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-[#d2dfd7] shadow-xl bg-[#e5ece8]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Floating Zoom and Navigation HUD */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col space-y-1.5">
              <button
                onClick={() => handleZoom(1)}
                className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-[#122319] shadow-md border border-[#d2dfd7] transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-1)}
                className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-[#122319] shadow-md border border-[#d2dfd7] transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Live GPS Telemetry Overlay */}
            <div className="absolute top-4 left-4 z-[400] p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#d6e2db] text-[11px] font-mono text-[#475e52] shadow-md flex flex-col space-y-1">
              <span className="text-[#122319] font-bold flex items-center space-x-1.5 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>REAL-TIME MURREE GPS ENGINE</span>
              </span>
              <span>Coordinates: 33.9070° N, 73.3903° E</span>
              <span>Expressway N-75 & Bank Road Corridor</span>
            </div>

            {/* Road Status Legend */}
            <div className="absolute bottom-4 left-4 z-[400] p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#d6e2db] text-xs text-[#1e3829] shadow-md flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">HQ Desk: GPO Chowk, Bank Road, Murree</span>
            </div>
          </div>

          {/* Selected Point Detail Card (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#d6e2db] shadow-xl flex flex-col justify-between h-full min-h-[480px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f6f2] text-[#183e2b] border border-[#d0ded6] text-[10px] uppercase tracking-wider font-bold">
                  {selectedPoint.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#a87920]">{selectedPoint.altitude}</span>
              </div>

              <h3 className="text-2xl font-serif text-[#122319] font-normal">
                {selectedPoint.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-[#475e52] leading-relaxed">
                {selectedPoint.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#e8f0ec] space-y-2 text-xs">
                <div className="flex justify-between text-[#5e776a]">
                  <span>Precise GPS</span>
                  <span className="font-mono font-semibold text-[#122319]">
                    {selectedPoint.realCoords.lat.toFixed(4)}° N, {selectedPoint.realCoords.lng.toFixed(4)}° E
                  </span>
                </div>
                <div className="flex justify-between text-[#5e776a]">
                  <span>Category</span>
                  <span className="capitalize font-medium text-[#122319]">{selectedPoint.type}</span>
                </div>
                <div className="flex justify-between text-[#5e776a]">
                  <span>Road Route</span>
                  <span className="text-emerald-700 font-medium">All-Weather Guided Access</span>
                </div>
              </div>

              {selectedPoint.id === 'gpo-chowk' && (
                <div className="mt-5 p-3.5 rounded-xl bg-[#f2f7f4] border border-[#cfe0d6] text-xs text-[#183e2b]">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Murree Classic Headquarters</span>
                  </div>
                  <div className="mt-1 text-[#3b5445] text-[11px] leading-relaxed">
                    Walk into our GPO Chowk office on Bank Road for complimentary hot Kashmiri kehwa and custom route maps.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#e8f0ec] space-y-2">
              <button
                onClick={() => onSelectPointForTrip(selectedPoint.title)}
                className="w-full py-3.5 rounded-xl bg-[#183e2b] hover:bg-[#225239] text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Include in My Mountain Trip</span>
                <NavIcon className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.realCoords.lat},${selectedPoint.realCoords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#f6f9f7] hover:bg-[#eef4f0] text-[#3d5447] border border-[#d6e2db] text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
