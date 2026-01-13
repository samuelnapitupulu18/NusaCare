
import { motion } from 'framer-motion'
import { Gift, Award, Crown, ChevronRight, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function RewardsPage() {
    return (
        <div className="min-h-screen bg-background pb-28 text-white relative">
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
                                2,450 <span className="text-lg font-normal text-yellow-400">PTS</span>
                            </h2>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex-1 mr-4">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-yellow-200">Next: Platinum</span>
                                    <span className="text-white font-bold">550 pts left</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '82%' }}
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
                                            <h3 className="font-bold text-white text-base group-hover:text-primary transition-colors">{item.title}</h3>
                                            <Badge variant="secondary" className="mt-1 bg-white/5 hover:bg-white/10 text-gray-400 border-none text-[10px]">
                                                Use instantly
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-yellow-500">{item.points}</p>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 -mr-2">
                                                <ChevronRight size={18} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
