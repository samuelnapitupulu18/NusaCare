import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Cable, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate('/')
            } else {
                alert('Login failed: ' + (data.error || 'Unknown error'))
            }
        } catch (err) {
            alert('Error logging in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/bg-premium.png')" }}
            />
            <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="z-10 w-full max-w-md p-4"
            >
                <Card className="bg-black/30 border border-white/10 backdrop-blur-md shadow-2xl text-white">
                    <div className="p-8 pb-0 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-500 mb-6 shadow-lg shadow-primary/20">
                            <Cable size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">NusaCare</h1>
                        <p className="text-sm text-gray-300">Premium Member Access</p>
                    </div>
                    <CardContent className="p-8 pt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary/50"
                                    type="email"
                                    placeholder="admin@nusanet.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary/50"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:to-blue-500 text-white font-bold shadow-lg shadow-primary/20 transition-all duration-300"
                                disabled={loading}
                            >
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </form>
                        <div className="mt-6 text-center text-xs text-gray-400">
                            <p>Don't have an account?</p>
                            <Link to="/register" className="text-primary hover:underline hover:text-green-400 transition-colors font-bold mt-1 inline-block">
                                Verify Router ID & Register
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t border-white/5 py-4">
                        <p className="text-xs text-gray-400">Powered by Bun & Hono Engine</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
