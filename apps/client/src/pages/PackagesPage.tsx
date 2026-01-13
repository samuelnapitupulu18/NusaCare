import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Smartphone, Zap, Trophy, Shield, Rocket, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'

const PLANS = {
    home: [
        {
            name: "NusaFiber Home 100",
            speed: "100 Mbps",
            price: "350.000",
            devices: "Up to 7 Devices",
            features: [
                "Unlimited Quota (FUP Free)",
                "Free Installation & Cabling",
                "High-Speed Modem Included",
                "Ideal for 4K Streaming",
                "24/7 Priority Support"
            ],
            popular: true
        },
        {
            name: "NusaFiber Home 200",
            speed: "200 Mbps",
            price: "450.000",
            devices: "Up to 15 Devices",
            features: [
                "Unlimited Quota (FUP Free)",
                "Free Installation & Cabling",
                "Dual Band Modem Included",
                "Ultra Low Latency Gaming",
                "Smart Home Ready"
            ],
            popular: false
        },
        {
            name: "NusaFiber Home 300",
            speed: "300 Mbps",
            price: "800.000",
            devices: "Up to 25 Devices",
            features: [
                "Unlimited Quota (FUP Free)",
                "Free Installation & Cabling",
                "Mesh WiFi System Included",
                "Best for Heavy Downloading",
                "Dedicated Account Manager"
            ],
            popular: false
        }
    ],
    business: [
        {
            name: "Broadband Business 50",
            speed: "50 Mbps",
            price: "750.000",
            features: [
                "SLA 98.5% Uptime Guarantee",
                "1 Public Static IP Included",
                "Premium Support 24/7",
                "Business Grade Router",
                "Daily Usage Report"
            ]
        },
        {
            name: "Broadband Business 100",
            speed: "100 Mbps",
            price: "1.200.000",
            features: [
                "SLA 99% Uptime Guarantee",
                "1 Public Static IP Included",
                "Dedicated Account Manager",
                "Mesh WiFi Support",
                "Prioritized Traffic"
            ]
        }
    ]
}

const FAQS = [
    {
        question: "Is the installation really free?",
        answer: "Yes, for a limited time, standard installation fees (worth Rp 500.000) are waived for all new NusaFiber Home 12-month contract subscriptions."
    },
    {
        question: "Do these prices include VAT?",
        answer: "Prices shown are exclusive of 11% VAT. The final bill will reflect the tax addition."
    },
    {
        question: "Can I upgrade my plan later?",
        answer: "Absolutely! You can upgrade your speed instantly via this app (Dashboard > Turbo Speed) or by contacting support. Changes take effect immediately."
    }
]

export default function PackagesPage() {
    const navigate = useNavigate()
    const [checkLocation, setCheckLocation] = useState("")

    return (
        <div className="min-h-screen bg-background pb-24 md:pb-8">
            {/* Hero Section */}
            <div className="relative min-h-[600px] w-full overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 bg-[url('/images/packages-hero.png')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 backdrop-blur-md">
                            <Rocket size={14} className="mr-2" /> NEW SPEEDS AVAILABLE
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Limitless</span><br />
                            Connectivity.
                        </h1>
                        <p className="text-lg text-gray-300 max-w-xl mb-8">
                            Premium fiber optic internet for your home and business.
                            Ultra-low latency, symmetric speeds, and 99.9% uptime.
                        </p>

                        {/* Coverage Check Mini-Form */}
                        <div className="flex gap-2 max-w-md bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                            <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    className="pl-10 bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0"
                                    placeholder="Check coverage area..."
                                    value={checkLocation}
                                    onChange={(e) => setCheckLocation(e.target.value)}
                                />
                            </div>
                            <Button className="shrink-0 bg-primary text-black hover:bg-green-500">
                                <Search size={18} className="mr-2" /> Check
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="px-6 md:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {[
                        { icon: Zap, title: "Symmetric Speeds", desc: "Upload speeds equal to download speeds." },
                        { icon: Shield, title: "Secure Network", desc: "Built-in DDoS protection and firewall." },
                        { icon: Trophy, title: "#1 in Stability", desc: "Award-winning stable connection 2024." }
                    ].map((feature, i) => (
                        <Card key={i} className="bg-card/50 backdrop-blur-md border-white/10">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{feature.title}</CardTitle>
                                    <CardDescription>{feature.desc}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Packages Tabs */}
                <div className="mb-16">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Power</h2>
                        <p className="text-gray-400">Select the plan that fits your lifestyle.</p>
                    </div>

                    <Tabs defaultValue="home" className="w-full space-y-12">
                        <div className="flex justify-center">
                            <TabsList className="grid w-[300px] grid-cols-2 bg-zinc-900 border border-white/10 p-1 rounded-full">
                                <TabsTrigger value="home" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-black">Residential</TabsTrigger>
                                <TabsTrigger value="business" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-black">Business</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="home" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {PLANS.home.map((plan, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Card className={`relative h-full flex flex-col border-white/10 overflow-hidden ${plan.popular ? 'bg-zinc-900 shadow-2xl shadow-primary/10 border-primary/50 ring-1 ring-primary/50' : 'bg-black/40'}`}>
                                            {plan.popular && (
                                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                                            )}
                                            {plan.popular && (
                                                <div className="absolute top-4 right-4 animate-pulse">
                                                    <Badge className="bg-primary text-black hover:bg-primary">BEST VALUE</Badge>
                                                </div>
                                            )}
                                            <CardHeader>
                                                <CardTitle className="text-xl text-gray-200">{plan.name}</CardTitle>
                                                <div className="flex items-baseline gap-1 mt-4">
                                                    <span className="text-sm font-normal text-gray-400">Rp</span>
                                                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                                    <span className="text-sm font-normal text-gray-500">/mo</span>
                                                </div>
                                                <CardDescription className="flex items-center gap-2 mt-2 text-primary">
                                                    <Zap size={16} fill="currentColor" /> {plan.speed}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1 pt-4 border-t border-white/5 mx-6 px-0">
                                                <ul className="space-y-4">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                            <div className="mt-0.5 rounded-full p-0.5 bg-green-500/20 text-green-500">
                                                                <Check size={12} strokeWidth={4} />
                                                            </div>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                                        <div className="mt-0.5 rounded-full p-0.5 bg-blue-500/20 text-blue-500">
                                                            <Smartphone size={12} strokeWidth={3} />
                                                        </div>
                                                        {plan.devices}
                                                    </li>
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    onClick={() => navigate('/payment')}
                                                    className={`w-full h-12 text-base font-semibold ${plan.popular ? 'bg-primary hover:bg-green-600 text-black shadow-lg shadow-green-500/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                                                >
                                                    Select Plan
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="business" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {PLANS.business.map((plan, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
                                        <Card className="relative h-full flex flex-col border-none bg-zinc-900 overflow-hidden">
                                            <CardHeader>
                                                <Badge variant="outline" className="w-fit mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10">BUSINESS CLASS</Badge>
                                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                                <div className="flex items-baseline gap-1 mt-4">
                                                    <span className="text-sm font-normal text-gray-400">Rp</span>
                                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                                    <span className="text-sm font-normal text-gray-500">/mo</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex-1 border-t border-white/5 mx-6 px-0 pt-6">
                                                <ul className="grid grid-cols-1 gap-4">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                                            <Check size={18} className="text-yellow-500" /> {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold hover:brightness-110 border-none">
                                                    Contact Business Sales
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Annual Promo Banner */}
                <div className="mb-20 relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-900/20">
                    <div className="z-10 text-center md:text-left">
                        <Badge className="bg-white text-orange-600 mb-4 hover:bg-white text-sm px-3 py-1">LIMITED TIME OFFER</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Pay 12, Get 13!</h2>
                        <p className="text-white/90 text-lg max-w-lg mx-auto md:mx-0">
                            Commit to an annual plan and get 1 month absolutely free. Save big and lock in your price for a year.
                        </p>
                    </div>
                    <div className="z-10 flex flex-col gap-3 w-full md:w-auto">
                        <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg h-14 px-8">
                            Claim Annual Offer
                        </Button>
                        <p className="text-white/60 text-xs text-center">Terms and conditions apply</p>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Everything you need to know about our packages.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-4 mb-4 rounded-lg bg-card/30">
                                <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </main>
        </div>
    )
}
