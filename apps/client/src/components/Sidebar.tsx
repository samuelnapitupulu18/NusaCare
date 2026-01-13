import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Activity, Gift, User, MessageCircle, LogOut, ShoppingBag, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: ShoppingBag, label: 'Packages', path: '/packages' },
        { icon: Wifi, label: 'Device Galaxy', path: '/network' },
        { icon: Activity, label: 'Activity', path: '/activity' },
        { icon: Gift, label: 'Rewards', path: '/rewards' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: MessageCircle, label: 'Chat', path: '/chat' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="hidden md:flex flex-col w-64 bg-card border-r border-white/10 h-screen sticky top-0 p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-bold text-white">N</span>
                </div>
                <h1 className="font-bold text-xl text-white">NusaCare</h1>
            </div>

            <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3",
                                isActive ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                            onClick={() => navigate(item.path)}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Button>
                    )
                })}
            </nav>

            <div className="pt-4 border-t border-white/10">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    Logout
                </Button>
            </div>
        </div>
    )
}
