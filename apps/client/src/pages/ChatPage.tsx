import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ChevronLeft, Bot, Activity, CheckCircle2, Terminal, Cpu, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'

export default function ChatPage() {
    const navigate = useNavigate()
    const [msgs, setMsgs] = useState([
        { id: 1, text: 'Hello! I am NusaBot. How can I help you today?', sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const [isDiagnosing, setIsDiagnosing] = useState(false)
    const [diagnosticStep, setDiagnosticStep] = useState(0)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msgs])

    const handleSend = () => {
        if (!input.trim()) return

        const newMsg = { id: Date.now(), text: input, sender: 'user' }
        setMsgs(prev => [...prev, newMsg])
        setInput('')

        // Trigger Diagnostics if keyword detected
        if (input.toLowerCase().includes('slow') || input.toLowerCase().includes('lag') || input.toLowerCase().includes('check')) {
            setTimeout(() => {
                setMsgs(prev => [...prev, { id: Date.now(), text: "I can run a full network diagnostic for you. Launching AI Scanner...", sender: 'bot' }])
                setTimeout(() => startDiagnostics(), 1000)
            }, 500)
            return
        }

        // Mock Reply
        setTimeout(() => {
            const replies = [
                "I see. Let me check that for you.",
                "Have you tried restarting your router?",
                "You can run 'AI Scan' to auto-fix issues.",
                "Is there anything else?",
            ]
            const randomReply = replies[Math.floor(Math.random() * replies.length)]
            setMsgs(prev => [...prev, { id: Date.now() + 1, text: randomReply, sender: 'bot' }])
        }, 1500)
    }

    const startDiagnostics = () => {
        setIsDiagnosing(true)
        setDiagnosticStep(0)

        // Simulation Sequence
        const steps = [
            () => setDiagnosticStep(1), // Checking Fiber
            () => setDiagnosticStep(2), // Analyzing Router
            () => setDiagnosticStep(3), // Optimizing DNS
            () => {
                setIsDiagnosing(false)
                setMsgs(prev => [...prev,
                { id: Date.now(), text: "✅ Diagnostics Complete. I optimized your DNS channel and cleared the cache. Your speed should improve by ~20%.", sender: 'bot' }
                ])
            }
        ]

        let delay = 0
        steps.forEach((step) => {
            delay += 2000 // 2 seconds per step
            setTimeout(step, delay)
        })
    }

    return (
        <div className="flex flex-col h-screen bg-background text-white relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-card relative z-10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold">Nusa Support (AI)</h1>
                            <p className="text-xs text-green-400">● Online • V2.0</p>
                        </div>
                    </div>
                </div>
                <Button
                    size="sm"
                    className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20"
                    onClick={() => startDiagnostics()}
                >
                    <Activity size={16} className="mr-2" /> Auto-Fix
                </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-0">
                {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'user'
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-white/10 text-gray-200 rounded-bl-none'
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}

                {/* AI Diagnostics Overlay */}
                <AnimatePresence>
                    {isDiagnosing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="my-4"
                        >
                            <Card className="bg-black/80 border-primary/50 text-green-400 font-mono p-4 w-full max-w-md mx-auto shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <Terminal size={18} />
                                    <span className="font-bold">NUSA-AI DIAGNOSTICS TOOL</span>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <StepItem step={1} current={diagnosticStep} text="Checking Optical Signal..." icon={Wifi} />
                                    <StepItem step={2} current={diagnosticStep} text="Analyzing CPU Load..." icon={Cpu} />
                                    <StepItem step={3} current={diagnosticStep} text="Optimizing DNS Route..." icon={Activity} />
                                </div>
                                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${(diagnosticStep / 3) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-white/10 flex gap-2 relative z-10">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type 'check' to run diagnostics..."
                    className="bg-white/5 border-white/10 text-white"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/80" onClick={handleSend}>
                    <Send size={18} />
                </Button>
            </div>
        </div>
    )
}

function StepItem({ step, current, text, icon: Icon }: { step: number, current: number, text: string, icon: any }) {
    if (current < step) return <div className="flex items-center gap-3 opacity-30"><Icon size={16} /> {text}</div>
    if (current === step) return <div className="flex items-center gap-3 text-yellow-400 animate-pulse"><Icon size={16} /> {text} <span className="text-xs ml-auto">RUNNING...</span></div>
    return <div className="flex items-center gap-3 text-green-400"><CheckCircle2 size={16} /> {text} <span className="text-xs ml-auto">OK</span></div>
}
