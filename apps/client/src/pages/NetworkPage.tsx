import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Smartphone, Laptop, Tv, Gamepad2, Shield, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NetworkPage() {
    const [selectedDevice, setSelectedDevice] = useState<any>(null)

    // Mock Devices
    const devices = [
        { id: 1, name: "Dad's iPhone", type: 'phone', icon: Smartphone, x: 0, y: -120, status: 'Active', usage: '1.2 GB' },
        { id: 2, name: "Living Room TV", type: 'tv', icon: Tv, x: 100, y: 60, status: 'Streaming 4K', usage: '15.4 GB' },
        { id: 3, name: "Timmy's PS5", type: 'game', icon: Gamepad2, x: -100, y: 60, status: 'Gaming', usage: '45.2 GB' },
        { id: 4, name: "Mom's Laptop", type: 'laptop', icon: Laptop, x: 0, y: 140, status: 'Idle', usage: '0.4 GB' },
    ]

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />

            <div className="relative z-10 p-6 h-[calc(100vh-80px)] flex flex-col">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white">Device Galaxy</h1>
                    <p className="text-gray-400 text-sm">Interactive Network Map</p>
                </div>

                <div className="flex-1 relative flex items-center justify-center">
                    {/* Central Router Node */}
                    <motion.div
                        className="absolute z-20 w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.5)] cursor-pointer"
                        animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 30px rgba(59,130,246,0.5)", "0 0 60px rgba(59,130,246,0.8)", "0 0 30px rgba(59,130,246,0.5)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        onClick={() => setSelectedDevice(null)}
                    >
                        <Wifi size={40} className="text-primary" />
                    </motion.div>

                    {/* Orbiting Devices */}
                    {devices.map((device, index) => (
                        <motion.div
                            key={device.id}
                            className={`absolute flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${selectedDevice?.id === device.id ? 'z-30 scale-125' : 'z-10 opacity-80 hover:opacity-100'}`}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: device.x,
                                y: device.y, // Simple static layout for now, could be orbiting
                                opacity: 1
                            }}
                            transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
                            onClick={() => setSelectedDevice(device)}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-lg ${selectedDevice?.id === device.id ? 'bg-primary text-black' : 'bg-white/5 text-gray-300'}`}>
                                <device.icon size={24} />
                            </div>
                            <span className="text-xs font-medium text-gray-300 bg-black/50 px-2 py-1 rounded-full backdrop-blur">{device.name}</span>
                        </motion.div>
                    ))}

                    {/* Connection Lines (SVGs) */}
                    <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible">
                        {devices.map((device, index) => (
                            <motion.line
                                key={device.id}
                                x1="50%" y1="50%"
                                x2={`calc(50% + ${device.x}px)`}
                                y2={`calc(50% + ${device.y}px)`} // Rough approximation centering
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                                strokeDasharray="5 5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Device Details Modal / Panel */}
                <AnimatePresence>
                    {selectedDevice && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80"
                        >
                            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
                                <CardContent className="p-4 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <selectedDevice.icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{selectedDevice.name}</h3>
                                            <p className="text-xs text-gray-400 capitalize">{selectedDevice.type} • {selectedDevice.status}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-black/20 p-2 rounded">
                                            <span className="block text-gray-400">Usage Today</span>
                                            <span className="font-bold text-lg">{selectedDevice.usage}</span>
                                        </div>
                                        <div className="bg-black/20 p-2 rounded">
                                            <span className="block text-gray-400">Signal</span>
                                            <span className="font-bold text-lg text-green-400">Excellent</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 h-8 text-xs">
                                            <Shield size={12} className="mr-1" /> Pause
                                        </Button>
                                        <Button className="bg-primary text-black hover:bg-primary/90 h-8 text-xs font-bold">
                                            <Zap size={12} className="mr-1" /> Prioritize
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
