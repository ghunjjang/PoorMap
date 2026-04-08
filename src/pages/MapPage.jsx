import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { restaurants, genres } from '../data/mockData';
import ReportModal from '../components/ReportModal';
import './MapPage.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom Marker Data Loading (Can be replaced with API later)
const TOKYO_CENTER = [35.6812, 139.7671];

// Fix Leaflet Default Icon Issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function createCustomIcon(price, emoji) {
  const isCheap = price <= 500;
  const isMid = price <= 800;
  const bgColor = isCheap ? 'var(--color-cheap)' : isMid ? 'var(--color-mid)' : 'var(--color-expensive)';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="marker-bubble" style="border-color: ${bgColor}; box-shadow: 0 0 10px ${bgColor}40;">
        <span class="marker-emoji">${emoji}</span>
        <span class="marker-price" style="background: ${bgColor};">¥${price}</span>
      </div>
      <div class="marker-pointer" style="border-top-color: ${bgColor};"></div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
}

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function MapEventsHandler({ onBoundsChange }) {
  const map = useMapEvents({
    moveend: () => onBoundsChange(map.getBounds()),
    zoomend: () => onBoundsChange(map.getBounds()),
  });
  
  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, [map, onBoundsChange]);
  
  return null;
}

export default function MapPage() {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [mapCenter, setMapCenter] = useState(TOKYO_CENTER);
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/restaurants`)
      .then(res => res.json())
      .then(data => {
        // DB Schema to Map state format
        const mappedData = data.map(r => ({
          id: r.id,
          name: r.name,
          genre: r.genre,
          price: r.price,
          rating: r.rating,
          lat: r.lat,
          lng: r.lng,
          area: r.area,
          address: r.address,
          description: r.description,
          image: r.emoji
        }));
        setAllRestaurants(mappedData);
      })
      .catch(err => console.error('Failed to fetch restaurants:', err));
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (!mapBounds) return [];

    const ne = mapBounds.getNorthEast();
    const sw = mapBounds.getSouthWest();

    return allRestaurants.filter(r => {
      const priceMatch = r.price <= maxPrice;
      const genreMatch = selectedGenre === 'all' || r.genre === selectedGenre;
      const inBounds = r.lat >= sw.lat && r.lat <= ne.lat && r.lng >= sw.lng && r.lng <= ne.lng;
      return priceMatch && genreMatch && inBounds;
    });
  }, [allRestaurants, maxPrice, selectedGenre, mapBounds]);

  const priceColor = maxPrice <= 500 ? 'var(--color-cheap)' :
                     maxPrice <= 800 ? 'var(--color-mid)' : 'var(--color-expensive)';

  const topRestaurants = useMemo(() => {
    return [...allRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [allRestaurants]);

  const handleReport = async (data) => {
    const newRestaurant = {
      name: data.storeName,
      genre: data.genre || "その他",
      price: data.price,
      lat: mapCenter[0],
      lng: mapCenter[1],
      area: "ユーザー登録",
      address: data.address || "住所未登録",
      description: data.description || "新規制報されたお店です。",
      emoji: "📍"
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRestaurant)
      });
      const result = await res.json();
      if (result.success) {
        setAllRestaurants(prev => [...prev, {
          id: result.id,
          ...newRestaurant,
          rating: 0,
          reviews: 0,
          image: newRestaurant.emoji,
          tags: data.tags || []
        }]);
      }
    } catch (err) {
      console.error('Failed to report restaurant:', err);
    }
  };

  return (
    <div className="map-page" id="map-page">
      {/* Header Bar */}
      <header className="map-header glass">
        <div className="map-header-left">
          <h1 className="map-logo">
            <span className="map-logo-icon">🗾</span>
            <span className="gradient-text">貧乏マップ</span>
          </h1>
        </div>
        <div className="map-header-right">
          <button
            className="btn-secondary map-ranking-btn"
            onClick={() => setShowRanking(!showRanking)}
            id="ranking-toggle"
          >
            🏆 ランキング
          </button>
          <button
            className="btn-primary map-report-btn"
            onClick={() => setShowReportModal(true)}
            id="report-btn"
          >
            📝 制報する
          </button>
        </div>
      </header>

      {/* Price Filter */}
      <div className="map-filter glass">
        <div className="filter-label">
          <span>予算上限</span>
          <span className="filter-price" style={{ color: priceColor }}>
            ¥{maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          className="filter-slider"
          min={200}
          max={1500}
          step={50}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, ${priceColor} 0%, ${priceColor} ${((maxPrice - 200) / 1300) * 100}%, var(--border-color) ${((maxPrice - 200) / 1300) * 100}%, var(--border-color) 100%)`
          }}
          id="price-slider"
        />
        <div className="filter-range-labels">
          <span>¥200</span>
          <span>¥1,500</span>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="genre-filter">
        <div className="genre-scroll">
          {genres.map(g => (
            <button
              key={g.id}
              className={`chip ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g.id)}
              id={`genre-${g.id}`}
            >
              {g.icon} {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map Area */}
      <div className="leaflet-map-container" id="real-map-container">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
          <ChangeView center={mapCenter} />
          <MapEventsHandler onBoundsChange={setMapBounds} />
          {/* Google Maps Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/intl/ja/help/terms_maps/">Google Maps</a>'
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          />

          {filteredRestaurants.map((r) => (
            <Marker 
              key={r.id} 
              position={[r.lat, r.lng]} 
              icon={createCustomIcon(r.price, r.image)}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="popup-card">
                  <h3 className="popup-name">{r.name}</h3>
                  <div className="popup-meta">
                    <span className="rc-genre">{r.genre}</span>
                    <span className="popup-rating">★{r.rating.toFixed(2)}</span>
                  </div>
                  <div className="popup-price">¥{r.price.toLocaleString()}</div>
                  <p className="popup-desc">{r.description}</p>
                  <a 
                    className="popup-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name} ${r.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 Googleマップで見る
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Count badge */}
        <div className="map-count glass">
          {filteredRestaurants.length}件のお得なお店
        </div>

        {/* GPS Button */}
        <button 
          className="btn-primary gps-btn shadow-lg"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                setMapCenter([pos.coords.latitude, pos.coords.longitude]);
              }, (err) => {
                console.error("GPS access denied or unavailable", err);
                alert("GPS 기능을 사용할 수 없거나 거부되었습니다.");
              });
            }
          }}
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            padding: 0
          }}
        >
          📍
        </button>
      </div>

      {/* Ranking Panel */}
      {showRanking && (
        <div className="ranking-panel glass animate-slide-up" id="ranking-panel">
          <h3 className="ranking-title">🏆 コスパ最強ランキング</h3>
          {topRestaurants.map((r, idx) => (
            <button
              key={r.id}
              className="ranking-item"
              onClick={() => { setMapCenter([r.lat, r.lng]); setShowRanking(false); }}
            >
              <span className="ranking-rank">{idx + 1}</span>
              <span className="ranking-emoji">{r.image}</span>
              <div className="ranking-info">
                <span className="ranking-name">{r.name}</span>
                <span className="ranking-detail">
                  ★{r.rating.toFixed(2)} · {r.area}
                </span>
              </div>
              <span className="ranking-price">¥{r.price}</span>
            </button>
          ))}
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}
    </div>
  );
}
