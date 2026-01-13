import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ChevronLeft, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatPage() {
    const navigate = useNavigate()
    const [msgs, setMsgs] = useState([
        { id: 1, text: 'Hello! I am NusaBot. How can I help you today?', sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [msgs])

    const handleSend = () => {
        if (!input.trim()) return

        const newMsg = { id: Date.now(), text: input, sender: 'user' }
        setMsgs(prev => [...prev, newMsg])
        setInput('')

        // Mock Reply
        setTimeout(() => {
            const replies = [
                "I can certainly help with that check!",
                "Let me connect you to a live agent.",
                "Your internet status looks stable currently.",
                "Is there anything else?",
            ]
            const randomReply = replies[Math.floor(Math.random() * replies.length)]
            setMsgs(prev => [...prev, { id: Date.now() + 1, text: randomReply, sender: 'bot' }])
        }, 1500)
    }

    return (
        <div className="flex flex-col h-screen bg-background text-white">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-card">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeft />
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Bot size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold">Nusa Support</h1>
                        <p className="text-xs text-green-400">● Online</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-white/10 flex gap-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="bg-white/5 border-white/10"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/80" onClick={handleSend}>
                    <Send size={18} />
                </Button>
            </div>
        </div>
    )
}
