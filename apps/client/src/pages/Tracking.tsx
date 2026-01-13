import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Navigation, Phone, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import L from 'leaflet'
import 'leaflet-routing-machine'

// Icons
const TECH_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/1086/1086664.png' // Car/Van
const USER_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/64/64572.png' // User

export default function Tracking() {
    useParams()
    const navigate = useNavigate()
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const techMarkerRef = useRef<L.Marker | null>(null)
    const [eta, setEta] = useState("Calculating...")
    const hasAnimatedRef = useRef(false) // Prevent double animation

    useEffect(() => {
        // Cleanup existing map
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove()
            mapInstanceRef.current = null
        }

        if (!mapContainerRef.current) return

        const initMap = (lat: number, lng: number) => {
            if (!mapContainerRef.current) return

            // 1. Initialize Map
            const userPos = new L.LatLng(lat, lng)
            const techStartPos = new L.LatLng(3.5760, 98.6722) // Nusa Net Medan

            // Center map between points
            const map = L.map(mapContainerRef.current)
            mapInstanceRef.current = map

            // 2. Add Light Mode Tiles
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(map)

            // 3. User Marker
            const userIcon = L.icon({
                iconUrl: USER_ICON_URL,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
            L.marker(userPos, { icon: userIcon }).addTo(map).bindPopup("You are here").openPopup()

            // 4. Technician Marker
            const techIcon = L.icon({
                iconUrl: TECH_ICON_URL,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
                className: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]'
            })
            const techMarker = L.marker(techStartPos, { icon: techIcon }).addTo(map).bindPopup("Technician Budi")
            techMarkerRef.current = techMarker

            // Fit bounds to show both markers initially
            const bounds = L.latLngBounds([userPos, techStartPos])
            map.fitBounds(bounds, { padding: [50, 50] })

            // 5. Calculate Route & Animate
            let routeFound = false

            const routingControl = L.Routing.control({
                waypoints: [techStartPos, userPos],
                routeWhileDragging: false,
                show: false,
                addWaypoints: false,
                fitSelectedRoutes: false, // We handle bounds manually
                lineOptions: {
                    styles: [{ color: '#22c55e', opacity: 0.8, weight: 6 }]
                },
                createMarker: () => null
            } as any).addTo(map)

            routingControl.on('routesfound', (e: any) => {
                if (routeFound || hasAnimatedRef.current) return
                routeFound = true
                hasAnimatedRef.current = true

                const routes = e.routes
                if (routes && routes.length > 0) {
                    console.log("OSM Route found, animating...")
                    const coordinates = routes[0].coordinates
                    animateMarker(coordinates)
                }
            })

            // Fallback: If no route found in 3 seconds, assume straight line
            setTimeout(() => {
                if (!routeFound && !hasAnimatedRef.current) {
                    console.warn("OSM Route timeout, using fallback line...")
                    hasAnimatedRef.current = true

                    const points = []
                    const steps = 100
                    const latDiff = (userPos.lat - techStartPos.lat) / steps
                    const lngDiff = (userPos.lng - techStartPos.lng) / steps

                    for (let i = 0; i <= steps; i++) {
                        points.push(new L.LatLng(
                            techStartPos.lat + (latDiff * i),
                            techStartPos.lng + (lngDiff * i)
                        ))
                    }

                    L.polyline(points, { color: '#22c55e', opacity: 0.5, dashArray: '10, 10' }).addTo(map)
                    animateMarker(points, 50)
                }
            }, 3000)
        }

        // 6. Animation Logic
        function animateMarker(coords: L.LatLng[], speed = 100) {
            let index = 0
            const interval = setInterval(() => {
                if (index < coords.length) {
                    if (techMarkerRef.current) {
                        techMarkerRef.current.setLatLng(coords[index])
                    }
                    // Simple ETA Update
                    const remaining = coords.length - index
                    setEta(`${Math.max(1, Math.ceil(remaining / (1000 / speed)))} mins`)
                    index += 1
                } else {
                    clearInterval(interval)
                    setEta("Arrived")
                }
            }, speed)
        }

        // Get User Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Got user location:", position.coords)
                    initMap(position.coords.latitude, position.coords.longitude)
                },
                (error) => {
                    console.error("Geolocation error:", error)
                    // Fallback to default Medan User Location
                    initMap(3.5900, 98.6750)
                }
            )
        } else {
            // Fallback
            initMap(3.5900, 98.6750)
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [])

    return (
        <div className="h-screen w-screen relative bg-gray-100 flex flex-col">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-[99999] flex justify-between items-start pointer-events-none">
                <Button className="pointer-events-auto rounded-full bg-black/40 hover:bg-black/60 text-white border-white/10 backdrop-blur-md" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </Button>

                <Card className="pointer-events-auto p-0 bg-black/80 backdrop-blur-md border-white/10 text-white shadow-2xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500 bg-gray-700">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" alt="Tech" />
                        </div>
                        <div>
                            <div className="text-sm font-bold flex items-center gap-1">
                                Technician Budi
                                <span className="inline-flex items-center justify-center rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-500 px-1 py-0 border-yellow-500/50">4.9 ★</span>
                            </div>
                            <div className="text-xs text-green-400 font-mono mt-1 flex items-center gap-1">
                                <Navigation size={10} /> {eta}
                            </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                            <Button size="icon" className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-500 hover:text-white">
                                <Phone size={14} />
                            </Button>
                            <Button size="icon" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500 hover:text-white">
                                <MessageCircle size={14} />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vanilla Map Container */}
            <div
                ref={mapContainerRef}
                className="flex-1 w-full z-0"
                style={{ height: '100%', background: '#f3f4f6' }}
            />

            {/* Bottom Action */}
            <div className="absolute bottom-10 left-4 right-4 z-[99999]">
                <Button
                    className="w-full h-14 bg-gradient-to-r from-primary to-green-700 text-black font-bold text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:brightness-110 border-none"
                    onClick={() => navigate('/')}
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    )
}
