import { useState, useEffect } from 'react'
import { User, Settings, LogOut, Shield, CreditCard, HelpCircle, Edit2, ChevronRight, Wallet, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'

export default function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)

    // Edit Form State
    const [editName, setEditName] = useState(user.name || '')
    const [editPassword, setEditPassword] = useState('')

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(storedUser)
        setEditName(storedUser.name || '')
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const handleSaveProfile = () => {
        const updatedUser = { ...user, name: editName }
        if (editPassword) {
            console.log("Password updated to:", editPassword)
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setIsEditOpen(false)
    }

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariant = {
        hidden: { x: -20, opacity: 0 },
        show: { x: 0, opacity: 1 }
    }

    return (
        <div className="min-h-screen bg-background pb-24 text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 pt-12 flex flex-col items-center border-b border-white/5 relative bg-white/5 backdrop-blur-sm"
            >
                <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)} className="text-primary hover:bg-primary/10 hover:text-primary">
                        <Edit2 size={20} />
                    </Button>
                </div>

                <div className="w-24 h-24 rounded-full bg-black overflow-hidden mb-4 border-2 border-primary group relative cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.5)]" onClick={() => setIsEditOpen(true)}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" className="w-full h-full" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Edit2 size={24} className="text-white" />
                    </div>
                </div>
                <h1 className="text-xl font-bold text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{user.name || 'Member'}</h1>
                <p className="text-sm text-gray-400">{user.email || 'member@nusanet.com'}</p>
                <span className="mt-2 px-3 py-1 bg-gradient-to-r from-primary/20 to-blue-600/20 border border-primary/20 text-primary text-xs font-bold rounded-full">
                    {user.role || 'GOLD MEMBER'}
                </span>
            </motion.div>

            {/* Menu List */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="p-6 space-y-8"
            >
                <section>
                    <motion.h2 variants={itemVariant} className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider pl-1">Account Settings</motion.h2>
                    <div className="space-y-3">
                        <div onClick={() => setIsEditOpen(true)}>
                            <MenuButton variants={itemVariant} icon={User} label="Personal Information" />
                        </div>
                        <MenuButton variants={itemVariant} icon={Shield} label="Login & Security" />
                        <div onClick={() => setIsPaymentOpen(true)}>
                            <MenuButton variants={itemVariant} icon={CreditCard} label="Payment Methods" badge="3" />
                        </div>
                    </div>
                </section>

                <section>
                    <motion.h2 variants={itemVariant} className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider pl-1">Support & Legal</motion.h2>
                    <div className="space-y-3">
                        <div onClick={() => navigate('/chat')}>
                            <MenuButton variants={itemVariant} icon={HelpCircle} label="Help Center (Live Chat)" />
                        </div>
                        <MenuButton variants={itemVariant} icon={Settings} label="App Settings" />
                    </div>
                </section>

                <motion.div variants={itemVariant}>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full h-12 flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all active:scale-95"
                    >
                        <LogOut size={18} /> Log Out
                    </Button>
                </motion.div>
            </motion.div>

            {/* Edit Profile Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription className="text-gray-400">Update your personal information.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pass">Change Password (Optional)</Label>
                            <Input id="pass" type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="••••••" className="bg-white/5 border-white/10 text-white" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="hover:bg-white/5 text-gray-400">Cancel</Button>
                        <Button onClick={handleSaveProfile} className="bg-primary text-black hover:bg-primary/90">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Payment Methods Dialog */}
            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Payment Methods</DialogTitle>
                        <DialogDescription className="text-gray-400">Manage your saved payment options.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                        {/* Card 1 */}
                        <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <CreditCard size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Visa ending in 4242</p>
                                <p className="text-xs text-gray-400">Expiry 12/28</p>
                            </div>
                            <CheckCircle2 size={16} className="text-primary" />
                        </div>

                        {/* Card 2 */}
                        <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-blue-800/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <div className="font-bold text-xs">BCA</div>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">BCA Virtual Account</p>
                                <p className="text-xs text-gray-400">•••• 8832</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                <Wallet size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">GoPay</p>
                                <p className="text-xs text-gray-400">0812 •••• 9988</p>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Connected</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
                            + Add New Method
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function MenuButton({ icon: Icon, label, variants, badge }: { icon: any, label: string, variants?: any, badge?: string }) {
    return (
        <motion.div
            variants={variants}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group active:scale-[0.98]"
        >
            <div className="p-2 rounded-lg bg-black/40 text-gray-400 group-hover:text-primary transition-colors">
                <Icon size={20} />
            </div>
            <span className="flex-1 font-medium text-sm md:text-base group-hover:translate-x-1 transition-transform">{label}</span>
            {badge && (
                <span className="bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
            )}
            <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
        </motion.div>
    )
}
