import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/Sidebar'
import { BottomNav } from '@/components/BottomNav'

import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import Dashboard from '@/pages/Dashboard'
import PackagesPage from '@/pages/PackagesPage'
import Tracking from '@/pages/Tracking'
import ActivityPage from '@/pages/ActivityPage'
import RewardsPage from '@/pages/RewardsPage'
import ProfilePage from '@/pages/ProfilePage'
import ChatPage from '@/pages/ChatPage'
import PaymentPage from '@/pages/PaymentPage'
import ReportPage from '@/pages/ReportPage'
import NetworkPage from '@/pages/NetworkPage'
import 'leaflet/dist/leaflet.css' // Global Leaflet CSS
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const queryClient = new QueryClient()

const ProtectedRoute = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

function AppContent() {
    const navigate = useNavigate()
    const location = useLocation()
    const hideNav = ['/login', '/register']
    const showNav = !hideNav.includes(location.pathname)
    const showFab = showNav && location.pathname !== '/chat'

    return (
        <div className="min-h-screen bg-background text-white font-sans flex">
            {/* Desktop Sidebar (Hidden on Mobile) */}
            {showNav && <Sidebar />}

            {/* Main Content Area */}
            <div className="flex-1 relative flex flex-col h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 md:pb-0 relative">
                    {/* Max width container for large screens to keep content readable */}
                    <div className="w-full max-w-7xl mx-auto md:p-6">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/activity" element={<ActivityPage />} />
                                <Route path="/rewards" element={<RewardsPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/tracking/:ticketId" element={<Tracking />} />
                                <Route path="/packages" element={<PackagesPage />} />
                                <Route path="/chat" element={<ChatPage />} />
                                <Route path="/payment" element={<PaymentPage />} />
                                <Route path="/report" element={<ReportPage />} />
                                <Route path="/network" element={<NetworkPage />} />
                            </Route>
                        </Routes>
                    </div>
                </div>

                {/* Mobile Bottom Nav (Hidden on Desktop) */}
                <div className="md:hidden">
                    {showNav && <BottomNav />}
                </div>

                {/* Global FAB */}
                {showFab && (
                    <motion.button
                        onClick={() => navigate('/chat')}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-to-tr from-primary to-blue-500 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white z-50">
                        <MessageCircle size={24} fill="currentColor" />
                    </motion.button>
                )}
            </div>
        </div>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </QueryClientProvider>
    )
}
