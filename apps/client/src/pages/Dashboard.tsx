import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Activity, Wifi, MapPin, CreditCard, Star, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Gamepad2 } from 'lucide-react'

const fetchHealth = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/health-check', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
}


import { useState } from 'react' // Ensure useState is imported

export default function Dashboard() {
    const { data, isLoading } = useQuery({ queryKey: ['health'], queryFn: fetchHealth })
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    const [gameMode, setGameMode] = useState(false)
    const usageData = [
        { name: 'Mon', usage: 45 }, { name: 'Tue', usage: 52 }, { name: 'Wed', usage: 38 },
        { name: 'Thu', usage: 65 }, { name: 'Fri', usage: 48 }, { name: 'Sat', usage: 59 }, { name: 'Sun', usage: 42 }
    ]

    return (
        <div className="min-h-screen bg-background relative pb-20 md:pb-0 overflow-x-hidden">
            {/* Ambient Backlight */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/20 via-blue-900/10 to-transparent pointer-events-none z-0" />

            {/* Header */}
            <header className="relative z-10 px-6 py-6 md:py-8 flex justify-between items-center max-w-7xl mx-auto">
                <div>
                    <p className="text-muted-foreground text-sm">Welcome back,</p>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                        {user.name || 'Nusa Member'}
                    </h1>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => navigate('/profile')}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" className="w-8 h-8 rounded-full" />
                </div>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 px-6 space-y-8 max-w-7xl mx-auto"
            >
                {/* Game Mode Banner */}
                <motion.div variants={item} className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-500 ${gameMode ? 'bg-red-900/40 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-white/5 border-white/10'}`}>
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h2 className={`text-xl font-bold mb-1 ${gameMode ? 'text-red-400' : 'text-white'}`}>
                                {gameMode ? '⚡ GAME MODE ACTIVE' : 'Game Mode'}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {gameMode ? 'Latency Optimized. Packet Prioritization Enabled.' : 'Optimize network for low latency gaming.'}
                            </p>
                        </div>
                        <Button
                            onClick={() => setGameMode(!gameMode)}
                            className={`h-12 px-6 font-bold transition-all ${gameMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-primary text-black hover:bg-primary/90'}`}
                        >
                            <Gamepad2 className="mr-2" size={20} />
                            {gameMode ? 'DEACTIVATE' : 'ACTIVATE'}
                        </Button>
                    </div>
                </motion.div>

                {/* Usage Analytics Chart */}
                <motion.div variants={item}>
                    <h3 className="text-lg font-bold mb-4 text-gray-200">Data Usage</h3>
                    <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4 h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={usageData}>
                                    <defs>
                                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Promo Carousel */}
                <motion.section variants={item} className="overflow-x-auto pb-4 snap-x flex gap-4 no-scrollbar">
                    {/* PC View: Display as Grid, Mobile: Carousel */}
                    <div className="flex md:grid md:grid-cols-4 gap-4 w-full">
                        {/* 1. Nusanet Promo */}
                        <div className="min-w-[85%] md:min-w-0 snap-center">
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer bg-gradient-to-br from-blue-900 to-black">
                                <div className="absolute inset-0 bg-[url('https://nusa.net.id/images/sliders/slider-home-1.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-primary text-black text-xs font-bold rounded mb-2 inline-block">BEST SELLER</span>
                                    <h3 className="text-white font-bold text-lg md:text-xl">NusaFiber Home 100</h3>
                                    <p className="text-gray-300 text-xs md:text-sm mb-1">Unlimited • Free Installation</p>
                                    <p className="text-primary font-bold text-lg">Rp 350.000<span className="text-sm font-normal text-gray-400">/mo</span></p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Turbo Speed (Restored) */}
                        <div className="min-w-[85%] md:min-w-0 snap-center">
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
                                <img src="/images/promo-speed.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-cyan-400 text-black text-xs font-bold rounded mb-2 inline-block">UPGRADE</span>
                                    <h3 className="text-white font-bold text-lg md:text-xl">Turbo Speed 2x</h3>
                                    <p className="text-gray-300 text-xs md:text-sm">Boost connection for gaming.</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Loyalty Reward (Restored) */}
                        <div className="min-w-[85%] md:min-w-0 snap-center">
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
                                <img src="/images/promo-loyalty.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded mb-2 inline-block">REWARDS</span>
                                    <h3 className="text-white font-bold text-lg md:text-xl">Claim Gold Tier</h3>
                                    <p className="text-gray-300 text-xs md:text-sm">50 pts away from Gold.</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Business Promo */}
                        <div className="min-w-[85%] md:min-w-0 snap-center">
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer bg-gradient-to-br from-purple-900 to-black">
                                <div className="absolute inset-0 bg-[url('https://nusa.net.id/images/sliders/slider-home-2.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded mb-2 inline-block">BUSINESS</span>
                                    <h3 className="text-white font-bold text-lg md:text-xl">Pay 12 Get 1 Free</h3>
                                    <p className="text-gray-300 text-xs md:text-sm mb-1">For Broadband packages.</p>
                                    <p className="text-yellow-400 font-bold text-sm">Valid until Dec 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Health Check Pulse */}
                <motion.section variants={item}>
                    <Card className="bg-card border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity size={100} />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Wifi className="text-primary" size={20} /> Connection Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl md:text-5xl font-bold font-mono tracking-tighter text-white">
                                        {isLoading ? '...' : `${data?.currentSpeed} Mbps`}
                                    </div>
                                    <p className={`text-xs md:text-sm mt-2 font-bold ${data?.status === 'EXCELLENT' ? 'text-green-400' :
                                        data?.status === 'MAINTENANCE' ? 'text-yellow-400' : 'text-red-500'
                                        }`}>
                                        ● {data?.message || 'Loading...'}
                                    </p>
                                </div>
                                <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                                    <motion.div
                                        className={`absolute inset-0 rounded-full border-4 ${data?.status === 'EXCELLENT' ? 'border-green-500/20' :
                                            data?.status === 'MAINTENANCE' ? 'border-yellow-500/20' : 'border-red-500/20'
                                            }`}
                                    />
                                    <motion.div
                                        className={`absolute inset-0 rounded-full border-4 border-l-transparent border-b-transparent border-r-transparent ${data?.status === 'EXCELLENT' ? 'border-t-green-500' :
                                            data?.status === 'MAINTENANCE' ? 'border-t-yellow-500' : 'border-t-red-500'
                                            }`}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${data?.status === 'EXCELLENT' ? 'bg-green-500' :
                                        data?.status === 'MAINTENANCE' ? 'bg-yellow-500' : 'bg-red-500'
                                        } shadow-[0_0_10px_currentColor]`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* Action Grid */}
                <motion.section variants={item}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
                        <div onClick={() => navigate('/tracking/ticket-123')}
                            className="bg-card hover:bg-white/10 transition-colors p-4 md:p-6 rounded-xl border border-white/5 cursor-pointer flex flex-col items-center gap-2 text-center group">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <MapPin size={20} className="md:w-8 md:h-8" />
                            </div>
                            <span className="text-sm md:text-base font-medium">Technician</span>
                        </div>

                        <div onClick={() => navigate('/rewards')}
                            className="bg-card hover:bg-white/10 transition-colors p-4 md:p-6 rounded-xl border border-white/5 cursor-pointer flex flex-col items-center gap-2 text-center group">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                                <Star size={20} className="md:w-8 md:h-8" />
                            </div>
                            <span className="text-sm md:text-base font-medium">Rewards</span>
                        </div>

                        <div onClick={() => navigate('/payment')}
                            className="bg-card hover:bg-white/10 transition-colors p-4 md:p-6 rounded-xl border border-white/5 cursor-pointer flex flex-col items-center gap-2 text-center group">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                <CreditCard size={20} className="md:w-8 md:h-8" />
                            </div>
                            <span className="text-sm md:text-base font-medium">Pay Bill</span>
                        </div>

                        <div onClick={() => navigate('/report')}
                            className="bg-card hover:bg-white/10 transition-colors p-4 md:p-6 rounded-xl border border-white/5 cursor-pointer flex flex-col items-center gap-2 text-center group">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                <AlertTriangle size={20} className="md:w-8 md:h-8" />
                            </div>
                            <span className="text-sm md:text-base font-medium">Report</span>
                        </div>
                    </div>

                    {/* Desktop Split View: Plan & History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-blue-900 to-green-900 border-white/5 cursor-pointer hover:border-white/20 transition-colors" onClick={() => navigate('/payment')}>
                            <CardContent className="p-4 md:p-6 flex justify-between items-center h-full">
                                <div>
                                    <p className="text-xs text-blue-200 mb-1">Current Plan</p>
                                    <h3 className="text-lg md:text-2xl font-bold text-white">NusaFiber Home 100</h3>
                                    <p className="text-xs md:text-sm text-green-300">Up to 100 Mbps • Unlimited</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Bill Due</p>
                                    <h3 className="text-lg md:text-2xl font-bold text-white">Rp 350.000</h3>
                                    <p className="text-xs text-red-400 font-semibold">Jan 25, 2026</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-white/90">Recent History</h2>
                            <div className="space-y-3">
                                {[
                                    { title: 'Bill Payment - Dec', date: 'Dec 25, 2025', amount: '-Rp 350.000', icon: CreditCard },
                                    { title: 'Technician Visit', date: 'Dec 10, 2025', amount: 'Free', icon: MapPin },
                                    { title: 'Speed Boost Addon', date: 'Nov 28, 2025', amount: '-Rp 50.000', icon: Activity },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-card border border-white/5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                                                <item.icon size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.title}</p>
                                                <p className="text-[10px] text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-medium ${item.amount.startsWith('-') ? 'text-white' : 'text-green-400'}`}>
                                            {item.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    )
}
