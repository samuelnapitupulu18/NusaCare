import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, User, Router, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1: Verify ID, 2: Create Account
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        wifiId: '',
        name: '',
        email: '',
        password: ''
    })

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Mock Verification
        setTimeout(() => {
            if (formData.wifiId.toUpperCase().startsWith('NUSA-')) {
                setStep(2)
            } else {
                setError('Invalid WiFi ID. Please use the ID provided by the office (e.g., NUSA-XXXX).')
            }
            setLoading(false)
        }, 1000)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Registration failed')

            // Auto Login or Redirect
            alert('Account created! Please login.')
            navigate('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-[url('/bg-premium.png')] bg-cover bg-center">
            {/* Simplified Background Overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl text-white overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-primary to-blue-500" />

                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-600 mb-4 shadow-lg shadow-primary/20">
                                {step === 1 ? <Router size={32} className="text-white" /> : <User size={32} className="text-white" />}
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {step === 1 ? 'Verify Connection' : 'Create Account'}
                            </h1>
                            <p className="text-xs text-gray-400 mt-1">
                                {step === 1 ? 'Enter your Customer/WiFi ID' : 'Setup your member access'}
                            </p>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/20 text-red-200 text-xs p-3 rounded-lg mb-4 border border-red-500/30">
                                {error}
                            </motion.div>
                        )}

                        {step === 1 ? (
                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-300 ml-1">WiFi / Customer ID</label>
                                    <div className="relative">
                                        <Router className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="NUSA-8829..."
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary"
                                            value={formData.wifiId}
                                            onChange={e => setFormData({ ...formData, wifiId: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-500 ml-1">* Check the sticker on your router device.</p>
                                </div>

                                <Button type="submit" className="w-full bg-primary hover:bg-green-600 text-white font-bold h-11" disabled={loading}>
                                    {loading ? 'Checking...' : 'Verify ID'} <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-2">
                                    <CheckCircle size={16} className="text-green-400" />
                                    <span className="text-xs text-green-100 font-mono">{formData.wifiId} Verified</span>
                                </div>

                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Full Name"
                                        className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="Create Password"
                                        className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold h-11 shadow-lg" disabled={loading}>
                                    {loading ? 'Creating...' : 'Finalize Registration'}
                                </Button>

                                <Button variant="ghost" type="button" onClick={() => setStep(1)} className="w-full text-xs text-gray-400 hover:text-white">
                                    Back to Verification
                                </Button>
                            </form>
                        )}

                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:underline font-bold">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
