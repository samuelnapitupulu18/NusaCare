import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Wrench, CheckCircle, Clock, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function ActivityPage() {
    const [filter, setFilter] = useState('all') // all, ticket, bill

    const activities = [
        { type: 'ticket', title: 'Internet Slow / Latency', date: 'Today, 10:23 AM', status: 'In Progress', icon: Wrench, color: 'text-orange-400', border: 'border-orange-400/20' },
        { type: 'bill', title: 'Monthly Bill Payment', date: 'Dec 25, 2025', status: 'Success', icon: FileText, color: 'text-green-400', border: 'border-green-400/20' },
        { type: 'ticket', title: 'Modem Replacement', date: 'Dec 10, 2025', status: 'Resolved', icon: CheckCircle, color: 'text-blue-400', border: 'border-blue-400/20' },
        { type: 'bill', title: 'Speed Upgrade Add-on', date: 'Nov 28, 2025', status: 'Success', icon: FileText, color: 'text-green-400', border: 'border-green-400/20' },
        { type: 'ticket', title: 'New Installation', date: 'Oct 15, 2025', status: 'Resolved', icon: CheckCircle, color: 'text-blue-400', border: 'border-blue-400/20' },
    ]

    const filteredActivities = activities.filter(a => filter === 'all' || a.type === filter)

    return (
        <div className="min-h-screen bg-background pb-24 pt-8 px-6 text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="fixed top-20 right-0 w-[200px] h-[200px] bg-blue-500/10 blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Activity History</h1>
                    <p className="text-gray-400 text-sm">Track your tickets and transactions.</p>
                </header>

                {/* Filters */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'ticket', 'bill'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                ? 'bg-primary text-black shadow-lg shadow-green-500/20 scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}s
                        </button>
                    ))}
                </div>

                {/* Search Bar (Visual Only) */}
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <Input
                        placeholder="Search activity..."
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                </div>

                {/* Timeline Layout */}
                <div className="relative space-y-8 pl-4">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-white/5" />

                    <AnimatePresence mode='popLayout'>
                        {filteredActivities.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20, y: 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05, type: 'spring' }}
                                className="relative pl-8"
                            >
                                {/* Time Node */}
                                <div className={`absolute left-[13px] top-4 w-3.5 h-3.5 rounded-full border-2 border-background ${item.color.replace('text-', 'bg-')} z-10`} />

                                <Card className={`bg-card/50 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all hover:bg-white/5 group`}>
                                    <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 border border-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon size={22} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                                <Badge variant="outline" className={`ml-2 text-[10px] ${item.status === 'In Progress' ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' :
                                                    item.status === 'Resolved' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' :
                                                        'border-green-500/50 text-green-400 bg-green-500/10'
                                                    }`}>
                                                    {item.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock size={12} className="text-gray-500" />
                                                <p className="text-xs text-gray-500 font-mono">{item.date}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredActivities.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No activities found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
