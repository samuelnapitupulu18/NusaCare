import { Home, Gift, User, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

export function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const tabs = [
        { id: 'home', icon: Home, label: 'Home', path: '/' },
        { id: 'packages', icon: ShoppingBag, label: 'Shop', path: '/packages' },
        { id: 'rewards', icon: Gift, label: 'Rewards', path: '/rewards' },
        { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    ]

    // Hide on login page
    if (location.pathname === '/login') return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-[480px] bg-background/80 backdrop-blur-lg border-t border-white/10 pointer-events-auto pb-safe">
                <div className="flex justify-between items-center p-2 px-6">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path
                        return (
                            <div
                                key={tab.id}
                                onClick={() => tab.path !== '#' && navigate(tab.path)}
                                className={`flex flex-col items-center gap-1 p-2 cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                            >
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </motion.div>
                                <span className="text-[10px] font-medium">{tab.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
