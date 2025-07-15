"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in React-Leaflet
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  })
}

interface RepositoryMapProps {
  repositories?: any[]
  repository?: any
  height?: string
  zoom?: number
  center?: [number, number]
  theme: any
}

export function RepositoryMap({
  repositories,
  repository,
  height = "256px",
  zoom = 2,
  center = [40, 0],
  theme,
}: RepositoryMapProps) {
  // 如果是单个仓库，使用其第一个机构的坐标作为中心
  const mapCenter = repository ? repository.institutions[0].coordinates : center
  const mapZoom = repository ? (repository.institutions.length > 1 ? 4 : 10) : zoom

  // 准备标记数据
  const markers = repository
    ? repository.institutions.map((inst, idx) => ({
        id: `${repository.id}-${idx}`,
        position: inst.coordinates,
        popup: {
          title: repository.name,
          institution: inst.institutionName,
          country: inst.institutionCountry,
          source: repository.source,
          coordinates: inst.coordinates,
        },
      }))
    : repositories?.flatMap(
        (repo) =>
          repo.institutions?.map((inst, idx) => ({
            id: `${repo.id}-${idx}`,
            position: inst.coordinates,
            popup: {
              title: repo.name,
              institution: inst.institutionName,
              country: inst.institutionCountry,
              source: repo.source,
              coordinates: inst.coordinates,
            },
          })) || [],
      ) || []

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: theme.colors.border, height }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div className="text-center min-w-[200px]">
                <h4 className="font-semibold text-base mb-1">{marker.popup.title}</h4>
                <p className="text-sm text-gray-700 mb-1">{marker.popup.institution}</p>
                <p className="text-sm text-gray-600 mb-2">{marker.popup.country}</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${theme.colors.primary}20`,
                      color: theme.colors.primary,
                    }}
                  >
                    {marker.popup.source}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-mono">
                  {marker.popup.coordinates[0].toFixed(4)}°, {marker.popup.coordinates[1].toFixed(4)}°
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
