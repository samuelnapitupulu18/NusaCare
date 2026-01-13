import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CheckCircle, ChevronLeft, Send, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { Textarea } from '@/components/ui/textarea'

export default function ReportPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState('diagnosing') // diagnosing, form, success
    const [diagnosticData, setDiagnosticData] = useState<any>(null)
    const [issue, setIssue] = useState('')
    const [category, setCategory] = useState('')

    const handleCategorySelect = (cat: string) => {
        setCategory(cat)
        // Auto-fill description based on category to help user
        switch (cat) {
            case 'No Internet':
                setIssue('My internet is completely down. The modem lights are...')
                break
            case 'Slow Speed':
                setIssue('The internet speed is very slow, especially when...')
                break
            case 'High Latency':
                setIssue('I am experiencing high ping/lag specifically in games/calls like...')
                break
            case 'Billing':
                setIssue('I have a question about my latest bill regarding...')
                break
            case 'Other':
                setIssue('I am having an issue with...')
                break
            default:
                setIssue('')
        }
    }

    // Simulate Smart Diagnostics
    useEffect(() => {
        if (step === 'diagnosing') {
            setTimeout(() => {
                setDiagnosticData({
                    latency: '45ms',
                    jitter: '12ms',
                    packetLoss: '0.1%',
                    modemStatus: 'Online',
                    signalStrength: '-65dBm (Good)'
                })
                setStep('form')
            }, 3000)
        }
    }, [step])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () => {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setStep('success')
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-background pb-24 pt-8 px-6 text-white relative">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" className="p-0 text-gray-400" onClick={() => navigate(-1)}>
                    <ChevronLeft /> Back
                </Button>
                <h1 className="text-xl font-bold">Report Issue</h1>
            </div>

            <AnimatePresence mode="wait">
                {step === 'diagnosing' && (
                    <motion.div
                        key="diag"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-[50vh] text-center"
                    >
                        <div className="relative w-32 h-32 mb-8">
                            <motion.div
                                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Activity size={40} className="text-primary" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Running Smart Diagnostics...</h2>
                        <p className="text-gray-400 text-sm max-w-[250px]">
                            Checking line quality, modem status, and signal strength automatically.
                        </p>
                    </motion.div>
                )}

                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Diagnostic Result Card */}
                        <Card className="bg-gradient-to-br from-blue-900/50 to-primary/10 border-primary/20">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle size={16} className="text-green-400" />
                                    <span className="text-sm font-bold text-green-400">Diagnostics Complete</span>
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-300">
                                    <div className="flex items-center gap-2"><Server size={12} /> Latency: <span className="text-white">{diagnosticData.latency}</span></div>
                                    <div className="flex items-center gap-2"><Activity size={12} /> Jitter: <span className="text-white">{diagnosticData.jitter}</span></div>
                                    <div className="flex items-center gap-2"><Activity size={12} /> Signal: <span className="text-white">{diagnosticData.signalStrength}</span></div>
                                </div>
                                <div className="mt-3 text-[10px] text-primary/80 bg-primary/10 p-2 rounded">
                                    * This data will be auto-attached to your ticket for faster resolution.
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-200">Issue Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['No Internet', 'Slow Speed', 'High Latency', 'Billing', 'Other'].map(cat => (
                                        <Button
                                            key={cat}
                                            variant={category === cat ? "default" : "outline"}
                                            onClick={() => handleCategorySelect(cat)}
                                            className={`justify-start text-xs border-white/10 h-10 transition-colors ${category === cat
                                                ? 'bg-primary text-black border-primary font-bold hover:bg-primary/90'
                                                : 'bg-transparent text-gray-300 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-200">Description</label>
                                <Textarea
                                    placeholder="Describe your problem..."
                                    className="bg-white/5 border-white/10 min-h-[100px]"
                                    value={issue}
                                    onChange={(e) => setIssue(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-primary text-white font-bold" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending Ticket...' : <>Submit Ticket <Send size={16} className="ml-2" /></>}
                        </Button>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-[60vh] text-center"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Ticket Created!</h2>
                        <p className="text-gray-400 mb-8 max-w-[250px]">
                            Our AI has analyzed your line. A technician has been notified.
                        </p>
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1 border-white/10" onClick={() => navigate('/')}>
                                Home
                            </Button>
                            <Button className="flex-1 bg-primary text-white" onClick={() => navigate('/activity')}>
                                Track Status
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
