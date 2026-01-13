import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Navigation, Phone, MessageCircle, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet-routing-machine'

// Icons
const TECH_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/1086/1086664.png' // Car/Van

export default function Tracking() {
    useParams()
    const navigate = useNavigate()
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const techMarkerRef = useRef<L.Marker | null>(null)
    const [eta, setEta] = useState("Calculating...")
    const hasAnimatedRef = useRef(false)

    // Status Timeline Data
    const timelineEvents = [
        { title: 'Ticket Created', time: '09:00 AM', status: 'completed' },
        { title: 'Technician Assigned', time: '09:30 AM', status: 'completed' },
        { title: 'On The Way', time: '10:15 AM', status: 'active' },
        { title: 'Arrived', time: 'ETA 10:45 AM', status: 'pending' },
    ]

    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove()
            mapInstanceRef.current = null
        }

        if (!mapContainerRef.current) return

        const initMap = (lat: number, lng: number) => {
            if (!mapContainerRef.current) return

            const userPos = new L.LatLng(lat, lng)
            const techStartPos = new L.LatLng(3.5760, 98.6722) // Nusa Net Medan

            const map = L.map(mapContainerRef.current, {
                zoomControl: false, // Custom zoom control position
                attributionControl: false
            })
            mapInstanceRef.current = map

            // Dark Mode Tiles for Premium Feel
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(map)

            // User Marker (Pulsing Effect via CSS - simplified here)
            const userIcon = L.divIcon({
                className: 'bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            })
            L.marker(userPos, { icon: userIcon }).addTo(map)

            // Technician Marker
            const techIcon = L.icon({
                iconUrl: TECH_ICON_URL,
                iconSize: [48, 48],
                iconAnchor: [24, 24],
                className: 'drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]' // Neon glow
            })
            const techMarker = L.marker(techStartPos, { icon: techIcon }).addTo(map)
            techMarkerRef.current = techMarker

            // Fit Bounds
            const bounds = L.latLngBounds([userPos, techStartPos])
            map.fitBounds(bounds, { padding: [100, 100] })

            // Simulate Movement along a curve/route
            if (!hasAnimatedRef.current) {
                hasAnimatedRef.current = true

                // Fallback direct line animation for demo
                const points: L.LatLng[] = []
                const steps = 200
                const latDiff = (userPos.lat - techStartPos.lat) / steps
                const lngDiff = (userPos.lng - techStartPos.lng) / steps

                for (let i = 0; i <= steps; i++) {
                    // Add slight curve
                    const curveOffset = Math.sin((i / steps) * Math.PI) * 0.002
                    points.push(new L.LatLng(
                        techStartPos.lat + (latDiff * i) + curveOffset,
                        techStartPos.lng + (lngDiff * i) + curveOffset
                    ))
                }

                // Draw Route Line
                L.polyline(points, { color: '#22c55e', opacity: 0.6, weight: 4, dashArray: '10, 10' }).addTo(map)

                // Animate
                let index = 0
                const interval = setInterval(() => {
                    if (index < points.length && techMarkerRef.current) {
                        techMarkerRef.current.setLatLng(points[index])

                        // Update ETA
                        const remaining = points.length - index
                        const mins = Math.ceil(remaining / 10)
                        setEta(`${mins} min`)

                        index++
                    } else {
                        clearInterval(interval)
                        setEta("Arrived")
                    }
                }, 50)
            }
        }

        // Init with mock location
        initMap(3.5900, 98.6750)

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [])

    return (
        <div className="h-screen w-screen relative bg-black flex flex-col font-sans text-white overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-[50] p-6 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Button
                    className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 w-12 h-12"
                    size="icon"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} />
                </Button>

                {/* Status Badge */}
                <div className="bg-green-500/20 backdrop-blur-md border border-green-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 font-bold text-sm tracking-wide">LIVE TRACKING</span>
                </div>
            </div>

            {/* Map Container */}
            <div
                ref={mapContainerRef}
                className="absolute inset-0 z-0"
                style={{ filter: 'brightness(0.8) contrast(1.2)' }} // Enhance dark mode look
            />

            {/* Right Side Timeline (Desktop) / Slide Sheet (Mobile) */}
            <div className="absolute top-24 right-6 z-[40] max-w-xs w-full hidden md:block">
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-white shadow-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Service Timeline</h3>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10" />

                            {timelineEvents.map((event, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${event.status === 'completed' ? 'bg-green-500 border-green-500' :
                                        event.status === 'active' ? 'bg-yellow-500 border-yellow-500 animate-pulse' :
                                            'bg-black border-gray-600'
                                        }`} />
                                    <div>
                                        <p className={`text-sm font-bold ${event.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                                            {event.title}
                                        </p>
                                        <p className="text-xs text-gray-400">{event.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Technician Card */}
            <AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 z-[50] p-4 md:p-8 flex justify-center">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="w-full max-w-2xl"
                    >
                        <Card className="bg-gray-900/80 backdrop-blur-xl border-white/10 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
                            <CardContent className="p-0">
                                {/* Top Info Section */}
                                <div className="p-6 flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" alt="Tech" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-900">
                                            4.9 ★
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold">Technician Budi</h2>
                                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><MapPin size={14} /> ID: #TEC-8821</span>
                                            <span className="flex items-center gap-1 text-green-400"><Navigation size={14} /> {eta} away</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons (Desktop) */}
                                    <div className="hidden md:flex gap-3">
                                        <Button className="rounded-full bg-white/10 hover:bg-white/20 border border-white/5 w-12 h-12 p-0">
                                            <MessageCircle size={20} />
                                        </Button>
                                        <Button className="rounded-full bg-green-500 hover:bg-green-400 text-black w-12 h-12 p-0">
                                            <Phone size={20} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-white/5 mx-6" />

                                {/* Mobile Actions / Detailed Info */}
                                <div className="p-4 md:p-6 bg-white/5 flex justify-between items-center">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Vehicle</p>
                                            <p className="font-bold text-sm">Toyota Avanza (B 1234 CD)</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service Type</p>
                                            <p className="font-bold text-sm">Fiber Repair</p>
                                        </div>
                                    </div>

                                    {/* Mobile Only Actions */}
                                    <div className="flex md:hidden gap-3">
                                        <Button size="icon" className="rounded-full bg-white/10">
                                            <MessageCircle size={18} />
                                        </Button>
                                        <Button size="icon" className="rounded-full bg-green-500 text-black">
                                            <Phone size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    )
}
