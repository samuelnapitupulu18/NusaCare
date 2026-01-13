/// <reference types="bun-types" />
import type { ServerWebSocket } from 'bun'
import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { cors } from 'hono/cors'
import { jwt, sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client'

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

const app = new Hono()
const JWT_SECRET = 'super-secret-key-nusacare' // In prod use env

app.use('/*', cors({
  origin: ['http://localhost:3002', 'http://localhost:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

// Auth Middleware for /api/* routes except login/health-check
app.use('/api/*', (c, next) => {
  const path = c.req.path
  if (path === '/api/auth/login' || path === '/api/health-check' || path === '/api/auth/register') {
    return next()
  }
  const jwtMiddleware = jwt({ secret: JWT_SECRET })
  return jwtMiddleware(c, next)
})

// 1. Intelligent Dashboard Health Check
// 1. Intelligent Dashboard Health Check
app.get('/api/health-check', (c) => {
  // Simulate network diagnostics
  // 71-100: Excellent
  // 50-70: Little Maintenance
  // 0-49: Trouble Connection

  // Plan: 100 Mbps (Updated to match NusaFiber Home 100)
  const subscriptionSpeed = 100
  // Biased randomizer: Trend towards 70-100% for "Excellent" demo, but varying
  const minPercentage = 60
  const percentage = Math.floor(Math.random() * (100 - minPercentage + 1)) + minPercentage

  const currentSpeed = parseFloat(((percentage / 100) * subscriptionSpeed).toFixed(1))
  const latency = Math.floor(Math.random() * 50) + 10

  let status: 'EXCELLENT' | 'MAINTENANCE' | 'TROUBLE' = 'EXCELLENT'
  let message = 'Excellent Stability'

  if (percentage >= 71) {
    status = 'EXCELLENT'
    message = 'Excellent Stability'
  } else if (percentage >= 50) {
    status = 'MAINTENANCE'
    message = 'Little Maintenance'
  } else {
    status = 'TROUBLE'
    message = 'Trouble connection, please call technician'
  }

  return c.json({
    status,
    message,
    currentSpeed,    // New field
    percentage,      // Keep internal for debugging if needed
    latency,
    packetLoss: 0,
    timestamp: new Date().toISOString()
  })
})

// 2. Authentication
// Register
app.post('/api/auth/register', async (c) => {
  const prisma = new PrismaClient()
  try {
    const body = await c.req.json()
    const { name, email, password, wifiId } = body

    if (!name || !email || !password || !wifiId) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return c.json({ error: 'Email already registered' }, 409)

    // Check if ID exists (Mock: In real life we check against a Router DB)
    // For Demo: We enforce ID must start with "NUSA-"
    if (!wifiId.startsWith('NUSA-')) {
      return c.json({ error: 'Invalid WiFi ID Format. Must start with NUSA-' }, 400)
    }

    const existingId = await prisma.user.findUnique({ where: { wifiId } })
    if (existingId) return c.json({ error: 'WiFi ID already claimed' }, 409)

    const hashedPassword = await Bun.password.hash(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        wifiId,
        role: 'USER'
      }
    })

    return c.json({ message: 'Registration successful', userId: user.id })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Registration failed' }, 500)
  } finally {
    await prisma.$disconnect()
  }
})

// Login
app.post('/api/auth/login', async (c) => {
  const prisma = new PrismaClient()
  try {
    const { email, password } = await c.req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const isValid = await Bun.password.verify(password, user.passwordHash)

    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const payload = {
      sub: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24h
    }
    const token = await sign(payload, JWT_SECRET)

    return c.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Internal Server Error' }, 500)
  } finally {
    await prisma.$disconnect()
  }
})

// 3. Technician Tracking (WebSocket)
// Upgrades the connection to WebSocket
app.get('/api/tracking/:ticketId', upgradeWebSocket((c) => {
  const ticketId = c.req.param('ticketId')
  return {
    onOpen(evt, ws) {
      console.log(`Connection opened for ticket ${ticketId}`)
      // Simulate moving car coordinates (Jakarta area)
      let lat = -6.2088
      let lng = 106.8456

      const interval = setInterval(() => {
        lat += (Math.random() - 0.5) * 0.001
        lng += (Math.random() - 0.5) * 0.001
        ws.send(JSON.stringify({ lat, lng, ticketId }))
      }, 2000)
    },
    onClose(evt, ws) {
      console.log('Connection closed')
    },
  }
}))

app.post('/api/tickets', (c) => c.json({ message: 'Ticket created', id: crypto.randomUUID() }))
app.post('/api/tickets/:id/rate', (c) => c.json({ message: 'Rating submitted' }))

// 4. Payment & Transactions (Mock)
app.post('/api/pay', async (c) => {
  const { amount, method } = await c.req.json()
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 10% Chance of failure for realism
  if (Math.random() < 0.1) {
    return c.json({ error: 'Payment declined by bank' }, 400)
  }

  return c.json({
    status: 'SUCCESS',
    transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
    date: new Date().toISOString(),
    amount,
    method
  })
})

app.get('/api/transactions', (c) => {
  // Return mock history
  return c.json([
    { id: 'TXN-8821', title: 'Bill Payment - Jan', date: '2026-01-25', amount: 350000, status: 'SUCCESS' },
    { id: 'TXN-7721', title: 'Bill Payment - Dec', date: '2025-12-25', amount: 350000, status: 'SUCCESS' },
    { id: 'TXN-6621', title: 'Speed Boost 24h', date: '2025-11-10', amount: 50000, status: 'SUCCESS' },
  ])
})

export default {
  port: 3000,
  fetch: app.fetch,
  websocket
}
