import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Wallet, QrCode, Building, ChevronLeft, CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const PAYMENT_METHODS = [
    { id: 'qris', name: 'QRIS', icon: QrCode, desc: 'Scan to pay instantly' },
    { id: 'va', name: 'Virtual Account', icon: Building, desc: 'BCA, Mandiri, BNI' },
    { id: 'ewallet', name: 'E-Wallet', icon: Wallet, desc: 'GoPay, OVO, ShopeePay' },
    { id: 'cc', name: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
]

export default function PaymentPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    const payMutation = useMutation({
        mutationFn: async (_data: any) => {
            // Mock API Call simulating network delay
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate random success (always success for demo)
            return { success: true, transactionId: 'TRX-' + Math.floor(Math.random() * 1000000) }
        },
        onSuccess: (data) => {
            setTransactionId(data.transactionId)
            setIsSuccess(true)
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
        onError: (err) => {
            alert('Payment Declined: ' + err.message)
            setIsProcessing(false)
        }
    })

    const handlePay = () => {
        setIsProcessing(true)
        payMutation.mutate({ amount: 350000, method: selectedMethod })
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-sm"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_#22c55e]">
                        <CheckCircle size={40} className="text-black" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-gray-400 mb-6">Thank you. Your internet package has been renewed.</p>

                    <Card className="bg-white/5 border-white/10 mb-8">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Transaction ID</span>
                                <span className="font-mono text-white">{transactionId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Paid</span>
                                <span className="text-green-400 font-bold">Rp 350.000</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Button onClick={() => navigate('/')} className="w-full bg-primary hover:bg-green-600 text-black font-bold h-12">
                        Back to Dashboard
                    </Button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-24 md:pb-0">
            {/* Modal Overlay for Processing */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                            <h2 className="text-white font-bold text-lg">Processing Payment...</h2>
                            <p className="text-gray-400 text-sm">Please do not close this window</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="p-6 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-white/5 flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ChevronLeft className="text-white" />
                </Button>
                <h1 className="text-lg font-bold text-white">Payment Gateway</h1>
            </header>

            <main className="p-6 max-w-lg mx-auto">
                {/* Total Amount */}
                <div className="mb-8 text-center">
                    <p className="text-gray-400 text-sm mb-1">Total Payment</p>
                    <h2 className="text-4xl font-bold text-white">Rp 350.000<span className="text-lg text-gray-500">.00</span></h2>
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full mt-2 border border-blue-500/30">
                        Invoice #INV-JAN-2026
                    </div>
                </div>

                {/* Method Selection */}
                <h3 className="text-white font-semibold mb-4">Select Payment Method</h3>
                <div className="space-y-3 mb-8">
                    {PAYMENT_METHODS.map((method) => {
                        const isSelected = selectedMethod === method.id
                        return (
                            <div
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all active:scale-95 ${isSelected ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-card border-white/5 hover:bg-white/5'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                                    <method.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>{method.name}</h4>
                                    <p className="text-xs text-gray-500">{method.desc}</p>
                                </div>
                                {isSelected && <CheckCircle size={20} className="text-primary" />}
                            </div>
                        )
                    })}
                </div>

                {/* Dynamic Details based on Method */}
                <AnimatePresence mode="wait">
                    {selectedMethod === 'cc' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden mb-6">
                            <Input placeholder="Card Number" className="bg-white/5 border-white/10" />
                            <div className="flex gap-4">
                                <Input placeholder="MM/YY" className="bg-white/5 border-white/10" />
                                <Input placeholder="CVC" className="bg-white/5 border-white/10" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pay Button */}
                <Button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-500 hover:to-green-700 text-black font-bold h-14 rounded-xl shadow-lg shadow-green-900/20 text-lg flex items-center justify-center gap-2"
                >
                    Pay Rp 350.000 <ArrowRight size={20} />
                </Button>

                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> Secure Payment 256-bit Encrypted
                </p>
            </main>
        </div>
    )
}
