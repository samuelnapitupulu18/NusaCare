import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Award, Crown, ChevronRight, Sparkles, TrendingUp, Zap, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RewardsPage() {
    const [points, setPoints] = useState(2450)
    const [claimedDaily, setClaimedDaily] = useState(false)
    const [showLevelUp, setShowLevelUp] = useState(false)

    const handleClaimDaily = () => {
        if (claimedDaily) return
        setClaimedDaily(true)
        setPoints(p => p + 50)
        // Show Level Up animation if points cross threshold (simulated)
        setTimeout(() => setShowLevelUp(true), 500)
    }

    return (
        <div className="min-h-screen bg-background pb-28 text-white relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-yellow-900/20 via-background to-background pointer-events-none" />

            <div className="p-6 relative z-10">
                <header className="flex justify-between items-center mb-8 pt-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent">NusaPoints</h1>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Sparkles size={12} className="text-yellow-500" /> Member since 2024
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-xs hover:bg-white/10">
                        History
                    </Button>
                </header>

                {/* Daily Login Streak (New) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 flex items-center justify-between shadow-lg shadow-blue-900/20"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Daily Streak: Day 3</h3>
                            <p className="text-xs text-blue-300">Claim +50 PTS now!</p>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleClaimDaily}
                        disabled={claimedDaily}
                        className={`transition-all ${claimedDaily ? 'bg-green-500/20 text-green-400' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {claimedDaily ? <span className="flex items-center gap-1"><Check size={14} /> Claimed</span> : 'Claim'}
                    </Button>
                </motion.div>

                {/* Premium Membership Card (Glassmorphism + 3D feel) */}
                <motion.div
                    initial={{ y: 20, opacity: 0, rotateX: 10 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl mb-8 group perspective-1000"
                >
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-700 p-[1px] rounded-3xl">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-3xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-50" />
                        {/* Shine Effect */}
                        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 group-hover:translate-x-[50%] transition-transform duration-1000" />
                    </div>

                    {/* Card Content */}
                    <div className="relative h-full p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                                <Crown size={24} className="text-black" strokeWidth={2.5} />
                            </div>
                            <span className="font-mono text-xl font-bold tracking-widest text-white/80">GOLD TIER</span>
                        </div>

                        <div>
                            <p className="text-gray-300 text-sm mb-1">Current Balance</p>
                            <h2 className="text-4xl font-bold text-white tracking-tight flex items-baseline gap-2">
                                {points.toLocaleString()} <span className="text-lg font-normal text-yellow-400">PTS</span>
                            </h2>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex-1 mr-4">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-yellow-200">Next: Platinum</span>
                                    <span className="text-white font-bold">{3000 - points} pts left</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(points / 3000) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-[0_0_10px_currentColor]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rewards Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Featured Rewards</h2>
                        <Button variant="link" className="text-primary text-xs h-auto p-0 hover:no-underline">See All</Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { title: '1GB Speed Boost (24h)', points: '500 PTS', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                            { title: 'Bill Discount Rp 50k', points: '1200 PTS', icon: Gift, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                            { title: 'Free Static IP (1 Month)', points: '2000 PTS', icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                            >
                                <Card className="bg-card/50 backdrop-blur-sm border-white/5 group cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-xs text-gray-400">Unlock for <span className="text-yellow-500 font-bold">{item.points}</span></p>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Level Up Overlay */}
            <AnimatePresence>
                {showLevelUp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
                        onClick={() => setShowLevelUp(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-gradient-to-b from-yellow-900 to-black border border-yellow-500/50 p-8 rounded-3xl text-center max-w-sm w-full relative overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-600 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.6)]"
                                >
                                    <Crown size={48} className="text-black" />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-2">LEVEL UP!</h2>
                                <p className="text-gray-300 mb-6">You are now a <span className="text-yellow-400 font-bold">PLATINUM MEMBER</span></p>
                                <Button onClick={() => setShowLevelUp(false)} className="bg-yellow-500 text-black hover:bg-yellow-400 w-full font-bold h-12">
                                    CLAIM REWARDS
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
